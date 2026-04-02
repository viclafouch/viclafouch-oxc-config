---
name: oxc-update
description: Audit oxlint and oxfmt releases for new rules, graduated rules, bug fixes, and breaking changes. Bump versions, interview the user on each finding, and update configs/docs accordingly.
user-invocable: true
argument-hint: "[release-url]"
---

Audit oxlint and oxfmt for updates. If the user provides a release URL, start from that release. Otherwise, detect all missed releases.

## Step 1: Context

Read these files in parallel:

- `package.json` — current `devDependencies` versions of `oxlint` and `oxfmt`
- `GAPS.md` — rules waiting to be implemented upstream

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

## Step 4: Audit

Extract and categorize findings:

| Category | What to look for |
|---|---|
| New rules | Rules added to any plugin |
| Graduated rules | Rules promoted from `nursery` to a stable category |
| New options | New config options on existing rules |
| Bug fixes | Fixes on rules already enabled in our config |
| Breaking changes | Behavioral changes, removed or renamed rules |
| New plugins | Entirely new plugin support |
| oxfmt changes | New formatting options or language support |

Cross-check with `GAPS.md` — flag any gap that is now implemented.

Present a one-line-per-finding summary table. No code examples yet — save those for the interview.

**If zero actionable findings:** just bump versions (Step 6) and stop.

## Step 5: Interview — one rule at a time

For each **new or graduated rule**:

1. Rule name and plugin
2. Code example: what it catches and the fix
3. List all available options (check the rule's schema in source). Present them even if defaults are empty.
4. Recommendation with reasoning
5. Ask via **AskUserQuestion** with concrete options — one rule at a time

For each **new option** on an existing rule: show what it changes, ask if we adopt it.

For **bug fixes**: note them as free gains, no question needed.

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

## Step 7: Summary

- Versions bumped (old → new)
- Rules added (with severity)
- Rules skipped (with reason)
- Bug fixes gained for free
- Breaking changes handled
- Open questions if any

## Rules

- **Match the user's language.**
- **One rule at a time.** Never bulk-activate.
- **Check for duplicates.** Before adding a rule, verify it doesn't overlap with an existing rule in another plugin.
- **Respect type-aware boundaries.** Rules requiring `typeAware: true` stay commented out until tsgolint ships.
