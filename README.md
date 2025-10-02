Here’s the structured **Markdown version** of the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) spec:

```markdown
# Conventional Commits 1.0.0

## Summary
A lightweight convention for commit messages providing rules for explicit commit history.  
It dovetails with [SemVer](https://semver.org) to describe **features**, **fixes**, and **breaking changes**.

**Format:**
```

[optional scope]:

[optional body]

[optional footer(s)]

```

### Structural Elements
1. **fix:** patches a bug (→ PATCH in SemVer).  
2. **feat:** introduces a feature (→ MINOR in SemVer).  
3. **BREAKING CHANGE:** via footer or `!` after type/scope (→ MAJOR in SemVer).  
4. Other types allowed (e.g., `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`).  
5. Footers may follow [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

---

## Examples
- **Breaking change footer**
```

feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used

```
- **Breaking change via `!`**
```

feat!: send an email to the customer when a product is shipped

```
- **Breaking change with scope**
```

feat(api)!: send an email to the customer when a product is shipped

```
- **No body**
```

docs: correct spelling of CHANGELOG

```
- **Scope usage**
```

feat(lang): add Polish language

```
- **Multi-body + multiple footers**
```

fix: prevent racing of requests

Introduce request id and dismiss older responses.

Reviewed-by: Z

Refs: #123

```

---

## Specification
1. Commits **MUST** be prefixed with a type.  
2. `feat` → new feature.  
3. `fix` → bug fix.  
4. Scope is **optional** (noun in `()`).  
5. Description (short summary) follows `:`.  
6. Body is optional, starts after blank line.  
7. Footers allowed (token + `: value`).  
8. Footer tokens use `-` instead of spaces (e.g., `Acked-by`).  
9. `BREAKING CHANGE` may be in prefix (`!`) or footer.  
10. `BREAKING-CHANGE` = `BREAKING CHANGE`.  
11. Case-insensitive except `BREAKING CHANGE`.

---

## Why Use Conventional Commits
- Auto-generate **CHANGELOGs**  
- Auto-determine **semantic version bumps**  
- Communicate change intent clearly  
- Trigger build/publish pipelines  
- Lower contribution barrier with structured history

---

## FAQ
**Q: How to handle commits in early development?**  
A: Pretend you’re already in production—consistency from the start helps.
```
