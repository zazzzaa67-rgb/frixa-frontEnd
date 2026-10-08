"use client";

import Link from "next/link";
import { useSite } from "@/components/providers";
import { DashboardLoading, DashboardShell } from "@/components/dashboard";
import { useMarketerData } from "@/lib/useMarketerData";

export default function DashboardPage() {
  const ar = useSite().language === "ar";
  const { profile, projects, loading, error } = useMarketerData();
  if (loading) return <DashboardShell><DashboardLoading message={ar ? "جارٍ تحميل لوحة التحكم..." : "Loading your dashboard..."} /></DashboardShell>;

  const completed = projects.filter((item) => item.status.toLowerCase() === "completed").length;
  const pending = projects.filter((item) => item.status.toLowerCase() === "pending").length;
  const active = projects.filter((item) => !["completed", "pending", "cancelled"].includes(item.status.toLowerCase())).length;

  return <DashboardShell><section className="account-banner"><img src="/images/avatar.png" alt="" /><div><h1>{profile?.full_name || (ar ? "حسابي" : "My Account")}</h1><p>{profile?.email}</p><span className="role-pill">{ar ? "مسوّق" : "Marketer"}</span></div></section>
    <section className="dashboard-section"><div className="dashboard-section-heading"><div><h2>{ar ? "نظرة عامة على المشاريع" : "Projects Overview"}</h2><p>{ar ? "ملخص لحالة مشاريعك" : "A summary of your project activity"}</p></div></div><div className="dashboard-stat-grid"><Stat label={ar ? "مشاريع نشطة" : "Active projects"} value={active} accent="red" /><Stat label={ar ? "مكتملة" : "Completed"} value={completed} accent="green" /><Stat label={ar ? "قيد الانتظار" : "Pending"} value={pending} accent="yellow" /></div></section>
    <section className="dashboard-section"><div className="dashboard-section-heading"><div><h2>{ar ? "مشاريعي" : "My Projects"}</h2><p>{ar ? "أحدث المشاريع المرتبطة بحسابك" : "Recent projects linked to your account"}</p></div><Link className="text-link" href="/details">{ar ? "ابدأ مشروعًا جديدًا" : "Start a project"}</Link></div>{error && <p className="dashboard-error">{error}</p>}{projects.length ? <div className="dashboard-project-list">{projects.slice(0, 8).map((project) => <article className="dashboard-project" key={project.id}><div><h3>{project.project_name}</h3><time>{new Date(project.created_at).toLocaleDateString(ar ? "ar-EG" : "en-US")}</time></div><span className={`status-pill status-${project.status.toLowerCase()}`}>{project.status}</span><strong>${project.price ?? 0}</strong></article>)}</div> : <div className="dashboard-empty"><p>{ar ? "لا توجد مشاريع بعد." : "You don’t have any projects yet."}</p><Link className="button primary" href="/details">{ar ? "ابدأ مشروعك" : "Start your project"}</Link></div>}</section>
  </DashboardShell>;
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return <article className="dashboard-stat"><p>{label}</p><strong className={`stat-${accent}`}>{value}</strong></article>;
}
