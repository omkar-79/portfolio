'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import mykerchiefImage from '@/assets/mykerchief.jpg';
import varangio from '@/assets/Varangio.jpg';
import foodstack from '@/assets/FoodStack.png';
import parkinsons from '@/assets/parkinsons.png';
import news_app from '@/assets/news.png';
import medcompass from '@/assets/medcompass.png';
import droneit from '@/assets/droneit.jpg';
import emailbuddy from '@/assets/emailbuddylogo.png';

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
    name: "Reservation App",
    description: "A web application to reserve sports facilities like tennis court, basketball, and more",
    image: mykerchiefImage, // Add your image path
    tools: ["React", "Node.js", "MongoDB","REST API"],
    category: "software",
    link: "https://mykerchief.live/"
  },
  {
    id: 2,
    name: "Parkinson's Mobile App",
    description: "A Parkinson's disease progress tracking system using MOCA test",
    image: parkinsons, 
    tools: [ "Expo Go", "Fast API", "PostgreSQL"],
    category: "software",
    link: "https://github.com/omkar-79/parkinson-app"
  },
  {
    id: 3,
    name: "FoodStack",
    description: "A web application for predicting sales in a restaurant",
    image: foodstack, 
    tools: ["SGDRegressor", "Databricks", "MongoDB"],
    category: "ml",
    link: "https://github.com/omkar-79/foodstack-ml"
  },
  {
    id: 4,
    name: "News Summarization App",
    description: "A web application to summarize news articles using NLP. Used Google's T5 model and CNN/DailyMail dataset",
    image: news_app, 
    tools: ["Python", "HuggingFace", "HTML"],
    category: "ml",
    link: "https://github.com/omkar-79/news-summarization"
  },
  {
    id: 5,
    name: "DroneIt",
    description: "A secure, discussion platform for Drone enthusiast to post drone challenges and innovators provide solutions",
    image: droneit, 
    tools: ["React", "Prisma ORM", "Redux","GraphQL"],
    category: "software",
    link: "https://github.com/omkar-79/DroneWERX"
  },
  {
    id: 6,
    name: "Email Buddy AI",
    description: "LLM-powered personalized marketing email generator using Claude Sonnet 4",
    image: emailbuddy, 
    tools: ["Python", "FastAPI", "MCP", "Claude API"],
    category: "ml",
    link: "https://github.com/omkar-79/claude4-mcp-emailer"
  },
  {
    id: 7,
    name: "MedCompass",
    description: "An automated post-discharge call system for hospitals to schedule follow-up calls",
    image: medcompass, 
    tools: ["Node.js", "REST API", "MongoDB"],
    category: "software",
    link: "https://github.com/omkar-79/medcompass"
  },
  // Add more projects here
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'software' | 'ml'>('all');

  const filteredProjects = projects.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

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
          {filteredProjects.map((project) => (
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
    </section>
  );
}