import { RuleTester } from 'oxlint/plugins-dev'
import { optionalLast } from '../rules/optional-last'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('optional-last', optionalLast, {
  valid: [
    'type ButtonProps = { label: string; isActive?: boolean }',
    'type Settings = { isActive?: boolean; label: string }'
  ],
  invalid: [
    {
      code: 'type ButtonProps = { isActive?: boolean; label: string }',
      errors: [{ messageId: 'optional' }]
    },
    {
      code: 'type SendParams = { cc?: string; to: string }',
      errors: [{ messageId: 'optional' }]
    }
  ]
})
