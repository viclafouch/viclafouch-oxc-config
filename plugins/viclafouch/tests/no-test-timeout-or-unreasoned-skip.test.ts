import { RuleTester } from 'oxlint/plugins-dev'
import { noTestTimeoutOrUnreasonedSkip } from '../rules/no-test-timeout-or-unreasoned-skip'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run(
  'no-test-timeout-or-unreasoned-skip',
  noTestTimeoutOrUnreasonedSkip,
  {
    valid: [
      {
        name: 'a test without an override',
        code: "it('books the venue', async () => {})"
      },
      {
        name: 'a test whose function is a reference',
        code: "it('books the venue', bookVenue)"
      },
      {
        name: 'a test with options that set no timeout',
        code: "it('books the venue', { concurrent: true }, async () => {})"
      },
      {
        name: 'a parameterized test',
        code: "it.each(cases)('books %s', async (venue) => {})"
      },
      {
        name: 'a hook without a timeout',
        code: 'beforeEach(() => {})'
      },
      {
        name: 'a vi.setConfig that sets no timeout',
        code: 'vi.setConfig({ sequence: { shuffle: true } })'
      },
      {
        name: 'a skip with its ticket',
        code: "// quarantine: ABC-123 the payment sandbox is down\nit.skip('pays the invoice', async () => {})"
      },
      {
        name: 'a skip with its GitHub issue',
        code: "// quarantine: #42 race on the websocket\nit.skip('streams the chat', async () => {})"
      },
      {
        name: 'a platform gate with skipIf',
        code: "it.skipIf(isWindows)('reads the path', () => {})"
      },
      {
        name: 'a computed skip option',
        code: "it('reads the path', { skip: isWindows }, () => {})"
      },
      {
        name: 'a skip read on another object',
        code: 'context.skip()'
      }
    ],
    invalid: [
      {
        name: 'a numeric timeout',
        code: "it('books the venue', async () => {}, 10_000)",
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a timeout constant',
        code: "it('books the venue', async () => {}, LONG_TIMEOUT)",
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a timeout option before the function',
        code: "it('books the venue', { timeout: 10_000 }, async () => {})",
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a retry option after the function',
        code: "test('books the venue', async () => {}, { retry: 3 })",
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a timeout on a parameterized test',
        code: "it.each(cases)('books %s', async (venue) => {}, 10_000)",
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a timeout on a describe',
        code: "describe('booking', { timeout: 10_000 }, () => {})",
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a hook timeout',
        code: 'beforeAll(async () => {}, 30_000)',
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a vi.setConfig timeout',
        code: 'vi.setConfig({ testTimeout: 30_000 })',
        errors: [{ messageId: 'override' }]
      },
      {
        name: 'a skip without a ticket',
        code: "it.skip('pays the invoice', async () => {})",
        errors: [{ messageId: 'unreasonedSkip' }]
      },
      {
        name: 'a skip with a reason but no ticket',
        code: "// flaky on CI\ndescribe.skip('payment', () => {})",
        errors: [{ messageId: 'unreasonedSkip' }]
      },
      {
        name: 'a skip option without a ticket',
        code: "it('pays the invoice', { skip: true }, async () => {})",
        errors: [{ messageId: 'unreasonedSkip' }]
      },
      {
        name: 'a skipped parameterized test without a ticket',
        code: "it.skip.each(cases)('pays %s', async (invoice) => {})",
        errors: [{ messageId: 'unreasonedSkip' }]
      }
    ]
  }
)
