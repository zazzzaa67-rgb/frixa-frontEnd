"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useSite } from "./providers";

export function DashboardShell({ children, marketer = false }: { children: ReactNode; marketer?: boolean }) {
  const ar = useSite().language === "ar";
  const [menuOpen, setMenuOpen] = useState(false);
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("marketer");
    window.location.assign("/login");
  }

  return <div className="dashboard-layout" dir={ar ? "rtl" : "ltr"}>
    <aside className={`dashboard-sidebar ${menuOpen ? "open" : ""}`}><Link className="wordmark" href="/">FORI<span>X</span>A</Link><nav><Link href="/">{ar ? "الرئيسية" : "Home"}</Link><Link href="/#services">{ar ? "الخدمات" : "Services"}</Link><Link href="/dashboard">{ar ? "لوحة التحكم" : "Dashboard"}</Link>{marketer && <Link href="/leaderboard">{ar ? "المتصدرون" : "Leaderboard"}</Link>}<Link href="/#contact">{ar ? "تواصل معنا" : "Contact Us"}</Link></nav><button className="button secondary dashboard-logout" onClick={logout}>{ar ? "تسجيل الخروج" : "Log out"}</button></aside>
    <div className="dashboard-main"><header className="dashboard-topbar"><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={ar ? "فتح القائمة" : "Toggle menu"}>☰</button><span>{marketer ? (ar ? "لوحة المسوّق" : "Marketer Dashboard") : (ar ? "لوحة الحساب" : "Account Dashboard")}</span><span className="dashboard-top-mark">FORI<span className="red">X</span>A</span></header><main className="dashboard-content">{children}</main></div>
  </div>;
}

export function DashboardLoading({ message }: { message: string }) {
  return <div className="dashboard-state" role="status">{message}</div>;
}
