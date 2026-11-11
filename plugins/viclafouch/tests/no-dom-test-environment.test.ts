import { RuleTester } from 'oxlint/plugins-dev'
import { noDomTestEnvironment } from '../rules/no-dom-test-environment'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

const PRAGMA = ['@vitest', 'environment'].join('-')

ruleTester.run('no-dom-test-environment', noDomTestEnvironment, {
  valid: [
    {
      name: 'a browser mode render',
      code: "import { render } from 'vitest-browser-react'"
    },
    {
      name: 'a package whose name starts with jsdom',
      code: "import { setup } from 'jsdom-testing-mocks'"
    },
    {
      name: 'the pragma name in a string',
      code: `const label = '${PRAGMA}'`
    }
  ],
  invalid: [
    {
      name: 'a jsdom pragma',
      code: `/**\n * ${PRAGMA} jsdom\n */\nimport { render } from '@testing-library/react'`,
      errors: [{ messageId: 'domEnvironment', line: 1 }]
    },
    {
      name: 'a node pragma',
      code: `// ${PRAGMA} node\nimport { sum } from './sum'`,
      errors: [{ messageId: 'domEnvironment', line: 1 }]
    },
    {
      name: 'an import of jsdom',
      code: "import { JSDOM } from 'jsdom'",
      errors: [{ messageId: 'domEnvironment' }]
    },
    {
      name: 'an import of a happy-dom subpath',
      code: "import { Window } from 'happy-dom/lib/window'",
      errors: [{ messageId: 'domEnvironment' }]
    },
    {
      name: 'a dynamic import of jsdom',
      code: "const { JSDOM } = await import('jsdom')",
      errors: [{ messageId: 'domEnvironment' }]
    },
    {
      name: 'a require of happy-dom',
      code: "const { Window } = require('happy-dom')",
      errors: [{ messageId: 'domEnvironment' }]
    },
    {
      name: 'an import-equals require of jsdom',
      filename: 'setup.ts',
      code: "import jsdom = require('jsdom')",
      errors: [{ messageId: 'domEnvironment' }]
    },
    {
      name: 'a re-export of jsdom',
      code: "export { JSDOM } from 'jsdom'",
      errors: [{ messageId: 'domEnvironment' }]
    }
  ]
})
