"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site";
import { useSite } from "@/components/providers";

const plans = [
  ["Landing Page", 70, "Modern responsive landing page."],
  ["Business Website", 250, "Professional multi-page website."],
  ["AI Chatbot", 150, "AI chatbot with business integrations."],
  ["Custom Web App", 250, "Full-stack applications built for your business."],
  ["API", 100, "Secure, scalable REST APIs with authentication, database integration, and third-party services."],
  ["AI Agent", 350, "Intelligent AI agents that automate tasks, integrate with your tools, and streamline business workflows."]
];
const arabicNames: Record<string, string> = { "Landing Page": "صفحة هبوط", "Business Website": "موقع أعمال", "AI Chatbot": "روبوت محادثة بالذكاء الاصطناعي", "Custom Web App": "تطبيق ويب مخصص", API: "واجهة برمجية", "AI Agent": "وكيل ذكاء اصطناعي" };
const arabicDescriptions: Record<string, string> = { "Landing Page": "صفحة هبوط عصرية ومتجاوبة.", "Business Website": "موقع احترافي متعدد الصفحات.", "AI Chatbot": "روبوت محادثة بالذكاء الاصطناعي مع تكاملات للأعمال.", "Custom Web App": "تطبيقات متكاملة مصممة لأعمالك.", API: "واجهات REST آمنة وقابلة للتوسع مع المصادقة وقواعد البيانات والخدمات الخارجية.", "AI Agent": "وكلاء ذكاء اصطناعي لأتمتة المهام والتكامل مع أدواتك وتحسين سير العمل." };

export default function PricingPage() {
  const ar = useSite().language === "ar";
  return <><SiteHeader /><main className="page-shell pricing-shell"><div className="page-intro"><h1>{ar ? <>الأسعار <span className="red">والخدمات</span></> : <>Pricing</>}</h1><p>{ar ? "أسعار مبدئية لخدمات تطوير البرمجيات." : "Professional Software Development Services"}</p></div><div className="pricing-grid">{plans.map(([name, price, description]) => <article className="pricing-card" key={name}><h2>{ar ? arabicNames[name as string] : name}</h2><p className="pricing-amount">{ar ? `تبدأ من $${price}` : `Starting from $${price}`}</p><p>{ar ? arabicDescriptions[name as string] : description}</p><Link className="text-link" href={`/service/${name === "Landing Page" ? 3 : name === "AI Chatbot" ? 4 : name === "API" ? 5 : name === "AI Agent" ? 6 : 1}`}>{ar ? "تفاصيل الخدمة ←" : "Service details →"}</Link></article>)}</div><p className="pricing-note">{ar ? "السعر النهائي يتحدد بعد مناقشة نطاق ومتطلبات المشروع." : "Final pricing depends on the scope and requirements of your project."} <Link className="text-link" href="/details">{ar ? "أرسل متطلباتك" : "Share your requirements"}</Link></p></main><SiteFooter /></>;
}
