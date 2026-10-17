import {
  defineRule,
  type ESTree,
  type Scope,
  type SourceCode,
  type Variable
} from '@oxlint/plugins'
import { createTypeBindings } from './helpers/type-bindings'
import {
  classifyWideningTarget,
  collectTopLevelInterfaces,
  matchIsInformativeType,
  matchIsKnownEvidence,
  unwrapExpression,
  type TypeEnvironment,
  type WideningTarget
} from './helpers/widening-target'

type FunctionNode = ESTree.ArrowFunctionExpression | ESTree.Function

const FUNCTION_TYPES = new Set([
  'ArrowFunctionExpression',
  'FunctionDeclaration',
  'FunctionExpression',
  'TSDeclareFunction',
  'TSEmptyBodyFunctionExpression'
])

const ACCUMULATOR_TARGETS = new Set<WideningTarget>([
  'open dictionary',
  'generic container'
])

function matchIsFunction(node: ESTree.Node): node is FunctionNode {
  return FUNCTION_TYPES.has(node.type)
}

function resolveVariable(
  sourceCode: SourceCode,
  identifier: ESTree.IdentifierReference
) {
  let scope: Scope | null = sourceCode.getScope(identifier)
  while (scope) {
    const variable = scope.set.get(identifier.name)
    if (variable) {
      return variable
    }
    scope = scope.upper
  }
  return null
}

function findDeclarator(variable: Variable) {
  const [definition] = variable.defs
  return variable.defs.length === 1 &&
    definition?.type === 'Variable' &&
    definition.node.type === 'VariableDeclarator'
    ? definition.node
    : null
}

function findStableInitializer(variable: Variable) {
  const declarator = findDeclarator(variable)
  const isStable =
    declarator?.parent.type === 'VariableDeclaration' &&
    declarator.parent.kind === 'const' &&
    variable.references.every((reference) => {
      return reference.init || !reference.isWrite()
    })
  return isStable ? declarator.init : null
}

function getParameterAnnotation(
  parameter: ESTree.ParamPattern
): ESTree.TSTypeAnnotation | null | undefined {
  if (parameter.type === 'TSParameterProperty') {
    return getParameterAnnotation(parameter.parameter)
  }
  if (parameter.type === 'RestElement') {
    return (
      parameter.typeAnnotation ?? getParameterAnnotation(parameter.argument)
    )
  }
  if (parameter.type === 'AssignmentPattern') {
    return parameter.typeAnnotation ?? getParameterAnnotation(parameter.left)
  }
  return parameter.typeAnnotation
}

function getParameterName(
  parameter: ESTree.ParamPattern,
  sourceCode: SourceCode
): string {
  if (parameter.type === 'TSParameterProperty') {
    return getParameterName(parameter.parameter, sourceCode)
  }
  if (parameter.type === 'AssignmentPattern') {
    return getParameterName(parameter.left, sourceCode)
  }
  if (parameter.type === 'RestElement') {
    return getParameterName(parameter.argument, sourceCode)
  }
  if (parameter.type === 'Identifier') {
    return parameter.name
  }
  const text = sourceCode.getText(parameter)
  return parameter.typeAnnotation
    ? text.slice(0, parameter.typeAnnotation.start - parameter.start).trimEnd()
    : text
}

function matchIsUnknownType(type: ESTree.TSType): boolean {
  if (type.type === 'TSParenthesizedType') {
    return matchIsUnknownType(type.typeAnnotation)
  }
  if (type.type === 'TSUnionType') {
    return type.types.some(matchIsUnknownType)
  }
  return type.type === 'TSUnknownKeyword'
}

function findLocalFunction(sourceCode: SourceCode, callee: ESTree.Expression) {
  const unwrapped = unwrapExpression(callee)
  if (matchIsFunction(unwrapped)) {
    return unwrapped
  }
  const variable =
    unwrapped.type === 'Identifier'
      ? resolveVariable(sourceCode, unwrapped)
      : null
  const [definition] = variable?.defs ?? []
  if (variable?.defs.length !== 1 || definition === undefined) {
    return null
  }
  if (definition.type === 'FunctionName' && matchIsFunction(definition.node)) {
    return definition.node
  }
  const initializer =
    definition.type === 'Variable' &&
    definition.node.type === 'VariableDeclarator' &&
    definition.node.init
      ? unwrapExpression(definition.node.init)
      : null
  return initializer && matchIsFunction(initializer) ? initializer : null
}

