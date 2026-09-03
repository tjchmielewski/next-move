// The intake vocabulary — shared by the form and the API route so labels stay in sync
// with the situations the Skill routes on.

export const SITUATIONS = [
  { id: "fuzzy", label: "Someone handed me a fuzzy ask" },
  { id: "roadmap", label: "It's on the roadmap, nobody remembers why" },
  { id: "exploring", label: "Exploring the problem, don't know enough yet" },
  { id: "options", label: "We have options and can't pick" },
  { id: "define", label: "Direction is set, I need to define the solution" },
  { id: "threads", label: "Too many threads, nobody's aligned" },
  { id: "review", label: "I have a design and it needs review" },
] as const;

export const BLOCKERS = [
  { id: "users", label: "Don't understand the users" },
  { id: "disagree", label: "Stakeholders disagree" },
  { id: "nocall", label: "Nobody will make the call" },
  { id: "eng", label: "Engineering needs specifics" },
  { id: "compliance", label: "Compliance / legal is an unknown" },
  { id: "done", label: "Don't know what 'done' looks like" },
  { id: "who", label: "Don't know who needs to see it" },
] as const;

export const AUDIENCES = [
  { id: "leadership", label: "Leadership" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design peers" },
  { id: "compliance", label: "Compliance / risk" },
  { id: "me", label: "Just me" },
] as const;

export type SituationId = (typeof SITUATIONS)[number]["id"];
export type BlockerId = (typeof BLOCKERS)[number]["id"];
export type AudienceId = (typeof AUDIENCES)[number]["id"];

export interface Intake {
  situation: string;
  where?: SituationId | "";
  blockers?: BlockerId[];
  audience?: AudienceId | "";
}

export const MAX_SITUATION_CHARS = 4000;

const label = <T extends { id: string; label: string }>(list: readonly T[], id?: string) =>
  list.find((x) => x.id === id)?.label;

export function intakeToMessage(i: Intake): string {
  const lines = [`What's going on:\n${i.situation.trim()}`];
  const w = label(SITUATIONS, i.where);
  lines.push(`Where I am in it: ${w ?? "not sure — you decide from the description"}`);
  const b = (i.blockers ?? []).map((id) => label(BLOCKERS, id)).filter(Boolean);
  lines.push(`What's blocking me: ${b.length ? b.join("; ") : "not specified — infer it"}`);
  const a = label(AUDIENCES, i.audience);
  lines.push(`Who needs to read the output: ${a ?? "not specified — infer it"}`);
  return lines.join("\n\n");
}
