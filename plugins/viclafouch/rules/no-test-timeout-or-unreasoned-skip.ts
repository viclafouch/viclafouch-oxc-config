import { defineRule, type ESTree } from '@oxlint/plugins'
import { getPropertyName, matchIsFunction, matchIsViCall } from './helpers/ast'

const TICKET_REFERENCE = /[A-Z][A-Z0-9]+-\d+|#\d+|https?:\/\/\S+/u

const TEST_FUNCTIONS = new Set(['describe', 'it', 'suite', 'test'])
const HOOK_FUNCTIONS = new Set([
  'afterAll',
  'afterEach',
  'beforeAll',
  'beforeEach'
])
const OVERRIDE_OPTIONS = new Set(['retry', 'timeout'])
const CONFIG_OVERRIDE_OPTIONS = new Set(['hookTimeout', 'retry', 'testTimeout'])
const SET_CONFIG = new Set(['setConfig'])
const QUARANTINE = new RegExp(
  String.raw`quarantine:\s*(?:${TICKET_REFERENCE.source})`,
  'u'
)

function findChainRoot(node: ESTree.Node): string | null {
  if (node.type === 'Identifier') {
    return node.name
  }
  if (node.type === 'MemberExpression') {
    return findChainRoot(node.object)
  }
  if (node.type === 'CallExpression') {
    return findChainRoot(node.callee)
  }
  return null
}

function matchIsTestChain(node: ESTree.Node) {
  const root = findChainRoot(node)
  return root !== null && TEST_FUNCTIONS.has(root)
}

function getOptionKeys(node: ESTree.ObjectExpression) {
  return node.properties.flatMap((property) => {
    if (property.type !== 'Property') {
      return []
    }
    const { key } = property
    if (key.type === 'Identifier') {
      return [{ name: key.name, value: property.value }]
    }
    if (key.type === 'Literal' && typeof key.value === 'string') {
      return [{ name: key.value, value: property.value }]
    }
    return []
  })
}

function matchIsSettingOption(node: ESTree.Node, names: ReadonlySet<string>) {
  return (
    node.type === 'ObjectExpression' &&
    getOptionKeys(node).some(({ name }) => {
      return names.has(name)
    })
  )
}

function matchIsSkippingByOption(node: ESTree.Node) {
  return (
    node.type === 'ObjectExpression' &&
    getOptionKeys(node).some(({ name, value }) => {
      return name === 'skip' && value.type === 'Literal' && value.value === true
    })
  )
}

function matchIsTestOverride([, options, timeout]: ESTree.Argument[]) {
  if (options?.type === 'ObjectExpression') {
    return matchIsSettingOption(options, OVERRIDE_OPTIONS)
  }
  if (timeout?.type === 'ObjectExpression') {
    return matchIsSettingOption(timeout, OVERRIDE_OPTIONS)
  }
  return timeout !== undefined && !matchIsFunction(timeout)
}

function findEnclosingStatement(node: ESTree.Node) {
  let current = node
  while (current.parent && !/(?:Statement|Declaration)$/u.test(current.type)) {
    current = current.parent
  }
  return current
}

export const noTestTimeoutOrUnreasonedSkip = defineRule({
  meta: {
    type: 'problem',
    messages: {
      override:
        'Remove the per-test timeout or retry: the Vitest config sets the ceiling. Await the event that the test waits for.',
      unreasonedSkip:
        'Give the skipped test its ticket in a comment above it: `// quarantine: ABC-123 <why>`.'
    },
    schema: []
  },
  createOnce(context) {
    function reportUnlessQuarantined(node: ESTree.Node) {
      const comments = context.sourceCode.getCommentsBefore(
        findEnclosingStatement(node)
      )
      if (
        !comments.some((comment) => {
          return QUARANTINE.test(comment.value)
        })
      ) {
        context.report({ node, messageId: 'unreasonedSkip' })
      }
    }

    return {
      CallExpression(node) {
        const { callee } = node
        if (matchIsViCall(node, SET_CONFIG)) {
          const [options] = node.arguments
          if (
            options &&
            matchIsSettingOption(options, CONFIG_OVERRIDE_OPTIONS)
          ) {
            context.report({ node, messageId: 'override' })
          }
          return
        }
        if (callee.type === 'Identifier' && HOOK_FUNCTIONS.has(callee.name)) {
          if (node.arguments.length > 1) {
            context.report({ node, messageId: 'override' })
          }
          return
        }
        if (!matchIsTestChain(callee) || node.arguments.length < 2) {
          return
        }
        if (matchIsTestOverride(node.arguments)) {
          context.report({ node, messageId: 'override' })
        }
        if (node.arguments.slice(1).some(matchIsSkippingByOption)) {
          reportUnlessQuarantined(node)
        }
      },
      MemberExpression(node) {
        if (getPropertyName(node) === 'skip' && matchIsTestChain(node.object)) {
          reportUnlessQuarantined(node)
        }
      }
    }
  }
})
