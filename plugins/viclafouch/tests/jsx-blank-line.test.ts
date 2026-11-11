import { RuleTester } from 'oxlint/plugins-dev'
import { jsxBlankLine } from '../rules/jsx-blank-line'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('jsx-blank-line', jsxBlankLine, {
  valid: [
    'const List = () => { return (\n<div>\n<span />\n<span />\n</div>\n) }'
  ],
  invalid: [
    {
      code: 'const List = () => { return (\n<div>\n<span />\n\n<span />\n</div>\n) }',
      output:
        'const List = () => { return (\n<div>\n<span />\n<span />\n</div>\n) }',
      errors: [{ messageId: 'blank' }]
    }
  ]
})
