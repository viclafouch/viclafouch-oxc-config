# oxlint Gap Analysis

This config was migrated from a full ESLint setup. This file tracks which ESLint rules have an oxlint equivalent and which ones are still missing upstream. "Not started" means oxlint hasn't implemented the rule yet. "Will not implement" means oxlint won't add it (deprecated, covered elsewhere, etc.).

Sources: [oxc#481](https://github.com/oxc-project/oxc/issues/481) (meta), [oxc#479](https://github.com/oxc-project/oxc/issues/479) (core), [oxc#1022](https://github.com/oxc-project/oxc/issues/1022) (react), [oxc#1117](https://github.com/oxc-project/oxc/issues/1117) (typescript), [oxc#493](https://github.com/oxc-project/oxc/issues/493) (unicorn), [oxc#492](https://github.com/oxc-project/oxc/issues/492) (jsx-a11y), [oxc#684](https://github.com/oxc-project/oxc/issues/684) (nextjs), [oxc#1141](https://github.com/oxc-project/oxc/issues/1141) (import)

---

## Core rules — [oxc#479](https://github.com/oxc-project/oxc/issues/479)

**ESLint: 82 active** | **oxlint: 121 rules (70 migrated + 51 new)** | **Not migrated: 12**

| Rule                              | Status                                                          |
| --------------------------------- | --------------------------------------------------------------- |
| `no-restricted-properties`        | Not started                                                     |
| `no-restricted-syntax`            | Partial via `no-restricted-imports` (AST selectors lost)        |
| `prefer-regex-literals`           | Not started                                                     |
| `id-denylist`                     | Not started                                                     |
| `prefer-arrow-callback`           | Not started                                                     |
| `camelcase`                       | Will not implement (use `@typescript-eslint/naming-convention`) |
| `lines-between-class-members`     | Will not implement (deprecated stylistic)                       |
| `padding-line-between-statements` | Will not implement (deprecated stylistic)                       |
| `no-octal`                        | Will not implement (strict mode)                                |
| `no-octal-escape`                 | Will not implement (strict mode)                                |
| `no-undef-init`                   | Will not implement (covered by `unicorn/no-useless-undefined`)  |
| `global-require`                  | Will not implement (deprecated)                                 |

## TypeScript rules — [oxc#1117](https://github.com/oxc-project/oxc/issues/1117)

**ESLint: 22 active** | **Migrated: 8** | **Type-aware: 17 (13 in [tsgolint](https://github.com/oxc-project/tsgolint) alpha, requires TS 7.0+)** | **Not migrated: 1**

| Rule                                   | Status                                           |
| -------------------------------------- | ------------------------------------------------ |
| `@typescript-eslint/naming-convention` | Not implemented (not in oxlint, not in tsgolint) |

Type-aware rules (available via tsgolint alpha or oxlint typeAware, 16/17 implemented):

| Rule                                                 | Options                                                                                                    |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `@typescript-eslint/consistent-return`               | `{ treatUndefinedAsUnspecified: true }`                                                                    |
| `@typescript-eslint/dot-notation`                    | `{ allowKeywords: true }`                                                                                  |
| `@typescript-eslint/return-await`                    | `'in-try-catch'`                                                                                           |
| `@typescript-eslint/no-floating-promises`            | `{ ignoreVoid: true }`                                                                                     |
| `@typescript-eslint/no-array-delete`                 | -                                                                                                          |
| `@typescript-eslint/prefer-find`                     | -                                                                                                          |
| `@typescript-eslint/prefer-string-starts-ends-with`  | -                                                                                                          |
| `@typescript-eslint/prefer-reduce-type-parameter`    | -                                                                                                          |
| `@typescript-eslint/no-duplicate-type-constituents`  | -                                                                                                          |
| `@typescript-eslint/no-deprecated`                   | -                                                                                                          |
| `@typescript-eslint/no-misused-spread`               | -                                                                                                          |
| `@typescript-eslint/no-useless-default-assignment`   | -                                                                                                          |
| `@typescript-eslint/no-unnecessary-type-conversion`  | -                                                                                                          |
| `@typescript-eslint/no-unnecessary-type-parameters`  | -                                                                                                          |
| `@typescript-eslint/no-unnecessary-qualifier`        | -                                                                                                          |
| `@typescript-eslint/prefer-readonly-parameter-types` | `{ allow: [], checkParameterProperties: true, ignoreInferredTypes: false, treatMethodsAsReadonly: false }` |
| `@typescript-eslint/naming-convention`               | Complex multi-selector config                                                                              |

## Unicorn rules — [oxc#493](https://github.com/oxc-project/oxc/issues/493)

**ESLint: 29 active** | **oxlint: 43 rules (29 migrated + 14 new)** | **Not migrated: 0**

All active unicorn rules have been migrated plus 14 new rules added.

## React rules — [oxc#1022](https://github.com/oxc-project/oxc/issues/1022)

**ESLint: 35 active** | **oxlint: 31 rules (22 migrated + 9 new)** | **Not migrated: 13**

| Rule                                   | Status                                                 |
| -------------------------------------- | ------------------------------------------------------ |
| `react/jsx-no-bind`                    | Not started                                            |
| `react/no-deprecated`                  | Not started                                            |
| `react/destructuring-assignment`       | Not started                                            |
| `react/no-arrow-function-lifecycle`    | Not started                                            |
| `react/no-invalid-html-attribute`      | Not started                                            |
| `react/no-object-type-as-default-prop` | Not started                                            |
| `react/function-component-definition`  | Not started                                            |
| `react/jsx-no-leaked-render`           | Not started                                            |
| `react/prefer-stateless-function`      | Not started                                            |
| `react/no-unused-prop-types`           | Will not implement (oxc#1022)                          |
| `react/no-unused-state`                | Will not implement (oxc#1022)                          |
| `react/jsx-newline`                    | Will not implement (oxc#1022)                          |
| `react/jsx-uses-vars`                  | Will not implement (deprecated with new JSX transform) |

## React Hooks

**ESLint: 2 active** | **Migrated: 2** | **Not migrated: 0**

All 2 active hooks rules have been migrated. No gaps.

## jsx-a11y rules — [oxc#492](https://github.com/oxc-project/oxc/issues/492)

**ESLint: 29 active** | **Migrated: 25** | **Not migrated: 4**

| Rule                                                     | Status      |
| -------------------------------------------------------- | ----------- |
| `jsx-a11y/interactive-supports-focus`                    | Not started |
| `jsx-a11y/no-interactive-element-to-noninteractive-role` | Not started |
| `jsx-a11y/no-noninteractive-element-interactions`        | Not started |
| `jsx-a11y/no-noninteractive-element-to-interactive-role` | Not started |

## Next.js rules — [oxc#684](https://github.com/oxc-project/oxc/issues/684)

**ESLint: 21 active** | **Migrated: 21** | **Not migrated: 0**

All 21 recommended Next.js rules have been migrated. No gaps.

## Import rules — [oxc#1141](https://github.com/oxc-project/oxc/issues/1141)

**ESLint: 4 active** | **oxlint: 6 rules (2 migrated + 4 new)** | **Handled by oxfmt: 2**

| Rule                          | Status           |
| ----------------------------- | ---------------- |
| `import/newline-after-import` | Not implemented  |
| `simple-import-sort/imports`  | Handled by oxfmt |
| `simple-import-sort/exports`  | Handled by oxfmt |

## Formatting (handled by oxfmt)

`arrow-parens`, `arrow-spacing`, `dot-location`, `no-confusing-arrow`, `no-extra-semi`, `no-floating-decimal`, `no-multi-spaces`, `rest-spread-spacing`, `template-curly-spacing`, `jsx-quotes`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/jsx-one-expression-per-line`, `react/jsx-props-no-multi-spaces`, `react/jsx-tag-spacing`, `react/jsx-curly-newline`, `react/jsx-child-element-spacing`, `prettier/prettier`

---

## Known issues & workarounds

### `unicorn/prefer-top-level-await` — false positives with Zod `.catch()`

Zod 4's `.catch()` method (e.g., `z.string().optional().catch(undefined)`) is flagged as a "promise chain" by this rule. This is a false positive — Zod's `.catch()` is not `Promise.catch()`.

**Impact:** High in Zod-heavy codebases (schema files, search params, form validation).

**Status:** Rule is disabled by default in `@viclafouch/oxc-config` until this is fixed upstream. ESLint's unicorn plugin has the same false positive — this is not specific to oxlint. Re-enable when oxlint or the upstream rule gains `.catch()` disambiguation.

### `no-shadow-restricted-names` — Prisma `globalThis` singleton pattern

The standard Prisma singleton pattern triggers `no-shadow-restricted-names`:

```typescript
// This is flagged:
declare const globalThis: {
  prisma: PrismaClient | undefined
} & typeof global
```

This pattern is canonical in the [Prisma docs](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices) and widely used. The error is technically correct (it shadows `globalThis`) but unavoidable for this pattern.

**Workaround:** Suppress with an inline comment:

```typescript
// oxlint-disable-next-line no-shadow-restricted-names
declare const globalThis: {
  prisma: PrismaClient | undefined
} & typeof global
```
