import { RuleTester } from 'oxlint/plugins-dev'
import { commentPolicy } from '../rules/comment-policy'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('comment-policy', commentPolicy, {
  valid: [
    '// oxlint-disable-next-line no-await-in-loop -- the polling is sequential\nawait poll()',
    '// oxlint-disable-next-line no-await-in-loop\nawait poll()',
    "/* oxlint-disable no-console */\nconsole.log('done')",
    '// @ts-expect-error the library types are wrong\nlibrary.call()',
    '/// <reference types="vite/client" />'
  ],
  invalid: [
    {
      code: '// read the cookie\nreadCookie()',
      errors: [{ messageId: 'comment' }]
    },
    {
      code: 'const value = 1 /* the default */',
      errors: [{ messageId: 'comment' }]
    },
    {
      code: '/* oxlint-disable no-await-in-loop */\nawait poll()',
      errors: [{ messageId: 'fileLevelDisable' }]
    }
  ]
})
