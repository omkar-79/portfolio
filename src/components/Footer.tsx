'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope, FaPhone } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/omkar-79',
    icon: FaGithub
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/omkar-balekundri/',
    icon: FaLinkedin
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@omkarbalekundri77',
    icon: FaMedium
  }
];

export default function Footer() {
  return (
    <footer className="bg-[#2A2F32] py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-[#49c5b6] mb-4">
              Contact Me
            </h3>
            <div className="text-gray-300 space-y-2">
              <a 
                href="mailto:omkarbalekundri77@gmail.com"
                className="flex items-center gap-2 hover:text-[#49c5b6] transition-colors"
              >
                <FaEnvelope />
                <span>omkarbalekundri77@gmail.com</span>
              </a>
              <a 
                href="tel:+17039457493"
                className="flex items-center gap-2 hover:text-[#49c5b6] transition-colors"
              >
                <FaPhone />
                <span>+1 (703) - 945-7493</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-[#49c5b6] mb-4">
              Follow Me
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#49c5b6] transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-400 text-sm mt-8 pt-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>© {new Date().getFullYear()} CodexAI. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}