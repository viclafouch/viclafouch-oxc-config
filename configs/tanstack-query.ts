import type { OxlintConfig } from 'oxlint'
import { VICLAFOUCH_PLUGIN } from './js-plugins/index.ts'

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
  jsPlugins: [
    VICLAFOUCH_PLUGIN,
    '@tanstack/eslint-plugin-query',
    // React Doctor skips a file under a scripts, tools, tooling, cli or bin folder: set settings['react-doctor'].rootDirectory
    {
      name: 'react-doctor',
      specifier: import.meta.resolve('oxlint-plugin-react-doctor')
    }
  ],
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
    // Silent until oxlint gives type information to JS plugins
    // https://tanstack.com/query/latest/docs/eslint/no-void-query-fn
    '@tanstack/query/no-void-query-fn': 'error',

    // Enforce correct property ordering in useMutation() for type inference
    // https://tanstack.com/query/latest/docs/eslint/mutation-property-order
    '@tanstack/query/mutation-property-order': 'error',

    // Enforce use of queryOptions()/infiniteQueryOptions() for co-located query config
    // https://tanstack.com/query/latest/docs/eslint/prefer-query-options
    '@tanstack/query/prefer-query-options': 'error',

    // Keep a query result whole and name it *Query, and name a mutation *Mutation
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#query-naming
    'viclafouch/query-naming': 'error',

    // Disallow mutateAsync: call mutate, and the mutation reports its errors through its callbacks
    // https://tkdodo.eu/blog/mastering-mutations-in-react-query#mutate-or-mutateasync
    'no-restricted-properties': [
      'error',
      {
        property: 'mutateAsync',
        message:
          'Call mutate() and put onSuccess and onError in useMutation: the mutation reports its errors through its callbacks.'
      }
    ],

    // React Doctor: the queries and mutations that an Effect drives

    // Disallow refetch() in an Effect: put the input in the queryKey or in enabled
    // https://www.react.doctor/prompts/rules/react-doctor/query-no-query-in-effect.md
    'react-doctor/query-no-query-in-effect': 'error',

    // Disallow a mutation that an Effect fires to read data: use useQuery with a queryKey and enabled
    // https://www.react.doctor/prompts/rules/react-doctor/query-no-mutation-in-effect-as-read.md
    'react-doctor/query-no-mutation-in-effect-as-read': 'error',

    // React Doctor: the query rules that this config leaves off

    // Repeats no-restricted-properties on mutateAsync on the same line
    // https://www.react.doctor/prompts/rules/react-doctor/query-floating-mutate-async.md
    'react-doctor/query-floating-mutate-async': 'off',

    // Flags a mutation that touches no cached query, such as an upload, and skips spread mutation options
    // https://www.react.doctor/prompts/rules/react-doctor/query-mutation-missing-invalidation.md
    'react-doctor/query-mutation-missing-invalidation': 'off',

    // Sees only a bare fetch with a literal method, never a GraphQL or HTTP client
    // https://www.react.doctor/prompts/rules/react-doctor/query-no-usequery-for-mutation.md
    'react-doctor/query-no-usequery-for-mutation': 'off',

    // React Doctor retires it: a query result read as an object tracks the same properties
    // https://www.react.doctor/prompts/rules/react-doctor/query-destructure-result.md
    'react-doctor/query-destructure-result': 'off',

    // Repeats @tanstack/query/no-rest-destructuring
    // https://www.react.doctor/prompts/rules/react-doctor/query-no-rest-destructuring.md
    'react-doctor/query-no-rest-destructuring': 'off',

    // Repeats @tanstack/query/stable-query-client
    // https://www.react.doctor/prompts/rules/react-doctor/query-stable-query-client.md
    'react-doctor/query-stable-query-client': 'off',

    // Repeats @tanstack/query/no-void-query-fn
    // https://www.react.doctor/prompts/rules/react-doctor/query-no-void-query-fn.md
    'react-doctor/query-no-void-query-fn': 'off'
  }
} satisfies OxlintConfig
