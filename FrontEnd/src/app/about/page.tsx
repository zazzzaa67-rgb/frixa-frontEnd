"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site";
import { useSite } from "@/components/providers";

export default function AboutPage() {
  const ar = useSite().language === "ar";

  return <>
    <SiteHeader />
    <main className="about-page" dir={ar ? "rtl" : "ltr"}>
      <section className="about-hero">
        <span className="eyebrow">{ar ? "من نحن · FORIXA" : "ABOUT FORIXA"}</span>
        <h1>{ar ? <>نحوّل الأفكار إلى <span className="red">حلول رقمية</span></> : <>Turning ideas into <span className="red">digital solutions</span></>}</h1>
        <p>{ar
          ? "في FORIXA نساعد الشركات وأصحاب الأفكار على بناء مواقع وتطبيقات وحلول ذكية مصممة حول احتياجاتهم، لتكون التقنية أوضح وأسهل في الاستخدام والتطوير."
          : "At FORIXA, we help businesses and founders turn ideas into websites, applications, and intelligent solutions shaped around their needs, making technology easier to use and grow."}</p>
        <Link className="button primary" href="/details">{ar ? "ابدأ مشروعك" : "Start a project"} <span aria-hidden="true">→</span></Link>
      </section>

      <section className="about-mission">
        <div className="about-section-label">{ar ? "رؤيتنا" : "OUR APPROACH"}</div>
        <div><h2>{ar ? "تقنية عملية، مصممة حول احتياجك." : "Practical technology, built around your needs."}</h2>
          <p>{ar
            ? "نؤمن أن الحل الرقمي الجيد يبدأ بفهم المشكلة قبل اختيار التقنية. لذلك نركز على بناء تجارب واضحة، وأدوات عملية، ومنتجات قابلة للتطور مع نمو العمل."
            : "We believe a useful digital solution starts with understanding the problem before choosing the technology. We focus on clear experiences, practical tools, and products that can evolve as a business grows."}</p></div>
      </section>

      <section className="about-capabilities">
        <div className="about-section-heading"><span className="eyebrow">{ar ? "ما نقدمه" : "WHAT WE DO"}</span><h2>{ar ? "من الفكرة إلى التنفيذ" : "From idea to implementation"}</h2></div>
        <div className="about-capability-grid">
          <article><span>01</span><h3>{ar ? "تطوير المواقع والتطبيقات" : "Websites & applications"}</h3><p>{ar ? "مواقع وتطبيقات ويب حديثة ومتجاوبة، مبنية لتناسب أهداف مشروعك." : "Modern, responsive websites and web applications shaped around your project goals."}</p></article>
          <article><span>02</span><h3>{ar ? "حلول الذكاء الاصطناعي" : "AI solutions"}</h3><p>{ar ? "روبوتات محادثة ووكلاء ذكيون وتكاملات تساعد على تبسيط المهام." : "Chatbots, AI agents, and integrations that help simplify everyday work."}</p></article>
          <article><span>03</span><h3>{ar ? "واجهات برمجية وأتمتة" : "APIs & automation"}</h3><p>{ar ? "واجهات برمجية وتدفقات عمل تربط الأدوات وتساعد الأنظمة على العمل معًا." : "APIs and workflows that connect tools and help systems work together."}</p></article>
        </div>
      </section>

      <section className="about-founder">
        <div className="founder-mark" aria-hidden="true">AM</div>
        <div><span className="eyebrow">{ar ? "المؤسس" : "FOUNDER"}</span>
          <h2>{ar ? "أحمد محمد" : "Ahmed Mohamed"}</h2>
          <p>{ar
            ? "أسّس أحمد محمد منصة FORIXA لتقديم حلول رقمية تجمع بين التطوير الحديث والذكاء الاصطناعي، وتساعد أصحاب المشاريع على تنفيذ أفكارهم وبناء حضورهم الرقمي."
            : "Ahmed Mohamed founded FORIXA to deliver digital solutions that bring together modern development and artificial intelligence, helping businesses build their ideas and digital presence."}</p></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
