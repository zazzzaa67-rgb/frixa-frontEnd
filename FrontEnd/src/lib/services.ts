export type Service = {
  id: number;
  title: string;
  description: string;
  button: string;
  price: number;
  image: string;
  delivery: string;
  revisions: string;
  includes: string[];
};

export const services: Service[] = [
  { id: 1, title: "Full-Stack Development", description: "Complete web applications built with modern frontend and backend technologies, database integration, and secure authentication.", button: "Build Your Website", price: 200, image: "/images/full-stack.webp", delivery: "10–20 days", revisions: "Unlimited", includes: ["Responsive frontend", "Node.js backend", "Secure authentication", "Database integration", "Admin dashboard", "React"] },
  { id: 2, title: "Portfolio Websites", description: "Professional portfolio websites that showcase your brand, work, and services with a polished, responsive design.", button: "Build Your Portfolio", price: 20, image: "/images/portfolio.webp", delivery: "3–7 days", revisions: "Unlimited", includes: ["Responsive design", "Up to 5 pages", "Contact form", "SEO optimization", "Fast loading"] },
  { id: 3, title: "Landing Pages", description: "Conversion-focused landing pages designed to engage visitors, capture leads, and support your business goals.", button: "Create Your Landing Page", price: 20, image: "/images/landingpage.webp", delivery: "2–5 days", revisions: "Unlimited", includes: ["Responsive design", "Clear calls to action", "Lead capture form", "Modern interface", "SEO-ready structure"] },
  { id: 4, title: "AI Chatbots", description: "AI-powered chatbots that answer customer questions, automate support, and make it easier to engage with your business.", button: "Build Your AI Chatbot", price: 20, image: "/images/ai-chatbot.webp", delivery: "3–7 days", revisions: "Unlimited", includes: ["OpenAI integration", "Website integration", "Conversation history", "Custom instructions", "Responsive interface"] },
  { id: 5, title: "API Development", description: "Secure, scalable REST APIs that connect your applications and services reliably.", button: "Create Your API", price: 15, image: "/images/api.webp", delivery: "3–6 days", revisions: "Unlimited", includes: ["REST API endpoints", "Authentication", "Database integration", "API documentation", "Testing"] },
  { id: 6, title: "AI Agents", description: "Custom AI agents that automate workflows, work with your tools, and help your team save time.", button: "Build Your AI Agent", price: 50, image: "/images/ai-agent.webp", delivery: "5–10 days", revisions: "Unlimited", includes: ["Workflow automation", "Custom AI logic", "Tool integrations", "OpenAI integration", "Deployment"] }
];
