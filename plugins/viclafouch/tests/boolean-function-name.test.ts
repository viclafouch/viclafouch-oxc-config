import { RuleTester } from 'oxlint/plugins-dev'
import { booleanFunctionName } from '../rules/boolean-function-name'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('boolean-function-name', booleanFunctionName, {
  valid: [
    "const matchIsText = (value: unknown): value is string => { return typeof value === 'string' }",
    "const matchHasName = (value: object): value is { name: string } => { return 'name' in value }",
    "const texts = values.filter((value): value is string => { return typeof value === 'string' })",
    "const checkText = (value: unknown) => { return typeof value === 'string' }"
  ],
  invalid: [
    {
      code: "const isText = (value: unknown): value is string => { return typeof value === 'string' }",
      errors: [{ messageId: 'booleanFunction' }]
    },
    {
      code: "function isText(value: unknown): value is string { return typeof value === 'string' }",
      errors: [{ messageId: 'booleanFunction' }]
    }
  ]
})
