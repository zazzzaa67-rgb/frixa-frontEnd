"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site";
import { useSite } from "@/components/providers";

const API = "https://forixa-backend.vercel.app/api/payment/checkout";

export default function PaymentPage() {
  const ar = useSite().language === "ar";
  const [projectId, setProjectId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProjectId(new URLSearchParams(window.location.search).get("projectId") || "");
  }, []);

  async function continueToPayment() {
    if (!projectId || !/^\d+$/.test(projectId)) {
      setMessage(ar ? "رابط الدفع لا يحتوي على رقم مشروع صالح." : "This payment link does not include a valid project ID.");
      return;
    }
    setBusy(true);
    setMessage(ar ? "جارٍ تجهيز الدفع..." : "Preparing your checkout...");
    try {
      const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId: Number(projectId) }) });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || result.message || "Checkout could not be started.");
      window.location.assign(result.checkoutUrl);
    } catch {
      setMessage(ar ? "تعذر بدء الدفع الآن. تواصل مع فريق FORIXA للحصول على المساعدة." : "We couldn’t start checkout. Please contact FORIXA for help.");
    } finally { setBusy(false); }
  }

  return <><SiteHeader /><main className="payment-page"><header className="payment-heading"><span className="eyebrow">FORIXA PROJECTS</span><h1>{ar ? "ملخص المشروع" : "Project Summary"}</h1><p>{ar ? "راجع تفاصيل مشروعك قبل متابعة الدفع." : "Review your project before continuing to payment."}</p></header><section className="payment-card"><div className="payment-order"><div><p className="payment-label">{ar ? "رقم المشروع" : "Project ID"}</p><h2>{projectId ? `#${projectId}` : (ar ? "غير محدد" : "Not specified")}</h2></div><div className="payment-badge">{ar ? "الدفع الآمن عبر Paddle" : "Secure checkout with Paddle"}</div></div><div className="payment-checklist"><h3>{ar ? "الخطوات التالية" : "What happens next?"}</h3><p><span>✓</span>{ar ? "تمت مراجعة طلب مشروعك." : "Your project request has been reviewed."}</p><p><span>✓</span>{ar ? "تم الاتفاق على عرض السعر." : "Your project quote has been approved."}</p><p><span>3</span>{ar ? "أكمل الدفع لبدء التنفيذ." : "Complete payment to begin development."}</p></div><button className="button primary payment-button" onClick={continueToPayment} disabled={busy || !projectId}>{busy ? (ar ? "جارٍ التجهيز..." : "Preparing...") : (ar ? "متابعة الدفع" : "Continue to Payment")}</button><p className="form-status payment-message" role="status" aria-live="polite">{message || (!projectId ? (ar ? "افتح رابط الدفع المرسل من فريقنا لإتمام العملية." : "Use the payment link sent by our team to continue.") : "")}</p><Link className="text-link" href="/">{ar ? "العودة للرئيسية" : "Back to home"}</Link></section></main><SiteFooter /></>;
}
