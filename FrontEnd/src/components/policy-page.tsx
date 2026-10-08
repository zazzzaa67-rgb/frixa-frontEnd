import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site";

type PolicyKey = "privacy" | "refund" | "terms";
type Section = { title: string; paragraphs?: string[]; items?: string[] };

const policies: Record<PolicyKey, { title: string; sections: Section[] }> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      { title: "Introduction", paragraphs: ["FORIXA respects your privacy and is committed to protecting your personal information."] },
      { title: "Information We Collect", items: ["Full Name", "Email Address", "Phone Number", "Project Requirements", "Payment Information (processed securely through Paddle)"] },
      { title: "How We Use Your Information", items: ["Provide our services", "Manage your projects", "Communicate with you", "Process secure payments", "Improve our platform"] },
      { title: "Payment Processing", paragraphs: ["Payments are securely processed through Paddle. FORIXA never stores your credit card information."] },
      { title: "Security", paragraphs: ["We use industry-standard security measures to protect your information."] },
      { title: "Contact", paragraphs: ["support@forixa.site"] },
    ],
  },
  refund: {
    title: "Refund Policy",
    sections: [
      { title: "Refund Eligibility", paragraphs: ["FORIXA provides custom software development services. Refund requests are evaluated individually."] },
      { title: "Before Development Starts", paragraphs: ["If development has not started, customers may request a refund."] },
      { title: "After Development Starts", paragraphs: ["Once development has started, refunds are generally unavailable because development work has already begun."] },
      { title: "Exceptions", paragraphs: ["If FORIXA cannot deliver the agreed service, an appropriate partial or full refund may be issued."] },
      { title: "Contact", paragraphs: ["support@forixa.site"] },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      { title: "Agreement", paragraphs: ["By using FORIXA or purchasing any service, you agree to these Terms of Service."] },
      { title: "Our Services", paragraphs: ["FORIXA provides professional software development services including:"], items: ["Custom Websites", "Web Applications", "AI Integrations", "Dashboards", "API Development", "Automation Solutions"] },
      { title: "Payments", paragraphs: ["All payments are securely processed through Paddle. Development begins after payment confirmation."] },
      { title: "Delivery", paragraphs: ["Estimated delivery dates are discussed individually for every project."] },
      { title: "Ownership", paragraphs: ["After full payment, ownership of the completed project is transferred to the client unless otherwise agreed."] },
      { title: "Contact", paragraphs: ["support@forixa.site"] },
    ],
  },
};

export function PolicyPage({ policy }: { policy: PolicyKey }) {
  const page = policies[policy];
  return <>
    <SiteHeader />
    <main className="policy-page">
      <header className="policy-heading">
        <span className="eyebrow">FORIXA · POLICIES</span>
        <h1>{page.title}</h1>
        <p>Last Updated: July 2026</p>
      </header>
      <article className="policy-card">
        {page.sections.map((section) => <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
        </section>)}
      </article>
      <p className="policy-back"><Link href="/">← Back to FORIXA</Link></p>
    </main>
    <SiteFooter />
  </>;
}
