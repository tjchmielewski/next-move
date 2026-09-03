"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  text: string;
  status: "idle" | "streaming" | "done" | "error";
  error: string | null;
}

interface Sections {
  read: string;
  artifact: string;
  move: string;
}

const H = { read: "## The read", artifact: "## The artifact", move: "## The next move" };

function split(text: string): Sections {
  const iR = text.indexOf(H.read);
  const iA = text.indexOf(H.artifact);
  const iM = text.indexOf(H.move);
  const slice = (from: number, to: number, head: string) =>
    from < 0 ? "" : text.slice(from + head.length, to < 0 ? undefined : to).trim();
  return {
    read: iR < 0 ? (iA < 0 && iM < 0 ? text : "") : slice(iR, iA < 0 ? iM : iA, H.read),
    artifact: slice(iA, iM, H.artifact),
    move: slice(iM, -1, H.move),
  };
}

function artifactTitle(md: string): string {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/\*\*/g, "").trim() : "artifact";
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || "artifact";
}

export default function Output({ text, status, error }: Props) {
  const s = useMemo(() => split(text), [text]);
  const streaming = status === "streaming";

  if (status === "idle") return <Empty />;

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-line bg-warn-soft p-4 text-sm">{error}</div>
      )}

      {(s.read || streaming) && (
        <Section label="The read" className="rise">
          <div className={`md md-read ${streaming && !s.artifact ? "cursor" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.read}</ReactMarkdown>
          </div>
          {streaming && !s.read && <p className="text-sm text-muted">Reading the situation…</p>}
        </Section>
      )}

      {s.artifact && (
        <Section
          label="The artifact"
          className="rise"
          actions={status === "done" ? <ArtifactActions md={s.artifact} /> : undefined}
        >
          <div className={`md ${streaming && !s.move ? "cursor" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.artifact}</ReactMarkdown>
          </div>
        </Section>
      )}

      {s.move && (
        <Section label="The next move" className="rise" accent>
          <div className={`md md-read ${streaming ? "cursor" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.move}</ReactMarkdown>
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  label,
  children,
  actions,
  accent,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border p-5 sm:p-7 ${accent ? "border-accent/40 bg-accent-soft" : "border-line bg-card"} ${className}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-xs uppercase tracking-[0.18em] text-accent">{label}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

function ArtifactActions({ md }: { md: string }) {
  const [copied, setCopied] = useState(false);
  const title = artifactTitle(md);

  async function copy() {
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  }

  function download() {
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug(title)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const btn = "rounded-md border border-line px-2.5 py-1 text-xs font-medium hover:bg-paper";
  return (
    <div className="flex gap-2">
      <button type="button" onClick={copy} className={btn}>
        {copied ? "Copied" : "Copy markdown"}
      </button>
      <button type="button" onClick={download} className={btn}>
        Download .md
      </button>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl border border-dashed border-line p-7 text-sm leading-relaxed text-muted sm:p-9">
      <p className="font-display text-lg text-ink">What comes back</p>
      <ol className="mt-3 space-y-2">
        <li>
          <span className="text-ink">The read</span> — what&rsquo;s actually going on, in a few
          opinionated sentences, and why this document and not another.
        </li>
        <li>
          <span className="text-ink">The artifact</span> — an initiative one-pager, research plan,
          decision memo, user stories, alignment note, or review request. Drafted from your
          specifics, ready to paste. Gaps written as gaps, never invented.
        </li>
        <li>
          <span className="text-ink">The next move</span> — one thing to do in the next 48 hours,
          with a named recipient and a specific ask.
        </li>
      </ol>
    </div>
  );
}
