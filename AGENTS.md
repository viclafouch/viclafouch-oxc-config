# AGENTS.md

## Vision

My own lint config, for any of my projects: no other user to protect. Every project is TypeScript, so a strict preset and a breaking change cost little. The consumer gets fixed.

- [petit-meme](https://github.com/viclafouch/petit-meme): TanStack Start.
- [multifus](https://github.com/viclafouch/multifus): a monorepo, a Tauri desktop app and a TanStack Start website.
- [Portfolio](https://github.com/viclafouch/Portfolio): Next.js.

## Rules

- Every rule of each loaded plugin is declared, at `'error'` or `'off'`: a rule never runs through `categories` alone. `react-doctor` is the exception: it holds more than 900 rules, and a rule that no preset lists stays off.
- A taken rule is `'error'` alone. Write an option only when its value differs from the default.
- Each rule keeps a one-line comment and its doc URL, in its `.md` variant when the site serves one.
- A rejected rule is `'off'`, with its one-line comment and its doc URL, so the next interview skips it.
- Add a rule through an interview, one rule at a time: the rule, the code it catches with its fix, your recommendation, then the user's call.
- A new convention looks for its rule in this order: a native oxlint rule, a rule of a JS plugin that a preset loads, a rule of a new JS plugin, then a `viclafouch` rule.
- The same local override or local rule in two consumers is a defect of a preset: move it here.

## Build

The presets load the `viclafouch` plugin from `dist/`, through the self-reference `@viclafouch/oxc-config/plugins/viclafouch`. Run `pnpm build` after a change in `plugins/`, before you run `oxlint`.

## oxc versions

`oxlint` and `oxfmt` stay pinned to one minor version (`~`) in `devDependencies` and `peerDependencies`, and `@oxlint/plugins` stays on the minor of `oxlint` in `dependencies`. Suggest `/oxc-update` when the work touches the oxlint or oxfmt version or a new rule.

## Docs

- `README.md` holds the setup of a new project for each stack, and nothing else.
- Add a plugin rule with the steps of `plugins/viclafouch/README.md#add-a-rule`.
