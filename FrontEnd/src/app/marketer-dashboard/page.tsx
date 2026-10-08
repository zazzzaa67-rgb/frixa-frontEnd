"use client";

import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/providers";
import { DashboardLoading, DashboardShell } from "@/components/dashboard";
import { useMarketerData } from "@/lib/useMarketerData";

export default function MarketerDashboardPage() {
  const ar = useSite().language === "ar";
  const { profile, projects, loading, error } = useMarketerData();
  const [copied, setCopied] = useState(false);
  if (loading) return <DashboardShell marketer><DashboardLoading message={ar ? "جارٍ تحميل لوحة المسوّق..." : "Loading marketer dashboard..."} /></DashboardShell>;

  async function copyReferralLink() {
    if (!profile?.ref_code) return;
    const referralLink = `${window.location.origin}/?ref=${encodeURIComponent(profile.ref_code)}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return <DashboardShell marketer><section className="account-banner marketer-banner"><img src="/images/avatar.png" alt="" /><div><h1>{profile?.full_name}</h1><p>{profile?.email}</p><span className="role-pill">{ar ? "مسوّق" : "Marketer"}</span></div><div className="referral-card"><p>{ar ? "كود الإحالة الخاص بك" : "Your Referral Code"}</p><strong>{profile?.ref_code || "—"}</strong><button className="button primary" onClick={copyReferralLink}>{copied ? (ar ? "تم النسخ ✓" : "Copied ✓") : (ar ? "نسخ رابط الإحالة" : "Copy referral link")}</button></div></section>
    <section className="dashboard-section"><div className="dashboard-section-heading"><div><h2>{ar ? "نظرة عامة تسويقية" : "Marketing Overview"}</h2><p>{ar ? "أداء الإحالات والعمولات" : "Your referral and commission performance"}</p></div></div><div className="dashboard-stat-grid five-stats"><Stat label={ar ? "الزيارات" : "Visitors"} value={profile?.visitors ?? 0} accent="red" /><Stat label={ar ? "المشاريع المحالة" : "Referred Projects"} value={projects.length} accent="blue" /><Stat label={ar ? "المبيعات" : "Sales"} value={profile?.sales ?? 0} accent="green" /><Stat label={ar ? "الرصيد" : "Balance"} value={`$${profile?.balance ?? 0}`} accent="yellow" /><Stat label={ar ? "النقاط" : "Points"} value={profile?.points ?? 0} accent="blue" /></div></section>
    <section className="dashboard-section"><div className="dashboard-section-heading"><div><h2>{ar ? "أحدث الإحالات" : "Recent Referrals"}</h2><p>{ar ? "المشاريع المسجلة عبر رابطك" : "Projects attributed to your referral link"}</p></div><Link className="text-link" href="/leaderboard">{ar ? "عرض لوحة المتصدرين" : "View leaderboard"}</Link></div>{error && <p className="dashboard-error">{error}</p>}{projects.length ? <div className="dashboard-project-list">{projects.slice(0, 8).map((project) => <article className="dashboard-project" key={project.id}><div><h3>{project.project_name}</h3><time>{new Date(project.created_at).toLocaleDateString(ar ? "ar-EG" : "en-US")}</time></div><span className={`status-pill status-${project.status.toLowerCase()}`}>{project.status}</span><strong>${project.price ?? 0}</strong></article>)}</div> : <div className="dashboard-empty"><p>{ar ? "لا توجد إحالات حتى الآن." : "There are no referrals yet."}</p><button className="button secondary" onClick={copyReferralLink}>{ar ? "نسخ رابط الإحالة" : "Copy referral link"}</button></div>}</section>
  </DashboardShell>;
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return <article className="dashboard-stat"><p>{label}</p><strong className={`stat-${accent}`}>{value}</strong></article>;
}
