import { defineRule, type ESTree } from '@oxlint/plugins'
import { findEnclosingFunction, matchIsViCall } from './helpers/ast'
import { createClockReport } from './helpers/clock-report'

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
  const executor = findEnclosingFunction(node)
  return (
    executor !== null &&
    matchIsPromiseConstructor(executor.parent) &&
    executor.parent.arguments[0] === executor
  )
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
    const waits = createClockReport(context, 'realTimeWait')

    return {
      before() {
        waits.reset()
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
            waits.collect(specifier)
          }
        }
      },
      NewExpression(node) {
        if (
          matchIsPromiseConstructor(node) &&
          matchIsTimer(node.arguments[0])
        ) {
          waits.collect(node)
        }
      },
      CallExpression(node) {
        if (matchIsViCall(node, FAKE_TIMERS_CALLS)) {
          waits.markClockFaked()
          return
        }
        if (matchIsTimer(node.callee) && matchIsInsidePromiseExecutor(node)) {
          waits.collect(node)
        }
      },
      'Program:exit': waits.report
    }
  }
})
