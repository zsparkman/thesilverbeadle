"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Wired to a no-op + mailto fallback for launch. Swap to Formspree/Resend/route later.
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` <${email}>` : ""}`,
    );
    setSubmitted(true);
    // TODO: replace with a real handler (Formspree / Resend / app/api/contact route).
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  if (submitted) {
    return (
      <div
        className="rounded-sm border border-stone-line bg-white/40 p-6 text-sm text-stone-ink"
        role="status"
        aria-live="polite"
      >
        Thanks — your email client should have opened with a message ready to
        send. If not, write directly to{" "}
        <a
          href={`mailto:${site.email}`}
          className="underline underline-offset-2 hover:text-stone-accent"
        >
          {site.email}
        </a>
        .
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-ink-soft">
          Name
        </span>
        <input
          required
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm border border-stone-line bg-white/60 px-3 py-2 text-sm focus:border-stone-accent focus:outline-none"
        />
      </label>
      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-ink-soft">
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm border border-stone-line bg-white/60 px-3 py-2 text-sm focus:border-stone-accent focus:outline-none"
        />
      </label>
      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-ink-soft">
          Message
        </span>
        <textarea
          required
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="rounded-sm border border-stone-line bg-white/60 px-3 py-2 text-sm focus:border-stone-accent focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="justify-self-start rounded-sm bg-stone-ink px-5 py-2.5 text-sm font-medium tracking-wide text-stone-bg transition hover:bg-stone-accent"
      >
        Send
      </button>
    </form>
  );
}
