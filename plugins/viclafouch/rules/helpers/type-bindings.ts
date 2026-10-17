import type { ESTree } from '@oxlint/plugins'

type TypeBinding = {
  alias: ESTree.TSTypeAliasDeclaration | null
  scope: ESTree.Node
}

type Substitution = {
  type: ESTree.TSType
  substitutions: Substitutions
}

type Substitutions = ReadonlyMap<string, Substitution>

export type TypeMatcher = (
  type: ESTree.TSType,
  matches: (child: ESTree.TSType) => boolean
) => boolean

export type TypeBindings = ReturnType<typeof createTypeBindings>

function findTypeScope(node: ESTree.Node) {
  let current: ESTree.Node | null = node.parent
  while (current) {
    if (
      current.type === 'Program' ||
      current.type === 'BlockStatement' ||
      current.type === 'TSModuleBlock' ||
      current.type === 'StaticBlock' ||
      current.type === 'SwitchStatement'
    ) {
      return current
    }
    current = current.parent
  }
  return node
}

function measureAncestorDistance(ancestor: ESTree.Node, node: ESTree.Node) {
  let current: ESTree.Node | null = node
  let distance = 0
  while (current) {
    if (current === ancestor) {
      return distance
    }
    current = current.parent
    distance += 1
  }
  return null
}

function matchIsDescendant(node: ESTree.Node, ancestor: ESTree.Node) {
  return measureAncestorDistance(ancestor, node) !== null
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
    const explicitArgument = typeArguments[index]
    const argument = explicitArgument ?? parameter.default
    if (!argument) {
      return null
    }
    next.set(parameter.name.name, {
      type: argument,
      substitutions: new Map(explicitArgument ? base : next)
    })
  }
  return next
}

export function getTypeReferenceName(type: ESTree.TSType) {
  return type.type === 'TSTypeReference' && type.typeName.type === 'Identifier'
    ? type.typeName.name
    : null
}

export function createTypeBindings() {
  const bindingsByName = new Map<string, TypeBinding[]>()
  const inferTypes: ESTree.TSInferType[] = []

  const addBinding = (
    name: string,
    node: ESTree.Node,
    alias: ESTree.TSTypeAliasDeclaration | null = null
  ) => {
    const binding = { alias, scope: findTypeScope(node) }
    const bindings = bindingsByName.get(name)
    if (bindings) {
      bindings.push(binding)
    } else {
      bindingsByName.set(name, [binding])
    }
  }

  const collectInferNames = (extendsType: ESTree.TSType) => {
    return inferTypes
      .filter((inferType) => {
        return matchIsDescendant(inferType, extendsType)
      })
      .map((inferType) => {
        return inferType.typeParameter.name.name
      })
  }

  const collectTypeParameterNames = (use: ESTree.Node) => {
    const names = new Set<string>()
    let descendant = use
    let current: ESTree.Node = use
    while (current.type !== 'Program') {
      if ('typeParameters' in current) {
        for (const parameter of current.typeParameters?.params ?? []) {
          names.add(parameter.name.name)
        }
      }
      if (
        current.type === 'TSMappedType' &&
        (descendant === current.nameType ||
          descendant === current.typeAnnotation)
      ) {
        names.add(current.key.name)
      }
      if (
        current.type === 'TSConditionalType' &&
        descendant === current.trueType
      ) {
        for (const name of collectInferNames(current.extendsType)) {
          names.add(name)
        }
      }
      descendant = current
      current = current.parent
    }
    return names
  }

  const findNearestBindings = (name: string, use: ESTree.Node) => {
    let nearestDistance = Number.POSITIVE_INFINITY
    let nearest: TypeBinding[] = []
    for (const binding of bindingsByName.get(name) ?? []) {
      const distance = measureAncestorDistance(binding.scope, use)
      if (distance !== null && distance < nearestDistance) {
        nearestDistance = distance
        nearest = [binding]
      } else if (distance === nearestDistance) {
        nearest = [...nearest, binding]
      }
    }
    return nearest
  }

  const findVisibleAlias = (name: string, use: ESTree.Node) => {
    if (collectTypeParameterNames(use).has(name)) {
      return null
    }
    const bindings = findNearestBindings(name, use)
    return bindings.length === 1 ? (bindings[0]?.alias ?? null) : null
  }

  const matchIsLocallyDeclared = (name: string, use: ESTree.Node) => {
    return (
      collectTypeParameterNames(use).has(name) ||
      findNearestBindings(name, use).length > 0
    )
  }

  const matchResolvedType = (type: ESTree.TSType, matcher: TypeMatcher) => {
    const evaluate = (
      current: ESTree.TSType,
      substitutions: Substitutions,
      resolvingAliases: ReadonlySet<ESTree.TSTypeAliasDeclaration>
    ): boolean => {
      const name = getTypeReferenceName(current)
      if (current.type === 'TSTypeReference' && name !== null) {
        const substitution = substitutions.get(name)
        if (
          substitution !== undefined &&
          (current.typeArguments?.params.length ?? 0) === 0
        ) {
          return evaluate(
            substitution.type,
            substitution.substitutions,
            resolvingAliases
          )
        }
        const alias = findVisibleAlias(name, current)
        const nextSubstitutions =
          alias && !resolvingAliases.has(alias)
            ? substituteTypeParameters(alias, current, substitutions)
            : null
        if (alias && nextSubstitutions) {
          return evaluate(
            alias.typeAnnotation,
            nextSubstitutions,
            new Set([...resolvingAliases, alias])
          )
        }
      }
      return matcher(current, (child) => {
        return evaluate(child, substitutions, resolvingAliases)
      })
    }
    return evaluate(type, new Map(), new Set())
  }

  return {
    findVisibleAlias,
    matchIsLocallyDeclared,
    matchResolvedType,
    reset() {
      bindingsByName.clear()
      inferTypes.splice(0)
    },
    visitor: {
      TSTypeAliasDeclaration(node: ESTree.TSTypeAliasDeclaration) {
        addBinding(node.id.name, node, node)
      },
      TSInterfaceDeclaration(node: ESTree.TSInterfaceDeclaration) {
        addBinding(node.id.name, node)
      },
      TSEnumDeclaration(node: ESTree.TSEnumDeclaration) {
        addBinding(node.id.name, node)
      },
      ClassDeclaration(node: ESTree.Class) {
        if (node.id) {
          addBinding(node.id.name, node)
        }
      },
      ClassExpression(node: ESTree.Class) {
        if (node.id) {
          addBinding(node.id.name, node)
        }
      },
      ImportSpecifier(node: ESTree.ImportSpecifier) {
        addBinding(node.local.name, node)
      },
      ImportDefaultSpecifier(node: ESTree.ImportDefaultSpecifier) {
        addBinding(node.local.name, node)
      },
      ImportNamespaceSpecifier(node: ESTree.ImportNamespaceSpecifier) {
        addBinding(node.local.name, node)
      },
      TSInferType(node: ESTree.TSInferType) {
        inferTypes.push(node)
      }
    }
  }
}
