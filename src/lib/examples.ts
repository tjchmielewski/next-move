import type { Intake } from "./intake";

export const EXAMPLES: (Partial<Intake> & { title: string; situation: string })[] = [
  {
    title: "fuzzy ask",
    situation:
      "I'm a PM at Humbug Benefits. Our VP of Humbug came out of a client QBR and announced we need to \"modernize the claims experience\" before renewal season. That's the entire brief. Support thinks it means a better status tracker, design hears a visual refresh, and finance has already asked what it costs. Claims data lives in a vendor system we don't control, and anything touching payment timing goes through compliance. I don't know where to start.",
    where: "fuzzy",
    blockers: ["done", "compliance"],
    audience: "leadership",
  },
  {
    title: "roadmap mystery",
    situation:
      "There's an item on our roadmap called \"Project Marley\" that's been haunting the backlog for 2–3 years. The people who put it there have moved on. My director expects me to build it this half because it's on the roadmap, but nobody can tell me what problem it solves or who asked for it — the only note in the ticket says \"per Jacob.\" Jacob left in 2023. I'm stuck between building something nobody can explain and pushing back with no ammunition.",
    where: "roadmap",
    blockers: ["nocall"],
    audience: "leadership",
  },
  {
    title: "design review",
    situation:
      "I have Figma designs done for a redesigned participant dashboard at Cratchit Retirement Services — account balance, vesting status, and a new \"you may be eligible for\" section that nudges people toward increasing contributions or a Roth option. Engineering picks it up in two weeks. I have no idea who it needs to go through or in what order. We have compliance, legal, a plan services team, client relationship managers, InfoSec, and a design team — and at least one of them will say bah.",
    where: "review",
    blockers: ["who", "compliance"],
    audience: "compliance",
  },
];
