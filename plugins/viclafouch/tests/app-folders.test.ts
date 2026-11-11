import { RuleTester } from 'oxlint/plugins-dev'
import { appFolders } from '../rules/app-folders'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

const CODE = 'export const value = 1'

ruleTester.run('app-folders', appFolders, {
  valid: [
    {
      name: 'a file at the root of src',
      filename: '/app/src/router.tsx',
      code: CODE
    },
    {
      name: 'a shared component of a domain',
      filename: '/app/src/components/event/event-card.tsx',
      code: CODE
    },
    {
      name: 'a server function of src',
      filename: '/app/src/server/event.functions.ts',
      code: CODE
    },
    {
      name: 'a route file',
      filename: '/app/src/routes/events/$eventId.tsx',
      code: CODE
    },
    {
      name: 'a query of a route',
      filename: '/app/src/routes/events/-queries/event.ts',
      code: CODE
    },
    {
      name: 'a domain folder inside the components of a route',
      filename: '/app/src/routes/events/-components/agenda/agenda-day.tsx',
      code: CODE
    },
    {
      name: 'a file of an app in a monorepo',
      filename: '/repo/apps/web/src/hooks/use-cart.ts',
      code: CODE
    },
    {
      name: 'a file outside src',
      filename: '/app/vite.config.ts',
      code: CODE
    }
  ],
  invalid: [
    {
      name: 'a helpers folder of src',
      filename: '/app/src/helpers/format.ts',
      code: CODE,
      errors: [{ messageId: 'sourceFolder' }]
    },
    {
      name: 'a ui folder of src',
      filename: '/app/src/ui/button.tsx',
      code: CODE,
      errors: [{ messageId: 'sourceFolder' }]
    },
    {
      name: 'a helpers folder of a route',
      filename: '/app/src/routes/events/-helpers/format.ts',
      code: CODE,
      errors: [{ messageId: 'routeFolder' }]
    },
    {
      name: 'a folder of a route without the shared name',
      filename: '/app/src/routes/-blocks/hero.tsx',
      code: CODE,
      errors: [{ messageId: 'routeFolder' }]
    }
  ]
})
