'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiFileText, FiChevronRight, FiHome, FiLock } from 'react-icons/fi';
import EditorJSRenderer from './EditorJSRenderer';

interface Folder {
  id: string;
  name: string;
  files: File[];
}

interface File {
  id: string;
  name: string;
  content: any;
  createdAt: Date;
  updatedAt: Date;
}

interface PublicNotesViewerProps {
  folders: Folder[];
  onAdminLogin: () => void;
}

export default function PublicNotesViewer({ folders, onAdminLogin }: PublicNotesViewerProps) {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileViewer, setShowFileViewer] = useState(false);

  const currentFolderData = currentFolder 
    ? folders.find(f => f.id === currentFolder) 
    : null;

  const handleFileClick = (file: File) => {
    setSelectedFile(file);
    setShowFileViewer(true);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Technical Notes</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Public Viewer</span>
            </div>
            <button
              onClick={onAdminLogin}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiLock className="text-sm" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            My Technical Notes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my technical notes, tutorials, and insights on various programming topics. 
            Feel free to explore and learn from these resources.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="bg-gray-900/50 backdrop-blur-md rounded-lg shadow-xl border border-gray-700">
          {/* Navigation */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiFolder className="text-blue-400 text-xl" />
                <h3 className="text-xl font-semibold text-white">Notes Library</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentFolder(null)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  <FiHome className="text-sm" />
                  <span>All Folders</span>
                </button>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 mt-4 text-sm text-gray-400">
              <span>📁</span>
              <span>Notes</span>
              {currentFolderData && (
                <>
                  <FiChevronRight className="text-gray-500" />
                  <span>{currentFolderData.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!currentFolder ? (
              // Home view - show folders
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h4 className="text-lg text-gray-300 mb-2">Choose a category to explore:</h4>
                  <p className="text-gray-400">Click on any folder to view its contents</p>
                </div>

                {folders.length === 0 ? (
                  <div className="text-center py-12">
                    <FiFolder className="text-gray-500 text-4xl mx-auto mb-4" />
                    <p className="text-gray-400">No notes available yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {folders.map((folder) => (
                      <motion.div
                        key={folder.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700 hover:border-blue-500"
                        onClick={() => setCurrentFolder(folder.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <FiFolder className="text-blue-400 text-2xl" />
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg mb-1">{folder.name}</h3>
                            <p className="text-gray-400 text-sm">{folder.files.length} notes</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Folder view - show files
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {currentFolderData?.name}
                    </h3>
                    <p className="text-gray-400">
                      {currentFolderData?.files.length} notes in this category
                    </p>
                  </div>
                </div>

                {currentFolderData?.files.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-4xl mb-4 block">📄</span>
                    <p className="text-gray-400">No notes in this folder yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentFolderData?.files.map((file) => (
                      <motion.div
                        key={file.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700 hover:border-blue-500"
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl">{getFileIcon(file.name)}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-lg mb-1">{file.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {file.content.length} characters • {new Date(file.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Viewer Modal */}
      <AnimatePresence>
        {showFileViewer && selectedFile && (
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
                  <span className="text-2xl">{getFileIcon(selectedFile.name)}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedFile.name}</h2>
                    <p className="text-sm text-gray-400">
                      {selectedFile.content.length} characters • {selectedFile.content.split('\n').length} lines
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowFileViewer(false);
                    setSelectedFile(null);
                  }}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FiFileText className="text-xl" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-auto">
                {selectedFile.content && typeof selectedFile.content === 'object' && selectedFile.content.blocks ? (
                  <EditorJSRenderer data={selectedFile.content} />
                ) : (
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatContent(selectedFile.content) || '' }}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div>
                    <span className="font-medium">Last modified:</span>
                    <span className="ml-2">{new Date(selectedFile.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">File type:</span>
                    <span className="ml-2">{selectedFile.name.split('.').pop()?.toUpperCase() || 'TEXT'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 