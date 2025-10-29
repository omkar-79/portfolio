'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiEdit, FiDownload, FiCopy } from 'react-icons/fi';
import EditorJSRenderer from './EditorJSRenderer';

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  content: any;
  onEdit: () => void;
}

export default function FileViewer({ isOpen, onClose, fileName, content, onEdit }: FileViewerProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadFile = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'md':
        return '📝';
      case 'txt':
        return '📄';
      case 'js':
      case 'ts':
        return '⚛️';
      case 'py':
        return '🐍';
      case 'java':
        return '☕';
      case 'cpp':
      case 'c':
        return '⚙️';
      default:
        return '📁';
    }
  };

  const formatContent = (content: any) => {
    // Check if content is EditorJS format or plain text
    if (content && typeof content === 'object' && content.blocks) {
      return null; // Will be handled by EditorJSRenderer
    }
    
    // Fallback to plain text formatting
    const textContent = typeof content === 'string' ? content : JSON.stringify(content);
    return textContent
      .split('\n')
      .map((line) => {
        if (line.startsWith('# ')) {
          return `<h1 class="text-2xl font-bold text-white mb-4">${line.substring(2)}</h1>`;
        }
        if (line.startsWith('## ')) {
          return `<h2 class="text-xl font-bold text-white mb-3">${line.substring(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-lg font-bold text-white mb-2">${line.substring(4)}</h3>`;
        }
        if (line.startsWith('- ')) {
          return `<li class="text-gray-300 ml-4">${line.substring(2)}</li>`;
        }
        if (line.startsWith('```')) {
          return `<div class="bg-gray-800 p-4 rounded-lg my-2 font-mono text-sm">`;
        }
        if (line.trim() === '') {
          return '<br>';
        }
        return `<p class="text-gray-300 mb-2">${line}</p>`;
      })
      .join('');
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
                <span className="text-2xl">{getFileIcon(fileName)}</span>
                <div>
                  <h2 className="text-xl font-semibold text-white">{fileName}</h2>
                  <p className="text-sm text-gray-400">
                    {content.length} characters • {content.split('\n').length} lines
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onEdit}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <FiEdit className="text-sm" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  <FiCopy className="text-sm" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadFile}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                >
                  <FiDownload className="text-sm" />
                  <span>Download</span>
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
            <div className="flex-1 p-6 overflow-auto">
              {content && typeof content === 'object' && content.blocks ? (
                <EditorJSRenderer data={content} />
              ) : (
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatContent(content) || '' }}
                />
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div>
                  <span className="font-medium">Last modified:</span>
                  <span className="ml-2">{new Date().toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="font-medium">File type:</span>
                  <span className="ml-2">{fileName.split('.').pop()?.toUpperCase() || 'TEXT'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 