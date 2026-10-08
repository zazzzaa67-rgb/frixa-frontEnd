"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { SiteHeader, SiteFooter } from "@/components/site";
import { useSite } from "@/components/providers";

type ProjectData = Record<string, string | null>;
type ProjectQuestion = { name: string; label: string; labelAr: string; type: string; placeholder?: string; options?: string[] };
type ProjectStep = { id: string; title: string; titleAr: string; questions: ProjectQuestion[] };
const api = "https://forixa-backend.vercel.app/api/projects";
const steps: ProjectStep[] = [
  { id: "overview", title: "Project Overview", titleAr: "نظرة عامة على المشروع", questions: [{ name: "projectName", label: "Project Name", labelAr: "اسم المشروع", type: "text", placeholder: "My Awesome Project" }, { name: "businessType", label: "Business Type", labelAr: "نوع النشاط", type: "select", options: ["Portfolio", "Business", "E-commerce", "Education", "Restaurant", "Healthcare", "Real Estate", "Agency", "Other"] }, { name: "projectDescription", label: "Tell us about your project", labelAr: "أخبرنا عن مشروعك", type: "textarea", placeholder: "Describe your project and what you would like us to build..." }] },
  { id: "requirements", title: "Project Requirements", titleAr: "متطلبات المشروع", questions: [{ name: "platform", label: "Which platform do you need?", labelAr: "ما المنصة التي تحتاج إليها؟", type: "select", options: ["Website", "Web Application", "Landing Page", "Portfolio", "AI Chatbot", "AI Agent", "API", "Other"] }, { name: "design", label: "Do you already have a design?", labelAr: "هل لديك تصميم بالفعل؟", type: "radio", options: ["Yes", "No"] }, { name: "userRequirements", label: "Any special requirements?", labelAr: "هل لديك متطلبات خاصة؟", type: "textarea", placeholder: "Tell us about any specific features or ideas..." }] },
  { id: "contact", title: "Contact & Submit", titleAr: "التواصل والإرسال", questions: [{ name: "fullName", label: "Full Name", labelAr: "الاسم الكامل", type: "text", placeholder: "Your name" }, { name: "email", label: "Email Address", labelAr: "البريد الإلكتروني", type: "email", placeholder: "you@example.com" }, { name: "phone", label: "WhatsApp Number", labelAr: "رقم WhatsApp", type: "tel", placeholder: "+20 10 1234 5678" }] }
];

export default function ProjectDetailsPage() {
  const ar = useSite().language === "ar";
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<ProjectData>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const current = steps[step];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    const nextProject = { ...project, ...fields };
    setProject(nextProject);
    if (step < steps.length - 1) { setStep(step + 1); return; }
    setSending(true); setStatus(ar ? "جارٍ إرسال طلبك..." : "Sending your request...");
    try {
      const response = await fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...nextProject, refCode: localStorage.getItem("refCode") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not submit the project.");
      setStatus(ar ? "تم إرسال طلبك بنجاح. سنتواصل معك قريبًا." : "Your request was submitted. We’ll contact you soon.");
      setStep(steps.length);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Could not submit the project."); }
    finally { setSending(false); }
  }

  return <><SiteHeader /><main className="page-shell"><div className="page-intro"><h1>{ar ? <>متطلبات <span className="red">المشروع</span></> : <>Project <span className="red">Requirements</span></>}</h1><p>{ar ? "أخبرنا عن مشروعك حتى نفهم احتياجاتك بشكل أفضل." : "Tell us about your project so we can understand your needs better."}</p></div>
    <div className="steps">{steps.map((item, index) => <div className="step-item" key={item.id}><span className={`step-dot ${index === step ? "active" : ""}`}>{index + 1}</span><span>{ar ? item.titleAr : item.title}</span></div>)}</div>
    {step === steps.length ? <section className="step-card success-card"><h2>{ar ? "شكرًا لك!" : "Thank you!"}</h2><p>{status}</p><Link className="button primary" href="/">{ar ? "العودة للرئيسية" : "Back to home"}</Link></section> : <form className="step-card" onSubmit={submit} key={current.id}><h2>{ar ? current.titleAr : current.title}</h2>
      {current.questions.map((question) => <div className="field" key={question.name}><span className="field-label">{ar ? question.labelAr : question.label}</span>
        {question.type === "textarea" ? <textarea name={question.name} placeholder={question.placeholder} defaultValue={project[question.name] || ""} required /> : question.type === "select" ? <select name={question.name} defaultValue={project[question.name] || ""} required><option value="" disabled>{ar ? "اختر خيارًا" : "Select an option"}</option>{question.options?.map(option => <option key={option} value={option}>{ar ? translateOption(option) : option}</option>)}</select> : question.type === "radio" ? <span className="radio-row">{question.options?.map(option => <label key={option}><input type="radio" name={question.name} value={option} defaultChecked={project[question.name] === option} required /> {ar && option === "Yes" ? "نعم" : ar && option === "No" ? "لا" : option}</label>)}</span> : <input name={question.name} type={question.type} placeholder={question.placeholder} defaultValue={project[question.name] || ""} required />}
      </div>)}
      <p className="form-status" role="status">{status}</p><div className="form-actions">{step > 0 ? <button className="button secondary" type="button" onClick={() => setStep(step - 1)}>{ar ? "السابق" : "Back"}</button> : <span /> }<button className="button primary" disabled={sending}>{step === steps.length - 1 ? (ar ? "إرسال" : "Submit") : (ar ? "التالي" : "Next")}</button></div>
    </form>}
  </main><SiteFooter /></>;
}

function translateOption(value: string) {
  const options: Record<string, string> = { Portfolio: "أعمال شخصية", Business: "نشاط تجاري", "E-commerce": "متجر إلكتروني", Education: "تعليم", Restaurant: "مطعم", Healthcare: "رعاية صحية", "Real Estate": "عقارات", Agency: "وكالة", Other: "أخرى", Website: "موقع إلكتروني", "Web Application": "تطبيق ويب", "Landing Page": "صفحة هبوط", "AI Chatbot": "روبوت محادثة بالذكاء الاصطناعي", "AI Agent": "وكيل ذكاء اصطناعي", API: "واجهة برمجية" };
  return options[value] || value;
}
