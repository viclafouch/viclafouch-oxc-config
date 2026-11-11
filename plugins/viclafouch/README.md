# viclafouch

The `viclafouch` plugin holds the frontend conventions that no native oxlint rule enforces.
`@viclafouch/oxc-config` ships the plugin, so you install nothing more.

## Rules

| Rule                                 | Config          | Files               |
| ------------------------------------ | --------------- | ------------------- |
| `app-folders`                        | `tanstackStart` | Files of `src/`     |
| `boolean-function-name`              | `typescript`    | All files           |
| `boolean-name`                       | `typescript`    | All files           |
| `comment-policy`                     | `typescript`    | All files           |
| `component-props-name`               | `react`         | `.tsx`              |
| `destructure-in-signature`           | `typescript`    | All files           |
| `env-file`                           | `tanstackStart` | All files           |
| `functional-update`                  | `hooks`         | All files           |
| `jsx-blank-line`                     | `react`         | All files, with JSX |
| `no-chained-type-assertions`         | `typescript`    | All files           |
| `no-context-provider`                | `react`         | All files, with JSX |
| `no-dom-test-environment`            | `vitest`        | Test files          |
| `no-forward-ref`                     | `react`         | All files           |
| `no-hookless-use-function`           | `hooks`         | All files           |
| `no-known-value-widening`            | `typescript`    | All files           |
| `no-leaked-render`                   | `react`         | All files, with JSX |
| `no-module-store`                    | `tanstackStart` | All files           |
| `no-noop-subscribe`                  | `hooks`         | All files           |
| `no-real-time-wait-in-tests`         | `vitest`        | Test files          |
| `no-test-timeout-or-unreasoned-skip` | `vitest`        | Test files          |
| `no-unknown-returns`                 | `typescript`    | All files           |
| `no-wall-clock-in-tests`             | `vitest`        | Test files          |
| `optional-last`                      | `typescript`    | All files           |
| `params-type-name`                   | `typescript`    | All files           |
| `query-naming`                       | `tanstackQuery` | All files           |
| `require-suppression-reason`         | `typescript`    | All files           |
| `server-function-file`               | `tanstackStart` | All files           |

## app-folders

A file of `src/` lives in one of the shared folders: `components`, `constants`, `hooks`, `lib`, `queries`, `routes`, `server`, `stores`, `types` and `utils`. Under `src/routes/`, a folder with a `-` prefix takes one of the same names.

```text
// Fails
src/helpers/format-price.ts
src/routes/events/-blocks/agenda.tsx

// Passes
src/utils/format-price.ts
src/routes/events/-components/agenda.tsx
```

## boolean-function-name

A type guard is named `matchIs*`, `matchAs*` or `matchHas*`. A hook and a component keep their own name.

```ts
// Fails
const isUser = (value: unknown): value is User => {
  return typeof value === 'object' && value !== null && 'id' in value
}

// Passes
const matchIsUser = (value: unknown): value is User => {
  return typeof value === 'object' && value !== null && 'id' in value
}
```

## boolean-name

A boolean is named `is*`, `has*`, `should*` or `can*`, or `IS_*`, `HAS_*`, `SHOULD_*` or `CAN_*` for a constant. The rule reads a variable set to a boolean literal, a `!`, a comparison, `Boolean()` or a `matchIs*()` call, and the state of a `useState(false)`.

```ts
// Fails
const open = count > 0
const [visible, setVisible] = React.useState(false)

// Passes
const isOpen = count > 0
const [isVisible, setIsVisible] = React.useState(false)
```

## comment-policy

The code ships zero comments: the naming carries the intent. The rule accepts the tool directives, such as `@ts-expect-error`, `/// <reference>`, a shebang and `oxlint-disable-next-line`. A directive disables a rule on one line, never on a whole file, except `no-console`. `require-suppression-reason` asks the reason of each directive.

```ts
// Fails
// Fetch the video before the player mounts
const video = await getVideo(id)

/* oxlint-disable no-await-in-loop */

// Passes
const videoBeforePlayerMount = await getVideo(id)

// oxlint-disable-next-line no-await-in-loop -- the writes land in order
await save(item)
```

## component-props-name

A component types its props with its own name and the `Props` suffix, through `FC` too.

```tsx
// Fails
const Button = ({ label }: Props) => <button>{label}</button>
const Rating: React.FC<Props> = ({ value }) => <span>{value}</span>

// Passes
const Button = ({ label }: ButtonProps) => <button>{label}</button>
```

## destructure-in-signature

A function destructures its params in its signature, not in its body. A param that the body also reads whole stays as it is.

