# CLAUDE.md

Oxlint + oxfmt config package. Built by tsup (ESM + dts) because Node doesn't strip types in node_modules.

## Coding Conventions

- Every value explicit — even defaults. Categories, options, settings: all declared.
- `'error'` or `'off'`. Never `'warn'` except `no-console` and `react/no-danger`.

## Documentation

Keep `README.md` up to date when making changes:
- Update usage examples when adding/removing/renaming exported configs
- Update the list of available configurations
- Document breaking changes
- Keep installation instructions current
- Update `GAPS.md` when rules are added or oxlint implements new rules

## On Every Session

**Proactively check for updates before anything else.** Read current versions from `package.json`, then launch parallel agents to fetch ALL changelogs since our pinned versions (not just the latest — every release we missed). Look for new rules, new options, rules leaving nursery, and rules from `GAPS.md` now implemented. Present each finding as an interview (rule, example, recommendation, yes/no). Update deps, `GAPS.md`, and configs accordingly.

Use `/dependency-updater` to bump deps, then check changelogs for new rules/options.

Sources: https://github.com/oxc-project/oxc/releases · https://github.com/nicolo-ribaudo/oxfmt/releases · https://oxc.rs/blog/ · [oxc#481](https://github.com/oxc-project/oxc/issues/481)

## Adding Rules

Always via interactive interview: rule name, code example (what it catches + fix), recommendation, yes/no. Never bulk-activate.

## Future

- tsgolint: uncomment 14 type-aware rules at bottom of `typescript.ts` when stable.
- `naming-convention`: only true gap, no workaround. Waiting on tsgolint.
- `oxlint-plugin-eslint`: tested, works for AST selectors. Available as escape hatch, not used yet.
