import type { ESTree } from '@oxlint/plugins'
import { getTypeReferenceName, type TypeBindings } from './type-bindings'

export type WideningTarget =
  | 'anonymous object'
  | 'generic container'
  | 'object'
  | 'open dictionary'
  | 'unknown'

type UnsafeValue = 'any' | 'empty object' | 'object' | 'union' | 'unknown'

type Substitutions = ReadonlyMap<string, ESTree.TSType>

export type TypeEnvironment = {
  interfaces: ReadonlyMap<string, ESTree.TSInterfaceDeclaration[]>
  typeBindings: TypeBindings
}

type Resolution = {
  environment: TypeEnvironment
  substitutions: Substitutions
  resolving: ReadonlySet<string>
}

const BUILT_INS = new Set([
  'Record',
  'Readonly',
  'Partial',
  'Required',
  'Pick',
  'Omit',
  'PropertyKey',
  'NonNullable'
])

const TRANSPARENT_WRAPPERS = new Set([
  'Readonly',
  'Partial',
  'Required',
  'NonNullable'
])

const BROAD_KEY_TYPES = new Set([
  'TSStringKeyword',
  'TSNumberKeyword',
  'TSSymbolKeyword'
])

const KNOWN_EVIDENCE_TYPES = new Set([
  'ObjectExpression',
  'ArrayExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'FunctionExpression',
  'NewExpression',
  'Literal',
  'TemplateLiteral',
  'UnaryExpression'
])

export function collectTopLevelInterfaces(program: ESTree.Program) {
  const interfaces = new Map<string, ESTree.TSInterfaceDeclaration[]>()
  for (const statement of program.body) {
    const declaration =
      statement.type === 'ExportNamedDeclaration' ||
      statement.type === 'ExportDefaultDeclaration'
        ? statement.declaration
        : statement
    if (declaration?.type === 'TSInterfaceDeclaration') {
      interfaces.set(declaration.id.name, [
        ...(interfaces.get(declaration.id.name) ?? []),
        declaration
      ])
    }
  }
  return interfaces
}

function matchIsBuiltIn(
  name: string,
  use: ESTree.Node,
  environment: TypeEnvironment
) {
  return (
    BUILT_INS.has(name) &&
    !environment.typeBindings.matchIsLocallyDeclared(name, use)
  )
}

function matchIsTransparentWrapper(
  name: string,
  use: ESTree.Node,
  environment: TypeEnvironment
) {
  return (
    TRANSPARENT_WRAPPERS.has(name) && matchIsBuiltIn(name, use, environment)
  )
}

function unwrapTransparentType(type: ESTree.TSType) {
  let current = type
  while (
    current.type === 'TSParenthesizedType' ||
    (current.type === 'TSTypeOperator' && current.operator === 'readonly')
  ) {
    current = current.typeAnnotation
  }
  return current
}

function matchIsUnappliedReferenceTo(type: ESTree.TSType, name: string) {
  const unwrapped = unwrapTransparentType(type)
  return (
    unwrapped.type === 'TSTypeReference' &&
    getTypeReferenceName(unwrapped) === name &&
    (unwrapped.typeArguments?.params.length ?? 0) === 0
  )
}

function matchIsEffectivelyEmptyMember(member: ESTree.TSSignature) {
  return (
    member.type === 'TSPropertySignature' &&
    member.optional &&
    member.typeAnnotation !== null &&
    unwrapTransparentType(member.typeAnnotation.typeAnnotation).type ===
      'TSNeverKeyword'
  )
}

function matchIsEffectivelyEmptyInterface(
  declarations: ESTree.TSInterfaceDeclaration[]
) {
  const [declaration] = declarations
  return (
    declarations.length === 1 &&
    declaration?.extends.length === 0 &&
    declaration.body.body.every(matchIsEffectivelyEmptyMember)
  )
}

function resolveSubstitution(
  type: ESTree.TSType,
  substitutions: Substitutions,
  resolving: ReadonlySet<string> = new Set()
): ESTree.TSType {
  const name = getTypeReferenceName(unwrapTransparentType(type))
  const substitution = name === null ? undefined : substitutions.get(name)
  if (name === null || substitution === undefined || resolving.has(name)) {
    return type
  }
  return resolveSubstitution(
    substitution,
    substitutions,
    new Set([...resolving, name])
  )
}

