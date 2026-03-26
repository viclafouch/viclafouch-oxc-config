import type { OxlintConfig } from 'oxlint'

/**
 * JSX Accessibility configuration for oxlint.
 *
 * Migrated from `rules/jsx-a11y.mjs`.
 * Uses the jsx-a11y recommended rules from oxlint + custom overrides.
 */
export default {
  plugins: ['jsx-a11y'],
  settings: {
    'jsx-a11y': {
      attributes: {},
      components: {},
      polymorphicPropName: ''
    }
  },
  categories: {
    correctness: 'error'
  },
  rules: {
    // Enforce alt text for elements that require it
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/alt-text
    'jsx-a11y/alt-text': 'error',

    // Enforce anchors have content
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-has-content
    'jsx-a11y/anchor-has-content': 'error',

    // Enforce valid anchor elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid
    'jsx-a11y/anchor-is-valid': 'error',

    // Enforce aria-activedescendant has tabindex
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-activedescendant-has-tabindex
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',

    // Enforce valid ARIA props
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-props
    'jsx-a11y/aria-props': 'error',

    // Enforce valid ARIA prop values
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-proptypes
    'jsx-a11y/aria-proptypes': 'error',

    // Enforce valid ARIA role
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-role
    'jsx-a11y/aria-role': 'error',

    // Enforce ARIA state and property values are valid
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-unsupported-elements
    'jsx-a11y/aria-unsupported-elements': 'error',

    // Enforce click handlers have key events
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/click-events-have-key-events
    'jsx-a11y/click-events-have-key-events': 'error',

    // Enforce heading has content
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content
    'jsx-a11y/heading-has-content': 'error',

    // Enforce html element has lang
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang
    'jsx-a11y/html-has-lang': 'error',

    // Enforce iframe has title
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/iframe-has-title
    'jsx-a11y/iframe-has-title': 'error',

    // Enforce img alt does not contain the word image, picture, or photo
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt
    'jsx-a11y/img-redundant-alt': 'error',

    // Enforce label has associated control
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control
    'jsx-a11y/label-has-associated-control': 'error',

    // Disallow requiring captions for video / audio
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption
    'jsx-a11y/media-has-caption': 'off',

    // Enforce mouse events have key events
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/mouse-events-have-key-events
    'jsx-a11y/mouse-events-have-key-events': 'error',

    // Enforce no access key
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-access-key
    'jsx-a11y/no-access-key': 'error',

    // Enforce no autofocus
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus
    'jsx-a11y/no-autofocus': 'error',

    // Enforce no distracting elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements
    'jsx-a11y/no-distracting-elements': 'error',

    // Enforce redundant roles are not used
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-redundant-roles
    'jsx-a11y/no-redundant-roles': 'error',

    // Enforce non-interactive elements have no role
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions
    'jsx-a11y/no-static-element-interactions': 'error',

    // Enforce role attribute has required ARIA props
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-has-required-aria-props
    'jsx-a11y/role-has-required-aria-props': 'error',

    // Enforce role supports required ARIA props
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-supports-aria-props
    'jsx-a11y/role-supports-aria-props': 'error',

    // Enforce scope prop is only used on th elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/scope
    'jsx-a11y/scope': 'error',

    // Enforce tabIndex value is not greater than zero
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/tabindex-no-positive
    'jsx-a11y/tabindex-no-positive': 'error',

    // Enforce tabIndex on non-interactive elements is not positive
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex
    'jsx-a11y/no-noninteractive-tabindex': 'error'
  }
} satisfies OxlintConfig
