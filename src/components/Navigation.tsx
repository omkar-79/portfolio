'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'About Me', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'GitHub', href: 'https://github.com/omkar-79', external: true },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <nav className="backdrop-blur-md rounded-full shadow-lg">
          <div className="px-8 py-4">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-gray-200 hover:text-[#49c5b6]  px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 left-6 z-50 backdrop-blur-md p-3 rounded-full shadow-lg text-gray-200 hover:text-white"
          aria-label="Toggle menu"
        >
          <motion.svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={isOpen ? "open" : "closed"}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              variants={{
                closed: { d: "M4 6h16M4 12h16M4 18h16" },
                open: { d: "M6 18L18 6M6 6l12 12" }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.svg>
        </button>

        {/* Fullscreen Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 backdrop-blur-lg bg-black/50"
            >
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="h-full flex flex-col items-center justify-center space-y-8"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={itemVariants}
                    className="text-gray-200 hover:text-white px-4 py-3 text-2xl font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}