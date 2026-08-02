"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg border border-hairline bg-white p-6 text-lg font-medium text-teal">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("name")}</span>
        <input
          type="text"
          name="name"
          required
          maxLength={200}
          className="rounded border border-hairline bg-white px-4 py-3 outline-none transition-colors focus:border-teal"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("email")}</span>
        <input
          type="email"
          name="email"
          required
          maxLength={200}
          className="rounded border border-hairline bg-white px-4 py-3 outline-none transition-colors focus:border-teal"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("message")}</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={6}
          className="rounded border border-hairline bg-white px-4 py-3 outline-none transition-colors focus:border-teal"
        />
      </label>

      {status === "error" && (
        <p className="text-sm font-medium text-red-700">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-fit rounded bg-aeromine-500 px-8 py-3 font-bold text-ink transition-colors hover:bg-aeromine-400 disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
