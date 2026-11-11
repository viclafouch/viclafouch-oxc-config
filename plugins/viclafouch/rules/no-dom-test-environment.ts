import { defineRule, type Context, type ESTree } from '@oxlint/plugins'

const DOM_EMULATOR = /^(?:jsdom|happy-dom)(?:\/|$)/u
const ENVIRONMENT_PRAGMA = '@vitest-environment'

function getSourceValue(node: ESTree.Node | null | undefined) {
  if (node?.type === 'Literal' && typeof node.value === 'string') {
    return node.value
  }
  if (node?.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0]?.value.cooked ?? null
  }
  return null
}

function reportDomEmulator(
  context: Context,
  source: ESTree.Node | null | undefined
) {
  const value = getSourceValue(source)
  if (source && value !== null && DOM_EMULATOR.test(value)) {
    context.report({ node: source, messageId: 'domEnvironment' })
  }
}

export const noDomTestEnvironment = defineRule({
  meta: {
    type: 'problem',
    messages: {
      domEnvironment:
        'Pick the test environment in the `projects` of the Vitest config, not in the test file. A DOM test runs in Vitest browser mode as a `*.browser.test.{ts,tsx}` file.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          if (comment.value.includes(ENVIRONMENT_PRAGMA)) {
            context.report({ node: comment, messageId: 'domEnvironment' })
          }
        }
      },
      ImportDeclaration(node) {
        reportDomEmulator(context, node.source)
      },
      ImportExpression(node) {
        reportDomEmulator(context, node.source)
      },
      ExportNamedDeclaration(node) {
        reportDomEmulator(context, node.source)
      },
      ExportAllDeclaration(node) {
        reportDomEmulator(context, node.source)
      },
      TSExternalModuleReference(node) {
        reportDomEmulator(context, node.expression)
      },
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require'
        ) {
          reportDomEmulator(context, node.arguments[0])
        }
      }
    }
  }
})
