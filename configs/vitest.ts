import type { OxlintConfig } from 'oxlint'

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
  plugins: ['vitest'],
  categories: {
    correctness: 'off',
    suspicious: 'off',
    pedantic: 'off',
    perf: 'off',
    style: 'off',
    restriction: 'off',
    nursery: 'off'
  },
  rules: {
    // Disallow conditional logic in tests — tests must be deterministic
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-tests
    'vitest/no-conditional-tests': 'error',

    // Enforce consistent style for parameterized tests (test.each vs for loop)
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-each-for
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
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/hoisted-apis-on-top
    'vitest/hoisted-apis-on-top': 'error',

    // EXCEPTION: uses 'warn' — todo tests are legitimate during development
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/warn-todo
    'vitest/warn-todo': 'warn',

    // Disallow importing from node:test in a vitest project
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-import-node-test
    'vitest/no-import-node-test': 'error',

    // Enforce consistent usage of vi (import vs global)
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-vitest-vi
    'vitest/consistent-vitest-vi': ['error', { fn: 'vi' }],

    // Prefer vi.importActual() inside vi.mock() over external imports
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-import-in-mock
    'vitest/prefer-import-in-mock': ['error', { fixable: false }],

    // Prefer toHaveBeenCalledOnce() over toHaveBeenCalledTimes(1)
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-once
    'vitest/prefer-called-once': 'error',

    // Prefer toHaveBeenCalledTimes(n) over repeated toHaveBeenCalled()
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-times
    'vitest/prefer-called-times': 'error',

    // Prefer toBeTypeOf() over typeof + toBe()
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-type-of
    'vitest/prefer-expect-type-of': 'error',

    // Prefer toBe(true)/toBe(false) over toBeTruthy()/toBeFalsy()
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-strict-boolean-matchers
    'vitest/prefer-strict-boolean-matchers': 'error',

    // Prefer toBeObject() over toBeTypeOf('object')
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-object
    'vitest/prefer-to-be-object': 'error',

    // Enforce *.test.ts or *.spec.ts naming — project-specific convention
    'vitest/consistent-test-filename': [
      'off',
      {
        pattern: '',
        allTestPattern: ''
      }
    ],

    // Disallow importing vitest globals when globals: true — depends on vitest config
    'vitest/no-importing-vitest-globals': 'off',

    // Require local test context for concurrent snapshots
    'vitest/require-local-test-context-for-concurrent-snapshots': 'off',

    // Enforce describe() title to match function name
    'vitest/prefer-describe-function-title': 'off',

    // Ensure expect calls in promise chains are properly awaited or returned
    // https://oxc.rs/docs/guide/usage/linter/rules/jest/valid-expect-in-promise
    'vitest/valid-expect-in-promise': 'error',

    // Prefer toBeTruthy()/toBeFalsy() — conflicts with prefer-strict-boolean-matchers
    'vitest/prefer-to-be-truthy': 'off',
    'vitest/prefer-to-be-falsy': 'off',

    // Prevent duplicate test/describe titles in the same scope
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-identical-title
    'vitest/no-identical-title': 'error',

    // Prevent committing .only tests
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-focused-tests
    'vitest/no-focused-tests': 'error',

    // Prevent duplicate lifecycle hooks in the same describe
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-duplicate-hooks
    'vitest/no-duplicate-hooks': 'error',

    // Prevent expect() inside conditional blocks (if/catch)
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-expect
    'vitest/no-conditional-expect': 'error',

    // Prevent if/switch/ternary inside test bodies
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-in-test
    'vitest/no-conditional-in-test': 'error',

    // Detect commented-out test blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-commented-out-tests
    'vitest/no-commented-out-tests': 'error',

    // Enforce canonical matcher names (toThrow not toThrowError, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-alias-methods
    'vitest/no-alias-methods': 'error',

    // Limit describe nesting depth
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-nested-describe
    'vitest/max-nested-describe': ['error', { max: 3 }],

    // Limit assertions per test
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-expects
    'vitest/max-expects': ['error', { max: 5 }],

    // Prevent direct imports from __mocks__ directories
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-mocks-import
    'vitest/no-mocks-import': 'error',

    // Limit snapshot size for reviewability
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-large-snapshots
    'vitest/no-large-snapshots': [
      'error',
      {
        maxSize: 50,
        inlineMaxSize: 50,
        allowedSnapshots: {}
      }
    ],

    // Prevent template interpolation in snapshot values
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-interpolation-in-snapshots
    'vitest/no-interpolation-in-snapshots': 'error',

    // Prefer toContain() over .includes() + toBe()
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-contain
    'vitest/prefer-to-contain': 'error',

    // Require all tests inside a describe block
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-top-level-describe
    'vitest/require-top-level-describe': [
      'error',
      { maxNumberOfTopLevelDescribes: Infinity }
    ],

    // Prefer test.todo() over empty test bodies
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-todo
    'vitest/prefer-todo': 'error',

    // Disallow .skip and xdescribe — legitimate during development
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-disabled-tests
    'vitest/no-disabled-tests': 'off',

    // Disallow all lifecycle hooks — too strict
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-hooks
    'vitest/no-hooks': ['off', { allow: [] }],

    // Require expect.assertions() — too noisy for most codebases
    // https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-assertions
    'vitest/prefer-expect-assertions': [
      'off',
      {
        onlyFunctionsWithAsyncKeyword: false,
        onlyFunctionsWithExpectInCallback: false,
        onlyFunctionsWithExpectInLoop: false
      }
    ]
  }
} satisfies OxlintConfig
