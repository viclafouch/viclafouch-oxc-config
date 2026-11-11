import { RuleTester } from 'oxlint/plugins-dev'
import { functionalUpdate } from '../rules/functional-update'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('functional-update', functionalUpdate, {
  valid: [
    'const [count, setCount] = React.useState(0)\nsetCount((previous) => { return previous + 1 })',
    'const [count, setCount] = React.useState(0)\nsetCount(total)',
    'const [count, setCount] = React.useState(0)\nsetCount(settings.count)'
  ],
  invalid: [
    {
      code: 'const [count, setCount] = React.useState(0)\nsetCount(count + 1)',
      errors: [{ messageId: 'functional' }]
    },
    {
      code: 'const [isOpen, setIsOpen] = React.useState(false)\nsetIsOpen(!isOpen)',
      errors: [{ messageId: 'functional' }]
    }
  ]
})
