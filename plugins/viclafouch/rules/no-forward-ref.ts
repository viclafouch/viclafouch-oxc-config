import { defineRule, type Context, type ESTree } from '@oxlint/plugins'

function matchIsForwardRefName(node: ESTree.ModuleExportName) {
  return node.type === 'Identifier' && node.name === 'forwardRef'
}

function matchIsForwardRefKey(key: ESTree.Node, computed: boolean) {
  return (
    (key.type === 'Literal' && key.value === 'forwardRef') ||
    (!computed && key.type === 'Identifier' && key.name === 'forwardRef')
  )
}

function findForwardRefRead(identifier: ESTree.Node) {
  const { parent } = identifier
  if (
    parent?.type === 'MemberExpression' &&
    parent.object === identifier &&
    matchIsForwardRefKey(parent.property, parent.computed)
  ) {
    return parent
  }
  if (
    parent?.type === 'VariableDeclarator' &&
    parent.init === identifier &&
    parent.id.type === 'ObjectPattern'
  ) {
    return (
      parent.id.properties.find((property) => {
        return (
          property.type === 'Property' &&
          matchIsForwardRefKey(property.key, property.computed)
        )
      }) ?? null
    )
  }
  return null
}

function reportForwardRefReads(
  context: Context,
  specifier: ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier
) {
  for (const variable of context.sourceCode.getDeclaredVariables(specifier)) {
    for (const { identifier } of variable.references) {
      const read = findForwardRefRead(identifier)
      if (read) {
        context.report({ node: read, messageId: 'forwardRef' })
      }
    }
  }
}

export const noForwardRef = defineRule({
  meta: {
    type: 'suggestion',
    messages: {
      forwardRef:
        'Pass `ref` as a prop, not through `forwardRef`: React 19 gives a function component its `ref` as a regular prop.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react' || node.importKind === 'type') {
          return
        }
        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportSpecifier') {
            if (
              specifier.importKind !== 'type' &&
              matchIsForwardRefName(specifier.imported)
            ) {
              context.report({ node: specifier, messageId: 'forwardRef' })
            }
          } else {
            reportForwardRefReads(context, specifier)
          }
        }
      },
      ExportNamedDeclaration(node) {
        if (node.source?.value !== 'react' || node.exportKind === 'type') {
          return
        }
        for (const specifier of node.specifiers) {
          if (
            specifier.exportKind !== 'type' &&
            matchIsForwardRefName(specifier.local)
          ) {
            context.report({ node: specifier, messageId: 'forwardRef' })
          }
        }
      }
    }
  }
})
