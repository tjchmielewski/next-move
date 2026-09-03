import type { Intake } from "./intake";

export const EXAMPLES: (Partial<Intake> & { title: string; situation: string })[] = [
  {
    title: "fuzzy ask",
    situation:
      "I'm a PM at a retirement/401k recordkeeping company. Our CEO said in a leadership meeting that he wants a \"simpler enrollment experience\" for participants by end of Q1 and now it's on my plate. Nobody has defined what simpler means. Ops thinks it means fewer screens, compliance is already nervous about anything that touches the contribution election and disclosures, and the enrollment flow runs on a legacy system that another team owns. I don't know where to start.",
    where: "fuzzy",
    blockers: ["done", "compliance"],
    audience: "leadership",
  },
  {
    title: "roadmap mystery",
    situation:
      "There's an item on our roadmap called \"Accessible Balance & Eligibility\" that's been sitting there for 2–3 years. The people who put it there have moved on. My director expects me to build it this half because it's on the roadmap, but nobody can tell me what problem it solves or who asked for it. I'm stuck between building something nobody can explain and pushing back with no ammunition.",
    where: "roadmap",
    blockers: ["nocall"],
    audience: "leadership",
  },
  {
    title: "design review",
    situation:
      "I have Figma designs done for a redesigned participant dashboard in our 401k web app — account balance, vesting status, and a new \"you may be eligible for\" section that nudges people toward increasing contributions or a Roth option. Engineering picks it up in two weeks. I have no idea who it needs to go through or in what order. We have compliance, legal, a plan services team, client relationship managers, InfoSec, and a design team.",
    where: "review",
    blockers: ["who", "compliance"],
    audience: "compliance",
  },
];
