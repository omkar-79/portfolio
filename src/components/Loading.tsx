'use client';

import { motion } from 'framer-motion';

const LoadingDot = {
  display: "block",
  width: "1.8rem",
  height: "1.8rem",
  backgroundColor: "#49c5b6",
  borderRadius: "50%"
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%",
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-[#222829] flex items-center justify-center"
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span style={LoadingDot} variants={DotVariants} />
        <motion.span style={LoadingDot} variants={DotVariants} />
        <motion.span style={LoadingDot} variants={DotVariants} />
      </motion.div>
    </motion.div>
  );
}