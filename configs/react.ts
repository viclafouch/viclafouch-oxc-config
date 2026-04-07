import type { OxlintConfig } from 'oxlint'

/**
 * React rules for JSX, components, and patterns.
 * Formatting rules (jsx-indent, jsx-spacing, etc.) are handled by oxfmt.
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, jsxA11y, imports]
 * ```
 */
export default {
  plugins: ['react'],
  settings: {
    react: {
      componentWrapperFunctions: [],
      formComponents: [],
      linkComponents: []
    }
  },
  rules: {
    // Enforce boolean attributes notation in JSX
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-boolean-value
    'react/jsx-boolean-value': [
      'error',
      'never',
      {
        assumeUndefinedIsFalse: false,
        always: []
      }
    ],

    // Validate JSX has key prop when in array or iterator (disabled - too many false positives)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-key
    'react/jsx-key': [
      'off',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true
      }
    ],

    // Prevent duplicate props in JSX
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-duplicate-props
    'react/jsx-no-duplicate-props': 'error',

    // Disallow undeclared variables in JSX
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-undef
    'react/jsx-no-undef': 'error',

    // Enforce PascalCase for user-defined JSX components
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-pascal-case
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: []
      }
    ],

    // Prevent using string references
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-string-refs
    'react/no-string-refs': ['error', { noTemplateLiterals: false }],

    // Prevent usage of unknown DOM property
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-unknown-property
    'react/no-unknown-property': [
      'error',
      {
        ignore: [],
        requireDataLowercase: false
      }
    ],

    // Prevent extra closing tags for components without children
    // https://oxc.rs/docs/guide/usage/linter/rules/react/self-closing-comp
    'react/self-closing-comp': ['error', { component: true, html: true }],

    // Disallow target="_blank" on links
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],

    // Only .jsx files may have JSX (overridden to .tsx for TS files)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-filename-extension
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],

    // Prevent accidental JS comments from being injected into JSX as text
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-comment-textnodes
    'react/jsx-no-comment-textnodes': 'error',

    // Disallow using React.render/ReactDOM.render's return value
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-render-return-value
    'react/no-render-return-value': 'error',

    // Prevent problem with children and props.dangerouslySetInnerHTML
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger-with-children
    'react/no-danger-with-children': 'error',

    // Require style prop value be an object or var
    // https://oxc.rs/docs/guide/usage/linter/rules/react/style-prop-object
    'react/style-prop-object': ['error', { allow: [] }],

    // Prevent invalid characters from appearing in markup (disabled)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-unescaped-entities
    'react/no-unescaped-entities': 'off',

    // Prevent passing of children as props
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-children-prop
    'react/no-children-prop': 'error',

    // Enforce curly braces or disallow unnecessary curly braces in JSX props and/or children
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-curly-brace-presence
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' }
    ],

    // Enforce shorthand or standard form for React fragments
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-fragments
    'react/jsx-fragments': ['error', 'syntax'],

    // Disallow unnecessary fragments
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-useless-fragment
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],

    // Turned off with the new JSX transform
    // https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope
    'react/react-in-jsx-scope': 'off',

    // Prevent react contexts from taking non-stable values
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-constructed-context-values
    'react/jsx-no-constructed-context-values': 'error',

    // Prevent usage of dangerous JSX properties
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger
    // EXCEPTION: uses 'warn' to match the source config
    'react/no-danger': 'warn',

    // Enforce sandbox attribute on iframe elements (disabled)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/iframe-missing-sandbox
    'react/iframe-missing-sandbox': 'off',

    // Prevent usage of button elements without an explicit type attribute
    // https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type
    'react/button-has-type': [
      'error',
      { button: true, submit: true, reset: false }
    ],

    // Disallow javascript: URLs in JSX (XSS prevention)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-script-url
    'react/jsx-no-script-url': [
      'error',
      {
        components: {},
        includeFromSettings: false
      }
    ],

    // Disallow children on void DOM elements (<br>, <img>, <input>, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/void-dom-elements-no-children
    'react/void-dom-elements-no-children': 'error',

    // Disallow spreading the same props object multiple times
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spread-multi
    'react/jsx-props-no-spread-multi': 'error',

    // Require onChange or readOnly on checked inputs
    // https://oxc.rs/docs/guide/usage/linter/rules/react/checked-requires-onchange-or-readonly
    'react/checked-requires-onchange-or-readonly': [
      'error',
      {
        ignoreExclusiveCheckedAttribute: false,
        ignoreMissingProperties: false
      }
    ],

    // Disallow React.Children API (use props instead)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-react-children
    'react/no-react-children': 'error',

    // Enforce [value, setValue] naming convention for useState
    // https://oxc.rs/docs/guide/usage/linter/rules/react/hook-use-state
    'react/hook-use-state': ['error', { allowDestructuredState: false }],

    // Prefer function components over class components
    // https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-function-component
    'react/prefer-function-component': [
      'error',
      { allowErrorBoundary: true, allowJsxUtilityClass: false }
    ],

    // Disallow destructured imports from React and ReactDOM
    // Use `import React from 'react'` instead of `import { useState } from 'react'`
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['react'],
            importNames: [
              'useState',
              'useEffect',
              'useRef',
              'useMemo',
              'useCallback',
              'useContext',
              'useReducer',
              'useId',
              'useLayoutEffect',
              'useDebugValue',
              'useDeferredValue',
              'useImperativeHandle',
              'useInsertionEffect',
              'useSyncExternalStore',
              'useTransition',
              'useOptimistic',
              'useActionState',
              'useFormStatus',
              'ReactNode',
              'ReactElement',
              'FC',
              'PropsWithChildren',
              'ComponentProps',
              'ComponentPropsWithRef',
              'ComponentPropsWithoutRef',
              'CSSProperties',
              'ChangeEvent',
              'FormEvent',
              'MouseEvent',
              'KeyboardEvent',
              'FocusEvent',
              'SyntheticEvent',
              'Dispatch',
              'SetStateAction',
              'MutableRefObject',
              'RefObject',
              'Ref'
            ],
            message:
              'Use React.useState, React.ReactNode, etc. instead of destructuring React imports.'
          },
          {
            group: ['react-dom'],
            importNames: [
              'createRoot',
              'hydrateRoot',
              'createPortal',
              'flushSync',
              'render'
            ],
            message:
              'Use ReactDOM.createRoot, etc. instead of destructuring ReactDOM imports.'
          }
        ]
      }
    ]
  },
  overrides: [
    {
      // JSX in .tsx files instead of .jsx
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }]
      }
    }
  ]
} satisfies OxlintConfig
