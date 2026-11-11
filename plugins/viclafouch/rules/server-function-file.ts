import { defineRule } from '@oxlint/plugins'
import { createImportedCallMatcher } from './helpers/imported-call'

const SERVER_FUNCTIONS_FILE =
  /[/\\]-?server[/\\](?:.+[/\\])?[^/\\]+\.functions\.ts$/u

export const serverFunctionFile = defineRule({
  meta: {
    type: 'problem',
    messages: {
      serverFunctionFile:
        'Declare `createServerFn` in a `*.functions.ts` file of a `server/` or `-server/` folder: the client imports it safely. Keep the code that only the server runs in a `*.server.ts` file, and call it from the handler.'
    },
    schema: []
  },
  createOnce(context) {
    const serverFunctionFactory = createImportedCallMatcher({
      sources: new Set(['@tanstack/react-start']),
      importedNames: new Set(['createServerFn'])
    })
    return {
      Program() {
        serverFunctionFactory.reset()
      },
      ImportDeclaration(node) {
        serverFunctionFactory.collect(node)
      },
      CallExpression(node) {
        if (
          serverFunctionFactory.matchIsImportedCall(node) &&
          !SERVER_FUNCTIONS_FILE.test(context.filename)
        ) {
          context.report({ node, messageId: 'serverFunctionFile' })
        }
      }
    }
  }
})
