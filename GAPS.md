# oxlint Gap Analysis

This config was migrated from a full ESLint setup. This file tracks which ESLint rules have an oxlint equivalent and which ones are still missing upstream. "Not started" means oxlint hasn't implemented the rule yet. "Will not implement" means oxlint won't add it (deprecated, covered elsewhere, etc.).

Sources: [oxc#481](https://github.com/oxc-project/oxc/issues/481) (meta), [oxc#479](https://github.com/oxc-project/oxc/issues/479) (core), [oxc#1022](https://github.com/oxc-project/oxc/issues/1022) (react), [oxc#1117](https://github.com/oxc-project/oxc/issues/1117) (typescript), [oxc#493](https://github.com/oxc-project/oxc/issues/493) (unicorn), [oxc#492](https://github.com/oxc-project/oxc/issues/492) (jsx-a11y), [oxc#684](https://github.com/oxc-project/oxc/issues/684) (nextjs), [oxc#1141](https://github.com/oxc-project/oxc/issues/1141) (import)

---

## Core rules — [oxc#479](https://github.com/oxc-project/oxc/issues/479)

**ESLint: 82 active** | **oxlint: 129 rules (74 migrated + 55 new)** | **Not migrated: 8**

| Rule                              | Status                                                          |
| --------------------------------- | --------------------------------------------------------------- |
| `no-restricted-syntax`            | Partial via `no-restricted-imports` (AST selectors lost)        |
| `camelcase`                       | Will not implement (use `@typescript-eslint/naming-convention`) |
| `lines-between-class-members`     | Will not implement (deprecated stylistic)                       |
| `padding-line-between-statements` | Will not implement (deprecated stylistic)                       |
| `no-octal`                        | Will not implement (strict mode)                                |
| `no-octal-escape`                 | Will not implement (strict mode)                                |
| `no-undef-init`                   | Will not implement (covered by `unicorn/no-useless-undefined`)  |
| `global-require`                  | Will not implement (deprecated)                                 |

## TypeScript rules — [oxc#1117](https://github.com/oxc-project/oxc/issues/1117)

**ESLint: 22 active** | **Migrated: 8** | **Type-aware: 50 available (opt-in)** | **Not migrated: 1**

| Rule                                   | Status                                           |
| -------------------------------------- | ------------------------------------------------ |
| `@typescript-eslint/naming-convention` | Not implemented (not in oxlint, not in tsgolint) |

Type-aware linting is **stable** since oxlint 1.75.0 / tsgolint v7 ([announcement](https://oxc.rs/blog/2026-07-22-type-aware-linting-stable)) — 59 of 61 typescript-eslint type-aware rules are implemented.

The 50 rules below are already declared in `typescript.ts` and stay inert while `typeAware` is false. `typeAware` and `typeCheck` are root-config-only fields, so this package cannot enable them; consumers opt in from their own `oxlint.config.ts` (see README). Requires TypeScript 7 and `oxlint-tsgolint`.

| Rule                                     | Severity | Options                                                                                                          |
| ---------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `consistent-return`                      | error    | `{ treatUndefinedAsUnspecified: true }`                                                                          |
| `dot-notation`                           | error    | `{ allowKeywords: true }`                                                                                        |
| `return-await`                           | error    | `'in-try-catch'`                                                                                                 |
| `no-floating-promises`                   | error    | `{ ignoreVoid: true }`                                                                                           |
| `no-array-delete`                        | error    | -                                                                                                                |
| `prefer-find`                            | error    | -                                                                                                                |
| `prefer-string-starts-ends-with`         | error    | -                                                                                                                |
| `prefer-reduce-type-parameter`           | error    | -                                                                                                                |
| `no-duplicate-type-constituents`         | error    | -                                                                                                                |
| `no-deprecated`                          | error    | -                                                                                                                |
| `no-misused-spread`                      | error    | -                                                                                                                |
| `no-useless-default-assignment`          | error    | -                                                                                                                |
| `no-unnecessary-type-conversion`         | error    | -                                                                                                                |
| `no-unnecessary-type-parameters`         | error    | -                                                                                                                |
| `no-unnecessary-qualifier`               | error    | -                                                                                                                |
| `prefer-readonly-parameter-types`        | error    | `{ allow: [], checkParameterProperties: true, ignoreInferredTypes: false, treatMethodsAsReadonly: false }`       |
| `prefer-optional-chain`                  | error    | `{ checkAny: true, ... requireNullish: false }`                                                                  |
| `no-unsafe-type-assertion`               | error    | -                                                                                                                |
| `no-unnecessary-template-expression`     | error    | -                                                                                                                |
| `related-getter-setter-pairs`            | error    | -                                                                                                                |
| `await-thenable`                         | error    | -                                                                                                                |
| `no-base-to-string`                      | error    | `{ checkUnknown: false, ignoredTypeNames: ['Error', 'RegExp', 'URL', 'URLSearchParams'] }`                       |
| `no-confusing-void-expression`           | error    | `{ ignoreArrowShorthand: true }`                                                                                 |
| `no-for-in-array`                        | error    | -                                                                                                                |
| `no-meaningless-void-operator`           | error    | `{ checkNever: false }`                                                                                          |
| `no-misused-promises`                    | error    | `{ checksConditionals: true, checksSpreads: true, checksVoidReturn: { ... all true } }`                          |
| `no-mixed-enums`                         | error    | -                                                                                                                |
| `no-redundant-type-constituents`         | error    | -                                                                                                                |
| `no-unnecessary-boolean-literal-compare` | error    | `{ allowComparingNullableBooleansToTrue: false, allowComparingNullableBooleansToFalse: false }`                  |
| `no-unnecessary-condition`               | error    | `{ allowConstantLoopConditions: false, checkTypePredicates: true }`                                              |
| `no-unnecessary-type-arguments`          | error    | -                                                                                                                |
| `no-unnecessary-type-assertion`          | error    | `{ checkLiteralConstAssertions: false, typesToIgnore: [] }`                                                      |
| `no-unsafe-argument`                     | error    | -                                                                                                                |
| `no-unsafe-assignment`                   | error    | -                                                                                                                |
| `no-unsafe-call`                         | error    | -                                                                                                                |
| `no-unsafe-enum-comparison`              | error    | -                                                                                                                |
| `no-unsafe-member-access`                | error    | `{ allowOptionalChaining: false }`                                                                               |
| `no-unsafe-return`                       | error    | -                                                                                                                |
| `no-unsafe-unary-minus`                  | error    | -                                                                                                                |
| `only-throw-error`                       | error    | `{ allowThrowingAny: false, allowThrowingUnknown: false }`                                                       |
| `prefer-nullish-coalescing`              | error    | `{ ignoreConditionalTests: true }`                                                                               |
| `prefer-return-this-type`                | error    | -                                                                                                                |
| `require-array-sort-compare`             | error    | `{ ignoreStringArrays: false }`                                                                                  |
| `restrict-plus-operands`                 | error    | `{ allowAny: false, allowBoolean: false, allowNullish: false, allowNumberAndString: false, allowRegExp: false }` |
| `restrict-template-expressions`          | error    | `{ allowAny: false, allowBoolean: false, allowNullish: false, allowNumber: true, allowRegExp: false }`           |
| `strict-boolean-expressions`             | error    | `{ allowNullableObject: true, allowNumber: false, allowString: false }`                                          |
| `switch-exhaustiveness-check`            | error    | `{ requireDefaultForNonUnion: true }`                                                                            |
| `unbound-method`                         | error    | `{ ignoreStatic: false }`                                                                                        |
| `use-unknown-in-catch-callback-variable` | error    | -                                                                                                                |
| `strict-void-return`                     | off      | -                                                                                                                |
| `require-await`                          | off      | -                                                                                                                |
| `non-nullable-type-assertion-style`      | off      | Conflicts with no-non-null-assertion                                                                             |
| `promise-function-async`                 | off      | Legitimate non-async Promise returns                                                                             |
| `naming-convention`                      | -        | Not implemented in tsgolint                                                                                      |

## Unicorn rules — [oxc#493](https://github.com/oxc-project/oxc/issues/493)

**ESLint: 29 active** | **oxlint: 47 rules (29 migrated + 18 new)** | **Not migrated: 0**

All active unicorn rules have been migrated plus 18 new rules added.

## React rules — [oxc#1022](https://github.com/oxc-project/oxc/issues/1022)

**ESLint: 35 active** | **oxlint: 34 rules (25 migrated + 9 new)** | **Not migrated: 10**

| Rule                                | Status                                                 |
| ----------------------------------- | ------------------------------------------------------ |
| `react/jsx-no-bind`                 | Not started                                            |
| `react/no-deprecated`               | Not started                                            |
| `react/destructuring-assignment`    | Not started                                            |
| `react/no-arrow-function-lifecycle` | Not started                                            |
| `react/no-invalid-html-attribute`   | Not started                                            |
| `react/jsx-no-leaked-render`        | Not started                                            |
| `react/prefer-stateless-function`   | Not started                                            |
| `react/no-unused-prop-types`        | Will not implement (oxc#1022)                          |
| `react/no-unused-state`             | Will not implement (oxc#1022)                          |
| `react/jsx-newline`                 | Will not implement (oxc#1022)                          |
| `react/jsx-uses-vars`               | Will not implement (deprecated with new JSX transform) |

## React Hooks

**ESLint: 2 active** | **Migrated: 2** | **Not migrated: 0**

All 2 active hooks rules have been migrated. No gaps.

## jsx-a11y rules — [oxc#492](https://github.com/oxc-project/oxc/issues/492)

**ESLint: 29 active** | **Migrated: 29** | **Not migrated: 0**

All 29 active jsx-a11y rules have been migrated. No gaps.

## Next.js rules — [oxc#684](https://github.com/oxc-project/oxc/issues/684)

**ESLint: 21 active** | **Migrated: 21** | **Not migrated: 0**

All 21 recommended Next.js rules have been migrated. No gaps.

## Import rules — [oxc#1141](https://github.com/oxc-project/oxc/issues/1141)

**ESLint: 4 active** | **oxlint: 8 rules (3 migrated + 5 new)** | **Handled by oxfmt: 2**

| Rule                         | Status           |
| ---------------------------- | ---------------- |
| `simple-import-sort/imports` | Handled by oxfmt |
| `simple-import-sort/exports` | Handled by oxfmt |

## Node plugin — not adopted

oxlint ships a `node` plugin (12 rules), not enabled by any config here. Its rules target the CommonJS era and are irrelevant to a modern ESM/TypeScript stack: `callback-return`, `exports-style`, `global-require`, `handle-callback-err`, `no-exports-assign`, `no-mixed-requires`, `no-new-require`, `no-path-concat`, `no-process-env`, `no-process-exit`, `no-sync`, `no-top-level-await`.

`node/no-top-level-await` (added in oxlint 1.75.0) was evaluated and declined: top-level `await` is a legitimate ESM feature and the restriction only matters for libraries still shipping CJS builds.

`node/exports-style` (added in oxlint 1.76.0) was evaluated and declined: it arbitrates between `module.exports` and `exports`, a CommonJS-only concern.

## JSDoc plugin — not adopted

oxlint ships a `jsdoc` plugin, not enabled by any config here. This package does not make JSDoc a mandatory convention, so enforcing its shape adds noise without value.

`jsdoc/no-blank-blocks` (added in oxlint 1.78.0) was evaluated and declined: an empty JSDoc block is a marginal accident, not worth opening a whole plugin surface for. Revisit as a group if JSDoc ever becomes a documented convention here.

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
