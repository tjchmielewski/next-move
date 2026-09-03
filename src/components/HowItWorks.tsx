"use client";

import { useState } from "react";

const REPO = process.env.NEXT_PUBLIC_REPO_URL;

export default function HowItWorks() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-muted underline decoration-line underline-offset-4 hover:text-accent"
      >
        How this works
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="rise max-h-[85dvh] w-full max-w-xl overflow-y-auto rounded-2xl border border-line bg-card p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl tracking-tight">One method, two front doors</h2>
            <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted">
              <p>
                In product work it&rsquo;s often unclear what to do next — and in slow-moving
                industries the usual answer is a blank template nobody fills in. Next Move
                replaces the template with a method: diagnose where you are, pick the one artifact
                that moves the situation, draft it from your specifics, and name the next move.
              </p>
              <p>
                That method is written as a{" "}
                <span className="text-ink">Claude Skill</span> — a folder of plain-language
                instructions (a diagnosis, a routing table, and six artifact templates) that
                Claude loads when a conversation calls for it. Anyone using Claude Code can drop
                the folder in and get the same behavior in their terminal, with follow-up
                questions.
              </p>
              <p>
                This web app is the second front door. At build time it reads the very same Skill
                files and turns them into its system prompt, so there is exactly one source of
                truth. It skips the follow-up questions and states its assumptions instead, which
                makes it a better fit for people who aren&rsquo;t using AI tools yet.
              </p>
              <p>
                Built for PMs and designers in regulated, enterprise environments — fintech,
                retirement, insurance — where compliance is a real stakeholder and roadmap items
                outlive the reasons they were added.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              {REPO ? (
                <a href={REPO} className="text-sm text-accent underline underline-offset-4" target="_blank" rel="noreferrer">
                  Read the Skill on GitHub
                </a>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-line px-4 py-2 text-sm hover:bg-paper"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
