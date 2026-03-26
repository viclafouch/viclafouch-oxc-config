# oxlint Gap Analysis

Sources: [oxc#481](https://github.com/oxc-project/oxc/issues/481) (meta), [oxc#479](https://github.com/oxc-project/oxc/issues/479) (core), [oxc#1022](https://github.com/oxc-project/oxc/issues/1022) (react), [oxc#1117](https://github.com/oxc-project/oxc/issues/1117) (typescript), [oxc#493](https://github.com/oxc-project/oxc/issues/493) (unicorn), [oxc#492](https://github.com/oxc-project/oxc/issues/492) (jsx-a11y), [oxc#684](https://github.com/oxc-project/oxc/issues/684) (nextjs), [oxc#1141](https://github.com/oxc-project/oxc/issues/1141) (import)

---

## Core rules — [oxc#479](https://github.com/oxc-project/oxc/issues/479)

**ESLint: 82 active** | **oxlint: 116 rules (68 migrated + 48 new)** | **Not migrated: 14**

| Rule                              | Status                                                          |
| --------------------------------- | --------------------------------------------------------------- |
| `no-restricted-properties`        | Not started                                                     |
| `no-restricted-exports`           | Not started                                                     |
| `no-restricted-syntax`            | Partial via `no-restricted-imports` (AST selectors lost)        |
| `prefer-regex-literals`           | Not started                                                     |
| `object-shorthand`                | Not started                                                     |
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

**ESLint: 22 active** | **Migrated: 8** | **Type-aware deferred: 13** | **Not migrated: 1**

| Rule                                   | Status                                           |
| -------------------------------------- | ------------------------------------------------ |
| `@typescript-eslint/naming-convention` | Not implemented (not in oxlint, not in tsgolint) |

Type-aware rules (deferred until tsgolint):

| Rule                                                | Options                                 |
| --------------------------------------------------- | --------------------------------------- |
| `@typescript-eslint/consistent-return`              | `{ treatUndefinedAsUnspecified: true }` |
| `@typescript-eslint/dot-notation`                   | `{ allowKeywords: true }`               |
| `@typescript-eslint/return-await`                   | `'in-try-catch'`                        |
| `@typescript-eslint/no-floating-promises`           | `{ ignoreVoid: true }`                  |
| `@typescript-eslint/no-array-delete`                | -                                       |
| `@typescript-eslint/prefer-find`                    | -                                       |
| `@typescript-eslint/prefer-string-starts-ends-with` | -                                       |
| `@typescript-eslint/prefer-reduce-type-parameter`   | -                                       |
| `@typescript-eslint/no-duplicate-type-constituents` | -                                       |
| `@typescript-eslint/no-deprecated`                  | -                                       |
| `@typescript-eslint/no-misused-spread`              | -                                       |
| `@typescript-eslint/no-useless-default-assignment`  | -                                       |
| `@typescript-eslint/naming-convention`              | Complex multi-selector config           |

## Unicorn rules — [oxc#493](https://github.com/oxc-project/oxc/issues/493)

**ESLint: 29 active** | **oxlint: 39 rules (29 migrated + 10 new)** | **Not migrated: 0**

All active unicorn rules have been migrated plus 10 new rules added.

## React rules — [oxc#1022](https://github.com/oxc-project/oxc/issues/1022)

**ESLint: 35 active** | **oxlint: 26 rules (21 migrated + 5 new)** | **Not migrated: 14**

| Rule                                   | Status                                                 |
| -------------------------------------- | ------------------------------------------------------ |
| `react/jsx-no-bind`                    | Not started                                            |
| `react/no-deprecated`                  | Not started                                            |
| `react/destructuring-assignment`       | Not started                                            |
| `react/no-arrow-function-lifecycle`    | Not started                                            |
| `react/no-invalid-html-attribute`      | Not started                                            |
| `react/no-object-type-as-default-prop` | Not started                                            |
| `react/function-component-definition`  | Not started                                            |
| `react/hook-use-state`                 | Not started                                            |
| `react/jsx-no-leaked-render`           | Not started                                            |
| `react/prefer-stateless-function`      | Not started                                            |
| `react/no-unused-prop-types`           | Will not implement (oxc#1022)                          |
| `react/no-unused-state`                | Will not implement (oxc#1022)                          |
| `react/jsx-newline`                    | Will not implement (oxc#1022)                          |
| `react/jsx-uses-vars`                  | Will not implement (deprecated with new JSX transform) |

## React Hooks

**ESLint: 3 active** | **Migrated: 2** | **Not migrated: 1**

| Rule                   | Status                               |
| ---------------------- | ------------------------------------ |
| `react/hook-use-state` | Not started (counted in React above) |

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
