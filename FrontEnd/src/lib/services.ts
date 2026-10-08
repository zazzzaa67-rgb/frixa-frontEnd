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
  { id: 1, title: "Full-Stack Development", description: "Complete web applications built with modern frontend, backend, databases, and authentication.", button: "Build Your Website", price: 200, image: "/images/full-stack.webp", delivery: "10â€“20 Days", revisions: "Unlimited", includes: ["Responsive Frontend", "Node.js Backend", "Authentication System", "Database Integration", "Admin Dashboard", "React"] },
  { id: 2, title: "Portfolio Websites", description: "Professional portfolio websites designed to showcase your brand, skills, and business with modern responsive design.", button: "Build Your Portfolio", price: 20, image: "/images/portfolio.webp", delivery: "3â€“7 Days", revisions: "Unlimited", includes: ["Responsive Design", "Up to 5 Pages", "Contact Form", "SEO Optimization", "Fast Loading"] },
  { id: 3, title: "Landing Pages", description: "High-converting landing pages built to increase engagement, generate leads, and grow your business.", button: "Create Your Landing Page", price: 20, image: "/images/landingpage.webp", delivery: "2â€“5 Days", revisions: "Unlimited", includes: ["Responsive Design", "Call To Action Sections", "Lead Capture Form", "Modern UI", "SEO Ready"] },
  { id: 4, title: "AI Chatbots", description: "Intelligent AI chatbots that answer questions, automate support, and improve customer experience.", button: "Build Your AI Chatbot", price: 20, image: "/images/ai-chatbot.webp", delivery: "3â€“7 Days", revisions: "Unlimited", includes: ["OpenAI Integration", "Website Integration", "Conversation History", "Custom Prompt", "Responsive UI"] },
  { id: 5, title: "API Development", description: "Secure and scalable REST APIs for seamless integrations between your applications and services.", button: "Create Your API", price: 15, image: "/images/api.webp", delivery: "3â€“6 Days", revisions: "Unlimited", includes: ["REST API", "Authentication", "Database Integration", "API Documentation", "Testing"] },
  { id: 6, title: "AI Agents", description: "Custom AI agents that automate workflows, analyze information, and help businesses save time.", button: "Build Your AI Agent", price: 50, image: "/images/ai-agent.webp", delivery: "5â€“10 Days", revisions: "Unlimited", includes: ["Workflow Automation", "Custom AI Logic", "Tool Integration", "OpenAI Integration", "Deployment"] }
];
