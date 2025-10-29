'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiFolderPlus, FiTrash2, FiChevronRight, FiHome, FiEdit } from 'react-icons/fi';

interface Folder {
  id: string;
  name: string;
  files: File[];
}

interface File {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FolderManagerProps {
  folders: Folder[];
  currentFolder: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onFolderCreate: (name: string) => void;
  onFolderDelete: (folderId: string) => void;
  onFileSelect: (file: File) => void;
  onFileCreate: (fileName: string, content: string) => void;
  onFileDelete: (fileId: string) => void;
  onFileEdit: (fileId: string, fileName: string, content: string) => void;
}

export default function FolderManager({
  folders,
  currentFolder,
  onFolderSelect,
  onFolderCreate,
  onFolderDelete,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileEdit
}: FolderManagerProps) {
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [showFileEditor, setShowFileEditor] = useState(false);
  const [editingFile, setEditingFile] = useState<File | null>(null);

  const currentFolderData = currentFolder 
    ? folders.find(f => f.id === currentFolder) 
    : null;

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onFolderCreate(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const handleFileClick = (file: File) => {
    setSelectedFile(file);
    setShowFileViewer(true);
  };

  const handleEditFile = (file: File) => {
    setEditingFile(file);
    setShowFileEditor(true);
  };

  const handleSaveFile = (fileName: string, content: string) => {
    if (editingFile) {
      onFileEdit(editingFile.id, fileName, content);
    } else {
      onFileCreate(fileName, content);
    }
    setEditingFile(null);
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

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiFolder className="text-blue-400 text-xl" />
            <h2 className="text-xl font-semibold text-white">Notes</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onFolderSelect(null)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              <FiHome className="text-sm" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setShowNewFolderInput(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              <FiFolderPlus className="text-sm" />
              <span>New Folder</span>
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
      <div className="flex-1 p-6 overflow-auto">
        {!currentFolder ? (
          // Home view - show folders
          <div className="space-y-4">
            {showNewFolderInput && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg"
              >
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  className="flex-1 px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                  autoFocus
                />
                <button
                  onClick={handleCreateFolder}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowNewFolderInput(false);
                    setNewFolderName('');
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            )}

            {folders.length === 0 ? (
              <div className="text-center py-12">
                <FiFolder className="text-gray-500 text-4xl mx-auto mb-4" />
                <p className="text-gray-400">No folders yet. Create your first folder to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {folders.map((folder) => (
                  <motion.div
                    key={folder.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => onFolderSelect(folder.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FiFolder className="text-blue-400 text-xl" />
                        <div>
                          <h3 className="text-white font-medium">{folder.name}</h3>
                          <p className="text-gray-400 text-sm">{folder.files.length} files</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onFolderDelete(folder.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Folder view - show files
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {currentFolderData?.name} ({currentFolderData?.files.length} files)
              </h3>
              <button
                onClick={() => {
                  setEditingFile(null);
                  setShowFileEditor(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                New File
              </button>
            </div>

            {currentFolderData?.files.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">📄</span>
                <p className="text-gray-400">No files in this folder. Create your first file!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFolderData?.files.map((file) => (
                  <motion.div
                    key={file.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleFileClick(file)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getFileIcon(file.name)}</span>
                        <div>
                          <h4 className="text-white font-medium">{file.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {file.content.length} characters • {new Date(file.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFile(file);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded transition-colors"
                        >
                          <FiEdit className="text-sm" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onFileDelete(file.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* File Viewer Modal */}
      {selectedFile && (
        <FileViewer
          isOpen={showFileViewer}
          onClose={() => {
            setShowFileViewer(false);
            setSelectedFile(null);
          }}
          fileName={selectedFile.name}
          content={selectedFile.content}
          onEdit={() => {
            setShowFileViewer(false);
            handleEditFile(selectedFile);
          }}
        />
      )}

      {/* File Editor Modal */}
      <EditorJSFileEditor
        isOpen={showFileEditor}
        onClose={() => {
          setShowFileEditor(false);
          setEditingFile(null);
        }}
        onSave={handleSaveFile}
        initialFileName={editingFile?.name || ''}
        initialContent={editingFile?.content || null}
        isEditing={!!editingFile}
      />
    </div>
  );
}

// Import the components we need
import FileViewer from './FileViewer';
import EditorJSFileEditor from './EditorJSFileEditor'; 