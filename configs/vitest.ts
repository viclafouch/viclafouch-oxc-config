import type { OxlintConfig } from 'oxlint'
import { E2E_FILES, TEST_FILES } from './globs/index.ts'
import { VICLAFOUCH_PLUGIN } from './js-plugins/index.ts'

/**
 * Vitest testing rules (test quality, mocking patterns, assertion style).
 * Uses the native oxlint vitest plugin.
 *
 * @example
 * ```ts
 * extends: [typescript, imports, vitest]
 * ```
 */
export default {
  jsPlugins: [VICLAFOUCH_PLUGIN],
  overrides: [
    {
      // Vitest rules apply to test files only, so a script or a CLI keeps its top-level calls, and a Playwright spec of E2E_FILES gets the playwright config instead
      // A local override on TEST_FILES needs plugins: ['vitest'], else oxlint ignores its vitest rules
      files: [...TEST_FILES],
      excludeFiles: [...E2E_FILES],
      plugins: ['vitest'],
      rules: {
        // Disallow conditional logic in tests: tests must be deterministic
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-tests.md
        'vitest/no-conditional-tests': 'error',

        // Enforce consistent style for parameterized tests (test.each vs for loop)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-each-for.md
        'vitest/consistent-each-for': [
          'error',
          {
            describe: 'each',
            it: 'each',
            suite: 'each',
            test: 'each'
          }
        ],

        // Enforce vi.mock/vi.hoisted at the top of the file
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/hoisted-apis-on-top.md
        'vitest/hoisted-apis-on-top': 'error',

        // Disallow a todo test: write the test, or leave it out
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/warn-todo.md
        'vitest/warn-todo': 'error',

        // Disallow importing from node:test in a vitest project
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-import-node-test.md
        'vitest/no-import-node-test': 'error',

        // Enforce consistent usage of vi (import vs global)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-vitest-vi.md
        'vitest/consistent-vitest-vi': 'error',

        // Prefer vi.importActual() inside vi.mock() over external imports
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-import-in-mock.md
        'vitest/prefer-import-in-mock': ['error', { fixable: false }],

        // Exact inverse of prefer-called-times: enabling both rejects every spelling, leaving no valid way to assert a single call
        // https://github.com/oxc-project/oxc/issues/19312
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-once.md
        'vitest/prefer-called-once': 'off',

        // Prefer toHaveBeenCalledTimes(1) over toHaveBeenCalledOnce()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-times.md
        'vitest/prefer-called-times': 'error',

        // Prefer toBeTypeOf() over typeof + toBe()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-type-of.md
        'vitest/prefer-expect-type-of': 'error',

        // Prefer toBe(true)/toBe(false) over toBeTruthy()/toBeFalsy()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-strict-boolean-matchers.md
        'vitest/prefer-strict-boolean-matchers': 'error',

        // Prefer toBeObject() over toBeTypeOf('object')
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-object.md
        'vitest/prefer-to-be-object': 'error',

        // Prefer toBe() for primitives over toEqual()/toStrictEqual()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be.md
        'vitest/prefer-to-be': 'error',

        // Prefer toStrictEqual() over toEqual() for structural equality
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-strict-equal.md
        'vitest/prefer-strict-equal': 'error',

        // Prefer vi.spyOn() over manual property assignment for mock cleanup
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-spy-on.md
        'vitest/prefer-spy-on': 'error',

        // Prefer mockResolvedValue/mockRejectedValue over mockImplementation+Promise
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-mock-promise-shorthand.md
        'vitest/prefer-mock-promise-shorthand': 'error',

        // Prefer mockReturnValue over mockImplementation for simple returns
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-mock-return-shorthand.md
        'vitest/prefer-mock-return-shorthand': 'error',

        // Enforce hooks (beforeAll, beforeEach, etc.) before test cases
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-hooks-on-top.md
        'vitest/prefer-hooks-on-top': 'error',

        // Enforce hooks in execution order: beforeAll > beforeEach > afterEach > afterAll
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-hooks-in-order.md
        'vitest/prefer-hooks-in-order': 'error',

        // Prefer direct equality matchers over boolean comparison in expect
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-equality-matcher.md
        'vitest/prefer-equality-matcher': 'error',

        // Prefer toBeGreaterThan etc. over comparison+toBe(true)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-comparison-matcher.md
        'vitest/prefer-comparison-matcher': 'error',

        // Prefer describe.each/test.each over manual loops
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-each.md
        'vitest/prefer-each': 'error',

        // Prefer toHaveBeenCalledWith() over toHaveBeenCalled() for argument validation
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-with.md
        'vitest/prefer-called-with': 'error',

        // Prefer toHaveBeenCalledTimes() over mock.calls.length checks
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-have-been-called-times.md
        'vitest/prefer-to-have-been-called-times': 'error',

        // Remove unnecessary async wrappers in expect()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-unneeded-async-expect-function.md
        'vitest/no-unneeded-async-expect-function': 'error',

        // Disallow return statements in test bodies
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-test-return-statement.md
        'vitest/no-test-return-statement': 'error',

        // Enforce .skip/.only over x/f prefixes (xtest, fit, etc.)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-test-prefixes.md
        'vitest/no-test-prefixes': 'error',

        // Prefer toHaveLength() over .length + toBe()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-have-length.md
        'vitest/prefer-to-have-length': 'error',

        // Prevent expect() outside test blocks
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-standalone-expect.md
        'vitest/no-standalone-expect': 'error',

        // Ensure describe callback is sync, has no params, and no return
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-describe-callback.md
        'vitest/valid-describe-callback': 'error',

        // Require error message argument in toThrow()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-to-throw-message.md
        'vitest/require-to-throw-message': 'error',

        // Enforce setup/teardown code in hooks, not at scope level
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-hook.md
        'vitest/require-hook': 'error',

        // The vitest/require-hook rule moves the setup into a hook, so a let that beforeAll assigns has no initial value
        // https://oxc.rs/docs/guide/usage/linter/rules/eslint/init-declarations.md
        'init-declarations': 'off',

        // Enforce lowercase test titles
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-lowercase-title.md
        'vitest/prefer-lowercase-title': 'error',

        // Enforce *.test.ts or *.spec.ts naming: project-specific convention
        'vitest/consistent-test-filename': 'off',

        // Disallow importing vitest globals when globals: true: depends on vitest config
        'vitest/no-importing-vitest-globals': 'off',

        // Require local test context for concurrent snapshots
        'vitest/require-local-test-context-for-concurrent-snapshots': 'off',

        // Enforce describe() title to match function name
        'vitest/prefer-describe-function-title': 'off',

        // Enforce valid titles, and accept a function as the describe() title
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-title.md
        'vitest/valid-title': [
          'error',
          {
            ignoreSpaces: false,
            ignoreTypeOfTestName: false,
            ignoreTypeOfDescribeName: false,
            allowArguments: true,
            disallowedWords: [],
            mustNotMatch: {},
            mustMatch: {}
          }
        ],

        // Ensure expect calls in promise chains are properly awaited or returned
        // https://oxc.rs/docs/guide/usage/linter/rules/jest/valid-expect-in-promise.md
        'vitest/valid-expect-in-promise': 'error',

        // Prefer toBeTruthy()/toBeFalsy(): conflicts with prefer-strict-boolean-matchers
        'vitest/prefer-to-be-truthy': 'off',
        'vitest/prefer-to-be-falsy': 'off',

        // Prevent duplicate test/describe titles in the same scope
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-identical-title.md
        'vitest/no-identical-title': 'error',

        // Prevent committing .only tests
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-focused-tests.md
        'vitest/no-focused-tests': 'error',

        // Prevent duplicate lifecycle hooks in the same describe
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-duplicate-hooks.md
        'vitest/no-duplicate-hooks': 'error',

        // Prevent expect() inside conditional blocks (if/catch)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-expect.md
        'vitest/no-conditional-expect': 'error',

        // Prevent if/switch/ternary inside test bodies
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-in-test.md
        'vitest/no-conditional-in-test': 'error',

        // Detect commented-out test blocks
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-commented-out-tests.md
        'vitest/no-commented-out-tests': 'error',

        // Enforce canonical matcher names (toThrow not toThrowError, etc.)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-alias-methods.md
        'vitest/no-alias-methods': 'error',

        // Limit describe nesting depth
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-nested-describe.md
        'vitest/max-nested-describe': ['error', { max: 3 }],

        // Limit assertions per test
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-expects.md
        'vitest/max-expects': 'error',

        // Prevent direct imports from __mocks__ directories
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-mocks-import.md
        'vitest/no-mocks-import': 'error',

        // Limit snapshot size for reviewability
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-large-snapshots.md
        'vitest/no-large-snapshots': ['error', { inlineMaxSize: 50 }],

        // Prevent template interpolation in snapshot values
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-interpolation-in-snapshots.md
        'vitest/no-interpolation-in-snapshots': 'error',

        // Prefer toContain() over .includes() + toBe()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-contain.md
        'vitest/prefer-to-contain': 'error',

        // Require all tests inside a describe block
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-top-level-describe.md
        'vitest/require-top-level-describe': 'error',

        // Prefer test.todo() over empty test bodies
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-todo.md
        'vitest/prefer-todo': 'error',

        // Superseded by viclafouch/no-test-timeout-or-unreasoned-skip, which accepts a skip with its ticket
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-disabled-tests.md
        'vitest/no-disabled-tests': 'off',

        // Disallow all lifecycle hooks: too strict
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-hooks.md
        'vitest/no-hooks': 'off',

        // Require expect.assertions(): too noisy for most codebases
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-assertions.md
        'vitest/prefer-expect-assertions': 'off',

        // Prefer .resolves over await-then-expect: both forms are acceptable
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-resolves.md
        'vitest/prefer-expect-resolves': 'off',

        // Require snapshot hints: inline snapshots are preferred, hints add noise
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-snapshot-hint.md
        'vitest/prefer-snapshot-hint': 'off',

        // Restrict specific matchers: project-specific, enable downstream
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-restricted-matchers.md
        'vitest/no-restricted-matchers': 'off',

        // Enforce blank line padding around afterAll blocks
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/padding-around-after-all-blocks.md
        'vitest/padding-around-after-all-blocks': 'error',

        // Enforce blank line padding around test and it blocks
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/padding-around-test-blocks.md
        'vitest/padding-around-test-blocks': 'error',

        // Ensure expect() is properly formed (arg + matcher called)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-expect.md
        'vitest/valid-expect': 'error',

        // Ensure tests contain at least one assertion
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/expect-expect.md
        'vitest/expect-expect': [
          'error',
          {
            assertFunctionNames: [
              'expect',
              'expectTypeOf',
              'assert',
              'assertType'
            ]
          }
        ],

        // Enforce consistent test/it usage (test at top-level, it in describe)
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-test-it.md
        'vitest/consistent-test-it': 'error',

        // Combine toHaveBeenCalledOnce + toHaveBeenCalledWith into one assertion
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-exactly-once-with.md
        'vitest/prefer-called-exactly-once-with': 'error',

        // Require await on expect.poll() and expect.element()
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-awaited-expect-poll.md
        'vitest/require-awaited-expect-poll': 'error',

        // Require type parameters on vi.fn(): too noisy for simple mocks
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-mock-type-parameters.md
        'vitest/require-mock-type-parameters': 'off',

        // Require timeout on every test: vitest.config global timeout suffices
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-test-timeout.md
        'vitest/require-test-timeout': 'off',

        // Restrict specific vi methods: project-specific, enable downstream
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-restricted-vi-methods.md
        'vitest/no-restricted-vi-methods': 'off',

        // Prefer explicit vitest imports: depends on globals config
        // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-importing-vitest-globals.md
        'vitest/prefer-importing-vitest-globals': 'off',

        // A test attaches catch() to a pending promise, then drives the promise with act() before the promise settles
        // https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-then.md
        'promise/prefer-await-to-then': 'off',

        // Disallow a per-test timeout or retry, and a skip without its ticket
        // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-test-timeout-or-unreasoned-skip
        'viclafouch/no-test-timeout-or-unreasoned-skip': 'error',

        // Disallow a real clock reading, such as Date.now(), new Date() or process.hrtime(), in a test that does not fake the clock
        // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-wall-clock-in-tests
        'viclafouch/no-wall-clock-in-tests': 'error',

        // Disallow a sleep on a real timer in a test that does not fake the timers
        // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-real-time-wait-in-tests
        'viclafouch/no-real-time-wait-in-tests': 'error',

        // Disallow a per-file environment and a DOM emulator: a DOM test runs in Vitest browser mode
        // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-dom-test-environment
        'viclafouch/no-dom-test-environment': 'error'
      }
    }
  ]
} satisfies OxlintConfig
