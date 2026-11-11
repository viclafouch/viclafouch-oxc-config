import type { OxlintConfig } from 'oxlint'
import { NEXT_ROUTE_FILES } from './globs/index.ts'
import { REACT_DOCTOR_PLUGIN } from './js-plugins/index.ts'

/**
 * Next.js specific rules (App Router, pages, fonts, scripts).
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, jsxA11y, next, imports]
 * ```
 */
export default {
  plugins: ['nextjs'],
  jsPlugins: [REACT_DOCTOR_PLUGIN],
  rules: {
    // Enforce font-display property on Google Fonts
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/google-font-display.md
    'nextjs/google-font-display': 'error',

    // Enforce preconnect is used with Google Fonts
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/google-font-preconnect.md
    'nextjs/google-font-preconnect': 'error',

    // Enforce id attribute on next/script components with inline content
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/inline-script-id.md
    'nextjs/inline-script-id': 'error',

    // Enforce next/script is used for Google Analytics
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/next-script-for-ga.md
    'nextjs/next-script-for-ga': 'error',

    // Disallow assignment to the module variable
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-assign-module-variable.md
    'nextjs/no-assign-module-variable': 'error',

    // Disallow async client components
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-async-client-component.md
    'nextjs/no-async-client-component': 'error',

    // Disallow next/script's beforeInteractive strategy outside of _document (disabled - App Router only)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-before-interactive-script-outside-document.md
    'nextjs/no-before-interactive-script-outside-document': 'off',

    // Disallow manual stylesheet tags
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-css-tags.md
    'nextjs/no-css-tags': 'error',

    // Disallow importing next/document outside of pages/_document.js (disabled - App Router only)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-document-import-in-page.md
    'nextjs/no-document-import-in-page': 'off',

    // Disallow duplicate usage of <Head> in pages/_document.js (disabled - App Router only)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-duplicate-head.md
    'nextjs/no-duplicate-head': 'off',

    // Disallow using <head> element (disabled - App Router uses metadata export)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-head-element.md
    'nextjs/no-head-element': 'off',

    // Disallow importing next/head in pages/_document.js (disabled - App Router only)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-head-import-in-document.md
    'nextjs/no-head-import-in-document': 'off',

    // Disallow using <a> for internal Next.js links (disabled - too many false positives)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-html-link-for-pages.md
    'nextjs/no-html-link-for-pages': 'off',

    // Disallow using <img> element
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-img-element.md
    'nextjs/no-img-element': 'error',

    // Disallow using custom font in page-level only
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-page-custom-font.md
    'nextjs/no-page-custom-font': 'off',

    // Disallow using next/script inside next/head (disabled - App Router uses metadata)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-script-component-in-head.md
    'nextjs/no-script-component-in-head': 'off',

    // Disallow using styled-jsx in pages/_document.js (disabled - no _document, no styled-jsx)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-styled-jsx-in-document.md
    'nextjs/no-styled-jsx-in-document': 'off',

    // Disallow synchronous scripts (disabled - next/script handles this)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-sync-scripts.md
    'nextjs/no-sync-scripts': 'off',

    // Disallow using <title> with Head component outside of pages/_document.js (disabled - App Router only)
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-title-in-document-head.md
    'nextjs/no-title-in-document-head': 'off',

    // Disallow common typos in Next.js data fetching functions
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-typos.md
    'nextjs/no-typos': 'error',

    // Disallow unwanted polyfill.io usage
    // https://oxc.rs/docs/guide/usage/linter/rules/nextjs/no-unwanted-polyfillio.md
    'nextjs/no-unwanted-polyfillio': 'error',

    // Flags a dynamic route, where useSearchParams renders on the server, and next build already fails a prerendered one
    // https://www.react.doctor/prompts/rules/react-doctor/nextjs-no-use-search-params-without-suspense.md
    'react-doctor/nextjs-no-use-search-params-without-suspense': 'off',

    // Disallow redirect() and notFound() in a try block: the catch swallows the navigation
    // https://www.react.doctor/prompts/rules/react-doctor/nextjs-no-redirect-in-try-catch.md
    'react-doctor/nextjs-no-redirect-in-try-catch': 'error',

    // Override anchor-is-valid for Next Link component
    // https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ]
  },
  overrides: [
    {
      // Next.js loads each route file of the App Router and of the Pages Router through the default export
      files: [...NEXT_ROUTE_FILES],
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ]
} satisfies OxlintConfig
