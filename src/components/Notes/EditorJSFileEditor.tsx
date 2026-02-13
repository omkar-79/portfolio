'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiFileText, FiEye } from 'react-icons/fi';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import ImageTool from '@editorjs/image';
import EditorJSRenderer from './EditorJSRenderer';
import type { EditorJSOutput } from '@/types/editorjs';

interface EditorJSFileEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fileName: string, content: EditorJSOutput) => void;
  initialFileName?: string;
  initialContent?: EditorJSOutput | string | null;
  isEditing?: boolean;
}

export default function EditorJSFileEditor({ 
  isOpen, 
  onClose, 
  onSave, 
  initialFileName = '', 
  initialContent = null, 
  isEditing = false 
}: EditorJSFileEditorProps) {
  const [fileName, setFileName] = useState(initialFileName);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const normalizeContent = (raw: EditorJSOutput | string | null | undefined): EditorJSOutput => {
    if (!raw) return { blocks: [{ type: 'paragraph', data: { text: '' } }] };
    if (typeof raw === 'string') {
      return { blocks: [{ type: 'paragraph', data: { text: raw } }] };
    }
    return raw;
  };

  const [previewData, setPreviewData] = useState<EditorJSOutput | null>(
    initialContent ? normalizeContent(initialContent) : null
  );
  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const initializeEditor = useCallback(async () => {
    if (editorContainerRef.current) {
      // Destroy existing editor if it exists
      if (editorRef.current) {
        await editorRef.current.destroy();
      }

      const content = normalizeContent(initialContent);

      // Initialize new editor
      editorRef.current = new EditorJS({
        holder: editorContainerRef.current,
        placeholder: 'Start writing your notes...',
        data: content,
        tools: {
          header: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            class: Header as any,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2
            }
          },
          list: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            class: List as any,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: Code as any,
          quote: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            class: Quote as any,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delimiter: Delimiter as any,
          table: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            class: Table as any,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          image: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            class: ImageTool as any,
            config: {
              uploader: {
                async uploadByUrl(url: string) {
                  return {
                    success: 1,
                    file: {
                      url,
                    },
                  };
                },
              },
              // Hide file upload button
              types: 'url',
            },
          },
        },
        onChange: () => {
          setIsEditorReady(true);
        },
        onReady: () => {
          setIsEditorReady(true);
        }
      });
    }
  }, [initialContent]);

  useEffect(() => {
    if (isOpen) {
      setFileName(initialFileName);
      setActiveTab('editor');
      initializeEditor();
    }
  }, [isOpen, initialFileName, initialContent, initializeEditor]);

  // Fix EditorJS background and text color, and add scrolling
  useEffect(() => {
    if (isEditorReady && editorContainerRef.current) {
      const editorRoot = editorContainerRef.current;
      editorRoot.style.background = '#181f2a';
      editorRoot.style.color = '#f3f4f6';
      editorRoot.style.minHeight = '500px';
      editorRoot.style.maxHeight = '500px';
      editorRoot.style.overflowY = 'auto';
      editorRoot.style.padding = '1rem';
      editorRoot.style.borderRadius = '0.5rem';
    }
  }, [isEditorReady, activeTab]);

  const handleSave = async () => {
    if (fileName.trim() && editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        onSave(fileName.trim(), outputData);
        onClose();
      } catch (error) {
        console.error('Error saving editor data:', error);
      }
    }
  };

  const handlePreview = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        setPreviewData(outputData);
        setActiveTab('preview');
      } catch {
        setPreviewData(null);
        setActiveTab('preview');
      }
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
            className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
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
                  onClick={handlePreview}
                  type="button"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FiEye className="text-sm" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isEditorReady}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
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

            {/* Tabs */}
            <div className="flex border-b border-gray-700 bg-gray-800">
              <button
                className={`px-6 py-2 text-sm font-medium focus:outline-none transition-colors ${activeTab === 'editor' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('editor')}
              >
                Editor
              </button>
              <button
                className={`px-6 py-2 text-sm font-medium focus:outline-none transition-colors ${activeTab === 'preview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={handlePreview}
              >
                Preview
              </button>
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
                  onKeyDown={handleKeyDown}
                  placeholder="Enter file name (e.g., react-hooks.md)"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Editor Container or Preview */}
              <div className="flex-1 min-h-[500px]">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                {activeTab === 'editor' ? (
                  <div 
                    ref={editorContainerRef}
                    className="w-full h-full min-h-[500px] border border-gray-600 rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 min-h-[500px] overflow-auto">
                    <EditorJSRenderer data={previewData} />
                  </div>
                )}
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
                  <span className="font-medium">Editor:</span>
                  <span className="ml-2">{isEditorReady ? 'Ready' : 'Loading...'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 