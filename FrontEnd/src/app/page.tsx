"use client";

import Link from "next/link";
import { ContactForm, SiteFooter, SiteHeader } from "@/components/site";
import { useSite } from "@/components/providers";
import { services } from "@/lib/services";

export default function HomePage() {
  const ar = useSite().language === "ar";
  const technologies = ["Node.js", "Express.js", "Responsive design", "JavaScript", "Chatbots", "AI Agents", "React.js"];
  const faqs = ar ? [
    ["كم يستغرق تنفيذ المشروع؟", "تُنجز معظم المشاريع خلال 2 إلى 7 أيام حسب حجم المشروع وتعقيده."],
    ["هل تقدمون حلولًا بالذكاء الاصطناعي؟", "نطوّر روبوتات محادثة ووكلاء ذكاء اصطناعي وحلول أتمتة تناسب احتياجات عملك."],
    ["هل تقدمون دعمًا مستمرًا؟", "نقدم الصيانة والتحديثات والدعم الفني بعد تسليم المشروع."],
    ["كيف نبدأ؟", "اختر الخدمة المناسبة وتواصل معنا لمناقشة متطلبات المشروع والجدول الزمني والتكلفة."]
  ] : [
    ["How long does a project take?", "Most projects are completed within 2–7 days depending on their size and complexity."],
    ["Do you build AI-powered solutions?", "Yes. We develop AI chatbots, AI agents, and automation tailored to your business."],
    ["Do you provide ongoing support?", "We offer maintenance, updates, and technical support after delivery."],
    ["How do we get started?", "Choose a service and contact us to discuss requirements, timing, and a quote."]
  ];

  return <>
    <SiteHeader />
    <main>
      <section className="home-hero">
        <div><span className="eyebrow">{ar ? "نبني منتجات رقمية عصرية" : "Building modern digital products"}</span>
          <h1>{ar ? <>منتجات رقمية<br /><span className="red">مدعومة بالذكاء الاصطناعي</span></> : <>BUILDING MODERN<br /><span className="red">DIGITAL PRODUCTS</span><br />POWERED BY AI</>}</h1>
          <p>{ar ? "نبني مواقع احترافية ووكلاء ذكاء اصطناعي وروبوتات محادثة وواجهات برمجية وتطبيقات متكاملة تساعد الشركات على النمو." : "We build premium websites, AI agents, chatbots, APIs, and full-stack applications that help businesses grow faster."}</p>
          <div className="hero-actions"><Link className="button primary" href="#services">{ar ? "ابدأ مشروعك ←" : "Start Your Project →"}</Link><Link className="button secondary" href="#contact">{ar ? "تواصل معنا" : "Contact Us"}</Link></div>
        </div>
        <img className="hero-image" src="/images/photo.webp" alt="FORIXA digital products" />
      </section>
      <div className="tools-strip" aria-label="Technologies and services"><div className="tools-strip-track">{[0, 1].map((copy) => <div className="tools-strip-group" key={copy} aria-hidden={copy === 1}>{technologies.map((technology) => <span className="tools-strip-item" key={technology}>{technology}</span>)}</div>)}</div></div>
      <section className="page-section" id="services"><div className="section-heading"><h2>{ar ? <>خدماتنا</> : <>Our <span className="red">Services</span></>}</h2><p className="section-lead">{ar ? "نساعد الشركات على بناء مواقع عصرية وحلول ذكاء اصطناعي ومنتجات رقمية قابلة للتوسع." : "Helping businesses build modern websites, AI-powered solutions, and scalable digital products."}</p></div>
        <div className="service-grid">{services.map((service) => <article className="service-card" key={service.id}><img src={service.image} alt="" /><h3>{ar ? ["", "تطوير Full-Stack", "مواقع الأعمال الشخصية", "صفحات الهبوط", "روبوتات المحادثة بالذكاء الاصطناعي", "تطوير واجهات API", "وكلاء الذكاء الاصطناعي"][service.id] : service.title}</h3><p>{service.description}</p><Link className="text-link" href={`/service/${service.id}`}>{ar ? "عرض الخدمة ←" : "View Service →"}</Link></article>)}</div>
      </section>
      <section className="page-section" id="projects"><div className="section-heading"><h2>{ar ? "مشاريع مميزة" : "Featured Projects"}</h2><p className="section-lead">{ar ? "نماذج من مشاريعنا التي تجمع بين التصميم العصري والتطوير القابل للتوسع." : "A selection of projects showcasing modern design, scalable development, and AI-powered solutions."}</p></div>
        <article className="project-card"><div><h3><span className="red">Forixa</span> platform</h3><img src="/images/portPhoto.webp" alt="Forixa platform preview" /></div><div><p>{ar ? "منصة عصرية لوكالة برمجيات، تتضمن مساعدًا بالذكاء الاصطناعي وإدارة للمشاريع وتصميمًا متجاوبًا." : "A modern software agency platform featuring AI-powered assistance, project management, and responsive design."}</p><a className="text-link" href="https://forixa.site" target="_blank" rel="noreferrer">{ar ? "عرض مباشر" : "Live demo"}</a></div></article>
      </section>
      <section className="page-section" id="faq"><div className="section-heading"><h2>{ar ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h2></div><div className="faq-grid">{faqs.map(([question, answer]) => <article className="faq-card" key={question}><h4>{question}</h4><p>{answer}</p></article>)}</div></section>
      <section className="page-section contact-section" id="contact"><div className="section-heading"><h2>{ar ? <>تواصل <span className="red">معنا</span></> : <>Contact <span className="red">Us</span></>}</h2><p className="section-lead">{ar ? "اكتب رقم واتسابك وموضوع الرسالة وتفاصيلها، وسنرد عليك عبر البريد." : "Share your WhatsApp number, subject, and message. We’ll get back to you by email."}</p></div><div className="contact-panel"><ContactForm /></div></section>
    </main>
    <SiteFooter />
  </>;
}
