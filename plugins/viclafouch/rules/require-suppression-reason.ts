import { defineRule } from '@oxlint/plugins'

export const requireSuppressionReason = defineRule({
  meta: {
    type: 'suggestion',
    messages: {
      missingReason:
        'Say why after the directive: `// oxlint-disable-next-line <rule> -- <reason>`.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      Program() {
        const { directives } = context.sourceCode.getDisableDirectives()
        for (const directive of directives) {
          if (
            directive.type !== 'enable' &&
            directive.justification.trim() === ''
          ) {
            context.report({ node: directive.node, messageId: 'missingReason' })
          }
        }
      }
    }
  }
})
