import type { OxlintConfig } from 'oxlint'

/**
 * React Native rules (styles, platform splits, raw text).
 * Requires `eslint-plugin-react-native` as a peer dependency.
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, reactNative, imports]
 * ```
 */
export default {
  jsPlugins: ['eslint-plugin-react-native'],
  globals: {
    __DEV__: 'readonly'
  },
  rules: {
    // Detect unused StyleSheet rules in React Native
    // https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-unused-styles.md
    'react-native/no-unused-styles': 'error',

    // Enforce using platform-specific filenames when necessary
    // https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/split-platform-components.md
    'react-native/split-platform-components': [
      'error',
      {
        androidPathRegex: '\\.android\\.[jt]sx?$',
        iosPathRegex: '\\.ios\\.[jt]sx?$'
      }
    ],

    // Detect inline styles in components
    // https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-inline-styles.md
    'react-native/no-inline-styles': 'error',

    // Detect color literals in styles
    // https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-color-literals.md
    'react-native/no-color-literals': 'error',

    // Detect raw text outside of Text component
    // https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-raw-text.md
    'react-native/no-raw-text': ['error', { skip: [] }],

    // Detect single element style arrays
    // https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-single-element-style-arrays.md
    'react-native/no-single-element-style-arrays': 'error',

    // Disable web-specific React rules for React Native
    // https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type
    'react/button-has-type': 'off',
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank
    'react/jsx-no-target-blank': 'off',

    // Allow useMemo and useCallback in React Native (performance is more critical on mobile)
    // Override no-restricted-imports to remove useMemo/useCallback from the banned list
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
  }
} satisfies OxlintConfig
