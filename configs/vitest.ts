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

    // Prefer toBeTruthy()/toBeFalsy() — conflicts with prefer-strict-boolean-matchers
    'vitest/prefer-to-be-truthy': 'off',
    'vitest/prefer-to-be-falsy': 'off'
  }
} satisfies OxlintConfig
