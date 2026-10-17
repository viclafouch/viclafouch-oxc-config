import { defineRule, type Context, type ESTree } from '@oxlint/plugins'

function outermostTernaryBranch(node: ESTree.Node): ESTree.Node {
  const { parent } = node
  if (parent?.type === 'ConditionalExpression' && parent.test !== node) {
    return outermostTernaryBranch(parent)
  }
  return node
}

function matchIsRenderedAsJsxChild(node: ESTree.LogicalExpression) {
  const container = outermostTernaryBranch(node).parent
  return (
    container?.type === 'JSXExpressionContainer' &&
    (container.parent.type === 'JSXElement' ||
      container.parent.type === 'JSXFragment')
  )
}

function matchIsJsx(node: ESTree.Node) {
  return node.type === 'JSXElement' || node.type === 'JSXFragment'
}

function reportLeakedRender(context: Context, node: ESTree.LogicalExpression) {
  const { sourceCode } = context
  const operator = sourceCode.getTokenAfter(node.left, (token) => {
    return token.value === '&&'
  })
  if (!operator) {
    return
  }
  context.report({
    node,
    messageId: 'leakedRender',
    suggest: [
      {
        messageId: 'useTernary',
        fix: (fixer) => {
          return [
            fixer.replaceText(operator, '?'),
            fixer.insertTextAfter(node, ' : null')
          ]
        }
      }
    ]
  })
}

export const noLeakedRender = defineRule({
  meta: {
    type: 'problem',
    hasSuggestions: true,
    messages: {
      leakedRender:
        'Render with a ternary ending in `: null`, not `&&`: a falsy value like `0` renders.',
      useTernary: 'Rewrite as a ternary ending in `: null`.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      LogicalExpression(node) {
        if (
          node.operator === '&&' &&
          (matchIsJsx(node.right) || matchIsRenderedAsJsxChild(node))
        ) {
          reportLeakedRender(context, node)
        }
      }
    }
  }
})
