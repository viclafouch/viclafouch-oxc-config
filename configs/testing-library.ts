import type { OxlintConfig } from 'oxlint'

/**
 * Testing Library configuration for oxlint.
 *
 * Migrated from `rules/testing-library.mjs`.
 * Uses jsPlugins to load eslint-plugin-testing-library (not natively supported).
 */
export default {
  jsPlugins: ['eslint-plugin-testing-library'],
  rules: {
    // ===== testing-library/react recommended rules =====

    // Enforce async queries to have proper await
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-events.md
    'testing-library/await-async-events': 'error',

    // Enforce async utils to be awaited properly
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-queries.md
    'testing-library/await-async-queries': 'error',

    // Enforce async utils to be awaited properly
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-utils.md
    'testing-library/await-async-utils': 'error',

    // Disallow unnecessary await for firing events
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-events.md
    'testing-library/no-await-sync-events': 'error',

    // Disallow unnecessary await for sync queries
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-queries.md
    'testing-library/no-await-sync-queries': 'error',

    // Disallow the use of container methods
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-container.md
    'testing-library/no-container': 'error',

    // Disallow the use of debugging utilities like debug
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-debugging-utils.md
    'testing-library/no-debugging-utils': 'error',

    // Disallow importing from DOM Testing Library
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-dom-import.md
    'testing-library/no-dom-import': 'error',

    // Disallow the use of cleanup
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-manual-cleanup.md
    'testing-library/no-manual-cleanup': 'error',

    // Disallow the use of render in testing frameworks setup functions
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-lifecycle.md
    'testing-library/no-render-in-lifecycle': 'error',

    // Disallow unnecessary act wrapping of Testing Library calls
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md
    'testing-library/no-unnecessary-act': 'error',

    // Disallow empty callbacks for waitFor and waitForElementToBeRemoved
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-empty-callback.md
    'testing-library/no-wait-for-empty-callback': 'error',

    // Disallow the use of multiple expect calls inside waitFor
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-multiple-assertions.md
    'testing-library/no-wait-for-multiple-assertions': 'error',

    // Disallow side effects in waitFor
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-side-effects.md
    'testing-library/no-wait-for-side-effects': 'error',

    // Disallow the use of waitFor with an empty callback or snapshot assertions
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-snapshot.md
    'testing-library/no-wait-for-snapshot': 'error',

    // Suggest using find queries instead of waitFor + getBy queries
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-find-by.md
    'testing-library/prefer-find-by': 'error',

    // Suggest using screen for queries
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-screen-queries.md
    'testing-library/prefer-screen-queries': 'error',

    // Suggest using userEvent over fireEvent for simulating user interactions
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-user-event.md
    'testing-library/prefer-user-event': 'error',

    // Enforce a valid naming for return value of render (disabled)
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/render-result-naming-convention.md
    'testing-library/render-result-naming-convention': 'off'
  }
} satisfies OxlintConfig