```ts
// Fails
function getPrice(params: GetPriceParams) {
  const { id, currency } = params
  return prices[id][currency]
}

// Passes
function getPrice({ id, currency }: GetPriceParams) {
  return prices[id][currency]
}
```

## env-file

A file reads `import.meta.env` in `src/env.ts` only, where one schema checks each variable of the client.

```ts
// Fails, in src/lib/api.ts
const endpoint = import.meta.env.VITE_API_URL

// Passes, in src/lib/api.ts
import { env } from '#/env'

const endpoint = env.VITE_API_URL
```

## functional-update

A `useState` setter that reads its own state takes an updater, so the update reads the latest state.

```ts
// Fails
setCount(count + 1)
setIsOpen(!isOpen)

// Passes
setCount((previous) => previous + 1)
setIsOpen((previous) => !previous)
```

## jsx-blank-line

Sibling JSX elements sit on consecutive lines. `oxlint --fix` removes the blank lines.

```tsx
// Fails
<header>
  <Logo />

  <Nav />
</header>

// Passes
<header>
  <Logo />
  <Nav />
</header>
```

## no-chained-type-assertions

A value never goes through two type assertions: parse the untrusted input at its boundary instead.

```ts
// Fails
const user = response as unknown as User

// Passes
const user = userSchema.parse(response)
```

## no-context-provider

