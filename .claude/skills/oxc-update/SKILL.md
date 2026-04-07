---
name: oxc-update
description: Audit oxlint and oxfmt releases for new rules, graduated rules, bug fixes, and breaking changes. Bump versions, interview the user on each finding, and update configs/docs accordingly.
user-invocable: true
argument-hint: '[release-url]'
---

Audit oxlint and oxfmt for updates. If the user provides a release URL, start from that release. Otherwise, detect all missed releases.

## Step 1: Context

Read these files in parallel:

- `package.json` — current `devDependencies` versions of `oxlint` and `oxfmt`
- `GAPS.md` — rules waiting to be implemented upstream
- All files in `configs/` — to know exactly which rules and options are currently enabled

## Step 2: Detect updates

Run `npx taze` to check for available updates on `oxlint` and `oxfmt`.

**If the user provided a release URL:** skip this step, go straight to Step 3.

**If both are already up to date:** report it and stop.

## Step 3: Fetch changelogs

Use `gh release list` to identify missed releases, then `gh release view <tag>` for each one. Fetch oxlint and oxfmt in parallel.

- **oxlint**: repo `oxc-project/oxc`
- **oxfmt**: repo `nicolo-ribaudo/oxfmt`

Keep it compact — only extract linter and formatter changes, skip parser/transformer noise.

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
| Bug fixes (other)             | Fixes on rules we don't use — note them but flag as no impact.                                                                  |
| Breaking changes              | Behavioral changes, removed or renamed rules                                                                                    |
| New plugins                   | Entirely new plugin support                                                                                                     |
| oxfmt features                | New formatting options, language support, config support                                                                        |
| oxfmt bug fixes               | Formatting fixes (edge cases, stability)                                                                                        |
| LSP / tooling                 | VS Code extension changes, config walker improvements, autofix changes                                                          |

### 4b. Cross-check

- Cross-check with `GAPS.md` — flag any gap that is now implemented.
- For each bug fix in the changelog, grep the rule name in `configs/` to confirm whether it's enabled or not.
- For new options, check the rule's current config in our files to see if the new option is relevant.

### 4c. Present the full audit report

Present ALL findings in a structured report with these sections:

1. **Bug fixes on our rules** — table: rule name, what changed, which config file has it
2. **New options on existing rules** — table: rule name, new option, current config, whether it needs attention
3. **New rules** — one-line-per-rule summary table
4. **Graduated rules** — with source and target category
5. **Breaking changes** — impact assessment
6. **oxfmt changes** — features and fixes
7. **LSP / tooling** — notable changes for the dev experience
8. **GAPS.md updates** — gaps that can now be closed

After presenting the full report, ask the user via **AskUserQuestion**: "Ready to start the rule interview?" before proceeding to Step 5.

**If zero actionable findings:** just bump versions (Step 6) and stop.

## Step 5: Interview — one rule at a time

For each **new or graduated rule**:

1. Rule name and plugin
2. Code example: what it catches and the fix
3. List all available options by fetching the rule's doc page (WebFetch). Never guess option names from the changelog or commit messages. Present options even if defaults are empty.
4. Recommendation with reasoning
5. Ask via **AskUserQuestion** with concrete options — one rule at a time

For each **new option** on an existing rule: show what the option does with a code example, show our current config for that rule, ask if we adopt it via **AskUserQuestion**.

For **bug fixes**: already covered in the audit report, no question needed.

For **breaking changes**: explain impact, ask how to handle.

For a **new plugin**: ask if we create a config. If yes, list all rules and interview each one.

Keep a running decision log as you go — you will need it in Step 6.

## Step 6: Apply

Order matters: bump versions first, install, then edit configs, then verify.

### 1. Versions

- Bump `devDependencies` and `peerDependencies` in `package.json`
- Run `npm install`

### 2. Configs

- Add rules to the correct file in `configs/`
- Read `CLAUDE.md` for coding conventions before editing
- Each rule: one-line comment + doc URL. Always write options explicitly, even when using defaults.
- If new plugin config: create file, export from `index.ts`, add JSDoc with `@example`

### 3. Documentation

- Update `README.md` (config table, usage section, hierarchy, requirements)
- Update `GAPS.md` (remove implemented rules, add new gaps)

### 4. Verification (run in parallel)

- `npx oxlint` — catches unknown rules after breaking changes
- `npx oxfmt --check`
- `npx tsup` — build must pass

If verification fails, fix the issue before continuing.

### 5. Link verification

For every new doc URL added in comments, verify it's not a 404 using WebFetch. Fix any broken links before finishing.

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
- **Respect type-aware boundaries.** Rules requiring `typeAware: true` stay commented out until tsgolint ships. Do NOT propose them as activable rules during the interview.
- **Verify type-aware status.** For every new or graduated rule, check its doc page (WebFetch) to see if it requires type information. The oxlint docs show a 💭 icon and explicit text when a rule needs `typeAware: true`. If it does, add it to the commented-out type-aware section in `typescript.ts` and update `GAPS.md` (type-aware deferred count + table). Never activate a type-aware rule when `typeAware: false`.
