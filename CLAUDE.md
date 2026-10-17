# CLAUDE.md

Oxlint + oxfmt config package. Built by tsdown (ESM + dts) because Node doesn't strip types in node_modules. Ships the `viclafouch` jsPlugin (`plugins/viclafouch/`), loaded by `typescript` and `react` through the self-reference `@viclafouch/oxc-config/plugins/viclafouch`: run `npm run build` before linting or testing.

## Coding Conventions

- Every value explicit — even defaults. Categories, options, settings: all declared.
- Rule options always explicit, even when empty/default. If a rule accepts options, write them out (e.g. `['error', { allowlist: { variables: [], types: [] } }]`). Serves as living documentation and surfaces hidden options.
- `'error'` or `'off'`. Never `'warn'` except `react/no-danger` and `vitest/warn-todo`.
- Only `typescript` declares `categories`. `extends` merges them left to right, so a later preset that sets one wins on every file.

## Documentation

Keep `README.md` up to date when making changes:

- Update usage examples when adding/removing/renaming exported configs
- Update the list of available configurations
- Document breaking changes
- Keep installation instructions current

## oxc versions

`oxlint`, `oxfmt` and `@oxlint/plugins` stay pinned to one minor version (`~`), in `dependencies`, `devDependencies` and `peerDependencies`. Suggest `/oxc-update` when the work touches the oxlint or oxfmt version or a new rule.

## Adding Rules

Always via interactive interview: rule name, code example (what it catches + fix), recommendation, yes/no. Never bulk-activate. Rejected rules are written `'off'` in the config (with comment + doc URL) so they are not re-proposed in future interviews.

## Type-aware

Every consumer lints with `typeAware: true` and `oxlint-tsgolint`, which bundles its own TypeScript engine. A type-aware rule lives in the type-aware section at the bottom of `typescript.ts`, at `'error'` or `'off'` like any other rule.
