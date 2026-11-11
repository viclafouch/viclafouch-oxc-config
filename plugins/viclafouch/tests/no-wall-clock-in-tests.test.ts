import { RuleTester } from 'oxlint/plugins-dev'
import { noWallClockInTests } from '../rules/no-wall-clock-in-tests'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('no-wall-clock-in-tests', noWallClockInTests, {
  valid: [
    {
      name: 'a fixed date',
      code: "const createdAt = new Date('2026-01-01T09:00:00Z')"
    },
    {
      name: 'a date from a timestamp',
      code: 'const createdAt = new Date(1_767_258_000_000)'
    },
    {
      name: 'a reading in a file that fakes the clock',
      code: "vi.setSystemTime(new Date('2026-01-01'))\nconst now = Date.now()"
    },
    {
      name: 'a reading in a file that fakes the timers',
      code: 'vi.useFakeTimers()\nconst start = performance.now()'
    },
    {
      name: 'a reading that seeds a mock',
      code: 'const clock = vi.fn(() => Date.now())'
    },
    {
      name: 'a reading that a mock returns',
      code: 'getNow.mockReturnValue(new Date())'
    },
    {
      name: 'a now method on another object',
      code: 'const now = clock.now()'
    }
  ],
  invalid: [
    {
      name: 'Date.now',
      code: 'const start = Date.now()',
      errors: [{ messageId: 'wallClock' }]
    },
    {
      name: 'a new Date without an argument',
      code: 'const booking = createBooking({ createdAt: new Date() })',
      errors: [{ messageId: 'wallClock' }]
    },
    {
      name: 'performance.now',
      code: 'const start = performance.now()',
      errors: [{ messageId: 'wallClock' }]
    },
    {
      name: 'process.hrtime.bigint',
      code: 'const start = process.hrtime.bigint()',
      errors: [{ messageId: 'wallClock' }]
    }
  ]
})
