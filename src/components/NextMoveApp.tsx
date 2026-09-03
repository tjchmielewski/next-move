"use client";

import { useCallback, useRef, useState } from "react";
import IntakeForm from "./IntakeForm";
import Output from "./Output";
import HowItWorks from "./HowItWorks";
import type { Intake } from "@/lib/intake";

type Status = "idle" | "streaming" | "done" | "error";

export default function NextMoveApp() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const run = useCallback(async (intake: Intake) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setText("");
    setError(null);
    setStatus("streaming");
    // On small screens the output is below the form; bring it into view.
    setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);

    try {
      const res = await fetch("/api/next-move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intake),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setText(acc);
      }
      setStatus("done");
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError((e as Error).message);
      setStatus("error");
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStatus((s) => (s === "streaming" ? "done" : s));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
      <header className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl tracking-tight">Next Move</span>
          <span className="text-sm text-muted">for product managers &amp; designers</span>
        </div>
        <HowItWorks />
      </header>

      <section className="mb-10 max-w-3xl">
        <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          Stuck on what to do next?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Describe the situation in your own words. You&rsquo;ll get a sharp read on what&rsquo;s
          actually going on, the one document that will move it — drafted, not templated — and a
          concrete move for the next 48 hours.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <IntakeForm onSubmit={run} onStop={stop} busy={status === "streaming"} />
        </div>
        <div ref={outputRef} className="min-w-0 scroll-mt-6">
          <Output text={text} status={status} error={error} />
        </div>
      </div>

      <footer className="mt-16 border-t border-line pt-6 text-sm text-muted">
        A Skoble build — week 5. The method behind this is a Claude Skill; the web app is a front
        door for people who aren&rsquo;t using AI tools yet.
      </footer>
    </div>
  );
}
