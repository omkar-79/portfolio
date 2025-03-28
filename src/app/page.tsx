'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import Loading from '@/components/Loading';
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import SpotlightBackground from "@/components/SpotlightBackground";
import Quote from "@/components/Quote";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import ScrollSection from "@/components/ScrollSection";
import ResumeButton from "@/components/ResumeButton";
import Scripts from "@/components/Scripts";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptsLoaded, setScriptsLoaded] = useState(0);
  
  const totalScripts = 2; // Number of scripts to load (three.js and vanta)

  const handleScriptLoad = () => {
    setScriptsLoaded(prev => prev + 1);
  };

  useEffect(() => {
    if (scriptsLoaded === totalScripts) {
      // Add a minimum loading time of 2 seconds for the animation
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [scriptsLoaded]);

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" 
        onLoad={handleScriptLoad}
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js" 
        onLoad={handleScriptLoad}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation />
            <Hero />
            <SpotlightBackground />
            
            <ScrollSection id="about">
              <Quote />
            </ScrollSection>
            
            <ScrollSection id="skills">
              <Skills />
            </ScrollSection>
            
            <ScrollSection id="projects">
              <Projects />
            </ScrollSection>
            
            <ScrollSection id="experience">
              <Experience />
            </ScrollSection>
            
            <ScrollSection id="blogs">
              <Blog />
            </ScrollSection>
            
            <ScrollSection>
              <Footer />
            </ScrollSection>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
