import { RuleTester } from 'oxlint/plugins-dev'
import { destructureInSignature } from '../rules/destructure-in-signature'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('destructure-in-signature', destructureInSignature, {
  valid: [
    'const build = ({ name }: BuildParams) => { return name }',
    'const build = (params: BuildParams) => { const { name } = other; return name }',
    'const build = (params: BuildParams) => { const { name } = params; return save(params, name) }'
  ],
  invalid: [
    {
      code: 'const build = (params: BuildParams) => { const { name } = params; return name }',
      errors: [{ messageId: 'destructure' }]
    }
  ]
})
