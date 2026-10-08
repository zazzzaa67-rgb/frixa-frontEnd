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

  const arabicNames = ["", "تطوير المواقع والتطبيقات المتكاملة", "مواقع الأعمال الشخصية", "صفحات الهبوط", "روبوتات المحادثة بالذكاء الاصطناعي", "تطوير واجهات API", "وكلاء الذكاء الاصطناعي"];
  const arabicDescriptions = ["", "تطبيقات ويب متكاملة تجمع بين الواجهات الحديثة والخوادم وقواعد البيانات وأنظمة تسجيل الدخول الآمنة.", "مواقع احترافية تعرض علامتك التجارية وأعمالك وخدماتك بتصميم أنيق ومتوافق مع مختلف الأجهزة.", "صفحات هبوط مصممة لجذب الزوار وتشجيعهم على التواصل معك وتحقيق أهداف نشاطك التجاري.", "روبوتات محادثة ذكية تجيب عن أسئلة العملاء وتساعد على أتمتة الدعم وتحسين تجربة المستخدم.", "واجهات REST API آمنة وقابلة للتوسع لربط تطبيقاتك وخدماتك بكفاءة.", "وكلاء ذكاء اصطناعي مخصصون لأتمتة سير العمل والتكامل مع أدواتك وتوفير وقت فريقك."];
  const arabicIncludes: Record<number, string[]> = {
    1: ["واجهة متجاوبة", "خلفية باستخدام Node.js", "نظام تسجيل دخول آمن", "ربط قواعد البيانات", "لوحة تحكم إدارية", "تطوير باستخدام React"],
    2: ["تصميم متجاوب", "حتى 5 صفحات", "نموذج تواصل", "تهيئة لمحركات البحث", "أداء وسرعة تحميل محسّنان"],
    3: ["تصميم متجاوب", "أزرار واضحة لاتخاذ الإجراء", "نموذج لجمع بيانات العملاء", "واجهة عصرية", "بنية مهيأة لمحركات البحث"],
    4: ["تكامل مع OpenAI", "ربط بالموقع الإلكتروني", "سجل للمحادثات", "تعليمات مخصصة للروبوت", "واجهة متجاوبة"],
    5: ["إنشاء نقاط REST API", "نظام مصادقة", "ربط قواعد البيانات", "توثيق الواجهة البرمجية", "اختبار الواجهة"],
    6: ["أتمتة سير العمل", "منطق ذكاء اصطناعي مخصص", "تكامل مع الأدوات", "تكامل مع OpenAI", "إعداد ونشر الوكيل"]
  };
  const arabicDelivery = ["", "10–20 يومًا", "3–7 أيام", "2–5 أيام", "3–7 أيام", "3–6 أيام", "5–10 أيام"];

  return <><SiteHeader /><main className="service-detail"><Link className="back-link" href="/#services">← {ar ? "العودة إلى الخدمات" : "Back to Services"}</Link><section className="service-top"><div><h1>{ar ? arabicNames[service.id] : service.title}</h1><p className="section-lead">{ar ? arabicDescriptions[service.id] : service.description}</p><p className="service-price">{ar ? `السعر يبدأ من $${service.price}` : `Starting at $${service.price}`}</p><Link className="button primary" href="/details">{ar ? "ابدأ مشروعك" : service.button} →</Link></div><img src={service.image} alt="" /></section>
    <section><h2>{ar ? <>ماذا تشمل <span className="red">الخدمة؟</span></> : <>What’s <span className="red">Included</span></>}</h2><div className="includes-grid">{service.includes.map((item, index) => <div className="include-item" key={item}>{ar ? arabicIncludes[service.id][index] : item}</div>)}</div></section>
    <div className="service-meta"><div><strong className="red">{ar ? "مدة التنفيذ المتوقعة" : "Estimated Delivery"}</strong><br />{ar ? arabicDelivery[service.id] : service.delivery}</div><div><strong className="red">{ar ? "التعديلات" : "Revisions"}</strong><br />{ar ? "غير محدودة" : service.revisions}</div></div>
  </main><SiteFooter /></>;
}
