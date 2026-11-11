import { RuleTester } from 'oxlint/plugins-dev'
import { noModuleStore } from '../rules/no-module-store'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('no-module-store', noModuleStore, {
  valid: [
    {
      name: 'a store context at module scope',
      code: [
        "import { createStoreContext } from '@tanstack/react-store'",
        'export const { StoreProvider, useStoreContext } = createStoreContext()'
      ].join('\n')
    },
    {
      name: 'a store created inside a component',
      code: [
        "import { createStore } from '@tanstack/react-store'",
        'const Panel = () => {',
        '  const [store] = useState(() => createStore({ isOpen: false }))',
        '  return <Drawer store={store} />',
        '}'
      ].join('\n')
    },
    {
      name: 'a store created by a factory function',
      code: [
        "import { createStore } from '@tanstack/store'",
        'export function createCartStore() {',
        '  return createStore({ items: [] })',
        '}'
      ].join('\n')
    },
    {
      name: 'a createStore of another package',
      code: "import { createStore } from 'zustand/vanilla'\nexport const store = createStore(() => ({}))"
    }
  ],
  invalid: [
    {
      name: 'a store at module scope',
      code: [
        "import { createStore } from '@tanstack/react-store'",
        'export const cartStore = createStore({ items: [] })'
      ].join('\n'),
      errors: [{ messageId: 'moduleStore' }]
    },
    {
      name: 'a store at module scope through a namespace import',
      code: [
        "import * as Store from '@tanstack/store'",
        'export const cartStore = Store.createStore({ items: [] })'
      ].join('\n'),
      errors: [{ messageId: 'moduleStore' }]
    },
    {
      name: 'an atom at module scope',
      code: [
        "import { createAtom } from '@tanstack/store'",
        'export const countAtom = createAtom(0)'
      ].join('\n'),
      errors: [{ messageId: 'moduleStore' }]
    },
    {
      name: 'a store in a block at module scope',
      code: [
        "import { createStore } from '@tanstack/react-store'",
        'let cartStore',
        '{',
        '  cartStore = createStore({ items: [] })',
        '}'
      ].join('\n'),
      errors: [{ messageId: 'moduleStore' }]
    }
  ]
})
