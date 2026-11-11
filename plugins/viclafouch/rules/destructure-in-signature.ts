import { defineRule, type ESTree } from '@oxlint/plugins'
import { findEnclosingFunction, resolveVariable } from './helpers/ast'

function matchIsDestructuringInit(identifier: ESTree.Node) {
  const { parent } = identifier
  return (
    parent?.type === 'VariableDeclarator' &&
    parent.init === identifier &&
    parent.id.type === 'ObjectPattern'
  )
}

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
        const isOnlyDestructured =
          variable === null ||
          variable.references.every((reference) => {
            return matchIsDestructuringInit(reference.identifier)
          })

        if (isOnlyDestructured) {
          context.report({ node, messageId: 'destructure' })
        }
      }
    }
  }
})
