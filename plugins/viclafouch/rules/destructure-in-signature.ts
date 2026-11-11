import { defineRule } from '@oxlint/plugins'
import { findEnclosingFunction, resolveVariable } from './helpers/ast'

export const destructureInSignature = defineRule({
  meta: {
    type: 'suggestion',
    messages: {
      destructure: 'Destructure the params in the function signature.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      VariableDeclarator(node) {
        const initializer = node.init

        if (
          node.id.type !== 'ObjectPattern' ||
          initializer?.type !== 'Identifier'
        ) {
          return
        }

        const enclosingFunction = findEnclosingFunction(node)

        if (
          enclosingFunction === null ||
          node.parent.parent !== enclosingFunction.body
        ) {
          return
        }

        const isParam = enclosingFunction.params.some((param) => {
          return param.type === 'Identifier' && param.name === initializer.name
        })

        if (!isParam) {
          return
        }

        const variable = resolveVariable(context.sourceCode, initializer)
        const isReadElsewhere =
          variable !== null && variable.references.length > 1

        if (!isReadElsewhere) {
          context.report({ node, messageId: 'destructure' })
        }
      }
    }
  }
})
