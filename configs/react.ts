import type { OxlintConfig } from 'oxlint'
import { REACT_DOCTOR_PLUGIN, VICLAFOUCH_PLUGIN } from './js-plugins/index.ts'

const FUNCTION_COMPONENT_MESSAGE =
  'Type the props parameter instead: `({ label }: ButtonProps) =>`. `FC` adds nothing, see https://github.com/facebook/create-react-app/pull/8177'

const restrictedComponentTypes = {
  FC: { message: FUNCTION_COMPONENT_MESSAGE },
  'React.FC': { message: FUNCTION_COMPONENT_MESSAGE },
  FunctionComponent: { message: FUNCTION_COMPONENT_MESSAGE },
  'React.FunctionComponent': { message: FUNCTION_COMPONENT_MESSAGE }
}

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
  jsPlugins: [VICLAFOUCH_PLUGIN, REACT_DOCTOR_PLUGIN],
  settings: {
    react: {
      componentWrapperFunctions: [],
      formComponents: [],
      linkComponents: []
    }
  },
  rules: {
    // Enforce boolean attributes notation in JSX
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-boolean-value.md
    'react/jsx-boolean-value': 'error',

    // Validate JSX has key prop when in array or iterator
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-key.md
    'react/jsx-key': 'error',

    // Prevent duplicate props in JSX
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-duplicate-props.md
    'react/jsx-no-duplicate-props': 'error',

    // Disallow undeclared variables in JSX
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-undef.md
    'react/jsx-no-undef': 'error',

    // Enforce PascalCase for user-defined JSX components
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-pascal-case.md
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],

    // Prevent using string references
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-string-refs.md
    'react/no-string-refs': 'error',

    // Prevent usage of unknown DOM property
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-unknown-property.md
    'react/no-unknown-property': 'error',

    // Prevent extra closing tags for components without children
    // https://oxc.rs/docs/guide/usage/linter/rules/react/self-closing-comp.md
    'react/self-closing-comp': 'error',

    // Disallow target="_blank" on links
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank.md
    'react/jsx-no-target-blank': 'error',

    // Only .jsx files may have JSX (overridden to .tsx for TS files)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],

    // Prevent accidental JS comments from being injected into JSX as text
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-comment-textnodes.md
    'react/jsx-no-comment-textnodes': 'error',

    // Disallow using React.render/ReactDOM.render's return value
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-render-return-value.md
    'react/no-render-return-value': 'error',

    // Prevent problem with children and props.dangerouslySetInnerHTML
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger-with-children.md
    'react/no-danger-with-children': 'error',

    // Require style prop value be an object or var
    // https://oxc.rs/docs/guide/usage/linter/rules/react/style-prop-object.md
    'react/style-prop-object': 'error',

    // Prevent invalid characters from appearing in markup
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-unescaped-entities.md
    'react/no-unescaped-entities': 'error',

    // TanStack Form passes its render function through children={(field) => ...}
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-children-prop.md
    'react/no-children-prop': 'off',

    // Enforce curly braces or disallow unnecessary curly braces in JSX props and/or children
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-curly-brace-presence.md
    'react/jsx-curly-brace-presence': 'error',

    // Enforce shorthand or standard form for React fragments
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-fragments.md
    'react/jsx-fragments': 'error',

    // Disallow unnecessary fragments
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-useless-fragment.md
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],

    // Turned off with the new JSX transform
    // https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope.md
    'react/react-in-jsx-scope': 'off',

    // Prevent react contexts from taking non-stable values
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-constructed-context-values.md
    'react/jsx-no-constructed-context-values': 'error',

    // Prevent usage of dangerous JSX properties
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger.md
    'react/no-danger': 'error',

    // Enforce sandbox attribute on iframe elements (disabled)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/iframe-missing-sandbox.md
    'react/iframe-missing-sandbox': 'off',

    // Prevent usage of button elements without an explicit type attribute
    // https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type.md
    'react/button-has-type': ['error', { reset: false }],

    // Disallow javascript: URLs in JSX (XSS prevention)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-script-url.md
    'react/jsx-no-script-url': 'error',

    // Disallow children on void DOM elements (<br>, <img>, <input>, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/void-dom-elements-no-children.md
    'react/void-dom-elements-no-children': 'error',

    // Disallow spreading the same props object multiple times
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spread-multi.md
    'react/jsx-props-no-spread-multi': 'error',

    // Require onChange or readOnly on checked inputs
    // https://oxc.rs/docs/guide/usage/linter/rules/react/checked-requires-onchange-or-readonly.md
    'react/checked-requires-onchange-or-readonly': 'error',

    // Disallow React.Children API (use props instead)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-react-children.md
    'react/no-react-children': 'error',

    // Enforce [value, setValue] naming convention for useState
    // https://oxc.rs/docs/guide/usage/linter/rules/react/hook-use-state.md
    'react/hook-use-state': 'error',

    // Prefer function components over class components
    // https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-function-component.md
    'react/prefer-function-component': 'error',

    // Enforce arrow functions for components: matches the dominant convention
    // https://oxc.rs/docs/guide/usage/linter/rules/react/function-component-definition.md
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],

    // Prevent setState in componentDidUpdate (infinite re-render risk)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-update-set-state.md
    'react/no-did-update-set-state': ['error', 'disallow-in-func'],

    // Disallow object/array/function as default values for destructured props (defeats memoization)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-object-type-as-default-prop.md
    'react/no-object-type-as-default-prop': 'error',

    // Disallow defining components inside other components (causes remount on every render)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-unstable-nested-components.md
    'react/no-unstable-nested-components': 'error',

    // Disallow using Array index as key: causes bugs on reorder/filter
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-array-index-key.md
    'react/no-array-index-key': 'error',

    // Disallow React.cloneElement: anti-pattern, prefer composition
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-clone-element.md
    'react/no-clone-element': 'error',

    // Disallow direct mutation of this.state
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-direct-mutation-state.md
    'react/no-direct-mutation-state': 'error',

    // Disallow findDOMNode: removed in React 19
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-find-dom-node.md
    'react/no-find-dom-node': 'error',

    // Disallow isMounted, a removed API
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-is-mounted.md
    'react/no-is-mounted': 'error',

    // Prevent setState in componentDidMount (double render)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-mount-set-state.md
    'react/no-did-mount-set-state': ['error', 'disallow-in-func'],

    // Disallow this in stateless functional components
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-this-in-sfc.md
    'react/no-this-in-sfc': 'error',

    // Disallow UNSAFE_ lifecycle methods: removed in React 19
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-unsafe.md
    'react/no-unsafe': ['error', { checkAliases: true }],

    // Require forwardRef to actually use the ref parameter
    // https://oxc.rs/docs/guide/usage/linter/rules/react/forward-ref-uses-ref.md
    'react/forward-ref-uses-ref': 'error',

    // Only export components, to keep Fast Refresh (HMR). An object of components such as `{ Root, Item }` counts as one
    // https://oxc.rs/docs/guide/usage/linter/rules/react/only-export-components.md
    'react/only-export-components': [
      'error',
      {
        allowCompoundComponents: true,
        allowExportNames: [
          'metadata',
          'generateMetadata',
          'generateStaticParams',
          'loader',
          'action',
          'revalidate',
          'dynamic',
          'dynamicParams',
          'fetchCache',
          'runtime',
          'preferredRegion',
          'maxDuration',
          'generateViewport',
          'viewport'
        ]
      }
    ],

    // Require displayName on components: too noisy on memo/forwardRef
    // https://oxc.rs/docs/guide/usage/linter/rules/react/display-name.md
    'react/display-name': 'off',

    // Disallow namespaced JSX elements: not supported in React
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-namespace.md
    'react/no-namespace': 'error',

    // Prevent multiple components per file: too strict for helpers
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-multi-comp.md
    'react/no-multi-comp': 'off',

    // Name a handler handle* and its prop on*
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-handler-names.md
    'react/jsx-handler-names': 'error',

    // Disallow JSX prop spreading: too restrictive for wrappers/design systems
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': 'off',

    // Enforce maximum JSX depth: too arbitrary
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-max-depth.md
    'react/jsx-max-depth': 'off',

    // Forbid specific props on DOM elements: project-specific
    // https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-dom-props.md
    'react/forbid-dom-props': 'off',

    // Forbid specific elements: project-specific
    // https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-elements.md
    'react/forbid-elements': 'off',

    // Disallow all setState: too extreme
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-set-state.md
    'react/no-set-state': 'off',

    // Prefer ES6 classes over createReactClass: redundant with prefer-function-component
    // https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-es6-class.md
    'react/prefer-es6-class': 'off',

    // The react/prefer-function-component rule allows an error boundary alone, which never needs shouldComponentUpdate
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-redundant-should-component-update.md
    'react/no-redundant-should-component-update': 'off',

    // Enforce state initialization location: stylistic, class components only
    // https://oxc.rs/docs/guide/usage/linter/rules/react/state-in-constructor.md
    'react/state-in-constructor': 'off',

    // Forbid specific props on custom components: too project-specific
    // https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-component-props.md
    'react/forbid-component-props': 'off',

    // Disallow destructured imports from React and ReactDOM
    // Use `import React from 'react'` instead of `import { useState } from 'react'`
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-imports.md
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
    ],

    // React Compiler family (replaces react/react-compiler, removed in oxlint 1.79)
    // The full compiler pass runs once per file as soon as one rule below is on, and the other rules share it
    // None of these rules accept options.

    // Disallow setting state during render: infinite render loops
    // https://oxc.rs/docs/guide/usage/linter/rules/react/set-state-in-render.md
    'react/set-state-in-render': 'error',

    // Disallow synchronous setState inside an effect: extra render pass
    // https://oxc.rs/docs/guide/usage/linter/rules/react/set-state-in-effect.md
    'react/set-state-in-effect': 'error',

    // Disallow reading or writing ref.current during render: silently stale UI
    // https://oxc.rs/docs/guide/usage/linter/rules/react/refs.md
    'react/refs': 'error',

    // Disallow known-impure calls during render (Math.random, Date.now): hydration mismatches
    // https://oxc.rs/docs/guide/usage/linter/rules/react/purity.md
    'react/purity': 'error',

    // Disallow mutating props, state and hook values: stale UI and lost updates
    // https://oxc.rs/docs/guide/usage/linter/rules/react/immutability.md
    'react/immutability': 'error',

    // Disallow assigning to or mutating module-scope values during render
    // https://oxc.rs/docs/guide/usage/linter/rules/react/globals.md
    'react/globals': 'error',

    // Disallow components recreated on every render, such as the factory-built components that no-unstable-nested-components cannot see
    // https://oxc.rs/docs/guide/usage/linter/rules/react/static-components.md
    'react/static-components': 'error',

    // Disallow useMemo callbacks with no returned or unused value: side effect in disguise
    // https://oxc.rs/docs/guide/usage/linter/rules/react/void-use-memo.md
    'react/void-use-memo': 'error',

    // Disallow async or generator useMemo callbacks: memoizes a Promise
    // https://oxc.rs/docs/guide/usage/linter/rules/react/use-memo.md
    'react/use-memo': 'error',

    // Require error boundaries over try/catch around JSX: the catch never fires
    // https://oxc.rs/docs/guide/usage/linter/rules/react/error-boundaries.md
    'react/error-boundaries': 'error',

    // Disallow calling capitalized functions instead of rendering them as JSX
    // https://oxc.rs/docs/guide/usage/linter/rules/react/capitalized-calls.md
    'react/capitalized-calls': 'error',

    // Only meaningful when the React Compiler runs at build time: it reports code that the compiler declines to optimize, not runtime bugs
    // https://oxc.rs/docs/guide/usage/linter/rules/react/preserve-manual-memoization.md
    'react/preserve-manual-memoization': 'off',

    // Flags every legitimate use of TanStack Table/Virtual and react-hook-form watch()
    // https://oxc.rs/docs/guide/usage/linter/rules/react/incompatible-library.md
    'react/incompatible-library': 'off',

    // The hooks config declares react/hooks, exhaustive-effect-dependencies, memo-dependencies and no-deriving-state-in-effects

    // Reports React Compiler bugs, not user code: nothing actionable
    // https://oxc.rs/docs/guide/usage/linter/rules/react/invariant.md
    'react/invariant': 'off',

    // Suppression hygiene is already covered by unicorn/no-abusive-eslint-disable and options.reportUnusedDisableDirectives
    // https://oxc.rs/docs/guide/usage/linter/rules/react/rule-suppression.md
    'react/rule-suppression': 'off',

    // Report invalid JavaScript seen by the React Compiler
    // https://oxc.rs/docs/guide/usage/linter/rules/react/syntax.md
    'react/syntax': 'error',

    // Compiler bail-outs, not violations: upstream ships it off by default
    // https://oxc.rs/docs/guide/usage/linter/rules/react/todo.md
    'react/todo': 'off',

    // Report syntax the React Compiler cannot optimize (eval and friends)
    // https://oxc.rs/docs/guide/usage/linter/rules/react/unsupported-syntax.md
    'react/unsupported-syntax': 'error',

    // Disallow unwrapped string literals in JSX: too noisy without full i18n coverage
    // https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-literals.md
    'react/jsx-no-literals': 'off',

    // Type the props parameter of a component, never the component through `FC`
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-restricted-types.md
    '@typescript-eslint/no-restricted-types': [
      'error',
      { types: restrictedComponentTypes }
    ],

    // Render a conditional child with `cond ? <X /> : null`, never `&&`: a falsy `0` renders
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-leaked-render
    'viclafouch/no-leaked-render': 'error',

    // Render a context as `<ThemeContext value={x}>`, never `<ThemeContext.Provider>`
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-context-provider
    'viclafouch/no-context-provider': 'error',

    // Pass `ref` as a prop, never through `forwardRef` from react
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-forward-ref
    'viclafouch/no-forward-ref': 'error',

    // Keep sibling JSX elements on consecutive lines, with no blank line between them
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#jsx-blank-line
    'viclafouch/jsx-blank-line': 'error',

    // React Doctor: the Effects that the React Compiler rules do not see

    // Disallow an Effect that hands the data of the child to a parent callback
    // https://www.react.doctor/prompts/rules/react-doctor/no-pass-data-to-parent.md
    'react-doctor/no-pass-data-to-parent': 'error',

    // Disallow an Effect that pushes a local state to a parent callback
    // https://www.react.doctor/prompts/rules/react-doctor/no-pass-live-state-to-parent.md
    'react-doctor/no-pass-live-state-to-parent': 'error',

    // Disallow an Effect that resets or adjusts a state when a prop changes: use a key or derive it
    // https://www.react.doctor/prompts/rules/react-doctor/no-adjust-state-on-prop-change.md
    'react-doctor/no-adjust-state-on-prop-change': 'error',

    // Misses a cleanup that runs in a loop or clears a reassigned timer id, thus flags correct Effects
    // https://www.react.doctor/prompts/rules/react-doctor/effect-needs-cleanup.md
    'react-doctor/effect-needs-cleanup': 'off',

    // Disallow an Effect that sets the state another Effect watches: compute the next state in the handler
    // https://www.react.doctor/prompts/rules/react-doctor/no-effect-chain.md
    'react-doctor/no-effect-chain': 'error',

    // Repeats no-pass-data-to-parent and no-pass-live-state-to-parent on the same Effect
    // https://www.react.doctor/prompts/rules/react-doctor/no-prop-callback-in-effect.md
    'react-doctor/no-prop-callback-in-effect': 'off',

    // Repeats react/no-deriving-state-in-effects of the hooks config
    // https://www.react.doctor/prompts/rules/react-doctor/no-derived-state-effect.md
    'react-doctor/no-derived-state-effect': 'off',

    // React Doctor: the secrets that ship to the browser

    // Disallow a secret in a file that ships to the browser
    // https://www.react.doctor/prompts/rules/react-doctor/no-secrets-in-client-code.md
    'react-doctor/no-secrets-in-client-code': 'error',

    // Disallow an auth token in localStorage or sessionStorage: any XSS reads it
    // https://www.react.doctor/prompts/rules/react-doctor/auth-token-in-web-storage.md
    'react-doctor/auth-token-in-web-storage': 'error',

    // Prevent setState in componentWillUpdate
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-will-update-set-state.md
    'react/no-will-update-set-state': 'error',

    // No class component, and the rule is in nursery
    // https://oxc.rs/docs/guide/usage/linter/rules/react/require-render-return.md
    'react/require-render-return': 'off'
  },
  overrides: [
    {
      // JSX in .tsx files instead of .jsx
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }]
      }
    },
    {
      files: ['**/*.tsx'],
      rules: {
        // Name the props type of a component after it: `ButtonProps` for `Button`
        // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#component-props-name
        'viclafouch/component-props-name': 'error'
      }
    }
  ]
} satisfies OxlintConfig
