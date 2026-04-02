import type { OxlintConfig } from 'oxlint'

/**
 * TanStack Query rules.
 * Requires `@tanstack/eslint-plugin-query` as a peer dependency.
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, imports, tanstackQuery]
 * ```
 */
export default {
  jsPlugins: ['@tanstack/eslint-plugin-query'],
  rules: {
    // Ensure all external variables used in queryFn are included in queryKey
    // https://tanstack.com/query/latest/docs/eslint/exhaustive-deps
    '@tanstack/query/exhaustive-deps': [
      'error',
      { allowlist: { variables: [], types: [] } }
    ],

    // Disallow rest destructuring on query hook results (causes excessive re-renders)
    // https://tanstack.com/query/latest/docs/eslint/no-rest-destructuring
    '@tanstack/query/no-rest-destructuring': 'error',

    // Ensure QueryClient is not recreated on every render
    // https://tanstack.com/query/latest/docs/eslint/stable-query-client
    '@tanstack/query/stable-query-client': 'error',

    // Disallow passing query hook results directly into React hook dependency arrays
    // https://tanstack.com/query/latest/docs/eslint/no-unstable-deps
    '@tanstack/query/no-unstable-deps': 'error',

    // Enforce correct property ordering in useInfiniteQuery() for type inference
    // https://tanstack.com/query/latest/docs/eslint/infinite-query-property-order
    '@tanstack/query/infinite-query-property-order': 'error',

    // Ensure queryFn returns a non-undefined value
    // https://tanstack.com/query/latest/docs/eslint/no-void-query-fn
    '@tanstack/query/no-void-query-fn': 'error',

    // Enforce correct property ordering in useMutation() for type inference
    // https://tanstack.com/query/latest/docs/eslint/mutation-property-order
    '@tanstack/query/mutation-property-order': 'error',

    // Enforce use of queryOptions()/infiniteQueryOptions() for co-located query config
    // https://tanstack.com/query/latest/docs/eslint/prefer-query-options
    '@tanstack/query/prefer-query-options': 'error'
  }
} satisfies OxlintConfig
