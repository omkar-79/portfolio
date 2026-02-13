'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import mykerchiefImage from '@/assets/mykerchief.jpg';
import foodstack from '@/assets/FoodStack.png';
import parkinsons from '@/assets/parkinsons.png';
import news_app from '@/assets/news.png';
import medcompass from '@/assets/medcompass.png';
import droneit from '@/assets/droneit.jpg';
import emailbuddy from '@/assets/emailbuddylogo.png';
import imagzai from '@/assets/imagzai.png';
import invoice_optimizer from '@/assets/invoice-optimizer.png';
import bluejayai from '@/assets/bluejayai.png'; 
import it_support from '@/assets/it_support.png';

interface Project {
  id: number;
  name: string;
  description: string;
  image: StaticImageData;
  tools: string[];
  category: 'software' | 'ml';
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Invoice Discount Optimizer",
    description: "A financial analysis platform for optimizing invoice payment decisions",
    image: invoice_optimizer, 
    tools: ["AWS (ECS Fargate, ECR, RDS)", "Docker", "Jenkins"],
    category: "software",
    link: "https://github.com/omkar-79/invoice_discount_optimzer"
  },
  
  {
    id: 2,
    name: "ImagzAI",
    description: "A web platform for AI generated images with prompts",
    image: imagzai, 
    tools: ["Next.js", "GCP CDN", "PostgreSQL"],
    category: "software",
    link: "https://imagzai.com/"
  },
  {
    id: 3,
    name: "Reservation App",
    description: "A web application to reserve sports facilities like tennis court, basketball, and more",
    image: mykerchiefImage, // Add your image path
    tools: ["React", "Node.js", "MongoDB","REST API"],
    category: "software",
    link: "https://mykerchief.live/"
  },
  {
    id: 4,
    name: "MedCompass",
    description: "An automated post-discharge call system for hospitals to schedule follow-up calls",
    image: medcompass, 
    tools: ["Node.js", "REST API", "MongoDB"],
    category: "software",
    link: "https://github.com/omkar-79/medcompass"
  },
  
  
  {
    id: 5,
    name: "Parkinson's Mobile App",
    description: "A Parkinson's disease progress tracking system using MOCA test",
    image: parkinsons, 
    tools: [ "Expo Go", "FastAPI", "PostgreSQL"],
    category: "software",
    link: "https://github.com/omkar-79/parkinson-app"
  },
  {
    id: 6,
    name: "DroneIt",
    description: "A secure, discussion platform for Drone enthusiast to post drone challenges and innovators provide solutions",
    image: droneit, 
    tools: ["React", "Prisma ORM"],
    category: "software",
    link: "https://github.com/omkar-79/DroneWERX"
  },
  {
    id: 7,
    name: "News Summarization App",
    description: "A web application to summarize news articles using NLP. Used Google's T5 model and CNN/DailyMail dataset",
    image: news_app, 
    tools: ["Python", "HuggingFace"],
    category: "ml",
    link: "https://github.com/omkar-79/news-summarization"
  },
  {
    id: 8,
    name: "Email Buddy AI",
    description: "LLM-powered personalized marketing email generator using Claude Sonnet 4",
    image: emailbuddy, 
    tools: ["Python", "FastAPI", "Model Context Protocol"],
    category: "ml",
    link: "https://github.com/omkar-79/claude4-mcp-emailer"
  },
  {
    id: 9,
    name: "BlueJay AI",
    description: "An intelligent chat application that provides AI-driven insights and analysis for S&P 500 component stocks.",
    image: bluejayai, 
    tools: ["Python", "Langchain", "Google Gemini API", "SQL"],
    category: "ml",
    link: "https://github.com/omkar-79/bluejay_ai/tree/main"
  },
  {
    id: 10,
    name: "Multi-Agent IT Support System",
    description: "A multi-agent system that provides automated IT support with intelligent routing and escalation.",
    image: it_support, 
    tools: ["Python", "Google Gemini API", "Agentic AI"],
    category: "ml",
    link: "https://github.com/omkar-79/AI-Ticket-Agent"
  },
  {
    id: 11,
    name: "FoodStack",
    description: "A web application for predicting sales in a restaurant",
    image: foodstack, 
    tools: ["SGDRegressor", "Databricks"],
    category: "ml",
    link: "https://github.com/omkar-79/foodstack-ml"
  },


  
  
  
  // Add more projects here
];

const DESKTOP_INITIAL = 6;
const MOBILE_INITIAL = 4;

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'software' | 'ml'>('all');
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setShowMore(false);
  }, [filter]);

  const filteredProjects = projects.filter(project =>
    filter === 'all' ? true : project.category === filter
  );

  const initialCount = isMobile ? MOBILE_INITIAL : DESKTOP_INITIAL;
  const hasMore = filteredProjects.length > initialCount;
  const displayedProjects = showMore
    ? filteredProjects
    : filteredProjects.slice(0, initialCount);

  return (
    <section className="py-16 w-full max-w-6xl mx-auto px-4">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Projects
      </motion.h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full transition-colors ${
            filter === 'all' 
              ? 'bg-[#49c5b6] text-white' 
              : 'bg-[#2A2F32] text-gray-300 hover:bg-[#383F42]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('software')}
          className={`px-6 py-2 rounded-full transition-colors ${
            filter === 'software' 
              ? 'bg-[#49c5b6] text-white' 
              : 'bg-[#2A2F32] text-gray-300 hover:bg-[#383F42]'
          }`}
        >
          Software Development
        </button>
        <button
          onClick={() => setFilter('ml')}
          className={`px-6 py-2 rounded-full transition-colors ${
            filter === 'ml' 
              ? 'bg-[#49c5b6] text-white' 
              : 'bg-[#2A2F32] text-gray-300 hover:bg-[#383F42]'
          }`}
        >
          Machine Learning
        </button>
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-[#2A2F32] rounded-lg overflow-hidden"
              onClick={() => window.open(project.link, '_blank')}
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#49c5b6]">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-[#383F42] px-2 py-1 rounded-full text-xs text-gray-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="px-6 py-3 rounded-full bg-[#49c5b6] text-white font-medium hover:bg-[#3db5a8] transition-colors"
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
    </section>
  );
}