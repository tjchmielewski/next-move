# Review Request

For when there's a design (or a spec, or a prototype) and it needs review — and, very often, the real blocker is *who* should review it and in what order. The request does two jobs: it routes the work to the right reviewers, and it tells each of them what kind of feedback is wanted so the PM gets decisions instead of opinions.

## Structure

```
# Review request — [what's being reviewed]

**Link:** [Figma / prototype / doc]
**What it is:** [one sentence — what the user can do that they couldn't before]
**Stage:** [early concept / detailed design / ready for build] — feedback should match the stage.
**Feedback needed by:** [date] — [what happens on that date, e.g. "we start build" or "goes to the client"]

## Who needs to see this, and why
| Reviewer | Why they're on this | What I need from them | Order |
|---|---|---|---|
| ... | ... | ... | 1 |

## What to look at
1. [Specific screen/flow] — [the question to hold in mind while looking]
2. ...

## What I need feedback on
- ...
## What I'm not looking for feedback on (yet)
- ...

## Constraints reviewers should know
- ...

## Known open questions
- ...

## How to respond
[Comment in Figma by (date) / 20-minute walkthrough on (day) / reply to this note. If I hear nothing by (date), I'll proceed with build.]
```

## Routing — deriving reviewers from what the design touches

This is the part most PMs in regulated orgs are missing, and it's the part the skill should be most useful for. Work through what the design *touches* and map to who must see it. Be specific to what the person described; don't list every function in the company.

| If the design touches… | Then it needs… | Typically when |
|---|---|---|
| Money movement, contribution rates, distributions, loans, rollovers | Compliance/ERISA or regulatory review; operations (the team that processes it) | Before build; often before detailed design |
| Disclosures, notices, fee information, tax language, anything participants read that has legal weight | Compliance + legal copy review | Before build — copy changes late are expensive |
| Eligibility, vesting, plan rules, employer configuration | The rules/plan-services team; QA lead for configuration matrix | Detailed design stage |
| PII, authentication, account access, beneficiaries | Security/InfoSec; privacy | Detailed design stage |
| Anything client-facing or client-configurable (B2B2C) | Client services / relationship management; possibly a pilot client | Concept stage for direction, again before launch |
| Legacy system data or integrations | Lead engineer / architect of that system | As early as possible — feasibility can kill the design |
| Established design system or patterns | Design peers / design system owner | Detailed design |
| Existing support workflows | Call center / support leads | Detailed design |

**Order matters.** Feasibility (engineering) and hard constraints (compliance) go before polish (design peers), because there's no point critiquing typography on a flow that can't ship. Put the reviewer who can kill it first.

**Distinguish approvers from advisors.** In the table, say whether each person needs to *approve* (they can block), *advise* (their input shapes it), or is *informed* (they'll be affected and shouldn't be surprised). Most designs have one or two approvers and several advisors; treating everyone as an approver is how reviews take six weeks.

**When the person doesn't know who fills a role,** put the role in the table with `[name — ask your manager / the PMO who owns compliance review for this product]`. Naming the role is most of the work; someone in the org knows the name.

## What good looks like

**Feedback scoped to the stage.** At concept stage, ask "is this the right direction?" and explicitly wave off pixel feedback. At detailed design, ask about edge cases and copy. Reviewers give whatever kind of feedback the request invites; invite the right kind.

**Questions attached to screens.** "Look at the contribution step — does the default rate match what plan rules allow?" gets a useful answer. "Let me know what you think" gets "looks good."

**A proceed-by-default line.** "If I hear nothing by [date], I'll proceed." Same mechanism as the alignment note; it's the only thing that produces responses in slow orgs. Use it for advisors, not approvers — approvers have to actually approve.

**Constraints stated up front.** The legacy system limitation, the client commitment, the regulatory deadline. Saves reviewers from suggesting things that were already ruled out, and saves the PM from explaining it six times.

## Traps

- One email to everyone with no per-reviewer ask. Each row of the table is a different conversation.
- Asking compliance last. They're the ones who can send it back to square one.
- "Any feedback welcome." It isn't; ask for what you need.
- No deadline, or a deadline with nothing behind it.
