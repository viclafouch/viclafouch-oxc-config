import { defineRule, type ESTree } from '@oxlint/plugins'
import { matchIsFunction, matchIsViCall } from './helpers/ast'

const TIMER_FUNCTIONS = new Set(['setImmediate', 'setInterval', 'setTimeout'])
const TIMER_PROMISES_MODULES = new Set([
  'node:timers/promises',
  'timers/promises'
])
const FAKE_TIMERS_CALLS = new Set(['useFakeTimers'])

function matchIsPromiseConstructor(
  node: ESTree.Node | null | undefined
): node is ESTree.NewExpression {
  return (
    node?.type === 'NewExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'Promise'
  )
}

function matchIsTimer(node: ESTree.Node | undefined) {
  return node?.type === 'Identifier' && TIMER_FUNCTIONS.has(node.name)
}

function matchIsInsidePromiseExecutor(node: ESTree.Node) {
  for (let current = node.parent; current; current = current.parent) {
    if (matchIsFunction(current)) {
      return (
        matchIsPromiseConstructor(current.parent) &&
        current.parent.arguments[0] === current
      )
    }
  }
  return false
}

export const noRealTimeWaitInTests = defineRule({
  meta: {
    type: 'problem',
    messages: {
      realTimeWait:
        'Wait for no real delay in a test. Await the event with `vi.waitFor`, `expect.poll` or a `findBy*` query, or fake the timers with `vi.useFakeTimers`.'
    },
    schema: []
  },
  createOnce(context) {
    let isFakingTimers = false
    let waits: ESTree.Node[] = []

    function reportWaits() {
      if (isFakingTimers) {
        return
      }
      for (const node of waits) {
        context.report({ node, messageId: 'realTimeWait' })
      }
    }

    return {
      before() {
        isFakingTimers = false
        waits = []
      },
      ImportDeclaration(node) {
        if (!TIMER_PROMISES_MODULES.has(node.source.value)) {
          return
        }
        for (const specifier of node.specifiers) {
          if (
            specifier.type === 'ImportNamespaceSpecifier' ||
            (specifier.type === 'ImportSpecifier' &&
              specifier.imported.type === 'Identifier' &&
              TIMER_FUNCTIONS.has(specifier.imported.name))
          ) {
            waits.push(specifier)
          }
        }
      },
      NewExpression(node) {
        if (
          matchIsPromiseConstructor(node) &&
          matchIsTimer(node.arguments[0])
        ) {
          waits.push(node)
        }
      },
      CallExpression(node) {
        if (matchIsViCall(node, FAKE_TIMERS_CALLS)) {
          isFakingTimers = true
          return
        }
        if (matchIsTimer(node.callee) && matchIsInsidePromiseExecutor(node)) {
          waits.push(node)
        }
      },
      'Program:exit': reportWaits
    }
  }
})
