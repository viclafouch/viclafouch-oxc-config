import { RuleTester } from 'oxlint/plugins-dev'
import { serverFunctionFile } from '../rules/server-function-file'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

const SERVER_FUNCTION = [
  "import { createServerFn } from '@tanstack/react-start'",
  "export const getUser = createServerFn({ method: 'GET' }).handler(() => findUser())"
].join('\n')

ruleTester.run('server-function-file', serverFunctionFile, {
  valid: [
    {
      name: 'a server function in a .functions.ts file',
      filename: '/app/src/server/user.functions.ts',
      code: SERVER_FUNCTION
    },
    {
      name: 'a server function in the -server folder of a route',
      filename: '/app/src/routes/events/-server/user.functions.ts',
      code: SERVER_FUNCTION
    },
    {
      name: 'a server function in a domain folder of src/server',
      filename: '/app/src/server/events/event.functions.ts',
      code: SERVER_FUNCTION
    },
    {
      name: 'a local function named createServerFn',
      filename: '/app/src/utils/user.ts',
      code: 'const createServerFn = () => null\ncreateServerFn()'
    },
    {
      name: 'a createServerFn of another package',
      filename: '/app/src/utils/user.ts',
      code: "import { createServerFn } from './rpc'\ncreateServerFn()"
    }
  ],
  invalid: [
    {
      name: 'a server function in a .functions.tsx file',
      filename: '/app/src/server/user.functions.tsx',
      code: SERVER_FUNCTION,
      errors: [{ messageId: 'serverFunctionFile' }]
    },
    {
      name: 'a .functions.ts file outside a server folder',
      filename: '/app/src/utils/user.functions.ts',
      code: SERVER_FUNCTION,
      errors: [{ messageId: 'serverFunctionFile' }]
    },
    {
      name: 'a server function through a namespace import',
      filename: '/app/src/queries/user.ts',
      code: [
        "import * as Start from '@tanstack/react-start'",
        'export const getUser = Start.createServerFn().handler(() => findUser())'
      ].join('\n'),
      errors: [{ messageId: 'serverFunctionFile' }]
    },
    {
      name: 'a server function in a .server.ts file',
      filename: '/app/src/server/user.server.ts',
      code: SERVER_FUNCTION,
      errors: [{ messageId: 'serverFunctionFile' }]
    },
    {
      name: 'a server function in a component file',
      filename: '/app/src/routes/-components/user-card.tsx',
      code: SERVER_FUNCTION,
      errors: [{ messageId: 'serverFunctionFile' }]
    },
    {
      name: 'a renamed import of createServerFn',
      filename: '/app/src/queries/user.ts',
      code: [
        "import { createServerFn as serverFn } from '@tanstack/react-start'",
        'export const getUser = serverFn().handler(() => findUser())'
      ].join('\n'),
      errors: [{ messageId: 'serverFunctionFile' }]
    }
  ]
})
