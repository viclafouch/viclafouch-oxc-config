import { defineRule, type Context, type ESTree } from '@oxlint/plugins'

type ComponentFunction = ESTree.ArrowFunctionExpression | ESTree.Function

const PASCAL_CASE = /^[A-Z](?=.*[a-z])[A-Za-z0-9]*$/u

function findPropsType(componentFunction: ComponentFunction) {
  const [firstParam, secondParam] = componentFunction.params
  const isThisParam =
    firstParam?.type === 'Identifier' && firstParam.name === 'this'
  const propsParam = isThisParam ? secondParam : firstParam
  if (!propsParam || propsParam.type === 'TSParameterProperty') {
    return null
  }
  const typedParam =
    propsParam.type === 'AssignmentPattern' ? propsParam.left : propsParam
  return typedParam.typeAnnotation?.typeAnnotation ?? null
}

function findFunctionComponentPropsType(annotation: ESTree.TSType | undefined) {
  if (annotation?.type !== 'TSTypeReference') {
    return null
  }
  const name = findTypeName(annotation.typeName)
  if (name !== 'FC' && name !== 'FunctionComponent') {
    return null
  }
  return annotation.typeArguments?.params[0] ?? null
}

function findTypeName(typeName: ESTree.TSTypeName) {
  if (typeName.type === 'TSQualifiedName') {
    return typeName.right.name
  }
  if (typeName.type === 'Identifier') {
    return typeName.name
  }
  return null
}

function checkPropsType(
  context: Context,
  componentName: string,
  propsType: ESTree.TSType | null
) {
  if (!PASCAL_CASE.test(componentName) || !propsType) {
    return
  }
  const expected = `${componentName}Props`
  if (
    propsType.type === 'TSTypeReference' &&
    propsType.typeName.type === 'Identifier' &&
    propsType.typeName.name === expected
  ) {
    return
  }
  context.report({
    node: propsType,
    messageId: 'mismatch',
    data: { component: componentName, expected }
  })
}

function isMemoCall(node: ESTree.CallExpression) {
  const { callee } = node
  if (callee.type === 'Identifier') {
    return callee.name === 'memo'
  }
  return (
    callee.type === 'MemberExpression' &&
    callee.object.type === 'Identifier' &&
    callee.object.name === 'React' &&
    callee.property.type === 'Identifier' &&
    callee.property.name === 'memo'
  )
}

function unwrapAnonymousComponent(init: ESTree.Expression | null) {
  const inner =
    init?.type === 'CallExpression' && isMemoCall(init)
      ? init.arguments[0]
      : init
  if (inner?.type === 'ArrowFunctionExpression') {
    return inner
  }
  if (inner?.type === 'FunctionExpression' && !inner.id) {
    return inner
  }
  return null
}

function checkNamedFunction(context: Context, node: ESTree.Function) {
  if (node.id) {
    checkPropsType(context, node.id.name, findPropsType(node))
  }
}

export const componentPropsName = defineRule({
  meta: {
    type: 'suggestion',
    messages: {
      mismatch: 'Name the props type of `{{component}}` `{{expected}}`.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      VariableDeclarator(node) {
        if (node.id.type !== 'Identifier') {
          return
        }
        const { name, typeAnnotation } = node.id
        checkPropsType(
          context,
          name,
          findFunctionComponentPropsType(typeAnnotation?.typeAnnotation)
        )
        const componentFunction = unwrapAnonymousComponent(node.init)
        if (componentFunction) {
          checkPropsType(context, name, findPropsType(componentFunction))
        }
      },
      FunctionDeclaration(node) {
        checkNamedFunction(context, node)
      },
      FunctionExpression(node) {
        checkNamedFunction(context, node)
      }
    }
  }
})
