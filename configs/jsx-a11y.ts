import type { OxlintConfig } from 'oxlint'

/**
 * JSX accessibility rules (WCAG compliance).
 * For web projects only — omit for React Native.
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
  categories: {
    correctness: 'error'
  },
  rules: {
    // Enforce alt text for elements that require it
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/alt-text
    'jsx-a11y/alt-text': [
      'error',
      {
        area: [],
        img: [],
        'input[type="image"]': [],
        object: []
      }
    ],

    // Enforce anchors have content
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-has-content
    'jsx-a11y/anchor-has-content': 'error',

    // Enforce valid anchor elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [],
        specialLink: [],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],

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
    'jsx-a11y/aria-role': [
      'error',
      {
        allowedInvalidRoles: [],
        ignoreNonDOM: false
      }
    ],

    // Enforce ARIA state and property values are valid
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-unsupported-elements
    'jsx-a11y/aria-unsupported-elements': 'error',

    // Enforce click handlers have key events
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/click-events-have-key-events
    'jsx-a11y/click-events-have-key-events': 'error',

    // Enforce heading has content
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content
    'jsx-a11y/heading-has-content': ['error', { components: [] }],

    // Enforce html element has lang
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang
    'jsx-a11y/html-has-lang': 'error',

    // Enforce iframe has title
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/iframe-has-title
    'jsx-a11y/iframe-has-title': 'error',

    // Enforce img alt does not contain the word image, picture, or photo
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt
    'jsx-a11y/img-redundant-alt': [
      'error',
      {
        components: ['img'],
        words: ['image', 'photo', 'picture']
      }
    ],

    // Enforce label has associated control
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
        controlComponents: [],
        depth: 2,
        labelAttributes: ['alt', 'aria-label', 'aria-labelledby'],
        labelComponents: ['label']
      }
    ],

    // Disallow requiring captions for video / audio
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption
    'jsx-a11y/media-has-caption': [
      'off',
      {
        audio: ['audio'],
        track: ['track'],
        video: ['video']
      }
    ],

    // Enforce mouse events have key events
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/mouse-events-have-key-events
    'jsx-a11y/mouse-events-have-key-events': [
      'error',
      {
        hoverInHandlers: ['onMouseOver'],
        hoverOutHandlers: ['onMouseOut']
      }
    ],

    // Enforce no access key
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-access-key
    'jsx-a11y/no-access-key': 'error',

    // Enforce no autofocus
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus
    'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: false }],

    // Enforce no distracting elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements
    'jsx-a11y/no-distracting-elements': [
      'error',
      { elements: ['marquee', 'blink'] }
    ],

    // Enforce redundant roles are not used
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-redundant-roles
    'jsx-a11y/no-redundant-roles': ['error', { allowedRedundantRoles: [] }],

    // Enforce non-interactive elements have no role
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        allowExpressionValues: false,
        handlers: []
      }
    ],

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

    // Enforce interactive elements with click handlers are keyboard-accessible
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/interactive-supports-focus
    'jsx-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: [
          'button',
          'checkbox',
          'link',
          'searchbox',
          'spinbutton',
          'switch',
          'textbox'
        ]
      }
    ],

    // Enforce tabIndex on non-interactive elements is not positive
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        allowExpressionValues: true,
        roles: ['tabpanel'],
        tags: []
      }
    ],

    // Prefer semantic HTML tags over ARIA roles
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/prefer-tag-over-role
    // OFF: too many legitimate cases where role is needed (custom components, UI libs)
    'jsx-a11y/prefer-tag-over-role': 'off',

    // Disallow adding interactive roles to non-interactive elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-to-interactive-role
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',

    // Disallow adding non-interactive roles to interactive elements
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-interactive-element-to-noninteractive-role
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',

    // Disallow event handlers on non-interactive elements without a role
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-interactions
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: []
      }
    ],

    // Require interactive controls to have an accessible label
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/control-has-associated-label
    'jsx-a11y/control-has-associated-label': [
      'error',
      {
        labelAttributes: [],
        controlComponents: [],
        ignoreElements: [],
        ignoreRoles: [],
        depth: 2
      }
    ],

    // Disallow ambiguous link text ("click here", "learn more")
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-ambiguous-text
    'jsx-a11y/anchor-ambiguous-text': [
      'error',
      {
        words: ['click here', 'here', 'link', 'a link', 'learn more']
      }
    ]
  }
} satisfies OxlintConfig
