import type { OxlintConfig } from 'oxlint'

/**
 * Next.js configuration for oxlint.
 *
 * Migrated from `next.mjs`.
 * All recommended @next/eslint-plugin-next rules are listed explicitly.
 *
 * Consumers must compose this with other configs via `extends`:
 *   extends: [typescript, react, hooks, jsxA11y, next, imports]
 */
export default {
  plugins: ['nextjs'],
  categories: {
    correctness: 'error'
  },
  rules: {
    // Enforce font-display property on Google Fonts
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/google-font-display
    'nextjs/google-font-display': 'error',

    // Enforce preconnect is used with Google Fonts
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/google-font-preconnect
    'nextjs/google-font-preconnect': 'error',

    // Enforce id attribute on next/script components with inline content
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/inline-script-id
    'nextjs/inline-script-id': 'error',

    // Enforce next/script is used for Google Analytics
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/next-script-for-ga
    'nextjs/next-script-for-ga': 'error',

    // Disallow assignment to the module variable
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-assign-module-variable
    'nextjs/no-assign-module-variable': 'error',

    // Disallow async client components
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-async-client-component
    'nextjs/no-async-client-component': 'error',

    // Disallow next/script's beforeInteractive strategy outside of _document
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-before-interactive-script-outside-document
    'nextjs/no-before-interactive-script-outside-document': 'error',

    // Disallow manual stylesheet tags
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-css-tags
    'nextjs/no-css-tags': 'error',

    // Disallow importing next/document outside of pages/_document.js
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-document-import-in-page
    'nextjs/no-document-import-in-page': 'error',

    // Disallow duplicate usage of <Head> in pages/_document.js
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-duplicate-head
    'nextjs/no-duplicate-head': 'error',

    // Disallow using <head> element
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-head-element
    'nextjs/no-head-element': 'error',

    // Disallow importing next/head in pages/_document.js
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-head-import-in-document
    'nextjs/no-head-import-in-document': 'error',

    // Disallow using <a> for internal Next.js links
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-html-link-for-pages
    'nextjs/no-html-link-for-pages': 'error',

    // Disallow using <img> element
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-img-element
    'nextjs/no-img-element': 'error',

    // Disallow using custom font in page-level only
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-page-custom-font
    'nextjs/no-page-custom-font': 'off',

    // Disallow using next/script inside next/head
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-script-component-in-head
    'nextjs/no-script-component-in-head': 'error',

    // Disallow using styled-jsx in pages/_document.js
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-styled-jsx-in-document
    'nextjs/no-styled-jsx-in-document': 'error',

    // Disallow synchronous scripts
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-sync-scripts
    'nextjs/no-sync-scripts': 'error',

    // Disallow using <title> with Head component outside of pages/_document.js
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-title-in-document-head
    'nextjs/no-title-in-document-head': 'error',

    // Disallow common typos in Next.js data fetching functions
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-typos
    'nextjs/no-typos': 'error',

    // Disallow unwanted polyfill.io usage
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-unwanted-polyfillio
    'nextjs/no-unwanted-polyfillio': 'error',

    // Override anchor-is-valid for Next Link component
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ]
  }
} satisfies OxlintConfig