function findVariableAnnotation(sourceCode: SourceCode, variable: Variable) {
  const [definition] = variable.defs
  if (variable.defs.length !== 1 || !definition) {
    return null
  }
  if (
    definition.type === 'Variable' &&
    definition.node.type === 'VariableDeclarator' &&
    definition.node.id.type === 'Identifier'
  ) {
    return definition.node.id.typeAnnotation ?? null
  }
  if (definition.type !== 'Parameter' || !matchIsFunction(definition.node)) {
    return null
  }
  const parameter = definition.node.params.find((candidate) => {
    return getParameterName(candidate, sourceCode) === variable.name
  })
  return parameter ? (getParameterAnnotation(parameter) ?? null) : null
}

function findPredicateSubjectIndex(
  sourceCode: SourceCode,
  owner: FunctionNode
) {
  const predicate = owner.returnType?.typeAnnotation
  if (
    predicate?.type !== 'TSTypePredicate' ||
    predicate.parameterName.type !== 'Identifier'
  ) {
    return null
  }
  const subjectName = predicate.parameterName.name
  const index = owner.params.findIndex((parameter) => {
    return getParameterName(parameter, sourceCode) === subjectName
  })
  return index === -1 ? null : index
}

function findEnclosingFunction(node: ESTree.Node) {
  let current: ESTree.Node | null = node.parent
  while (current && current.type !== 'Program') {
    if (
      current.type === 'ArrowFunctionExpression' ||
      current.type === 'FunctionDeclaration' ||
      current.type === 'FunctionExpression'
    ) {
      return current
    }
    current = current.parent
  }
  return null
}

function getKeyName(sourceCode: SourceCode, key: ESTree.PropertyKey) {
  if (key.type === 'Identifier' || key.type === 'PrivateIdentifier') {
    return key.name
  }
  return key.type === 'Literal' ? String(key.value) : sourceCode.getText(key)
}

function getFunctionName(sourceCode: SourceCode, owner: FunctionNode | null) {
  if (owner?.id) {
    return owner.id.name
  }
  const parent = owner?.parent
  if (
    parent?.type === 'VariableDeclarator' &&
    parent.id.type === 'Identifier'
  ) {
    return parent.id.name
  }
  if (parent?.type === 'MethodDefinition') {
    return getKeyName(sourceCode, parent.key)
  }
  return 'anonymous function'
}

function matchIsEmptyObject(expression: ESTree.Expression) {
  const unwrapped = unwrapExpression(expression)
  return (
    unwrapped.type === 'ObjectExpression' && unwrapped.properties.length === 0
  )
}

function matchIsInsideAssertion(node: ESTree.Node) {
  return (
    node.parent?.type === 'TSAsExpression' ||
    node.parent?.type === 'TSTypeAssertion'
  )
}

