"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site";
import { useSite } from "@/components/providers";
import { services } from "@/lib/services";

export default function ServiceDetailsPage() {
  const params = useParams<{ id: string }>();
  const service = services.find((item) => item.id === Number(params.id));
  const ar = useSite().language === "ar";
  if (!service) return <><SiteHeader /><main className="page-shell"><h1>{ar ? "الخدمة غير موجودة" : "Service not found"}</h1><Link className="back-link" href="/#services">{ar ? "العودة إلى الخدمات" : "Back to services"}</Link></main><SiteFooter /></>;

  const arabicNames = ["", "تطوير Full-Stack", "مواقع الأعمال الشخصية", "صفحات الهبوط", "روبوتات المحادثة بالذكاء الاصطناعي", "تطوير واجهات API", "وكلاء الذكاء الاصطناعي"];
  const arabicIncludes = ["تصميم متجاوب", "حتى 5 صفحات", "نموذج تواصل", "تهيئة SEO", "سرعة تحميل عالية"];
  return <><SiteHeader /><main className="service-detail"><Link className="back-link" href="/#services">← {ar ? "العودة للخدمات" : "Back to Services"}</Link><section className="service-top"><div><h1>{ar ? arabicNames[service.id] : service.title}</h1><p className="section-lead">{service.description}</p><p className="service-price">{ar ? `تبدأ من $${service.price}` : `Starts from $${service.price}`}</p><Link className="button primary" href="/details">{ar ? "ابدأ مشروعك" : service.button} →</Link></div><img src={service.image} alt="" /></section>
    <section><h2>{ar ? <>ماذا تشمل <span className="red">الخدمة</span>؟</> : <>What’s <span className="red">Included</span></>}</h2><div className="includes-grid">{service.includes.map((item, index) => <div className="include-item" key={item}>{ar ? arabicIncludes[index] || item : item}</div>)}</div></section>
    <div className="service-meta"><div><strong className="red">{ar ? "مدة التسليم" : "Delivery Time"}</strong><br />{ar ? service.id === 1 ? "10–20 يومًا" : "3–7 أيام" : service.delivery}</div><div><strong className="red">{ar ? "التعديلات" : "Revisions"}</strong><br />{ar ? "غير محدودة" : service.revisions}</div></div>
  </main><SiteFooter /></>;
}