function substituteTypeParameters(
  alias: ESTree.TSTypeAliasDeclaration,
  reference: ESTree.TSTypeReference,
  base: Substitutions
) {
  const parameters = alias.typeParameters?.params ?? []
  const typeArguments = reference.typeArguments?.params ?? []
  const next = new Map(base)
  for (const [index, parameter] of parameters.entries()) {
    const argument = typeArguments[index] ?? parameter.default
    if (!argument) {
      return null
    }
    next.set(parameter.name.name, resolveSubstitution(argument, next))
  }
  return next
}

function resolveAlias(
  reference: ESTree.TSTypeReference,
  name: string,
  resolution: Resolution
) {
  const alias = resolution.environment.typeBindings.findVisibleAlias(
    name,
    reference
  )
  const substitutions =
    alias && !resolution.resolving.has(name)
      ? substituteTypeParameters(alias, reference, resolution.substitutions)
      : null
  if (!alias || !substitutions) {
    return null
  }
  return {
    alias,
    resolution: {
      environment: resolution.environment,
      substitutions,
      resolving: new Set([...resolution.resolving, name])
    }
  }
}

function startResolution(environment: TypeEnvironment): Resolution {
  return { environment, substitutions: new Map(), resolving: new Set() }
}

function findUnsafeValue(
  type: ESTree.TSType,
  resolution: Resolution
): UnsafeValue | null {
  const unwrapped = unwrapTransparentType(type)
  const findMember = (member: ESTree.TSType) => {
    return findUnsafeValue(member, resolution)
  }
  if (unwrapped.type === 'TSUnknownKeyword') {
    return 'unknown'
  }
  if (unwrapped.type === 'TSAnyKeyword') {
    return 'any'
  }
  if (unwrapped.type === 'TSObjectKeyword') {
    return 'object'
  }
  if (unwrapped.type === 'TSTypeLiteral') {
    return unwrapped.members.every(matchIsEffectivelyEmptyMember)
      ? 'empty object'
      : null
  }
  if (unwrapped.type === 'TSUnionType') {
    return unwrapped.types.some((member) => {
      return findMember(member) !== null
    })
      ? 'union'
      : null
  }
  if (unwrapped.type === 'TSIntersectionType') {
    const unsafeMembers = unwrapped.types.map(findMember)
    if (unsafeMembers.includes('any')) {
      return 'any'
    }
    return unsafeMembers.every((member) => {
      return member !== null
    })
      ? (unsafeMembers[0] ?? null)
      : null
  }
  return unwrapped.type === 'TSTypeReference'
    ? findUnsafeReference(unwrapped, resolution)
    : null
}

function findUnsafeReference(
  reference: ESTree.TSTypeReference,
  resolution: Resolution
): UnsafeValue | null {
  const name = getTypeReferenceName(reference)
  if (name === null) {
    return null
  }
  const { environment, substitutions } = resolution
  if (matchIsTransparentWrapper(name, reference, environment)) {
    const wrapped = reference.typeArguments?.params[0]
    return wrapped ? findUnsafeValue(wrapped, resolution) : null
  }
  const substitution = substitutions.get(name)
  if (substitution) {
    return matchIsUnappliedReferenceTo(substitution, name)
      ? null
      : findUnsafeValue(substitution, resolution)
  }
  const interfaces = environment.interfaces.get(name)
  if (interfaces) {
    return matchIsEffectivelyEmptyInterface(interfaces) ? 'empty object' : null
  }
  const resolved = resolveAlias(reference, name, resolution)
  return resolved
    ? findUnsafeValue(resolved.alias.typeAnnotation, resolved.resolution)
    : null
}

export function matchIsInformativeType(
  type: ESTree.TSType,
  environment: TypeEnvironment
) {
  return findUnsafeValue(type, startResolution(environment)) === null
}

function matchIsBroadKey(type: ESTree.TSType, resolution: Resolution): boolean {
  const unwrapped = unwrapTransparentType(type)
  if (BROAD_KEY_TYPES.has(unwrapped.type)) {
    return true
  }
  if (unwrapped.type === 'TSUnionType') {
    return unwrapped.types.some((member) => {
      return matchIsBroadKey(member, resolution)
    })
  }
  const name = getTypeReferenceName(unwrapped)
  if (unwrapped.type !== 'TSTypeReference' || name === null) {
    return false
  }
  const { environment, substitutions } = resolution
  const substitution = substitutions.get(name)
  if (substitution && !matchIsUnappliedReferenceTo(substitution, name)) {
    return matchIsBroadKey(substitution, resolution)
  }
  if (name === 'PropertyKey' && matchIsBuiltIn(name, unwrapped, environment)) {
    return true
  }
  const alias = environment.typeBindings.findVisibleAlias(name, unwrapped)
  if (
    !alias ||
    (alias.typeParameters?.params.length ?? 0) > 0 ||
    resolution.resolving.has(name)
  ) {
    return false
  }
  return matchIsBroadKey(alias.typeAnnotation, {
    ...resolution,
    resolving: new Set([...resolution.resolving, name])
  })
}

