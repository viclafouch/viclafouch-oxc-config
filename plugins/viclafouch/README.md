# viclafouch

The `viclafouch` plugin holds the conventions that no native oxlint rule enforces.
`@viclafouch/oxc-config` ships the plugin, so you install nothing more.

## Rules

| Rule                         | Config       | Files               |
| ---------------------------- | ------------ | ------------------- |
| `component-props-name`       | `react`      | `.tsx`              |
| `no-chained-type-assertions` | `typescript` | All files           |
| `no-context-provider`        | `react`      | All files, with JSX |
| `no-forward-ref`             | `react`      | All files           |
| `no-known-value-widening`    | `typescript` | All files           |
| `no-leaked-render`           | `react`      | All files, with JSX |
| `no-unknown-returns`         | `typescript` | All files           |

## component-props-name

A component types its props with its own name and the `Props` suffix, through `FC` too.

```tsx
// Fails
const Button = ({ label }: Props) => <button>{label}</button>
const Rating: React.FC<Props> = ({ value }) => <span>{value}</span>

// Passes
const Button = ({ label }: ButtonProps) => <button>{label}</button>
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

## no-unknown-returns

A function returns a named type, never `unknown` or `Promise<unknown>`, a function type included.

```ts
// Fails
type UserListProps = { refetch: () => Promise<unknown> }

// Passes
type UserListProps = { refetch: () => Promise<UserPage> }
```

## Add a rule

1. Write the rule in `rules/`, with the `createOnce` API of the [oxlint JS plugins](https://oxc.rs/docs/guide/usage/linter/writing-js-plugins.md).
2. Test the rule in `tests/`, with the `RuleTester` of `oxlint/plugins-dev`.
3. Add the rule to `index.ts`.
4. Enable the rule at `'error'` in the shared config that owns the convention.
5. Document the rule in this file, with one failing and one passing example.

## Credits

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
