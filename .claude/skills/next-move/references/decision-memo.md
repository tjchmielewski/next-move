# Decision Memo

For when there are options on the table and nobody will pick. The memo exists to end that: same options, same axes, a recommendation, a named decider, a date. It is written for the decider, which usually means one page and the recommendation in the first three lines.

## Structure

```
# Decision: [the decision in one line, phrased as a choice]

**Recommendation:** Option [X] — [one sentence why].
**Decider:** [role/name] · **Decide by:** [date] · **Prepared by:** [PM]

## Context
[2–3 sentences: why this decision is in front of us now, what happens if we don't make it.]

## Options
| | Option A: [name] | Option B: [name] | Option C: [name] |
|---|---|---|---|
| What it is | | | |
| User impact | | | |
| Effort / timing | | | |
| Compliance / ops implications | | | |
| Reversibility | | | |
| Main risk | | | |

## What you'd have to believe
- To choose A: ...
- To choose B: ...
- To choose C: ...

## Recommendation and reasoning
[One short paragraph. Say which option and why, and what you're trading away.]

## What we need from you
[The explicit ask: "Confirm option B, or tell us which belief above you don't share."]

## Decision log
| Date | Decision | Reason |
|---|---|---|
```

## What good looks like

**Same axes for every option.** The table is the memo. If option B has a "compliance implications" cell and option A doesn't, the reader can't compare. Keep the row set fixed even when a cell says "none."

**"What you'd have to believe."** This is the section that makes disagreement productive. Instead of arguing about options, people can point at the belief they don't hold. It also protects the PM: if the decider picks against the recommendation, the memo already records what they were betting on.

**Include "do nothing" when it's real.** In slow orgs it is often the actual default. Naming it as an option with its own costs forces the comparison.

**Reversibility as a row.** A decision that's cheap to undo should be made fast and by a lower-level decider; a one-way door earns more deliberation. Saying which kind this is often unsticks the conversation by itself.

**One recommendation.** Not "it depends." If the PM doesn't have one, the read should say the real problem is missing information, and the artifact should be a research plan instead.

**The ask is a decision, not feedback.** "Let us know your thoughts" gets thoughts. "Confirm B by Thursday or name the belief you disagree with" gets a decision.

## Traps

- Options that aren't really different (three flavors of the same thing). Collapse them, or add "do nothing."
- Pros/cons lists instead of a fixed-axis table. Pros/cons hide the comparison.
- No decider named. A memo addressed to "leadership" is addressed to nobody.
- Burying the recommendation on page two.
