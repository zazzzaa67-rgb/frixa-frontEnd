"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useSite } from "./providers";

const API = "https://forixa-backend.vercel.app/api/contact";

export function SiteHeader() {
  const { language, setLanguage, dark, setDark } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const ar = language === "ar";
  return <header className="site-header" id="home">
    <Link className="wordmark" href="/">FORI<span>X</span>A</Link>
    <div className="header-actions">
      <button className="mobile-nav-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      <button className="icon-button" type="button" onClick={() => setDark(!dark)} aria-label={ar ? "تغيير المظهر" : "Toggle theme"}>{dark ? "☾" : "☀"}</button>
      <button className="language-button" type="button" onClick={() => setLanguage(ar ? "en" : "ar")}>{ar ? "EN" : "العربية"}</button>
      <nav id="main-navigation" className={menuOpen ? "is-open" : ""} aria-label="Main navigation" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setMenuOpen(false); }}>
        <a href="/#services">{ar ? "الخدمات" : "Services"}</a>
        <Link href="/about">{ar ? "من نحن" : "About Us"}</Link>
        <a href="/#projects">{ar ? "المشاريع" : "Projects"}</a>
        <a href="/#faq">{ar ? "الأسئلة" : "FAQ"}</a>
        <a href="/#contact">{ar ? "تواصل معنا" : "Contact Us"}</a>
        <Link className="nav-cta" href="/details">{ar ? "ابدأ مشروعك" : "Start Project"}</Link>
      </nav>
    </div>
  </header>;
}

export function SiteFooter() {
  const ar = useSite().language === "ar";
  return <footer className="site-footer">
    <div><Link className="wordmark" href="/">FORI<span>X</span>A</Link><p>{ar ? "نساعد الشركات على النمو من خلال التكنولوجيا والتطوير الاستراتيجي." : "We help businesses grow through technology, strategic planning, and software development."}</p>
      <div className="social-links"><a href="https://x.com/forixau35s" target="_blank" rel="noreferrer">X</a><a href="https://www.linkedin.com/company/forixa" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.facebook.com/profile.php?id=61592712089009" target="_blank" rel="noreferrer">Facebook</a></div>
    </div>
    <div className="footer-links"><strong>{ar ? "روابط" : "Links"}</strong><a href="/#home">{ar ? "الرئيسية" : "Home"}</a><a href="/#services">{ar ? "الخدمات" : "Services"}</a><a href="/#projects">{ar ? "المشاريع" : "Projects"}</a><a href="/#contact">{ar ? "تواصل معنا" : "Contact Us"}</a><Link href="/privacy">Privacy Policy</Link><Link href="/refund">Refund Policy</Link><Link href="/terms">Terms of Service</Link></div>
  </footer>;
}

export function ContactForm() {
  const ar = useSite().language === "ar";
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus(ar ? "جارٍ الإرسال..." : "Sending...");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ whatsapp: data.get("whatsapp"), subject: data.get("subject"), message: data.get("message") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not send message");
      setStatus(ar ? "تم إرسال رسالتك بنجاح." : "Your message was sent successfully.");
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : (ar ? "تعذر إرسال الرسالة." : "Could not send message."));
    } finally { setSending(false); }
  }

  return <form className="contact-form" onSubmit={submit}>
    <label>{ar ? "رقم واتساب" : "WhatsApp Number"}<input name="whatsapp" type="tel" placeholder="+20 10 1234 5678" required /></label>
    <label>{ar ? "موضوع الرسالة" : "Subject"}<input name="subject" maxLength={150} required /></label>
    <label>{ar ? "الرسالة" : "Message"}<textarea name="message" rows={6} maxLength={5000} required /></label>
    <button className="button primary" disabled={sending}>{sending ? (ar ? "جارٍ الإرسال..." : "Sending...") : (ar ? "إرسال الرسالة" : "Send Message")}</button>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
