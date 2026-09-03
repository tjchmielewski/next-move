# Initiative One-Pager

The kickoff document and the source of truth for an initiative. In most product orgs this template already exists and nobody fills it in, because a blank one demands more discipline than a busy PM has on a Tuesday. Your job is to remove that cost: turn a messy paragraph into a drafted one-pager good enough to paste into the team's page and argue with.

It has two modes. Pick one based on the situation; the structure is identical, the honesty markers differ.

- **Interpretation mode** — a fuzzy ask arrived from an executive or stakeholder. The hard part is decoding what they meant.
- **Reconstruction mode** — the item is on the roadmap, nobody remembers why, and it's expected to ship. The hard part is rebuilding a rationale honestly and deciding whether it still holds.

## Structure

Use exactly these sections and headings, in this order.

```
# [Initiative name] — Initiative One-Pager

**Product team:** · **Summary:** (one sentence) · **Apps / systems touched:**

## Problem
*Why are we doing this?*
[2–4 sentences: who has the problem, what happens today, why it matters.]

**Evidence**
- ...

## Hypothesis
*Our bet on how we solve the problem.*
We believe that by building **[solution]** for **[user persona]**, we will achieve **[measurable outcome]**.

## Scope constraint
**In scope**
- ...
**Out of scope**
- ...

## Key assumptions & risks
**Assumptions**
- ...
**Risks**
- ...

## Expected outcomes
*What success looks like — not how it's achieved.*
1. ...
2. ...

## Strategic alignment
*Why this problem matters now.*
Solving this advances our strategy by:
- ...

## Decision log
| Date | Decision | Reason |
|---|---|---|
| [date] | [e.g. Framed the ask as X rather than Y] | [why] |

## Open questions
- ...
```

## What good looks like, section by section

**Problem.** Written about the user or the business, not about the feature. "Participants abandon enrollment at the contribution-rate step because the default options don't match how they think about money" is a problem. "We need a simpler enrollment flow" is a solution wearing a problem's clothes. If the ask arrived as a solution, work backwards to the problem it implies and mark the inference.

**Evidence.** Only what actually exists: data they mentioned, complaints they've heard, support tickets, a competitor move, a regulatory change. When there's nothing yet, say so in the bullet itself — "No funnel data reviewed yet; pull step-level drop-off from [analytics tool] before kickoff." A one-pager with honest evidence gaps gets funded more often than one with invented certainty, because the reader can tell.

**Hypothesis.** One sentence, in the exact "We believe that by building X for Y, we will achieve Z" form. Z must be observable — a number, a behavior change, a time saved — even if the number itself is a placeholder to fill in. If you can't complete the sentence, that's the finding: put the strongest candidate in and flag it as the thing the kickoff needs to settle.

**Scope constraint.** Out of scope is the more important half. It's where you protect the team from the executive's second sentence ("...and while we're in there, could we also…"). Name the adjacent things that will be asked for and park them explicitly.

**Assumptions & risks.** Assumptions are the things that must be true for the hypothesis to hold; each should be checkable. Risks in regulated environments almost always include at least one of: a disclosure or communication that changes, a rule engine or eligibility calculation touched, a downstream ops process affected, a legacy system dependency. Name the specific one, not "compliance risk".

**Expected outcomes.** Two or three, numbered, each phrased as a state of the world, not a deliverable. "Enrollment completion rate for new hires rises from [current] to [target]" not "New enrollment flow shipped."

**Strategic alignment.** Tie to something the org actually says it cares about — a stated annual goal, a client commitment, a retention risk. If you don't know the org's strategy, write the bullet as a prompt: "Connects to [the FY goal this most plausibly serves — confirm with your director]."

**Decision log.** Seed it with the one decision this document itself makes: how the ask was framed. Future-you will want to know why.

**Open questions.** Everything you couldn't resolve. Three to six. Each one should be a question someone specific could answer.

## Interpretation mode — decoding a fuzzy ask

Before the Problem section, add a short block:

```
## What the ask probably means
The request as received: "[their exact phrase]"

Plausible readings:
1. **[Reading A]** — [what would be built, who benefits]. Most likely because [reason from context].
2. **[Reading B]** — ...
3. **[Reading C]** — ...

This one-pager is drafted against reading [N]. Confirm before kickoff.
```

Two or three readings, ranked, with the top one driving the rest of the document. This block is the most valuable thing in the document: it turns "figure out what the CEO meant" from a private anxiety into a five-minute conversation. The next move is almost always "take this to the person who made the ask and get them to pick a reading."

## Reconstruction mode — a roadmap item with no memory

Add a block before Problem:

```
## Reconstructed rationale
This item was added to the roadmap around [when, if known] by [whom, if known]. The original reasoning is not documented.

Most probable original reasons (inferred):
1. ...
2. ...

What's changed since then that could affect whether it still holds:
- ...
```

Then write the rest of the one-pager against the strongest reconstructed reason, marking inferred content "(inferred)". End the Open questions with the real question: **Build as scoped / rescope / retire?** — and give your recommendation in one sentence with the reason. The person needs permission to ask that question out loud; the document gives it to them.

## Traps

- Writing the Problem as the executive's phrase restated. Decode it.
- Filling Evidence with plausible-sounding claims. Gaps, not guesses.
- Leaving Out of scope empty. It's where the document earns its keep.
- Producing a two-page one-pager. Cut Strategic alignment before cutting Out of scope.