A component renders a context as its own provider: see [`createContext`](https://react.dev/reference/react/createContext.md#provider).

```tsx
// Fails
<ThemeContext.Provider value={theme}>
  <Page />
</ThemeContext.Provider>

// Passes
<ThemeContext value={theme}>
  <Page />
</ThemeContext>
```

## no-dom-test-environment

A test file picks no environment and imports no DOM emulator. The `projects` of the Vitest config pick the environment, and a DOM test runs in [Vitest browser mode](https://vitest.dev/guide/browser/) as a `*.browser.test.{ts,tsx}` file.

```ts
// Fails
// @vitest-environment jsdom
import { JSDOM } from 'jsdom'
// Passes
import { render } from 'vitest-browser-react'
```

## no-forward-ref

A component reads `ref` as a prop, never through `forwardRef` from `react`: see [React 19](https://react.dev/blog/2024/12/05/react-19.md#ref-as-a-prop).

```tsx
// Fails
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input ref={ref} {...props} />
))

// Passes
const Input = ({ ref, ...props }: InputProps) => <input ref={ref} {...props} />
```

## no-hookless-use-function

A function named `use…` calls a hook. Without a hook, the `use` prefix applies the rules of hooks for nothing, and the React Compiler skips the function.

```ts
// Fails
const useFullName = (user: User) => `${user.first} ${user.last}`

// Passes
const getFullName = (user: User) => `${user.first} ${user.last}`
const useCurrentUser = () => useQuery(currentUserQuery)
```

## no-known-value-widening

A known value keeps its inferred type. An explicit `unknown`, `object`, open record or anonymous object type throws that type away.

```ts
// Fails
const ROUTES: Record<string, Route> = { home: homeRoute }
function getLabel(status: Status): { text: string } {
  return { text: labels[status] }
}

// Passes
const ROUTES = { home: homeRoute } satisfies Record<string, Route>
function getLabel(status: Status) {
  return { text: labels[status] }
}
```

## no-leaked-render

A component renders a condition with a ternary that ends in `: null`, never with `&&`: see [conditional rendering](https://react.dev/learn/conditional-rendering.md#logical-and-operator-).

```tsx
// Fails
<p>{count && <Badge count={count} />}</p>

// Passes
<p>{count > 0 ? <Badge count={count} /> : null}</p>
```

## no-module-store

A TanStack store lives inside the React tree: at module scope, the server shares it between the requests it renders.

```tsx
// Fails
export const cartStore = createStore({ items: [] })

// Passes
export const { StoreProvider: CartProvider, useStoreContext: useCart } =
  createStoreContext<{ cart: Store<Cart> }>()
```

## no-noop-subscribe

The `subscribe` of `useSyncExternalStore` registers its listener on a store that changes: see [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore.md). To read a browser value that never changes, render the component in the browser with [`use(browser())`](https://react.dev/reference/react-dom/browser.md).

```tsx
// Fails
const subscribeToNothing = () => () => {}
const isMac = useSyncExternalStore(subscribeToNothing, getIsMac, () => false)

// Passes
const subscribe = (onChange: () => void) => {
  window.addEventListener('online', onChange)
  return () => window.removeEventListener('online', onChange)
}
const isOnline = useSyncExternalStore(
  subscribe,
  () => navigator.onLine,
  () => true
)
```

## no-real-time-wait-in-tests

A test waits for the event, never for a real delay. A test file that calls `vi.useFakeTimers()` can drive its timers.

```ts
// Fails
await new Promise((resolve) => setTimeout(resolve, 500))

// Passes
await vi.waitFor(() => expect(onSave).toHaveBeenCalled())
```

## no-test-timeout-or-unreasoned-skip

A test sets no timeout and no retry of its own: the Vitest config sets the ceiling. A skipped test names its ticket in a `quarantine:` comment above it. A `skipIf` or a computed `skip` option is a condition and needs no ticket.

```ts
// Fails
it('books the venue', async () => {}, 10_000)
it.skip('pays the invoice', async () => {})

// Passes
it('books the venue', async () => {})
// quarantine: ABC-123 the payment sandbox is down
it.skip('pays the invoice', async () => {})
```

## no-unknown-returns

A function returns a named type, never `unknown` or `Promise<unknown>`, a function type included.

```ts
// Fails
type UserListProps = { refetch: () => Promise<unknown> }

// Passes
type UserListProps = { refetch: () => Promise<UserPage> }
```

## no-wall-clock-in-tests

A test reads no real clock. A test file that calls `vi.useFakeTimers()` or `vi.setSystemTime()` reads the fake clock. A reading that a mock receives or returns passes.

```ts
// Fails
const booking = createBooking({ createdAt: new Date() })

// Passes
const booking = createBooking({ createdAt: new Date('2026-01-01T09:00:00Z') })
```

## optional-last

A `*Params` or `*Props` type lists its required properties first, then its optional properties.

```ts
// Fails
type ButtonProps = {
  size?: Size
  label: string
}

// Passes
type ButtonProps = {
  label: string
  size?: Size
}
```

## params-type-name

A function that destructures its single param types it with a named `*Params` type. A component follows `component-props-name`.

```ts
// Fails
function getPrice({ id }: { id: string }) {}

// Passes
type GetPriceParams = { id: string }

function getPrice({ id }: GetPriceParams) {}
```

## query-naming

A TanStack Query result stays whole and keeps the `Query` suffix, and a mutation keeps the `Mutation` suffix. The code reads `query.data` where it uses it.

```tsx
// Fails
const { data } = useSuspenseQuery(videoQueryOptions(id))
const save = useMutation(saveVideoMutationOptions())

// Passes
const videoQuery = useSuspenseQuery(videoQueryOptions(id))
const saveMutation = useMutation(saveVideoMutationOptions())

return <h1>{videoQuery.data.title}</h1>
```

## require-suppression-reason

A disable directive says why after `--`.

```ts
// Fails
// oxlint-disable-next-line no-console
console.log(report)

// Passes
// oxlint-disable-next-line no-console -- the CLI prints its report
console.log(report)
```

## server-function-file

A file calls `createServerFn` only when its name ends with `.functions.ts`, in a `server/` or `-server/` folder. The client imports that file, and a `*.server.ts` file keeps the code that only the server runs.

```ts
// Fails, in src/server/event.server.ts
export const getEvent = createServerFn().handler(() => findEvent())

// Passes, in src/server/event.functions.ts
import { findEvent } from './event.server'

export const getEvent = createServerFn().handler(() => findEvent())
```

## Add a rule

1. Write the rule in `rules/`, with the `createOnce` API of the [oxlint JS plugins](https://oxc.rs/docs/guide/usage/linter/writing-js-plugins.md).
2. Test the rule in `tests/`, with the `RuleTester` of `oxlint/plugins-dev`.
3. Add the rule to `index.ts`.
4. Enable the rule at `'error'` in the shared config that owns the convention.
5. Document the rule in this file: its row in **Rules**, and its section with one failing and one passing example.

## Credits

`no-dom-test-environment`, `no-hookless-use-function`, `no-real-time-wait-in-tests`, `no-test-timeout-or-unreasoned-skip`, `no-wall-clock-in-tests` and `require-suppression-reason` port the rules of the same name from [t3code](https://github.com/pingdotgg/t3code/tree/main/oxlint-plugin-t3code), under the MIT license:

```text
MIT License

Copyright (c) 2026 T3 Tools Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`no-chained-type-assertions`, `no-known-value-widening` and `no-unknown-returns` port the rules of the same name from [anti-slop](https://github.com/dmmulroy/anti-slop), under the MIT license:

```text
MIT License

Copyright (c) 2026 Dillon Mulroy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
