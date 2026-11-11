import { defineRule } from '@oxlint/plugins'

const ENV_FILE = /[/\\]src[/\\]env\.ts$/u

export const envFile = defineRule({
  meta: {
    type: 'suggestion',
    messages: {
      envFile:
        'Read `import.meta.env` in `src/env.ts` only, and import the parsed value from there: one schema checks every variable of the client.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      MemberExpression(node) {
        const { object, property } = node
        if (
          object.type === 'MetaProperty' &&
          object.meta.name === 'import' &&
          object.property.name === 'meta' &&
          property.type === 'Identifier' &&
          property.name === 'env' &&
          !ENV_FILE.test(context.filename)
        ) {
          context.report({ node, messageId: 'envFile' })
        }
      }
    }
  }
})
