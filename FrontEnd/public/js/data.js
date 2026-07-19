export const services = [
{
    id:1,
    title:"Full-Stack Development",
    description:"Complete web applications built with modern frontend, backend, databases, and authentication.",
    button:"Build Your Website",
    price:700,
    image:"images/fullstack.png",
    delivery:"10-20 Days",
    revisions:"Unlimited",
    includes:[
        "Responsive Frontend",
        "Node.js Backend",
        "Authentication System",
        "Database Integration",
        "Admin Dashboard",
        'React'
    ]
},

{
    id:2,
    title:"Portfolio Websites",
    description:"Professional portfolio websites designed to showcase your brand, skills, and business with modern responsive design.",
    button:"Build Your Portfolio",
    price:150,
    image:"images/portfolio.png",
    delivery:"3-7 Days",
    revisions:"Unlimited",
    includes:[
        "Responsive Design",
        "Up to 5 Pages",
        "Contact Form",
        "SEO Optimization",
        "Fast Loading"
    ]
},

{
    id:3,
    title:"Landing Pages",
    description:"High-converting landing pages built to increase engagement, generate leads, and grow your business.",
    button:"Create Your Landing Page",
    price:100,
    image:"images/landing.png",
    delivery:"2-5 Days",
    revisions:"Unlimited",
    includes:[
        "Responsive Design",
        "Call To Action Sections",
        "Lead Capture Form",
        "Modern UI",
        "SEO Ready"
    ]
},

{
    id:4,
    title:"AI Chatbots",
    description:"Intelligent AI chatbots that answer questions, automate support, and improve customer experience.",
    button:"Build Your AI Chatbot",
    price:300,
    image:"images/chatbot.png",
    delivery:"3-7 Days",
    revisions:"Unlimited",
    includes:[
        "OpenAI Integration",
        "Website Integration",
        "Conversation History",
        "Custom Prompt",
        "Responsive UI"
    ]
},

{
    id:5,
    title:"API Development",
    description:"Secure and scalable REST APIs for seamless integrations between your applications and services.",
    button:"Create Your API",
    price:250,
    image:"images/api.png",
    delivery:"3-6 Days",
    revisions:"Unlimited",
    includes:[
        "REST API",
        "Authentication",
        "Database Integration",
        "API Documentation",
        "Testing"
    ]
},

{
    id:6,
    title:"AI Agents",
    description:"Custom AI agents that automate workflows, analyze information, and help businesses save time.",
    button:"Build Your AI Agent",
    price:500,
    image:"images/ai-agent.png",
    delivery:"5-10 Days",
    revisions:"Unlimited",
    includes:[
        "Workflow Automation",
        "Custom AI Logic",
        "Tool Integration",
        "OpenAI Integration",
        "Deployment"
    ]
}
];

export const projectSteps = [
    {
        id: 1,
        title: "<span class='red'>Project</span> Overview",
        questions: [
            {
                id: "projectName",
                label: "Project Name",
                type: "text",
                placeholder: "My Awesome Project"
            },
            {
                id: "businessType",
                label: "Business Type",
                type: "select",
                options: [
                    "Portfolio",
                    "Business",
                    "E-commerce",
                    "Education",
                    "Restaurant",
                    "Healthcare",
                    "Real Estate",
                    "Agency",
                    "Other"
                ]
            },
            {
                id: "projectDescription",
                label: "Tell us about your project",
                type: "textarea",
                placeholder: "Describe your project and what you would like us to build..."
            }
        ]
    },

    {
        id: 2,
        title: "<span class='red'>Project</span> Requirements",
        questions: [
            {
                id: "platform",
                label: "Which platform do you need?",
                type: "select",
                options: [
                    "Website",
                    "Web Application",
                    "Landing Page",
                    "Portfolio",
                    "AI Chatbot",
                    "AI Agent",
                    "API",
                    "Other"
                ]
            },
            {
                id: "design",
                label: "Do you already have a design?",
                type: "radio",
                options: [
                    "Yes",
                    "No"
                ]
            },
            {
                id: "requirements",
                label: "Any special requirements?",
                type: "textarea",
                placeholder: "Tell us about any specific features or ideas..."
            }
        ]
    },

    {
        id: 3,
        title: "<span class='red'>Contact</span> & Submit",
        questions: [
            {
                id: "fullName",
                label: "Full Name",
                type: "text",
                placeholder: "John Doe"
            },
            {
                id: "email",
                label: "Email Address",
                type: "email",
                placeholder: "john@example.com"
            },
            {
                id: "phone",
                label: "WhatsApp Number",
                type: "tel",
                placeholder: "+20 10 1234 5678"
            }
        ]
    }
];
