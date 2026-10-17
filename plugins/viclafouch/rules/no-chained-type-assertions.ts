import { defineRule, type ESTree } from '@oxlint/plugins'

type TypeAssertion = ESTree.TSAsExpression | ESTree.TSTypeAssertion

function matchIsTypeAssertion(node: ESTree.Node): node is TypeAssertion {
  return node.type === 'TSAsExpression' || node.type === 'TSTypeAssertion'
}

function matchIsConstAssertion(node: TypeAssertion) {
  const { typeAnnotation } = node
  return (
    typeAnnotation.type === 'TSTypeReference' &&
    typeAnnotation.typeName.type === 'Identifier' &&
    typeAnnotation.typeName.name === 'const'
  )
}

function unwrapParentheses(node: ESTree.Expression) {
  let current = node
  while (current.type === 'ParenthesizedExpression') {
    current = current.expression
  }
  return current
}

function skipParentParentheses(node: ESTree.Node): ESTree.Node {
  return node.parent?.type === 'ParenthesizedExpression'
    ? skipParentParentheses(node.parent)
    : node
}

function matchIsOutermostAssertion(node: TypeAssertion) {
  const outermost = skipParentParentheses(node)
  const { parent } = outermost
  return (
    !parent || !matchIsTypeAssertion(parent) || parent.expression !== outermost
  )
}

function matchIsForbiddenChain(node: TypeAssertion) {
  const assertions: TypeAssertion[] = []
  let current: ESTree.Expression = node
  while (matchIsTypeAssertion(current)) {
    assertions.push(current)
    current = unwrapParentheses(current.expression)
  }
  return (
    assertions.length > 1 &&
    assertions.some((assertion) => {
      return !matchIsConstAssertion(assertion)
    })
  )
}

export const noChainedTypeAssertions = defineRule({
  meta: {
    type: 'problem',
    messages: {
      chained:
        'Keep the precise type, or parse the untrusted input at its boundary: a chain of assertions discards what TypeScript knows.'
    },
    schema: []
  },
  createOnce(context) {
    const checkAssertion = (node: TypeAssertion) => {
      if (matchIsOutermostAssertion(node) && matchIsForbiddenChain(node)) {
        context.report({ node, messageId: 'chained' })
      }
    }
    return {
      TSAsExpression: checkAssertion,
      TSTypeAssertion: checkAssertion
    }
  }
})
