"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardLoading } from "@/components/dashboard";
import { useSite } from "@/components/providers";

const API = "https://forixa-backend.vercel.app";
const STATUSES = ["new", "contacted", "waiting_payment", "paid", "in_progress", "completed", "cancelled"];

type AdminProject = {
  id: number;
  project_name: string;
  status: string;
  price: number | null;
  clients?: { full_name?: string; email?: string; phone?: string } | null;
  marketers?: { full_name?: string; ref_code?: string } | null;
};
type AdminMarketer = { id: number; full_name: string; ref_code: string; visitors: number; sales: number; points: number; balance: number; email: string };
type AdminStats = { totalProjects: number; totalClients: number; totalMarketers: number; totalRevenue: number };
type EditableProject = AdminProject & { editPrice: string; editStatus: string; saving?: boolean };

export default function AdminDashboardPage() {
  const router = useRouter();
  const ar = useSite().language === "ar";
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [projects, setProjects] = useState<EditableProject[]>([]);
  const [marketers, setMarketers] = useState<AdminMarketer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { router.replace("/admin-login"); return; }

    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/api/projects/dashboard/stats`, { headers }),
      fetch(`${API}/api/projects`, { headers }),
      fetch(`${API}/api/projects/marketers`, { headers })
    ]).then(async ([statsResponse, projectsResponse, marketersResponse]) => {
      if ([statsResponse, projectsResponse, marketersResponse].some(response => response.status === 401 || response.status === 403)) {
        localStorage.removeItem("adminToken");
        router.replace("/admin-login");
        return;
      }
      if (!statsResponse.ok || !projectsResponse.ok || !marketersResponse.ok) throw new Error("Could not load admin data. Please refresh and try again.");
      const [statsData, projectData, marketerData] = await Promise.all([statsResponse.json(), projectsResponse.json(), marketersResponse.json()]);
      setStats(statsData);
      setProjects((Array.isArray(projectData) ? projectData : []).map((project: AdminProject) => ({ ...project, editPrice: project.price == null ? "" : String(project.price), editStatus: project.status })));
      setMarketers(Array.isArray(marketerData) ? marketerData : []);
    }).catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "Could not load admin data."))
      .finally(() => setLoading(false));
  }, [router]);

  function updateProject(id: number, field: "editPrice" | "editStatus", value: string) {
    setProjects(current => current.map(project => project.id === id ? { ...project, [field]: value } : project));
  }

  async function saveProject(project: EditableProject) {
    const token = localStorage.getItem("adminToken");
    if (!token) { router.replace("/admin-login"); return; }
    const price = Number(project.editPrice);
    if (!Number.isFinite(price) || price < 0) { setError("Enter a valid project price."); return; }
    setError(""); setNotice("");
    setProjects(current => current.map(item => item.id === project.id ? { ...item, saving: true } : item));
    try {
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const priceResponse = await fetch(`${API}/api/projects/${project.id}/price`, { method: "PUT", headers, body: JSON.stringify({ price }) });
      const priceResult = await priceResponse.json();
      if (!priceResponse.ok) throw new Error(priceResult.message || "Could not update project price.");
      const statusResponse = await fetch(`${API}/api/projects/${project.id}/status`, { method: "PUT", headers, body: JSON.stringify({ status: project.editStatus }) });
      const statusResult = await statusResponse.json();
      if (!statusResponse.ok) throw new Error(statusResult.message || "Could not update project status.");
      setProjects(current => current.map(item => item.id === project.id ? { ...item, price, status: project.editStatus, editPrice: String(price), saving: false } : item));
      setNotice(ar ? "تم حفظ التعديلات." : "Project changes saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save project changes.");
      setProjects(current => current.map(item => item.id === project.id ? { ...item, saving: false } : item));
    }
  }

  function logout() { localStorage.removeItem("adminToken"); router.push("/admin-login"); }

  if (loading) return <DashboardLoading message={ar ? "جارٍ تحميل لوحة الإدارة..." : "Loading admin dashboard..."} />;

  return <main className="admin-page" dir={ar ? "rtl" : "ltr"}><header className="admin-header"><Link href="/" className="wordmark">FORI<span>X</span>A</Link><h1>{ar ? "لوحة الإدارة" : "Admin Dashboard"}</h1><button className="button secondary" onClick={logout}>{ar ? "تسجيل الخروج" : "Log out"}</button></header><div className="admin-content">{error && <p className="admin-alert error" role="alert">{error}</p>}{notice && <p className="admin-alert success" role="status">{notice}</p>}
    <h2>{ar ? "نظرة عامة" : "Overview"}</h2><section className="admin-stats"><AdminStat title={ar ? "المشاريع" : "Projects"} value={stats?.totalProjects ?? 0} /><AdminStat title={ar ? "العملاء" : "Clients"} value={stats?.totalClients ?? 0} /><AdminStat title={ar ? "المسوّقون" : "Marketers"} value={stats?.totalMarketers ?? 0} /><AdminStat title={ar ? "الإيرادات" : "Revenue"} value={`$${stats?.totalRevenue ?? 0}`} /></section>
    <section className="admin-section"><h2>{ar ? "المشاريع" : "Projects"}</h2>{projects.length ? <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>{ar ? "المشروع" : "Project"}</th><th>{ar ? "العميل" : "Client"}</th><th>{ar ? "المسوّق" : "Marketer"}</th><th>{ar ? "الحالة" : "Status"}</th><th>{ar ? "السعر" : "Price"}</th><th>{ar ? "الهاتف" : "Client phone"}</th><th>Email</th><th>{ar ? "حفظ" : "Save"}</th></tr></thead><tbody>{projects.map(project => <tr key={project.id}><td>{project.project_name}</td><td>{project.clients?.full_name || "—"}</td><td>{project.marketers?.full_name || "—"}</td><td><select value={project.editStatus} onChange={event => updateProject(project.id, "editStatus", event.target.value)}>{STATUSES.map(status => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></td><td><input className="admin-price-input" type="number" min="0" step="0.01" value={project.editPrice} onChange={event => updateProject(project.id, "editPrice", event.target.value)} /></td><td>{project.clients?.phone || "—"}</td><td>{project.clients?.email || "—"}</td><td><button className="button primary admin-save" onClick={() => saveProject(project)} disabled={project.saving}>{project.saving ? "…" : (ar ? "حفظ" : "Save")}</button></td></tr>)}</tbody></table></div> : <p className="admin-empty">{ar ? "لا توجد مشاريع حاليًا." : "No projects yet."}</p>}</section>
    <section className="admin-section"><h2>{ar ? "المسوّقون" : "Marketers"}</h2>{marketers.length ? <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>ID</th><th>{ar ? "الاسم" : "Name"}</th><th>{ar ? "كود الإحالة" : "Referral code"}</th><th>{ar ? "الزيارات" : "Visitors"}</th><th>{ar ? "المبيعات" : "Sales"}</th><th>{ar ? "النقاط" : "Points"}</th><th>{ar ? "الرصيد" : "Balance"}</th><th>Email</th></tr></thead><tbody>{marketers.map(marketer => <tr key={marketer.id}><td>{marketer.id}</td><td>{marketer.full_name}</td><td>{marketer.ref_code}</td><td>{marketer.visitors}</td><td>{marketer.sales}</td><td>{marketer.points}</td><td>${marketer.balance}</td><td>{marketer.email}</td></tr>)}</tbody></table></div> : <p className="admin-empty">{ar ? "لا يوجد مسوّقون حاليًا." : "No marketers yet."}</p>}</section>
  </div></main>;
}

function AdminStat({ title, value }: { title: string; value: number | string }) {
  return <article className="admin-stat"><p>{title}</p><strong>{value}</strong></article>;
}
