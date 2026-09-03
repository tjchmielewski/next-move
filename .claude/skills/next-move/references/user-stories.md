# User Stories + Acceptance Criteria

For when direction is set and the solution has to be defined precisely enough for engineering to estimate and QA to test — and, in regulated products, for compliance to verify. Stories are grouped under the outcome they serve so nobody loses the thread between "what we're building" and "why."

## Structure

```
# [Initiative] — user stories

**Problem (from the one-pager):** [one sentence]
**Hypothesis:** We believe that by building [X] for [Y], we will achieve [Z].

## Outcome 1: [state of the world we're trying to reach]

### Story 1.1 — [short title]
As a [specific persona], I want [capability] so that [benefit].

**Acceptance criteria**
- Given [context], when [action], then [observable result].
- Given ..., when ..., then ...

**Notes for engineering:** [systems touched, data needed, edge cases known]
**Compliance / ops touchpoints:** [what's disclosed, recorded, or changes for ops — or "none identified"]

### Story 1.2 — ...

## Outcome 2: ...

## Out of scope for this release
- ...

## Open questions
- ...
```

## What good looks like

**Personas are specific.** "Participant" is too broad in a retirement product; "a newly eligible employee enrolling for the first time on mobile" tells the engineer and the designer what to optimize. Use the personas the org already uses if they were mentioned.

**Acceptance criteria are testable by someone who didn't write them.** Given/when/then, with observable results. "The page is intuitive" is not testable. "Given a participant has not selected a contribution rate, when they tap Continue, then the field is highlighted and an inline message reads [copy]" is. Where copy matters (it usually does in regulated flows), put the actual copy in or mark it `[copy — compliance review required]`.

**Edge cases live in the criteria, not in a wiki.** Ineligible states, partial data, an employer that has turned the feature off, a session that times out mid-flow. Enterprise products have many configurations; name the ones that matter.

**Compliance touchpoints per story.** Anything that changes a disclosure, a notice, a recorded election, a calculation, or a communication to a participant gets flagged on the story itself — that's where the compliance reviewer will look, and it prevents the "we found out in UAT" failure.

**Right-sized.** Each story should be finishable inside a sprint. If a story has more than five or six criteria, it's probably two stories.

**Group by outcome.** Six to twelve stories under two or three outcomes is a good release. Thirty stories is a backlog, not a definition.

## Traps

- Stories that are really tasks ("As a developer, I want to refactor…"). Those belong in engineering's plan, not here.
- Criteria that describe the UI in detail but not the behavior. The design file has the UI; the criteria have the rules.
- Forgetting the unhappy paths. In money-related flows the unhappy paths are the ones that generate tickets.
- No link back to the problem. Put the hypothesis at the top so the stories can be judged against it.
