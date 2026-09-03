# Next Move

*For product managers and designers who are stuck on what to do next.*

Describe the situation. Get a sharp read on what's actually going on, the one document that will move it — drafted from your specifics, not a template — and a concrete move for the next 48 hours.

Built for regulated, enterprise product environments (fintech, retirement/401k, insurance) where compliance is a real stakeholder, executives direct by phrase, and roadmap items outlive the reasons they were added.

## One method, two front doors

The method lives in **`.claude/skills/next-move/`** as a [Claude Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview): a `SKILL.md` with the diagnosis, routing table and output contract, plus six artifact templates under `references/`.

| Front door | How it uses the Skill | Best for |
|---|---|---|
| **Claude Code** | Auto-loaded when working in this repo (or symlink it into `~/.claude/skills/` for everywhere). Asks up to three follow-up questions before drafting. | People already using Claude |
| **This web app** | `scripts/build-prompt.mjs` concatenates the same files into the system prompt at build time. States assumptions instead of asking. | Everyone else |

There is deliberately no second copy of the method anywhere.

### The routing

| Situation | Artifact |
|---|---|
| Someone handed me a fuzzy ask | Initiative One-Pager (interpretation mode: 2–3 readings of the ask) |
| It's on the roadmap, nobody remembers why | Initiative One-Pager (reconstruction mode: inferred rationale → build / rescope / retire) |
| Exploring, don't know enough yet | Research Plan |
| We have options and can't pick | Decision Memo |
| Direction set, define the solution | User Stories + Acceptance Criteria |
| Too many threads, nobody's aligned | Alignment Note |
| I have a design and it needs review | Review Request, with reviewer routing derived from what the design touches |

Every answer has the same three parts: **the read** → **the artifact** → **the next move**.

## Run it

```bash
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm install
npm run dev                  # prebuild regenerates src/lib/method.generated.ts
```

Deploy to Vercel with the same environment variables. The `prebuild` step runs there too.

## Use the Skill in Claude Code

From this folder, just start `claude` and describe your situation — the Skill triggers on its own. To have it everywhere:

```bash
ln -s "$(pwd)/.claude/skills/next-move" ~/.claude/skills/next-move
```

## Evals

`.claude/skills/next-move/evals/evals.json` holds three scenarios (a CEO's fuzzy ask, a roadmap item with no memory, a design that needs routing). Run with and without the Skill; without it, Claude returns numbered-step advice — reasonable, and nothing you can paste. That gap is the reason this exists.

---

A [Skoble](../) build — week 5.
