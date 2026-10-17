import { defineRule, type ESTree } from '@oxlint/plugins'
import {
  createTypeBindings,
  getTypeReferenceName,
  type TypeMatcher
} from './helpers/type-bindings'

type FunctionWithReturnType =
  | ESTree.ArrowFunctionExpression
  | ESTree.Function
  | ESTree.TSCallSignatureDeclaration
  | ESTree.TSConstructSignatureDeclaration
  | ESTree.TSConstructorType
  | ESTree.TSFunctionType
  | ESTree.TSMethodSignature

const PROMISE_NAMES = new Set(['Promise', 'PromiseLike'])

const matchIsUnknown: TypeMatcher = (type, matches) => {
  if (type.type === 'TSUnknownKeyword') {
    return true
  }
  if (type.type === 'TSParenthesizedType') {
    return matches(type.typeAnnotation)
  }
  if (type.type === 'TSUnionType') {
    return type.types.some(matches)
  }
  if (type.type !== 'TSTypeReference') {
    return false
  }
  const name = getTypeReferenceName(type)
  const value = type.typeArguments?.params[0]
  return (
    name !== null &&
    PROMISE_NAMES.has(name) &&
    value !== undefined &&
    matches(value)
  )
}

export const noUnknownReturns = defineRule({
  meta: {
    type: 'problem',
    messages: {
      unknownReturn:
        'Return a named type, parsed at its boundary: `unknown` leaves the caller with nothing to read.'
    },
    schema: []
  },
  createOnce(context) {
    const typeBindings = createTypeBindings()
    const returnTypes: ESTree.TSType[] = []

    const collectReturnType = (node: FunctionWithReturnType) => {
      if (node.returnType) {
        returnTypes.push(node.returnType.typeAnnotation)
      }
    }

    const reportUnknownReturns = () => {
      for (const returnType of returnTypes) {
        if (typeBindings.matchResolvedType(returnType, matchIsUnknown)) {
          context.report({ node: returnType, messageId: 'unknownReturn' })
        }
      }
    }

    return {
      ...typeBindings.visitor,
      before() {
        typeBindings.reset()
        returnTypes.splice(0)
      },
      ArrowFunctionExpression: collectReturnType,
      FunctionDeclaration: collectReturnType,
      FunctionExpression: collectReturnType,
      TSCallSignatureDeclaration: collectReturnType,
      TSConstructSignatureDeclaration: collectReturnType,
      TSConstructorType: collectReturnType,
      TSDeclareFunction: collectReturnType,
      TSEmptyBodyFunctionExpression: collectReturnType,
      TSFunctionType: collectReturnType,
      TSMethodSignature: collectReturnType,
      'Program:exit': reportUnknownReturns
    }
  }
})
