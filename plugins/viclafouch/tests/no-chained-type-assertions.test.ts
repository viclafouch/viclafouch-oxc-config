import { RuleTester } from 'oxlint/plugins-dev'
import { noChainedTypeAssertions } from '../rules/no-chained-type-assertions'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'ts' } }
})

ruleTester.run('no-chained-type-assertions', noChainedTypeAssertions, {
  valid: [
    {
      name: 'a single assertion',
      code: 'const value = input as User'
    },
    {
      name: 'a single parenthesized assertion',
      code: 'const value = (input as User)'
    },
    {
      name: 'a chain of const assertions only',
      code: 'const value = ({ id: 1 } as const) as const'
    }
  ],
  invalid: [
    {
      name: 'an as chain through unknown',
      code: 'const value = input as unknown as User',
      errors: [{ messageId: 'chained' }]
    },
    {
      name: 'a parenthesized as chain',
      code: 'const value = (input as unknown) as User',
      errors: [{ messageId: 'chained' }]
    },
    {
      name: 'an angle-bracket chain',
      code: 'const value = <User>(<unknown>input)',
      errors: [{ messageId: 'chained' }]
    },
    {
      name: 'a const assertion chained into a type',
      code: 'const value = ({ id: 1 } as const) as User',
      errors: [{ messageId: 'chained' }]
    },
    {
      name: 'a chain of three assertions reports once',
      code: 'const value = input as unknown as object as User',
      errors: [{ messageId: 'chained' }]
    }
  ]
})
