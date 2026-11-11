import { RuleTester } from 'oxlint/plugins-dev'
import { noRealTimeWaitInTests } from '../rules/no-real-time-wait-in-tests'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('no-real-time-wait-in-tests', noRealTimeWaitInTests, {
  valid: [
    {
      name: 'a wait on the event',
      code: 'await vi.waitFor(() => expect(onSave).toHaveBeenCalled())'
    },
    {
      name: 'a timer that the code under test sets',
      code: 'const id = setTimeout(close, 300)'
    },
    {
      name: 'a timer in a file that fakes the timers',
      code: 'vi.useFakeTimers()\nconst wait = new Promise((resolve) => setTimeout(resolve, 300))\nawait vi.advanceTimersByTimeAsync(300)'
    },
    {
      name: 'a timer in a callback inside the executor',
      code: "new Promise((resolve) => socket.on('open', () => setTimeout(resolve, 10)))"
    },
    {
      name: 'another import of node:timers/promises',
      code: "import { scheduler } from 'node:timers/promises'"
    }
  ],
  invalid: [
    {
      name: 'a sleep through a Promise',
      code: 'await new Promise((resolve) => setTimeout(resolve, 500))',
      errors: [{ messageId: 'realTimeWait' }]
    },
    {
      name: 'a sleep with a block body',
      code: 'await new Promise((resolve) => {\n  setTimeout(resolve, 500)\n})',
      errors: [{ messageId: 'realTimeWait' }]
    },
    {
      name: 'a Promise that takes the timer as its executor',
      code: 'await new Promise(setImmediate)',
      errors: [{ messageId: 'realTimeWait' }]
    },
    {
      name: 'setTimeout from node:timers/promises',
      code: "import { setTimeout as sleep } from 'node:timers/promises'\nawait sleep(500)",
      errors: [{ messageId: 'realTimeWait' }]
    },
    {
      name: 'a namespace of timers/promises',
      code: "import * as timers from 'timers/promises'\nawait timers.setTimeout(500)",
      errors: [{ messageId: 'realTimeWait' }]
    }
  ]
})
