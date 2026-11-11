import { RuleTester } from 'oxlint/plugins-dev'
import { noNoopSubscribe } from '../rules/no-noop-subscribe'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

const IMPORT_REACT = "import { useSyncExternalStore } from 'react'\n"

ruleTester.run('no-noop-subscribe', noNoopSubscribe, {
  valid: [
    {
      name: 'a module subscribe that registers its listener',
      code: `${IMPORT_REACT}const subscribe = (onChange: () => void) => {
  document.addEventListener('visibilitychange', onChange)
  return () => {
    document.removeEventListener('visibilitychange', onChange)
  }
}
const isVisible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`
    },
    {
      name: 'an inline subscribe that registers its listener',
      code: `${IMPORT_REACT}const isOnline = useSyncExternalStore((onChange) => {
  window.addEventListener('online', onChange)
  return () => window.removeEventListener('online', onChange)
}, getSnapshot)`
    },
    {
      name: 'a subscribe that hands its listener to a store',
      code: `${IMPORT_REACT}const subscribe = (onChange: () => void) => store.subscribe(onChange)
const value = useSyncExternalStore(subscribe, store.getSnapshot)`
    },
    {
      name: 'a function declaration that registers its listener',
      code: `${IMPORT_REACT}function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true })
  return () => observer.disconnect()
}
const theme = useSyncExternalStore(subscribe, readTheme)`
    },
    {
      name: 'a subscribe that a store method gives',
      code: `${IMPORT_REACT}const value = useSyncExternalStore(store.subscribe, store.getSnapshot)`
    },
    {
      name: 'a subscribe imported from another module',
      code: `${IMPORT_REACT}import { subscribeToNothing } from './subscribe'
const value = useSyncExternalStore(subscribeToNothing, getSnapshot)`
    },
    {
      name: 'a subscribe passed as a parameter',
      code: `${IMPORT_REACT}const useStore = (subscribe: Subscribe) => useSyncExternalStore(subscribe, getSnapshot)`
    },
    {
      name: 'a subscribe that types this and registers its listener',
      code: `${IMPORT_REACT}function subscribe(this: void, onChange: () => void) {
  return store.subscribe(onChange)
}
const value = useSyncExternalStore(subscribe, getSnapshot)`
    },
    {
      name: 'a subscribe that forwards its arguments',
      code: `${IMPORT_REACT}function subscribe() {
  return store.subscribe(...arguments)
}
const value = useSyncExternalStore(subscribe, getSnapshot)`
    },
    {
      name: 'a declared subscribe with no body',
      code: `${IMPORT_REACT}declare function subscribe(onChange: () => void): () => void
const value = useSyncExternalStore(subscribe, getSnapshot)`
    },
    {
      name: 'a subscribe held in a let',
      code: `${IMPORT_REACT}let subscribe = () => () => {}
subscribe = realSubscribe
const value = useSyncExternalStore(subscribe, getSnapshot)`
    },
    {
      name: 'a useSyncExternalStore of another package',
      code: `import { useSyncExternalStore } from 'use-sync-external-store/shim'
const value = useSyncExternalStore(() => () => {}, getSnapshot)`
    },
    {
      name: 'a useSyncExternalStore read on a global React, with no import',
      code: 'const value = React.useSyncExternalStore(() => () => {}, getSnapshot)'
    },
    {
      name: 'a subscribe that ignores its listener, passed to another hook',
      code: `${IMPORT_REACT}const subscribeToNothing = () => () => {}
const value = useStore(subscribeToNothing, getSnapshot)`
    }
  ],
  invalid: [
    {
      name: 'an inline subscribe that returns an empty function',
      code: `${IMPORT_REACT}const isClient = useSyncExternalStore(() => () => {}, () => true, () => false)`,
      errors: [{ messageId: 'noopSubscribe', line: 2 }]
    },
    {
      name: 'a module subscribe that returns an empty function',
      code: `${IMPORT_REACT}const subscribeToNothing = () => {
  return () => {}
}
const isMac = useSyncExternalStore(subscribeToNothing, getIsMacOnClient, getIsMacOnServer)`,
      errors: [{ messageId: 'noopSubscribe', line: 5 }]
    },
    {
      name: 'a module subscribe that returns noop from es-toolkit',
      code: `${IMPORT_REACT}import { noop } from 'es-toolkit'
const subscribeToNothing = () => {
  return noop
}
const now = useSyncExternalStore(subscribeToNothing, getSnapshot, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 6 }]
    },
    {
      name: 'a subscribe that returns a noop of another module',
      code: `${IMPORT_REACT}import { doNothing } from './do-nothing'
const now = useSyncExternalStore(() => doNothing, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 3 }]
    },
    {
      name: 'a subscribe that returns a local noop',
      code: `${IMPORT_REACT}const noop = () => {}
const now = useSyncExternalStore(() => noop, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 3 }]
    },
    {
      name: 'a local noop passed as the subscribe',
      code: `${IMPORT_REACT}const noop = () => {}
const now = useSyncExternalStore(noop, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 3 }]
    },
    {
      name: 'a function declaration that ignores its listener',
      code: `${IMPORT_REACT}function subscribeToNothing() {
  return function unsubscribe() {}
}
const value = useSyncExternalStore(subscribeToNothing, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 5 }]
    },
    {
      name: 'a subscribe with an empty body',
      code: `${IMPORT_REACT}const value = useSyncExternalStore(() => {}, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 2 }]
    },
    {
      name: 'a subscribe that names its listener and never reads it',
      code: `${IMPORT_REACT}const subscribe = (_onChange: () => void) => () => {}
const platform = useSyncExternalStore(subscribe, () => navigator.platform, () => '')`,
      errors: [{ messageId: 'noopSubscribe', line: 3 }]
    },
    {
      name: 'a subscribe that types only this',
      code: `${IMPORT_REACT}function subscribe(this: void) {
  return () => {}
}
const value = useSyncExternalStore(subscribe, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 5 }]
    },
    {
      name: 'useSyncExternalStore read on a namespace import',
      code: `import * as React from 'react'
const value = React.useSyncExternalStore(() => () => {}, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 2 }]
    },
    {
      name: 'useSyncExternalStore read on a default import',
      code: `import React from 'react'
const value = React.useSyncExternalStore(() => () => {}, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 2 }]
    },
    {
      name: 'useSyncExternalStore imported under an alias',
      code: `import { useSyncExternalStore as useStore } from 'react'
const value = useStore(() => () => {}, getSnapshot)`,
      errors: [{ messageId: 'noopSubscribe', line: 2 }]
    },
    {
      name: 'a subscribe that ignores its listener inside a hook',
      code: `${IMPORT_REACT}export const useTimeValue = (readAt: (nowMs: number) => number) => {
  const getSnapshot = () => readAt(Date.now())
  return useSyncExternalStore(() => () => {}, getSnapshot, getSnapshot)
}`,
      errors: [{ messageId: 'noopSubscribe', line: 4 }]
    }
  ]
})
