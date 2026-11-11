import { defineRule } from '@oxlint/plugins'
import { createImportedCallMatcher } from './helpers/imported-call'

const MODULE_SCOPES = new Set(['module', 'global'])

export const noModuleStore = defineRule({
  meta: {
    type: 'problem',
    messages: {
      moduleStore:
        'Create the store inside the React tree, with `createStoreContext` or `useCreateStore`: a store at module scope holds one state for every request that the server renders.'
    },
    schema: []
  },
  createOnce(context) {
    const storeFactory = createImportedCallMatcher({
      sources: new Set(['@tanstack/react-store', '@tanstack/store']),
      importedNames: new Set(['createStore', 'createAtom'])
    })
    return {
      Program() {
        storeFactory.reset()
      },
      ImportDeclaration(node) {
        storeFactory.collect(node)
      },
      CallExpression(node) {
        if (!storeFactory.matchIsImportedCall(node)) {
          return
        }
        const { variableScope } = context.sourceCode.getScope(node)
        if (MODULE_SCOPES.has(variableScope.type)) {
          context.report({ node, messageId: 'moduleStore' })
        }
      }
    }
  }
})
