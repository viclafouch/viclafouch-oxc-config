import {
  defineRule,
  type ESTree,
  type Scope,
  type Variable
} from '@oxlint/plugins'

type TextRange = [number, number]

type TagRename = { range: TextRange; text: string }

function findVariable(scope: Scope | null, name: string): Variable | null {
  if (!scope) {
    return null
  }
  return scope.set.get(name) ?? findVariable(scope.upper, name)
}

function matchIsTypeCast(
  node: ESTree.Expression
): node is
  | ESTree.TSAsExpression
  | ESTree.TSSatisfiesExpression
  | ESTree.TSNonNullExpression {
  return (
    node.type === 'TSAsExpression' ||
    node.type === 'TSSatisfiesExpression' ||
    node.type === 'TSNonNullExpression'
  )
}

function unwrapTypeCast(node: ESTree.Expression): ESTree.Expression {
  return matchIsTypeCast(node) ? unwrapTypeCast(node.expression) : node
}

function matchIsCreateContextCall(node: ESTree.Expression | null) {
  const call = node ? unwrapTypeCast(node) : null
  if (call?.type !== 'CallExpression') {
    return false
  }
  const { callee } = call
  return (
    (callee.type === 'Identifier' && callee.name === 'createContext') ||
    (callee.type === 'MemberExpression' &&
      callee.property.type === 'Identifier' &&
      callee.property.name === 'createContext')
  )
}

function matchIsCreatedInFile(scope: Scope, name: string) {
  return (
    findVariable(scope, name)?.defs.some((definition) => {
      return (
        definition.node.type === 'VariableDeclarator' &&
        matchIsCreateContextCall(definition.node.init)
      )
    }) ?? false
  )
}

function matchIsContext(
  scope: Scope,
  object: ESTree.JSXMemberExpression['object']
) {
  if (object.type === 'JSXIdentifier') {
    return (
      object.name.endsWith('Context') ||
      matchIsCreatedInFile(scope, object.name)
    )
  }
  return object.property.name.endsWith('Context')
}

function matchIsContextProvider(
  scope: Scope,
  name: ESTree.JSXElementName
): name is ESTree.JSXMemberExpression {
  return (
    name.type === 'JSXMemberExpression' &&
    name.property.name === 'Provider' &&
    matchIsContext(scope, name.object)
  )
}

function renameWithin(
  sourceText: string,
  [start, end]: TextRange,
  renames: TagRename[]
) {
  return renames
    .filter(({ range }) => {
      return range[0] >= start && range[1] <= end
    })
    .toSorted((left, right) => {
      return right.range[0] - left.range[0]
    })
    .reduce(
      (text, { range, text: name }) => {
        return (
          text.slice(0, range[0] - start) + name + text.slice(range[1] - start)
        )
      },
      sourceText.slice(start, end)
    )
}

export const noContextProvider = defineRule({
  meta: {
    type: 'suggestion',
    fixable: 'code',
    messages: {
      contextProvider:
        'Render the context as `<{{context}}>`, not `<{{context}}.Provider>`: React 19 renders a context as its own provider.'
    },
    schema: []
  },
  createOnce(context) {
    let renames: TagRename[] = []
    return {
      Program() {
        renames = []
      },
      'JSXElement:exit': function reportContextProvider(node) {
        const { openingElement, closingElement } = node
        const { name } = openingElement
        if (!matchIsContextProvider(context.sourceCode.getScope(node), name)) {
          return
        }
        const contextName = context.sourceCode.getText(name.object)
        const lastTagName = closingElement?.name ?? name
        renames.push(
          { range: name.range, text: contextName },
          ...(closingElement
            ? [{ range: closingElement.name.range, text: contextName }]
            : [])
        )
        const range: TextRange = [name.range[0], lastTagName.range[1]]
        context.report({
          node: openingElement,
          messageId: 'contextProvider',
          data: { context: contextName },
          fix: (fixer) => {
            return fixer.replaceTextRange(
              range,
              renameWithin(context.sourceCode.text, range, renames)
            )
          }
        })
      }
    }
  }
})
