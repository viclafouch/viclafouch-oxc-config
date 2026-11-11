import type { ESTree, Scope, SourceCode } from '@oxlint/plugins'

export function resolveVariable(
  sourceCode: SourceCode,
  identifier: ESTree.IdentifierReference
) {
  let scope: Scope | null = sourceCode.getScope(identifier)
  while (scope) {
    const variable = scope.set.get(identifier.name)
    if (variable) {
      return variable
    }
    scope = scope.upper
  }
  return null
}

export function getPropertyName(node: ESTree.MemberExpression) {
  const { property } = node
  if (!node.computed && property.type === 'Identifier') {
    return property.name
  }
  if (property.type === 'Literal' && typeof property.value === 'string') {
    return property.value
  }
  return null
}

export function matchIsViCall(
  { callee }: ESTree.CallExpression,
  names: ReadonlySet<string>
) {
  if (
    callee.type !== 'MemberExpression' ||
    callee.object.type !== 'Identifier' ||
    callee.object.name !== 'vi'
  ) {
    return false
  }
  const name = getPropertyName(callee)
  return name !== null && names.has(name)
}

export type FunctionNode = ESTree.ArrowFunctionExpression | ESTree.Function

const PASCAL_CASE = /^[A-Z]/u

export function matchIsFunction(node: ESTree.Node): node is FunctionNode {
  return (
    node.type === 'ArrowFunctionExpression' ||
    node.type === 'FunctionExpression' ||
    node.type === 'FunctionDeclaration'
  )
}

export function matchIsPascalCase(name: string) {
  return PASCAL_CASE.test(name)
}

export function findEnclosingFunction(node: ESTree.Node) {
  let current = node.parent
  while (current !== null) {
    if (matchIsFunction(current)) {
      return current
    }
    current = current.parent
  }
  return null
}

function findDeclaratorName(node: ESTree.Node) {
  if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier') {
    return node.id.name
  }
  return null
}

export function getFunctionName(node: FunctionNode) {
  if (node.id) {
    return node.id.name
  }
  const { parent } = node
  if (parent.type === 'CallExpression') {
    return findDeclaratorName(parent.parent)
  }
  return findDeclaratorName(parent)
}

export function getCalleeName(callee: ESTree.Expression) {
  if (callee.type === 'Identifier') {
    return callee.name
  }
  if (
    callee.type === 'MemberExpression' &&
    callee.property.type === 'Identifier'
  ) {
    return callee.property.name
  }
  return null
}

export function matchIsUseStateCall(
  node: ESTree.Expression | null
): node is ESTree.CallExpression {
  return (
    node?.type === 'CallExpression' && getCalleeName(node.callee) === 'useState'
  )
}
