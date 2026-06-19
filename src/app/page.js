"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import ProjectCard from "@/components/ProjectCard";
import { Mail, Phone, Github, Linkedin, MapPin, Cpu, Database, Cloud, Layers, ArrowRight } from "lucide-react";

const featuredProjects = [
  {
    title: "ContractIQ",
    category: "RAG · Production",
    status: "Live",
    video: "/videos/contractiq.mp4",
    image: "/images/contractiq.png",
    description:
      "AI-powered contract analysis platform that extracts obligations, flags one-sided risks, compares document versions page-by-page, and enables natural language Q&A over legal agreements. Built with LangChain LCEL pipelines, FAISS vector search, and deployed on AWS ECS Fargate with full CloudFormation IaC.",
    tech: ["Python", "FastAPI", "LangChain", "FAISS", "Groq", "Gemini", "AWS ECS", "Docker", "GitHub Actions"],
    github: "https://github.com/bhavjeetsingh/CONTRACTIQ",
    demo: "https://contractiq-production-d9bb.up.railway.app",
  },
  {
    title: "LLM Research Report Generation",
    category: "GenAI · Automation",
    status: "Live",
    video: "/videos/llm_research.mp4",
    image: "/images/llm_research.png",
    description:
      "Automated research report generator that takes a topic, retrieves relevant information using LLMs, synthesizes findings, and produces structured, publication-ready reports. Streamlines the research workflow from query to final document.",
    tech: ["Python", "LLMs", "Research Automation", "Render"],
    github: "https://github.com/bhavjeetsingh/Llm-Research-Generation",
    demo: "https://llm-research-generation.onrender.com/",
  },
  {
    title: "BFCL-India",
    category: "Benchmarking · Tool Calling",
    description:
      "The first function-calling benchmark for Indian APIs. Evaluates LLMs on 421 examples across 50 India-context tools — UPI, IRCTC, Aadhaar, Swiggy, and more. Mirrors Berkeley BFCL methodology for comparable results. Tested Gemini-2.5-Flash (75.9%), Llama-3.3-70B (74.3%), GPT-4o-Mini (69.1%), and a custom fine-tuned ToolCaller-Qwen-3B (67.9%).",
    tech: ["Python", "Function Calling", "JSON Schema", "Gemini", "Groq", "Hugging Face", "Evaluation"],
    github: "https://github.com/bhavjeetsingh/bfcl-India",
  },
  {
    title: "Energy Demand Forecast Pipeline",
    category: "MLOps · Data Engineering",
    image: "/images/energy_demand.png",
    description:
      "End-to-end MLOps pipeline forecasting India's electricity demand 24 hours ahead using IEX market data and Open-Meteo weather features. At 180 GW base load, a 1% forecast error costs ~₹9 crore/hour in imbalance charges. Uses XGBoost with MLflow tracking and FastAPI serving.",
    tech: ["Python", "XGBoost", "MLflow", "FastAPI", "Docker", "Open-Meteo API"],
    github: "https://github.com/bhavjeetsingh/ENERGY-DEMAND-FORCAST-PIPELINE",
  },
];

