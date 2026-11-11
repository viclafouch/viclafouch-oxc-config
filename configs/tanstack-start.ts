import type { OxlintConfig } from 'oxlint'
import { VICLAFOUCH_PLUGIN } from './js-plugins/index.ts'

/**
 * TanStack Start rules: the file names, the folders, the server code and the routes of an app.
 * Requires `@tanstack/eslint-plugin-router` as a peer dependency.
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, jsxA11y, tanstackQuery, tanstackStart, imports]
 * ```
 */
export default {
  jsPlugins: [VICLAFOUCH_PLUGIN, '@tanstack/eslint-plugin-router'],
  rules: {
    // Name each file in kebab-case
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/filename-case
    'unicorn/filename-case': [
      'error',
      { case: 'kebabCase', ignore: [String.raw`^routeTree\.gen\.ts$`] }
    ],

    // Order the options of a route so that TypeScript infers the context, the search and the loader data
    // https://tanstack.com/router/latest/docs/eslint/create-route-property-order
    '@tanstack/router/create-route-property-order': 'error',

    // Declare createServerFn in a *.functions.ts file, which the client imports safely
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#server-function-file
    'viclafouch/server-function-file': 'error',

    // Create a TanStack store inside the React tree: a module store holds one state for every request of the server
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#no-module-store
    'viclafouch/no-module-store': 'error',

    // Put each file of src/ in one of the shared folders, or in a `-` folder of the same name under its route
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#app-folders
    'viclafouch/app-folders': 'error',

    // Read import.meta.env in src/env.ts only, where one schema checks every variable of the client
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#env-file
    'viclafouch/env-file': 'error',

    // Throw the redirect() and notFound() of TanStack Router, which the router catches
    // https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
    '@typescript-eslint/only-throw-error': [
      'error',
      {
        allow: [
          {
            from: 'package',
            package: '@tanstack/router-core',
            name: ['Redirect', 'NotFoundError']
          }
        ]
      }
    ]
  },
  overrides: [
    {
      // A route file keeps the characters of the router in its name: `__root`, `_layout`, `$id`, `(group)`, `[.]`, `{-$locale}`
      // https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions
      // A route file exports its `Route` and keeps its component local: the router plugin splits the component and keeps Fast Refresh on it
      // https://tanstack.com/router/latest/docs/framework/react/guide/automatic-code-splitting
      files: ['**/src/routes/**'],
      excludeFiles: ['**/src/routes/**/-*/**'],
      rules: {
        'unicorn/filename-case': [
          'error',
          { case: 'kebabCase', ignore: [String.raw`^[_$(\[{]`] }
        ],
        'react/only-export-components': 'off'
      }
    },
    {
      // src/env.server.ts reads process.env at each request, never at module scope
      // https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables
      files: ['**/src/env.server.ts'],
      rules: {
        'node/no-process-env': 'off'
      }
    },
    {
      // The server entry of Start is a default export
      // https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point
      files: ['**/src/server.ts'],
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ]
} satisfies OxlintConfig
