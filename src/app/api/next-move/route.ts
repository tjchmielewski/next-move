import Anthropic from "@anthropic-ai/sdk";
import { METHOD_PROMPT } from "@/lib/method.generated";
import { intakeToMessage, MAX_SITUATION_CHARS, type Intake } from "@/lib/intake";
import { checkRateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 120;

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "Server is missing ANTHROPIC_API_KEY." }, { status: 500 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const limit = checkRateLimit(ip);
  if (!limit.ok) return Response.json({ error: limit.reason }, { status: 429 });

  let intake: Intake;
  try {
    intake = (await req.json()) as Intake;
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }
  const situation = (intake.situation ?? "").trim();
  if (situation.length < 20) {
    return Response.json({ error: "Tell me a bit more about what's going on — a few sentences." }, { status: 400 });
  }
  if (situation.length > MAX_SITUATION_CHARS) {
    return Response.json({ error: `Keep it under ${MAX_SITUATION_CHARS.toLocaleString()} characters.` }, { status: 400 });
  }

  const client = new Anthropic();
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    system: METHOD_PROMPT,
    messages: [{ role: "user", content: intakeToMessage(intake) }],
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Generation failed.";
        controller.enqueue(encoder.encode(`\n\n> **Something went wrong:** ${msg}\n`));
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