const moreProjects = [
  {
    title: "MedDesk AI",
    category: "Healthcare · AI",
    video: "/videos/meddesk.mp4",
    image: "/images/meddesk.png",
    description:
      "AI-powered medical desk assistant that provides intelligent health information retrieval and clinical decision support using large language models and medical knowledge bases.",
    tech: ["Python", "LLMs", "Healthcare AI"],
    github: "https://github.com/bhavjeetsingh/meddesk-ai",
  },
  {
    title: "Healthwise ChatBot",
    category: "Medical · RAG",
    video: "/videos/healthwise.mp4",
    image: "/images/healthwise.png",
    description:
      "End-to-end medical chatbot built with LangChain and Pinecone vector database. Ingests medical textbooks, creates embeddings, and answers health queries using RAG. Deployed on AWS with CI/CD via GitHub Actions.",
    tech: ["Python", "LangChain", "Pinecone", "Flask", "Groq", "AWS"],
    github: "https://github.com/bhavjeetsingh/Healthwise-ChatBot",
  },
  {
    title: "German AI Tutor",
    category: "GenAI · Education",
    video: "/videos/german_tutor.mp4",
    image: "/images/german_tutor.png",
    description:
      "Interactive language learning assistant that acts as a personalized German tutor. Features natural language conversational practice, context-aware grammar corrections, and pronunciation guides.",
    tech: ["Python", "OpenAI", "LangChain", "Gradio"],
    github: "https://github.com/bhavjeetsingh/german-ai-tutor",
  },
  {
    title: "E-Commerce Assistant",
    category: "Agents · Conversational",
    video: "/videos/eccom.mp4",
    image: "/images/eccom.png",
    description:
      "AI-powered shopping assistant that helps users browse products, get recommendations, and complete purchases through natural language conversations. Combines tool calling with conversational AI for e-commerce workflows.",
    tech: ["Python", "LLMs", "Agent Systems", "Tool Calling"],
    github: "https://github.com/bhavjeetsingh/Eccom-Assistant",
  },
  {
    title: "Finetuning & RAG on AWS",
    category: "MLOps · Cloud",
    description:
      "Production pipeline for fine-tuning large language models and building RAG systems on AWS infrastructure. Uses SageMaker for training, S3 for storage, and Lambda for serverless inference orchestration.",
    tech: ["Python", "AWS SageMaker", "RAG", "Fine-tuning", "S3", "Lambda"],
    github: "https://github.com/bhavjeetsingh/finetuning-and-rag-on-aws",
  },
  {
    title: "Phishing Website Detection",
    category: "ML · Cybersecurity",
    video: "/videos/phishing.mp4",
    image: "/images/phishing.png",
    description:
      "Machine learning system that classifies URLs as legitimate or phishing by extracting lexical, host-based, and content-based features. Trained on labeled URL datasets to protect users from credential theft and social engineering attacks.",
    tech: ["Python", "Scikit-Learn", "Feature Engineering", "Classification"],
    github: "https://github.com/bhavjeetsingh/PHISHING-WEBSITE_DETECTION-SYSTEM",
  },
  {
    title: "SHL Assessment Recommendation Engine",
    category: "ML · Recommendation",
    video: "/videos/shl.mp4",
    image: "/images/shl.png",
    description:
      "Recommendation system that matches job descriptions to SHL psychometric assessments. Analyzes role requirements and suggests the most relevant assessment batteries for talent evaluation workflows.",
    tech: ["Python", "NLP", "Recommendation Systems", "Embeddings"],
    github: "https://github.com/bhavjeetsingh/SHL-Assessment-Recommendation-Engine",
  },
];

