'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
  }
  
  export default function ScrollSection({ children, className = '', id }: ScrollSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
  
    return (
      <motion.div
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`scroll-mt-24 ${className}`} 
      >
        {children}
      </motion.div>
    );
  }