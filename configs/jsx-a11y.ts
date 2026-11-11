import type { OxlintConfig } from 'oxlint'

/**
 * JSX accessibility rules (WCAG compliance).
 * For web projects only: omit for React Native.
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, jsxA11y, imports]
 * ```
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
  rules: {
    // Enforce alt text for elements that require it
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/alt-text.md
    'jsx-a11y/alt-text': ['error', { 'input[type="image"]': [] }],

    // Enforce anchors have content
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-has-content.md
    'jsx-a11y/anchor-has-content': 'error',

    // Enforce valid anchor elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': [
      'error',
      { aspects: ['noHref', 'invalidHref', 'preferButton'] }
    ],

    // Enforce aria-activedescendant has tabindex
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-activedescendant-has-tabindex.md
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',

    // Enforce valid ARIA props
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-props.md
    'jsx-a11y/aria-props': 'error',

    // Enforce valid ARIA prop values
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-proptypes.md
    'jsx-a11y/aria-proptypes': 'error',

    // Enforce valid ARIA role
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-role.md
    'jsx-a11y/aria-role': 'error',

    // Enforce ARIA state and property values are valid
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-unsupported-elements.md
    'jsx-a11y/aria-unsupported-elements': 'error',

    // Enforce click handlers have key events
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/click-events-have-key-events.md
    'jsx-a11y/click-events-have-key-events': 'error',

    // Enforce heading has content
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content.md
    'jsx-a11y/heading-has-content': ['error', { components: [] }],

    // Enforce html element has lang
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang.md
    'jsx-a11y/html-has-lang': 'error',

    // Enforce iframe has title
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/iframe-has-title.md
    'jsx-a11y/iframe-has-title': 'error',

    // Enforce img alt does not contain the word image, picture, or photo
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt.md
    'jsx-a11y/img-redundant-alt': 'error',

    // Enforce label has associated control
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control.md
    'jsx-a11y/label-has-associated-control': 'error',

    // Disallow requiring captions for video / audio
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption.md
    'jsx-a11y/media-has-caption': 'off',

    // Enforce mouse events have key events
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/mouse-events-have-key-events.md
    'jsx-a11y/mouse-events-have-key-events': 'error',

    // Enforce no access key
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-access-key.md
    'jsx-a11y/no-access-key': 'error',

    // Enforce no autofocus
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus.md
    'jsx-a11y/no-autofocus': 'error',

    // Enforce no distracting elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements.md
    'jsx-a11y/no-distracting-elements': [
      'error',
      { elements: ['marquee', 'blink'] }
    ],

    // Enforce redundant roles are not used
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-redundant-roles.md
    'jsx-a11y/no-redundant-roles': 'error',

    // Enforce non-interactive elements have no role
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions.md
    'jsx-a11y/no-static-element-interactions': ['error', { handlers: [] }],

    // Enforce role attribute has required ARIA props
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-has-required-aria-props.md
    'jsx-a11y/role-has-required-aria-props': 'error',

    // Enforce role supports required ARIA props
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-supports-aria-props.md
    'jsx-a11y/role-supports-aria-props': 'error',

    // Enforce scope prop is only used on th elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/scope.md
    'jsx-a11y/scope': 'error',

    // Enforce tabIndex value is not greater than zero
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/tabindex-no-positive.md
    'jsx-a11y/tabindex-no-positive': 'error',

    // Enforce interactive elements with click handlers are keyboard-accessible
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/interactive-supports-focus.md
    'jsx-a11y/interactive-supports-focus': 'error',

    // Enforce tabIndex on non-interactive elements is not positive
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex.md
    'jsx-a11y/no-noninteractive-tabindex': 'error',

    // Prefer semantic HTML tags over ARIA roles
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/prefer-tag-over-role.md
    'jsx-a11y/prefer-tag-over-role': 'error',

    // Disallow adding interactive roles to non-interactive elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-to-interactive-role.md
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: ['menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: [
          'menuitem',
          'menuitemcheckbox',
          'menuitemradio',
          'row',
          'tab',
          'treeitem'
        ],
        fieldset: ['radiogroup', 'presentation']
      }
    ],

    // Disallow adding non-interactive roles to interactive elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-interactive-element-to-noninteractive-role.md
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',

    // Disallow event handlers on non-interactive elements without a role
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-interactions.md
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: []
      }
    ],

    // Require interactive controls to have an accessible label
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/control-has-associated-label.md
    'jsx-a11y/control-has-associated-label': [
      'error',
      { ignoreElements: [], ignoreRoles: [] }
    ],

    // Disallow ambiguous link text ("click here", "learn more")
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-ambiguous-text.md
    'jsx-a11y/anchor-ambiguous-text': 'error',

    // Require a valid value on the autocomplete attribute
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/autocomplete-valid.md
    'jsx-a11y/autocomplete-valid': 'error',

    // Require a valid BCP 47 language tag on the lang prop of <html>
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/lang.md
    'jsx-a11y/lang': 'error',

    // Disallow aria-hidden="true" on a focusable element
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-aria-hidden-on-focusable.md
    'jsx-a11y/no-aria-hidden-on-focusable': 'error'
  }
} satisfies OxlintConfig
