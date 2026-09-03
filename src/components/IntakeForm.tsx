"use client";

import { useState } from "react";
import {
  AUDIENCES,
  BLOCKERS,
  MAX_SITUATION_CHARS,
  SITUATIONS,
  type AudienceId,
  type BlockerId,
  type Intake,
  type SituationId,
} from "@/lib/intake";
import { EXAMPLES } from "@/lib/examples";

interface Props {
  onSubmit: (intake: Intake) => void;
  onStop: () => void;
  busy: boolean;
}

export default function IntakeForm({ onSubmit, onStop, busy }: Props) {
  const [situation, setSituation] = useState("");
  const [where, setWhere] = useState<SituationId | "">("");
  const [blockers, setBlockers] = useState<BlockerId[]>([]);
  const [audience, setAudience] = useState<AudienceId | "">("");

  const canSubmit = situation.trim().length >= 20 && !busy;

  function toggleBlocker(id: BlockerId) {
    setBlockers((b) => (b.includes(id) ? b.filter((x) => x !== id) : b.length < 2 ? [...b, id] : b));
  }

  function loadExample(i: number) {
    const ex = EXAMPLES[i];
    setSituation(ex.situation);
    setWhere(ex.where ?? "");
    setBlockers(ex.blockers ?? []);
    setAudience(ex.audience ?? "");
  }

  return (
    <form
      className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit({ situation, where, blockers, audience });
      }}
    >
      <Field n={1} label="What's going on?" hintBelow hint="A paragraph is perfect. Names, systems, the exact phrase your exec used — all useful.">
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value.slice(0, MAX_SITUATION_CHARS))}
          rows={7}
          placeholder="Our VP of Humbug came out of a client meeting saying we need to “modernize the claims experience” before renewals. That’s the entire brief. Support hears a status tracker, design hears a refresh, and anything touching payment timing goes through compliance…"
          className="w-full resize-y rounded-lg border border-line bg-paper px-3.5 py-3 text-[0.95rem] leading-relaxed outline-none placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted">
          <span>
            Try an example:{" "}
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.title}
                type="button"
                onClick={() => loadExample(i)}
                className="ml-1 underline decoration-line underline-offset-2 hover:text-accent"
              >
                {ex.title}
              </button>
            ))}
          </span>
          <span className="tabular-nums">{situation.length.toLocaleString()}/{MAX_SITUATION_CHARS.toLocaleString()}</span>
        </div>
      </Field>

      <Field n={2} label="Where are you in it?" hint="Optional — leave blank and the method will decide.">
        <Chips>
          {SITUATIONS.map((s) => (
            <Chip key={s.id} active={where === s.id} onClick={() => setWhere(where === s.id ? "" : s.id)}>
              {s.label}
            </Chip>
          ))}
        </Chips>
      </Field>

      <Field n={3} label="What's actually blocking you?" hint="Pick up to two.">
        <Chips>
          {BLOCKERS.map((b) => (
            <Chip key={b.id} active={blockers.includes(b.id)} onClick={() => toggleBlocker(b.id)}>
              {b.label}
            </Chip>
          ))}
        </Chips>
      </Field>

      <Field n={4} label="Who needs to read the output?" hint="Sets tone and length.">
        <Chips>
          {AUDIENCES.map((a) => (
            <Chip key={a.id} active={audience === a.id} onClick={() => setAudience(audience === a.id ? "" : a.id)}>
              {a.label}
            </Chip>
          ))}
        </Chips>
      </Field>

      <div className="mt-6 flex items-center gap-3">
        {busy ? (
          <button
            type="button"
            onClick={onStop}
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium hover:bg-paper"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Get my next move
          </button>
        )}
        <span className="text-xs text-muted">Takes about 30 seconds.</span>
      </div>
    </form>
  );
}

function Field({
  n,
  label,
  hint,
  hintBelow,
  children,
}: {
  n: number;
  label: string;
  hint?: string;
  hintBelow?: boolean;
  children: React.ReactNode;
}) {
  const hintEl = hint && <p className={`text-xs text-muted ${hintBelow ? "mt-1.5" : "-mt-1 mb-2.5"}`}>{hint}</p>;
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-display text-sm text-accent">{n}</span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {!hintBelow && hintEl}
      {children}
      {hintBelow && hintEl}
    </div>
  );
}

function Chips({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "rounded-full border px-3 py-1.5 text-[0.8rem] leading-tight transition " +
        (active
          ? "border-accent bg-accent text-accent-ink"
          : "border-line bg-paper text-ink hover:border-accent/60")
      }
    >
      {children}
    </button>
  );
}
