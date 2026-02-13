'use client';

import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    title: "AI Software Developer",
    company: "Emko Capital LLC",
    duration: "January 2026 - Present",
    description: [
      "Revamped the existing AI system to add guardrails, fault tolerance, and better accuracy",
      "Reduced document processing errors by 80% and strengthened the pipeline to handle complex Excel and PDF finance documents",
      "Improved automation and reliability for investment portfolio management tasks"
    ],
    skills: ["TypeScript", "Python", "Langchain", "Gemini", "FastAPI", "PostgreSQL"]
  },
  {
    title: "AI Automation Engineer",
    company: "Dennis Injury Law",
    duration: "November 2025 - January 2026",
    description: [
      "Developed a voice agent to automate calls to insurance companies for claims processing",
      "Achieved a reduction of 2-3 hours of manual work by handling 10-15 calls daily"
    ],
    skills: ["Python", "Langchain", "Gemini", "FastAPI", "GCP"]
  },
  {
    title: "Software Developer Intern",
    company: "George Washington University",
    duration: "August 2025 - Present",
    description: [
      "Designed and developed a mobile app from scratch, currently undergoing testing with a group of over 20 nurses",
      "Built RAG pipeline to process complex health policies",
      "Implemented HIPAA-compliant data handling and HL7 authentication for secure, compliant healthcare workflows"
    ],
    skills: ["TypeScript", "Python", "Langchain", "Gemini", "React Native"]
  },
  {
    title: "Software Engineer Intern",
    company: "Medfilo",
    duration: "June 2025 - September 2025",
    description: [
      "Built RESTful APIs with Node.js, Express, and JWT authentication",
      "Developed a secure upload and retrieval system for documents in AWS S3 bucket"
    ],
    skills: ["Node.js", "Express", "JWT", "AWS S3", "Git"]
  },
  {
    title: "Research Assistant",
    company: "George Washington University",
    duration: "August 2024 - December 2025",
    description: [
      "Assess patent potential and commercial viability of emerging technologies developed at the university",
      "Drafted technical summaries and reports for the university's research projects"
    ],
    skills: ["Technical Writing", "Computer Architecture", "Artificial Intelligence"]
  },
  {
    title: "Software Engineer Intern",
    company: "Chistats Labs",
    duration: "September 2022 - November 2022",
    description: [
      "Built an alert system, reducing system downtime by 40% through proactive monitoring",
      "Built a data pipeline to ingest real-time weather data using Telegraf, and visualize trends in Grafana"
    ],
    skills: ["Python", "InfluxDB", "Grafana", "FastAPI", "Git"]
  },
  
  // Add more experiences...
];

export default function Experience() {
  return (
    <section className="py-16 w-full max-w-6xl mx-auto px-4">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Experience
      </motion.h2>

      <div className="relative">
        {/* Vertical line for timeline */}
        <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-[#49c5b6] transform -translate-x-1/2"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row gap-8 mb-12 relative ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#49c5b6] rounded-full transform -translate-x-1/2 mt-2"></div>

            {/* Content */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
              <div className="bg-[#2A2F32] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#49c5b6] mb-1 italic">
                  {exp.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  {exp.company} | {exp.duration}
                </p>
                <ul className="list-disc list-inside text-gray-300 text-sm mb-4">
                  {exp.description.map((point, i) => (
                    <li key={i} className="mb-1">{point}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#383F42] px-2 py-1 rounded-full text-xs text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}