function matchIsOpenRecord(
  type: ESTree.TSTypeReference,
  resolution: Resolution
) {
  const key = type.typeArguments?.params[0]
  return !key || matchIsBroadKey(key, { ...resolution, resolving: new Set() })
}

function classifyAliasTarget(
  type: ESTree.TSType,
  resolution: Resolution
): WideningTarget | null {
  const unwrapped = unwrapTransparentType(type)
  if (unwrapped.type === 'TSUnknownKeyword') {
    return 'unknown'
  }
  if (unwrapped.type === 'TSObjectKeyword') {
    return 'object'
  }
  if (unwrapped.type === 'TSTypeLiteral') {
    return unwrapped.members.some((member) => {
      return member.type === 'TSIndexSignature'
    })
      ? 'open dictionary'
      : null
  }
  if (unwrapped.type === 'TSMappedType') {
    return matchIsBroadKey(unwrapped.constraint, {
      ...resolution,
      resolving: new Set()
    })
      ? 'open dictionary'
      : null
  }
  if (unwrapped.type !== 'TSTypeReference') {
    return null
  }
  const name = getTypeReferenceName(unwrapped)
  if (name === null) {
    return null
  }
  const { environment, substitutions } = resolution
  const substitution = substitutions.get(name)
  if (substitution) {
    return matchIsUnappliedReferenceTo(substitution, name)
      ? null
      : classifyAliasTarget(substitution, resolution)
  }
  if (matchIsTransparentWrapper(name, unwrapped, environment)) {
    const wrapped = unwrapped.typeArguments?.params[0]
    return wrapped ? classifyAliasTarget(wrapped, resolution) : null
  }
  if (name === 'Record' && matchIsBuiltIn(name, unwrapped, environment)) {
    return matchIsOpenRecord(unwrapped, resolution) ? 'open dictionary' : null
  }
  const resolved = resolveAlias(unwrapped, name, resolution)
  return resolved
    ? classifyAliasTarget(resolved.alias.typeAnnotation, resolved.resolution)
    : null
}

export function classifyWideningTarget(
  type: ESTree.TSType,
  environment: TypeEnvironment
): WideningTarget | null {
  const unwrapped = unwrapTransparentType(type)
  if (unwrapped.type === 'TSUnknownKeyword') {
    return 'unknown'
  }
  if (unwrapped.type === 'TSObjectKeyword') {
    return 'object'
  }
  if (unwrapped.type === 'TSTypeLiteral') {
    if (
      unwrapped.members.some((member) => {
        return member.type === 'TSIndexSignature'
      })
    ) {
      return 'open dictionary'
    }
    return unwrapped.members.length > 0 ? 'anonymous object' : null
  }
  if (unwrapped.type === 'TSMappedType') {
    return 'open dictionary'
  }
  if (unwrapped.type !== 'TSTypeReference') {
    return null
  }
  const name = getTypeReferenceName(unwrapped)
  if (name === null) {
    return null
  }
  if (matchIsTransparentWrapper(name, unwrapped, environment)) {
    const wrapped = unwrapped.typeArguments?.params[0]
    return wrapped ? classifyWideningTarget(wrapped, environment) : null
  }
  if (name === 'Record' && matchIsBuiltIn(name, unwrapped, environment)) {
    return matchIsOpenRecord(unwrapped, startResolution(environment))
      ? 'open dictionary'
      : null
  }
  const resolved = resolveAlias(unwrapped, name, startResolution(environment))
  if (!resolved) {
    return null
  }
  const target = classifyAliasTarget(
    resolved.alias.typeAnnotation,
    resolved.resolution
  )
  if ((resolved.alias.typeParameters?.params.length ?? 0) === 0) {
    return target
  }
  return target === 'open dictionary' ? 'generic container' : null
}

export function unwrapExpression(expression: ESTree.Expression) {
  let current = expression
  while (
    current.type === 'ParenthesizedExpression' ||
    current.type === 'TSAsExpression' ||
    current.type === 'TSSatisfiesExpression' ||
    current.type === 'TSTypeAssertion' ||
    current.type === 'TSNonNullExpression'
  ) {
    current = current.expression
  }
  return current
}

export function matchIsKnownEvidence(expression: ESTree.Expression) {
  return KNOWN_EVIDENCE_TYPES.has(unwrapExpression(expression).type)
}
