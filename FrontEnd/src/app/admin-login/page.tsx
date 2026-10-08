"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SiteFooter, SiteHeader } from "@/components/site";

const API = "https://forixa-backend.vercel.app/api/admin/login";

export default function AdminLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("Signing in...");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not sign in.");
      localStorage.setItem("adminToken", result.token);
      router.push("/admin-dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not sign in.");
    } finally { setBusy(false); }
  }

  return <><SiteHeader /><main className="auth-shell"><section className="auth-card"><Link className="wordmark" href="/">FORI<span>X</span>A</Link><p className="auth-tagline">Administrative access</p><h1>Welcome <span className="red">Admin!</span></h1><p>Log in to manage FORIXA projects and marketers.</p><form className="auth-form" onSubmit={login}><label>Email<input type="email" name="email" autoComplete="username" required /></label><label>Password<input type="password" name="password" autoComplete="current-password" required /></label><button className="button primary" disabled={busy}>{busy ? "Signing in..." : "Login"}</button><p className="form-status" role="status" aria-live="polite">{message}</p></form></section></main><SiteFooter /></>;
}
