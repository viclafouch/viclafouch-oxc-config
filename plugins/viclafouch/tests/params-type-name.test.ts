import { RuleTester } from 'oxlint/plugins-dev'
import { paramsTypeName } from '../rules/params-type-name'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('params-type-name', paramsTypeName, {
  valid: [
    'type SendEmailParams = { to: string }\nconst sendEmail = ({ to }: SendEmailParams) => { return to }',
    "import type { CreateEmailOptions } from 'resend'\nconst sendEmail = ({ to }: CreateEmailOptions) => { return to }",
    "import type { ActivityFilters } from '~/constants/activity'\nconst listActivity = ({ type }: ActivityFilters) => { return type }",
    'type ActivityFilters = { type: string }\nconst listActivity = ({ type }: ActivityFilters) => { return type }\nconst emptyFilters: ActivityFilters = { type: "" }',
    'const Banner = ({ label }: BannerProps) => { return label }'
  ],
  invalid: [
    {
      code: 'const sendEmail = ({ to }: { to: string }) => { return to }',
      errors: [{ messageId: 'inline' }]
    },
    {
      code: 'type EmailOptions = { to: string }\nconst sendEmail = ({ to }: EmailOptions) => { return to }',
      errors: [{ messageId: 'name' }]
    }
  ]
})
