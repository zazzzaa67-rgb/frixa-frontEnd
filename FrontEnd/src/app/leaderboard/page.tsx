"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site";
import { useSite } from "@/components/providers";

type Leader = { full_name: string; visitors: number; sales: number; points: number; balance: number };
const API = "https://forixa-backend.vercel.app/api/projects/leaderboard";

export default function LeaderboardPage() {
  const ar = useSite().language === "ar";
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API).then(async (response) => {
      if (!response.ok) throw new Error("Could not load the leaderboard.");
      const data = await response.json();
      setLeaders(Array.isArray(data) ? data : []);
    }).catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "Could not load the leaderboard."))
      .finally(() => setLoading(false));
  }, []);

  return <><SiteHeader /><main className="leaderboard-page"><header className="leaderboard-heading"><span className="eyebrow">FORIXA COMMUNITY</span><h1>{ar ? "🏆 أفضل المسوّقين" : "🏆 Top Marketers"}</h1><p>{ar ? "المسوّقون الأعلى أداءً حسب النقاط" : "Recognizing our top performing marketers"}</p></header>{loading ? <p className="dashboard-state">{ar ? "جارٍ تحميل النتائج..." : "Loading leaderboard..."}</p> : error ? <p className="dashboard-error">{error}</p> : leaders.length ? <div className="leaderboard-table-wrap"><table className="leaderboard-table"><thead><tr><th>{ar ? "الترتيب" : "Rank"}</th><th>{ar ? "الاسم" : "Name"}</th><th>{ar ? "الزيارات" : "Visitors"}</th><th>{ar ? "المبيعات" : "Sales"}</th><th>{ar ? "النقاط" : "Points"}</th><th>{ar ? "الرصيد" : "Balance"}</th></tr></thead><tbody>{leaders.map((leader, index) => <tr key={`${leader.full_name}-${index}`}><td>{["🥇", "🥈", "🥉"][index] || index + 1}</td><td>{leader.full_name}</td><td>{leader.visitors}</td><td>{leader.sales}</td><td>{leader.points}</td><td>${leader.balance}</td></tr>)}</tbody></table></div> : <p className="dashboard-empty">{ar ? "لا توجد نتائج حاليًا." : "No leaderboard results yet."}</p>}<Link className="button secondary leaderboard-back" href="/marketer-dashboard">{ar ? "العودة إلى لوحة المسوّق" : "Back to marketer dashboard"}</Link></main><SiteFooter /></>;
}
