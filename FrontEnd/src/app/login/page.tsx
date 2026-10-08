"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { SiteHeader, SiteFooter } from "@/components/site";
import { useSite } from "@/components/providers";

const API = "https://forixa-backend.vercel.app/api/auth/login";

export default function LoginPage() {
  const ar = useSite().language === "ar";
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(ar ? "جارٍ تسجيل الدخول..." : "Signing in...");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not sign in.");
      localStorage.setItem("token", result.token);
      window.location.assign("/marketer-dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : (ar ? "تعذر تسجيل الدخول." : "Could not sign in."));
    } finally { setBusy(false); }
  }

  return <><SiteHeader /><main className="auth-shell"><section className="auth-card"><Link className="wordmark" href="/">FORI<span>X</span>A</Link><p className="auth-tagline">{ar ? "نبني حلولًا رقمية تحقق نتائج حقيقية." : "We build digital solutions that drive real results."}</p><h1>{ar ? <>مرحبًا <span className="red">بعودتك</span></> : <>Welcome <span className="red">Back!</span></>}</h1><p>{ar ? "سجل الدخول إلى حسابك للمتابعة." : "Log in to your account to continue."}</p>
    <form className="auth-form" onSubmit={login}><label>{ar ? "البريد الإلكتروني" : "Email"}<input type="email" name="email" autoComplete="email" placeholder="you@email.com" required /></label><label>{ar ? "كلمة المرور" : "Password"}<input type="password" name="password" autoComplete="current-password" required /></label><button className="button primary" disabled={busy}>{busy ? (ar ? "جارٍ الدخول..." : "Signing in...") : (ar ? "تسجيل الدخول" : "Login")}</button><p className="form-status" role="status" aria-live="polite">{message}</p></form>
    <p>{ar ? "ليس لديك حساب؟" : "Don’t have an account?"} <Link className="text-link" href="/signup.html">{ar ? "إنشاء حساب" : "Sign up"}</Link></p></section></main><SiteFooter /></>;
}
