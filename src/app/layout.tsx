import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces/opsz.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Move — what to do next, and the document to do it with",
  description:
    "For product managers and designers who are stuck. Describe the situation; get a sharp read, a drafted artifact you can paste, and one concrete next move.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-paper text-ink">{children}</body>
    </html>
  );
}
