import { defineRule, type ESTree } from '@oxlint/plugins'
import { getPropertyName, matchIsViCall } from './helpers/ast'
import { createClockReport } from './helpers/clock-report'

const WALL_CLOCK_CALLS = new Set([
  'Date.now',
  'performance.now',
  'process.hrtime',
  'process.hrtime.bigint'
])
const FAKE_CLOCK_CALLS = new Set(['setSystemTime', 'useFakeTimers'])
const VI_MOCKING_CALLS = new Set(['fn', 'mock', 'setSystemTime', 'spyOn'])
const MOCK_METHODS = new Set([
  'mockImplementation',
  'mockImplementationOnce',
  'mockResolvedValue',
  'mockResolvedValueOnce',
  'mockReturnValue',
  'mockReturnValueOnce'
])

function getMemberPath(node: ESTree.Node): string | null {
  if (node.type === 'Identifier') {
    return node.name
  }
  if (node.type !== 'MemberExpression') {
    return null
  }
  const object = getMemberPath(node.object)
  const property = getPropertyName(node)
  return object === null || property === null ? null : `${object}.${property}`
}

function matchIsMockingCall(node: ESTree.CallExpression) {
  if (matchIsViCall(node, VI_MOCKING_CALLS)) {
    return true
  }
  const { callee } = node
  if (callee.type !== 'MemberExpression') {
    return false
  }
  const name = getPropertyName(callee)
  return name !== null && MOCK_METHODS.has(name)
}

function matchIsMockArgument(node: ESTree.Node) {
  let child = node
  for (let current = node.parent; current; current = current.parent) {
    if (
      current.type === 'CallExpression' &&
      current.callee !== child &&
      matchIsMockingCall(current)
    ) {
      return true
    }
    child = current
  }
  return false
}

export const noWallClockInTests = defineRule({
  meta: {
    type: 'problem',
    messages: {
      wallClock:
        'Read no real clock in a test: the result follows the date and the load of the runner. Fix the time with `vi.setSystemTime`, or use a fixed date.'
    },
    schema: []
  },
  createOnce(context) {
    const readings = createClockReport(context, 'wallClock')

    function collect(node: ESTree.Node) {
      if (!matchIsMockArgument(node)) {
        readings.collect(node)
      }
    }

    return {
      before() {
        readings.reset()
      },
      CallExpression(node) {
        if (matchIsViCall(node, FAKE_CLOCK_CALLS)) {
          readings.markClockFaked()
          return
        }
        const path = getMemberPath(node.callee)
        if (path !== null && WALL_CLOCK_CALLS.has(path)) {
          collect(node)
        }
      },
      NewExpression(node) {
        if (
          node.arguments.length === 0 &&
          node.callee.type === 'Identifier' &&
          node.callee.name === 'Date'
        ) {
          collect(node)
        }
      },
      'Program:exit': readings.report
    }
  }
})
