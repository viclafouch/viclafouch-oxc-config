import { RuleTester } from 'oxlint/plugins-dev'
import { booleanName } from '../rules/boolean-name'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('boolean-name', booleanName, {
  valid: [
    'const isOpen = count > 0',
    "const IS_PRODUCTION = mode === 'production'",
    'const [isOpen, setIsOpen] = React.useState(false)',
    'const total = count + 1'
  ],
  invalid: [
    { code: 'const open = count > 0', errors: [{ messageId: 'boolean' }] },
    { code: 'const visible = !hidden', errors: [{ messageId: 'boolean' }] },
    {
      code: 'const ready = matchIsReady(value)',
      errors: [{ messageId: 'boolean' }]
    },
    {
      code: 'const [open, setOpen] = React.useState(false)',
      errors: [{ messageId: 'boolean' }]
    }
  ]
})
