"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { SiteHeader, SiteFooter } from "@/components/site";
import { useSite } from "@/components/providers";

const API = "https://forixa-backend.vercel.app/api/auth/marketer";

export default function SignupPage() {
  const ar = useSite().language === "ar";
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState(false);
  const [busy, setBusy] = useState(false);

  async function signup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(ar ? "جارٍ إنشاء الحساب..." : "Creating your account...");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not create your account.");
      setCreated(true);
      setMessage(result.message || (ar ? "تم إنشاء الحساب بنجاح." : "Your account was created successfully."));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : (ar ? "تعذر إنشاء الحساب." : "Could not create your account."));
    } finally { setBusy(false); }
  }

  return <><SiteHeader /><main className="auth-shell"><section className="auth-card"><Link className="wordmark" href="/">FORI<span>X</span>A</Link><p className="auth-tagline">{ar ? "نبني حلولًا رقمية تحقق نتائج حقيقية." : "We build digital solutions that drive real results."}</p><h1>{ar ? <>أنشئ حساب <span className="red">المسوّق</span></> : <>Create your <span className="red">Marketer Account</span></>}</h1>
    {created ? <div className="auth-success"><p role="status">{message}</p><Link className="button primary" href="/logIn.html">{ar ? "تسجيل الدخول" : "Go to login"}</Link></div> : <form className="auth-form" onSubmit={signup}><label>{ar ? "الاسم بالكامل" : "Full Name"}<input name="fullName" autoComplete="name" placeholder={ar ? "اسمك بالكامل" : "Your full name"} required /></label><label>{ar ? "البريد الإلكتروني" : "Email"}<input type="email" name="email" autoComplete="email" placeholder="you@email.com" required /></label><label>{ar ? "كلمة المرور" : "Password"}<input type="password" name="password" autoComplete="new-password" required /></label><button className="button primary" disabled={busy}>{busy ? (ar ? "جارٍ الإنشاء..." : "Creating account...") : (ar ? "إنشاء الحساب" : "Sign up")}</button><p className="form-status" role="status" aria-live="polite">{message}</p></form>}
    <p>{ar ? "لديك حساب بالفعل؟" : "Already have an account?"} <Link className="text-link" href="/logIn.html">{ar ? "تسجيل الدخول" : "Login"}</Link></p></section></main><SiteFooter /></>;
}
