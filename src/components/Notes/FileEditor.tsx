'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiFileText } from 'react-icons/fi';

interface FileEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fileName: string, content: string) => void;
  initialFileName?: string;
  initialContent?: string;
  isEditing?: boolean;
}

export default function FileEditor({ 
  isOpen, 
  onClose, 
  onSave, 
  initialFileName = '', 
  initialContent = '', 
  isEditing = false 
}: FileEditorProps) {
  const [fileName, setFileName] = useState(initialFileName);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (isOpen) {
      setFileName(initialFileName);
      setContent(initialContent);
    }
  }, [isOpen, initialFileName, initialContent]);

  const handleSave = () => {
    if (fileName.trim()) {
      onSave(fileName.trim(), content);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <FiFileText className="text-blue-400 text-xl" />
                <h2 className="text-xl font-semibold text-white">
                  {isEditing ? 'Edit File' : 'Create New File'}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FiSave className="text-sm" />
                  <span>Save</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-4">
              {/* File Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name (e.g., react-hooks.md)"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Content Editor */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write your notes here... (Ctrl+S to save)"
                  className="w-full h-full min-h-[400px] px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div>
                  <span className="font-medium">Shortcuts:</span>
                  <span className="ml-2">Ctrl+S to save</span>
                </div>
                <div>
                  <span className="font-medium">Characters:</span>
                  <span className="ml-2">{content.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 