import { RuleTester } from 'oxlint/plugins-dev'
import { requireSuppressionReason } from '../rules/require-suppression-reason'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('require-suppression-reason', requireSuppressionReason, {
  valid: [
    {
      name: 'a next-line directive with its reason',
      code: '// oxlint-disable-next-line no-console -- the CLI prints its report\nconsole.log(report)'
    },
    {
      name: 'a block directive with its reason',
      code: '/* oxlint-disable no-console -- the CLI prints its report */\nconsole.log(report)'
    },
    {
      name: 'an eslint directive with its reason',
      code: '// eslint-disable-next-line no-console -- the CLI prints its report\nconsole.log(report)'
    },
    {
      name: 'an enable directive, which suppresses nothing',
      code: '/* oxlint-disable no-console -- the CLI prints its report */\nconsole.log(report)\n/* oxlint-enable no-console */'
    },
    {
      name: 'a plain comment',
      code: '// the CLI prints its report\nconsole.log(report)'
    }
  ],
  invalid: [
    {
      name: 'a next-line directive without a reason',
      code: '// oxlint-disable-next-line no-console\nconsole.log(report)',
      errors: [{ messageId: 'missingReason', line: 1 }]
    },
    {
      name: 'a same-line directive without a reason',
      code: 'console.log(report) // oxlint-disable-line no-console',
      errors: [{ messageId: 'missingReason', line: 1 }]
    },
    {
      name: 'a file directive without a reason',
      code: '/* oxlint-disable no-console */\nconsole.log(report)',
      errors: [{ messageId: 'missingReason', line: 1 }]
    },
    {
      name: 'an eslint directive without a reason',
      code: '// eslint-disable-next-line no-console\nconsole.log(report)',
      errors: [{ messageId: 'missingReason', line: 1 }]
    },
    {
      name: 'a directive with an empty reason',
      code: '// oxlint-disable-next-line no-console --   \nconsole.log(report)',
      errors: [{ messageId: 'missingReason', line: 1 }]
    }
  ]
})
