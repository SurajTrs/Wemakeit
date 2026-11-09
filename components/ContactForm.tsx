"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { contact, hasEmail, hasWhatsApp, mailtoLink, whatsappLink } from "@/content/site";
import { Icon, WhatsAppIcon } from "./Icon";
import { btn } from "./ui";

type Fields = { name: string; phone: string; businessType: string; service: string; message: string };
const empty: Fields = { name: "", phone: "", businessType: "", service: "", message: "" };

function buildMessage(f: Fields) {
  return [
    "Hi WeMakeIt, I would like to discuss my business requirements.",
    "",
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    `Business: ${f.businessType || "-"}`,
    `Service needed: ${f.service || "-"}`,
    f.message ? `\nMessage: ${f.message}` : "",
  ]
    .join("\n")
    .trim();
}

const inputCls =
  "w-full rounded-2xl border border-line bg-raised px-4 py-3.5 text-[15px] text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const labelCls = "mb-2 block text-sm font-medium text-fg";

export function ContactForm() {
  const [f, setF] = useState<Fields>(empty);
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  const [sent, setSent] = useState(false);
  const canSend = hasWhatsApp || hasEmail;

  const sendEmail = () => {
    window.location.href = mailtoLink(buildMessage(f), contact.emailSubject);
    setSent(true);
  };

  // Primary submit: WhatsApp if a number is configured, otherwise email.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) return;
    if (hasWhatsApp) {
      window.open(whatsappLink(buildMessage(f)), "_blank", "noopener,noreferrer");
      setSent(true);
    } else {
      sendEmail();
    }
  };

  const onEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (form && !form.reportValidity()) return;
    sendEmail();
  };

  const c = contact.fields;

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className={labelCls}>{c.name}</label>
        <input id="cf-name" name="name" required autoComplete="name" value={f.name} onChange={set("name")} className={inputCls} />
      </div>
      <div>
        <label htmlFor="cf-phone" className={labelCls}>{c.phone}</label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          pattern="[0-9+\s\-]{10,20}"
          title="Enter a valid phone number"
          value={f.phone}
          onChange={set("phone")}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="cf-business" className={labelCls}>{c.businessType}</label>
        <input
          id="cf-business"
          name="businessType"
          placeholder={c.businessTypePlaceholder}
          value={f.businessType}
          onChange={set("businessType")}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="cf-service" className={labelCls}>{c.service}</label>
        <select id="cf-service" name="service" required value={f.service} onChange={set("service")} className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238A8A90%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11`}>
          <option value="" disabled>Choose one</option>
          {contact.serviceOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={labelCls}>{c.message}</label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder={c.messagePlaceholder}
          value={f.message}
          onChange={set("message")}
          className={`${inputCls} resize-y`}
        />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" disabled={!canSend} className={`${btn.base} ${btn.lime} disabled:cursor-not-allowed disabled:opacity-50`}>
          {hasWhatsApp ? <WhatsAppIcon /> : <Icon name="mail" />}
          {hasWhatsApp ? contact.submitWhatsApp : contact.submitEmailOnly}
        </button>
        {hasWhatsApp && hasEmail && (
          <button type="button" onClick={onEmail} className={`${btn.base} ${btn.ghost}`}>
            <Icon name="mail" />
            {contact.submitEmail}
          </button>
        )}
      </div>
      <p className="text-xs leading-relaxed text-muted sm:col-span-2">
        By sending, you agree to our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-accent">Privacy Policy</Link> and{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-accent">Terms of Service</Link>.
      </p>
      <p role="status" aria-live="polite" className="text-sm text-muted sm:col-span-2">
        {!canSend ? contact.notConfigured : sent ? contact.sent : ""}
      </p>
    </form>
  );
}
