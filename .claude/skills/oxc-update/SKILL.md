---
name: oxc-update
description: Audit oxlint and oxfmt releases for new rules, graduated rules, bug fixes, and breaking changes. Bump versions, interview the user on each finding, and update configs/docs accordingly.
user-invocable: true
argument-hint: '[release-url]'
---

Audit oxlint and oxfmt for updates. If the user provides a release URL, start from that release. Otherwise, detect all missed releases.

## Step 1: Context

Read these files in parallel:

- `package.json`: current `devDependencies` versions of `oxlint` and `oxfmt`
- All files in `configs/`: to know exactly which rules and options are currently enabled

## Step 2: Detect updates

Run `pnpm dlx taze` to check for available updates on `oxlint` and `oxfmt`.

**Important:** taze may not detect oxfmt updates even when a new version exists. Always cross-check with `gh release list --repo oxc-project/oxc` because oxlint and oxfmt are released together in the same tag (e.g. `apps_v1.60.0` bundles both).

**If the user provided a release URL:** skip this step, go straight to Step 3.

**If both are already up to date (confirmed by both taze AND gh release list):** report it and stop.

## Step 3: Fetch changelogs

Use `gh release list` to identify missed releases, then `gh release view <tag>` for each one.

- **Both oxlint and oxfmt** live in repo `oxc-project/oxc`. Releases are bundled under a single tag (e.g. `apps_v1.60.0`). One `gh release view` call gives you both changelogs.

Keep it compact: only extract linter and formatter changes, skip parser/transformer noise.

If the user provided a release URL, fetch only that one release.

## Step 4: Full changelog audit

This step is critical. Go through EVERY line of the changelog and cross-reference with our config files. Nothing should be missed.

### 4a. Categorize all findings

| Category                      | What to look for                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| New rules                     | Rules added to any plugin                                                                                                       |
| Graduated rules               | Rules promoted from `nursery` to a stable category                                                                              |
| New options on existing rules | New config options added to rules we already have enabled. Check every rule name in the changelog against our `configs/` files. |
| Bug fixes on our rules        | Fixes on rules already enabled in our config. Cross-reference each fix with our rule list.                                      |
| Bug fixes (other)             | Fixes on rules we don't use: note them but flag as no impact.                                                                   |
| Breaking changes              | Behavioral changes, removed or renamed rules                                                                                    |
| New plugins                   | Entirely new plugin support                                                                                                     |
| oxfmt features                | New formatting options, language support, config support                                                                        |
| oxfmt bug fixes               | Formatting fixes (edge cases, stability)                                                                                        |
| LSP / tooling                 | VS Code extension changes, config walker improvements, autofix changes                                                          |

### 4b. Cross-check

- For each bug fix in the changelog, grep the rule name in `configs/` to confirm whether it's enabled or not.
- For new options, check the rule's current config in our files to see if the new option is relevant.
- For a JS plugin API change, grep `Silent until` and `Waits until` in `configs/`, and check whether the release makes each marked rule report, or lets each marked plugin run.

### 4c. Present the full audit report

Present ALL findings in a structured report with these sections:

1. **Bug fixes on our rules**: table: rule name, what changed, which config file has it
2. **New options on existing rules**: table: rule name, new option, current config, whether it needs attention
3. **New rules**: one-line-per-rule summary table
4. **Graduated rules**: with source and target category
5. **Breaking changes**: impact assessment
6. **oxfmt changes**: features and fixes
7. **LSP / tooling**: notable changes for the dev experience
8. **JS plugin API**: each rule marked `Silent until` and each plugin marked `Waits until`, and whether the release unblocks it

After presenting the full report, ask the user via **AskUserQuestion**: "Ready to start the rule interview?" before proceeding to Step 5.

**If zero actionable findings:** just bump versions (Step 6) and stop.

## Step 5: Interview: one rule at a time

For each **new or graduated rule**:

1. Rule name and plugin, with the link of its doc page for a human (the page, not its `.md` variant)
2. Code example: what it catches and the fix
3. List all available options by reading the rule's source on GitHub (`gh api repos/oxc-project/oxc/contents/crates/oxc_linter/src/rules/{plugin}/{rule_name}.rs --jq '.content' | base64 -d`). Look for the config struct and its serde fields. Never guess option names from the changelog or commit messages. Present options even if defaults are empty.
4. Recommendation with reasoning
5. Ask via **AskUserQuestion** with concrete options: one rule at a time

For each **new option** on an existing rule: show what the option does with a code example, show our current config for that rule, ask if we adopt it via **AskUserQuestion**.

For **bug fixes**: already covered in the audit report, no question needed.

For **breaking changes**: explain impact, ask how to handle.

For a **new plugin**: ask if we create a config. If yes, list all rules and interview each one.

**Rejected rules get `'off'`.** When the user declines a rule, add it to the appropriate config file with `'off'` severity, the standard one-line comment, and the doc URL. This prevents re-proposing it in future interviews.

Keep a running decision log as you go: you will need it in Step 6.

## Step 6: Apply

Order matters: bump versions first, install, then edit configs, then verify.

### 1. Versions

- Bump `oxlint` and `oxfmt` to the new minor in `devDependencies` and `peerDependencies` of `package.json`, and `@oxlint/plugins` in `dependencies`, keeping the `~` range
- Run `pnpm install`

### 2. Configs

- Add rules to the correct file in `configs/`
- Read `AGENTS.md` for coding conventions before editing
- Each rule: one-line comment + doc URL, in its `.md` variant on oxc.rs. A taken rule is `'error'` alone: write an option only when its value differs from its default.
- If new plugin config: create file, export from `index.ts`, add JSDoc with `@example`

### 3. Documentation

- Update `README.md`: a version bump updates the `oxlint` and `oxfmt` versions of **Requirements**, and a new config gets its row in a table of **Setup**, with its plugin

### 4. Verification (run in parallel)

- `pnpm exec oxlint`: catches unknown rules after breaking changes
- `pnpm exec oxfmt --check`
- `pnpm exec tsdown`: build must pass
- `pnpm exec vitest run`: every preset validated by oxlint, plugin rules tested

If verification fails, fix the issue before continuing.

### 5. Link verification

Check that each new doc URL answers `200` with `curl -s -o /dev/null -w '%{http_code}' -L <url>`. On oxc.rs, write the `.md` variant (`https://oxc.rs/docs/guide/usage/linter/rules/{plugin}/{rule-name}.md`), which answers `200` with `text/markdown`. A JS plugin rule keeps the doc URL of its own repository.

## Step 7: Summary

- Versions bumped (old -> new)
- Rules added (with severity)
- Rules skipped (with reason)
- New options adopted or skipped
- Bug fixes gained for free (with details)
- Breaking changes handled
- oxfmt / LSP improvements
- Open questions if any

## Rules

- **Match the user's language.**
- **One rule at a time.** Never bulk-activate.
- **Check for duplicates.** Before adding a rule, verify it doesn't overlap with an existing rule in another plugin.
- **Type-aware rules go in the type-aware section of `typescript.ts`.** For every new or graduated rule, read the rule source on GitHub (`gh api repos/oxc-project/oxc/contents/crates/oxc_linter/src/rules/{plugin}/{rule_name}.rs --jq '.content' | base64 -d`): a `(tsgolint)` marker in `declare_oxc_lint!` makes it type-aware. The interview of a type-aware rule names the first `oxlint-tsgolint` release that ships it.
