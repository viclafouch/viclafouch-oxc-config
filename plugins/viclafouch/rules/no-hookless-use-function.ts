import { defineRule, type ESTree } from '@oxlint/plugins'

const HOOK_NAME = /^use[A-Z]/u
const HOOK_CALLEE = /^use([A-Z]|$)/u

type FunctionNode = ESTree.Function | ESTree.ArrowFunctionExpression

type FunctionFrame = { node: FunctionNode; isCallingHook: boolean }

function findHookName(node: FunctionNode) {
  if (node.type === 'FunctionDeclaration') {
    return node.id?.name ?? null
  }
  const { parent } = node
  if (
    parent?.type === 'VariableDeclarator' &&
    parent.init === node &&
    parent.id.type === 'Identifier'
  ) {
    return parent.id.name
  }
  return null
}

function matchIsHookCallee(callee: ESTree.Node) {
  if (callee.type === 'Identifier') {
    return HOOK_CALLEE.test(callee.name)
  }
  return (
    callee.type === 'MemberExpression' &&
    !callee.computed &&
    callee.property.type === 'Identifier' &&
    HOOK_CALLEE.test(callee.property.name)
  )
}

export const noHooklessUseFunction = defineRule({
  meta: {
    type: 'suggestion',
    messages: {
      hookless:
        '`{{name}}` calls no hook: drop the `use` prefix, or call the hook it depends on inside it.'
    },
    schema: []
  },
  createOnce(context) {
    let frames: FunctionFrame[] = []

    function enterFunction(node: FunctionNode) {
      frames.push({ node, isCallingHook: false })
    }

    function exitFunction() {
      const frame = frames.pop()
      if (!frame || frame.isCallingHook) {
        return
      }
      const name = findHookName(frame.node)
      if (name !== null && HOOK_NAME.test(name)) {
        context.report({
          node: frame.node,
          messageId: 'hookless',
          data: { name }
        })
      }
    }

    return {
      before() {
        frames = []
      },
      FunctionDeclaration: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,
      ArrowFunctionExpression: enterFunction,
      'ArrowFunctionExpression:exit': exitFunction,
      CallExpression(node) {
        const frame = frames.at(-1)
        if (frame && matchIsHookCallee(node.callee)) {
          frame.isCallingHook = true
        }
      }
    }
  }
})