export default function Home() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState("");

  const handleOpenVideo = (videoPath, title) => {
    setActiveVideo(videoPath);
    setActiveVideoTitle(title);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setActiveVideoTitle("");
  };

  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.nav}>
            <a href="#" className={styles.logo}>
              Bhavjeet<span className={styles.logoAccent}>.</span>
            </a>
            <ul className={styles.navLinks}>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroLayout}>
            {/* Left Column: Bio Details */}
            <div className={styles.heroContent}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={styles.heroBadge}
              >
                <MapPin size={13} /> New Delhi, India · IIT Madras
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={styles.heroName}
              >
                Bhavjeet Singh
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={styles.heroTitle}
              >
                AI Product Engineer <span className={styles.logoAccent}>·</span> Agentic AI Builder <span className={styles.logoAccent}>·</span> Data Science @ <span className={styles.gradientText}>IIT Madras</span>
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={styles.heroTagline}
              >
                Building production-grade AI applications powered by LLMs, RAG architectures,
                function calling, and autonomous agent workflows — from idea to deployment.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={styles.heroActions}
              >
                <a href="#projects" className={styles.btnPrimary}>
                  View Projects <ArrowRight size={16} />
                </a>
                <a href="https://github.com/bhavjeetsingh" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                  <Github size={16} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/bhavjeet-singh-80761022a/" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                  <Linkedin size={16} /> LinkedIn
                </a>
              </motion.div>
            </div>

            {/* Right Column: Profile Picture Frame */}
            <div className={styles.profileColumn}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={styles.glowRing}
              />
              
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
                className={styles.profileCard}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Bhavjeet Singh Profile"
                  className={styles.profileImg}
                />
                <div className={styles.floatingBadge}>
                  <span className={styles.greenDot} />
                  Open for Opportunities
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className={styles.sectionAlt}>
        <div className="container">
          <p className={styles.sectionLabel}>Portfolio</p>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionSub}>
            Production-grade systems with RAG, tool calling, LLM evaluation, and cloud deployments.
          </p>
          
          <div className={styles.featuredGrid}>
            {featuredProjects.map((p, idx) => (
              <ProjectCard
                key={p.title}
                project={p}
                featured
                index={idx}
                onPlayVideo={handleOpenVideo}
              />
            ))}
          </div>

          <p className={styles.sectionLabel} style={{ marginTop: "4rem" }}>More Work</p>
          <h2 className={styles.sectionTitle}>All Projects</h2>
          <p className={styles.sectionSub}>
            AI agents, medical chatbots, MLOps pipelines, cybersecurity, and more.
          </p>
          
          <div className={styles.moreGrid}>
            {moreProjects.map((p, idx) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={idx}
                onPlayVideo={handleOpenVideo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={styles.section}>
        <div className="container">
          <p className={styles.sectionLabel}>Capabilities</p>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <p className={styles.sectionSub}>
            Specialized in building, deploying, and evaluating AI systems end-to-end.
          </p>
          
          <div className={styles.skillsGrid}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={styles.skillCard}
            >
              <h3 className={styles.skillCategory}><Cpu size={18} /> AI &amp; GenAI</h3>
              <div className={styles.skillsList}>
                {["Agentic AI", "LangChain", "LangGraph", "CrewAI", "RAG Pipelines", "Function Calling", "Prompt Engineering", "LLMOps", "Fine-tuning"].map(s => (
                  <span key={s} className={styles.skillItem}>{s}</span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.skillCard}
            >
              <h3 className={styles.skillCategory}><Layers size={18} /> ML &amp; Data</h3>
              <div className={styles.skillsList}>
                {["PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "CLIP", "BLIP", "MLflow", "Hugging Face"].map(s => (
                  <span key={s} className={styles.skillItem}>{s}</span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={styles.skillCard}
            >
              <h3 className={styles.skillCategory}><Database size={18} /> Backend &amp; Vector DBs</h3>
              <div className={styles.skillsList}>
                {["Python", "FastAPI", "Flask", "PostgreSQL", "FAISS", "Pinecone", "Qdrant", "ChromaDB"].map(s => (
                  <span key={s} className={styles.skillItem}>{s}</span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.skillCard}
            >
              <h3 className={styles.skillCategory}><Cloud size={18} /> Cloud &amp; DevOps</h3>
              <div className={styles.skillsList}>
                {["AWS (ECS, SageMaker, Lambda)", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Railway", "Render"].map(s => (
                  <span key={s} className={styles.skillItem}>{s}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.sectionAlt}>
        <div className="container">
          <p className={styles.sectionLabel}>Background</p>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.sectionSub}>
            Building at the intersection of data science, software engineering, and large language models.
          </p>
          
          <div className={styles.aboutLayout}>
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={styles.aboutText}
            >
              <p>
                I&apos;m <strong>Bhavjeet Singh</strong>, an AI Product Engineer and Agentic AI Builder based in New Delhi.
                I&apos;m currently pursuing the <strong>BS in Data Science and Applications</strong> at the
                <strong> Indian Institute of Technology Madras</strong>, focusing on building production systems
                that bridge raw models with real-world applications.
              </p>
              <p>
                My work spans the full stack of AI engineering — from constructing complex <strong>RAG pipelines</strong> with
                LangChain and LangGraph, to building <strong>function-calling benchmarks</strong> for Indian APIs, to deploying
                containerized services on <strong>AWS ECS</strong> with CloudFormation IaC and CI/CD pipelines.
              </p>
              <p>
                I&apos;m particularly interested in <strong>multi-agent architectures</strong>, <strong>tool-calling evaluation</strong>,
                and the infrastructure needed to move AI from prototype to production. I&apos;m currently seeking
                <strong> AI/ML internship opportunities</strong> in Agentic AI and RAG systems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={styles.eduCard}
            >
              <span className={styles.eduYear}>2025 — Present</span>
              <h4 className={styles.eduInst}>IIT Madras</h4>
              <p className={styles.eduDeg}>BS in Data Science and Applications</p>
              <p className={styles.eduDetail}>
                Coursework in machine learning, database systems, application development, and data scaling.
                Building AI products alongside academic work.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={styles.section}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className={styles.contactBox}
          >
            <h2 className={styles.contactTitle}>Let&apos;s Connect</h2>
            <p className={styles.contactDesc}>
              Interested in collaborating, hiring for GenAI/AI internship roles,
              or discussing agentic architectures? I&apos;d love to hear from you.
            </p>
            <div className={styles.directContact}>
              <a href="mailto:bhavjeetsingh784@gmail.com" className={styles.contactItem} title="Send Email">
                <Mail size={18} />
                <span>bhavjeetsingh784@gmail.com</span>
              </a>
              <a href="tel:+917678205626" className={styles.contactItem} title="Call Phone">
                <Phone size={18} />
                <span>+91 7678205626</span>
              </a>
            </div>
            <div className={styles.contactLinks}>
              <a href="https://github.com/bhavjeetsingh" target="_blank" rel="noopener noreferrer" className={styles.contactIcon} title="GitHub">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/bhavjeet-singh-80761022a/" target="_blank" rel="noopener noreferrer" className={styles.contactIcon} title="LinkedIn">
                <Linkedin size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Bhavjeet Singh. Built with Next.js.</p>
        </div>
      </footer>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>{activeVideoTitle} — Demo</h3>
                <button className={styles.modalClose} onClick={handleCloseVideo}>
                  &times;
                </button>
              </div>
              <div className={styles.modalBody}>
                <video
                  src={activeVideo}
                  className={styles.modalVideo}
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
