import { RuleTester } from 'oxlint/plugins-dev'
import { envFile } from '../rules/env-file'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

const ENV_READ = 'export const apiUrl = import.meta.env.VITE_API_URL'

ruleTester.run('env-file', envFile, {
  valid: [
    {
      name: 'the env file of the app',
      filename: '/app/src/env.ts',
      code: ENV_READ
    },
    {
      name: 'another property of import.meta',
      filename: '/app/src/utils/asset.ts',
      code: "export const assetUrl = new URL('./logo.svg', import.meta.url)"
    },
    {
      name: 'the parsed env of the app',
      filename: '/app/src/lib/naboo.ts',
      code: "import { env } from '#/env'\nexport const apiUrl = env.VITE_API_URL"
    }
  ],
  invalid: [
    {
      name: 'a read in a component',
      filename: '/app/src/components/event/event-map.tsx',
      code: ENV_READ,
      errors: [{ messageId: 'envFile' }]
    },
    {
      name: 'a read in an env.ts file outside the root of src',
      filename: '/app/src/routes/-utils/env.ts',
      code: ENV_READ,
      errors: [{ messageId: 'envFile' }]
    },
    {
      name: 'a read in a file named after env',
      filename: '/app/src/utils/server-env.ts',
      code: ENV_READ,
      errors: [{ messageId: 'envFile' }]
    }
  ]
})
