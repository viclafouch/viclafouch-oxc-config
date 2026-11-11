import { defineRule, type ESTree, type SourceCode } from '@oxlint/plugins'
import { resolveVariable } from './helpers/ast'
import { createImportedCallMatcher } from './helpers/imported-call'

function toFunctionWithBody(node: ESTree.Node) {
  if (node.type === 'ArrowFunctionExpression') {
    return node
  }
  const isFunction =
    node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration'
  return isFunction && node.body ? node : null
}

function resolveLocalFunction(sourceCode: SourceCode, node: ESTree.Expression) {
  if (node.type !== 'Identifier') {
    return toFunctionWithBody(node)
  }
  const definitions = resolveVariable(sourceCode, node)?.defs ?? []
  const [definition] = definitions
  if (definitions.length !== 1 || !definition) {
    return null
  }
  if (definition.node.type === 'FunctionDeclaration') {
    return toFunctionWithBody(definition.node)
  }
  const isConstant =
    definition.parent?.type === 'VariableDeclaration' &&
    definition.parent.kind === 'const'
  const init =
    definition.node.type === 'VariableDeclarator' ? definition.node.init : null
  return isConstant && init ? toFunctionWithBody(init) : null
}

function matchIsReadingArguments(
  sourceCode: SourceCode,
  subscribe: ESTree.ArrowFunctionExpression | ESTree.Function
) {
  if (subscribe.type === 'ArrowFunctionExpression') {
    return false
  }
  const variable = sourceCode.getScope(subscribe).set.get('arguments')
  return (variable?.references.length ?? 0) > 0
}

function matchIsIgnoringListener(
  sourceCode: SourceCode,
  subscribe: ESTree.ArrowFunctionExpression | ESTree.Function
) {
  const listener = subscribe.params.find((param) => {
    return param.type !== 'Identifier' || param.name !== 'this'
  })
  if (!listener) {
    return !matchIsReadingArguments(sourceCode, subscribe)
  }
  if (listener.type !== 'Identifier') {
    return false
  }
  const variable = sourceCode
    .getDeclaredVariables(subscribe)
    .find(({ name }) => {
      return name === listener.name
    })
  return variable?.references.length === 0
}

export const noNoopSubscribe = defineRule({
  meta: {
    type: 'problem',
    messages: {
      noopSubscribe:
        'In `subscribe`, register the listener of `useSyncExternalStore` on a store that changes. To read a browser value that never changes, render the component in the browser with `use(browser())` of `react-dom`.'
    },
    schema: []
  },
  createOnce(context) {
    const syncExternalStore = createImportedCallMatcher({
      sources: new Set(['react']),
      importedNames: new Set(['useSyncExternalStore'])
    })
    return {
      Program() {
        syncExternalStore.reset()
      },
      ImportDeclaration(node) {
        syncExternalStore.collect(node)
      },
      CallExpression(node) {
        const [argument] = node.arguments
        if (
          !argument ||
          argument.type === 'SpreadElement' ||
          !syncExternalStore.matchIsImportedCall(node)
        ) {
          return
        }
        const subscribe = resolveLocalFunction(context.sourceCode, argument)
        if (
          subscribe &&
          matchIsIgnoringListener(context.sourceCode, subscribe)
        ) {
          context.report({ node: argument, messageId: 'noopSubscribe' })
        }
      }
    }
  }
})