export const noKnownValueWidening = defineRule({
  meta: {
    type: 'problem',
    messages: {
      widening:
        'Let TypeScript infer {{subject}}, check it with `satisfies`, or name its type: the {{target}} type throws away what TypeScript knows.'
    },
    schema: []
  },
  createOnce(context) {
    const typeBindings = createTypeBindings()
    const pendingChecks: ((environment: TypeEnvironment) => void)[] = []

    const defer = (check: (environment: TypeEnvironment) => void) => {
      pendingChecks.push(check)
    }

    const matchIsKnownValue = (
      expression: ESTree.Expression,
      visited: ReadonlySet<Variable> = new Set()
    ): boolean => {
      if (matchIsKnownEvidence(expression)) {
        return true
      }
      const unwrapped = unwrapExpression(expression)
      const variable =
        unwrapped.type === 'Identifier'
          ? resolveVariable(context.sourceCode, unwrapped)
          : null
      if (!variable || visited.has(variable)) {
        return false
      }
      const initializer = findStableInitializer(variable)
      return (
        initializer !== null &&
        matchIsKnownValue(initializer, new Set([...visited, variable]))
      )
    }

    const matchIsKnownArgument = (
      expression: ESTree.Expression,
      environment: TypeEnvironment,
      visited: ReadonlySet<Variable> = new Set()
    ): boolean => {
      if (
        expression.type === 'ParenthesizedExpression' ||
        expression.type === 'TSNonNullExpression' ||
        expression.type === 'TSSatisfiesExpression'
      ) {
        return matchIsKnownArgument(expression.expression, environment, visited)
      }
      if (
        expression.type === 'TSAsExpression' ||
        expression.type === 'TSTypeAssertion'
      ) {
        return matchIsInformativeType(expression.typeAnnotation, environment)
      }
      if (expression.type === 'CallExpression') {
        const returnType = findLocalFunction(
          context.sourceCode,
          expression.callee
        )?.returnType?.typeAnnotation
        return (
          returnType !== undefined &&
          matchIsInformativeType(returnType, environment)
        )
      }
      if (expression.type !== 'Identifier') {
        return matchIsKnownEvidence(expression)
      }
      const variable = resolveVariable(context.sourceCode, expression)
      if (!variable || visited.has(variable)) {
        return false
      }
      const annotation = findVariableAnnotation(context.sourceCode, variable)
      if (annotation) {
        return matchIsInformativeType(annotation.typeAnnotation, environment)
      }
      const initializer = findStableInitializer(variable)
      return (
        initializer !== null &&
        matchIsKnownArgument(
          initializer,
          environment,
          new Set([...visited, variable])
        )
      )
    }

    const reportWidening = (
      expression: ESTree.Expression,
      target: WideningTarget | null,
      subject: string
    ) => {
      if (
        target === null ||
        (ACCUMULATOR_TARGETS.has(target) && matchIsEmptyObject(expression)) ||
        !matchIsKnownValue(expression)
      ) {
        return
      }
      context.report({
        node: expression,
        messageId: 'widening',
        data: { subject, target }
      })
    }

    const checkAnnotatedFlow = (
      expression: ESTree.Expression,
      annotation: ESTree.TSTypeAnnotation | null | undefined,
      subject: string
    ) => {
      if (annotation) {
        defer((environment) => {
          reportWidening(
            expression,
            classifyWideningTarget(annotation.typeAnnotation, environment),
            subject
          )
        })
      }
    }

    const checkAssertion = (
      node: ESTree.TSAsExpression | ESTree.TSTypeAssertion
    ) => {
      if (!matchIsInsideAssertion(node)) {
        defer((environment) => {
          reportWidening(
            node.expression,
            classifyWideningTarget(node.typeAnnotation, environment),
            'the asserted value'
          )
        })
      }
    }

    const runPendingChecks = (program: ESTree.Program) => {
      const environment = {
        interfaces: collectTopLevelInterfaces(program),
        typeBindings
      }
      for (const check of pendingChecks) {
        check(environment)
      }
    }

    return {
      ...typeBindings.visitor,
      before() {
        typeBindings.reset()
        pendingChecks.splice(0)
      },
      VariableDeclarator(node) {
        if (node.init && node.id.type === 'Identifier') {
          checkAnnotatedFlow(
            node.init,
            node.id.typeAnnotation,
            `the binding \`${node.id.name}\``
          )
        }
      },
      PropertyDefinition(node) {
        if (node.value) {
          checkAnnotatedFlow(
            node.value,
            node.typeAnnotation,
            `the property \`${getKeyName(context.sourceCode, node.key)}\``
          )
        }
      },
      AccessorProperty(node) {
        if (node.value) {
          checkAnnotatedFlow(
            node.value,
            node.typeAnnotation,
            `the property \`${getKeyName(context.sourceCode, node.key)}\``
          )
        }
      },
      AssignmentExpression(node) {
        if (node.operator !== '=' || node.left.type !== 'Identifier') {
          return
        }
        const variable = resolveVariable(context.sourceCode, node.left)
        const declarator = variable ? findDeclarator(variable) : null
        if (declarator?.id.type === 'Identifier') {
          checkAnnotatedFlow(
            node.right,
            declarator.id.typeAnnotation,
            `the binding \`${declarator.id.name}\``
          )
        }
      },
      CallExpression(node) {
        const owner = findLocalFunction(context.sourceCode, node.callee)
        const index = owner
          ? findPredicateSubjectIndex(context.sourceCode, owner)
          : null
        const parameter = index === null ? undefined : owner?.params[index]
        const argument = index === null ? undefined : node.arguments[index]
        const annotation = parameter ? getParameterAnnotation(parameter) : null
        if (
          !owner ||
          !parameter ||
          !argument ||
          argument.type === 'SpreadElement' ||
          !annotation ||
          !matchIsUnknownType(annotation.typeAnnotation)
        ) {
          return
        }
        defer((environment) => {
          if (matchIsKnownArgument(argument, environment)) {
            context.report({
              node: argument,
              messageId: 'widening',
              data: {
                subject: `the argument \`${getParameterName(parameter, context.sourceCode)}\` of \`${getFunctionName(context.sourceCode, owner)}\``,
                target: 'unknown'
              }
            })
          }
        })
      },
      ReturnStatement(node) {
        const owner = findEnclosingFunction(node)
        if (node.argument) {
          checkAnnotatedFlow(
            node.argument,
            owner?.returnType,
            `the return value of \`${getFunctionName(context.sourceCode, owner)}\``
          )
        }
      },
      ArrowFunctionExpression(node) {
        if (node.body.type !== 'BlockStatement') {
          checkAnnotatedFlow(
            node.body,
            node.returnType,
            `the return value of \`${getFunctionName(context.sourceCode, node)}\``
          )
        }
      },
      TSAsExpression: checkAssertion,
      TSTypeAssertion: checkAssertion,
      'Program:exit': runPendingChecks
    }
  }
})
