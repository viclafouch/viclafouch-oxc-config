# CLAUDE.md

Oxlint + oxfmt config package. Built by tsup (ESM + dts) because Node doesn't strip types in node_modules.

## Coding Conventions

- Every value explicit — even defaults. Categories, options, settings: all declared.
- Rule options always explicit, even when empty/default. If a rule accepts options, write them out (e.g. `['error', { allowlist: { variables: [], types: [] } }]`). Serves as living documentation and surfaces hidden options.
- `'error'` or `'off'`. Never `'warn'` except `no-console`, `react/no-danger`, and `vitest/warn-todo`.

## Documentation

Keep `README.md` up to date when making changes:

- Update usage examples when adding/removing/renaming exported configs
- Update the list of available configurations
- Document breaking changes
- Keep installation instructions current
- Update `GAPS.md` when rules are added or oxlint implements new rules

## On Every Session

**Proactively run `/oxc-update` before anything else.** This skill detects missed releases, fetches changelogs, interviews on each new rule, and applies decisions to configs + docs.

## Adding Rules

Always via interactive interview: rule name, code example (what it catches + fix), recommendation, yes/no. Never bulk-activate. Rejected rules are written `'off'` in the config (with comment + doc URL) so they are not re-proposed in future interviews.

## Future

- tsgolint: uncomment 14 type-aware rules at bottom of `typescript.ts` when stable.
- `naming-convention`: only true gap, no workaround. Waiting on tsgolint.
- `oxlint-plugin-eslint`: tested, works for AST selectors. Available as escape hatch, not used yet.
