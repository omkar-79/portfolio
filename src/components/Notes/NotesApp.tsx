'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';
import Login from './Login';
import FolderManager from './FolderManager';
import { sampleFolders } from './sampleData';
import type { EditorJSOutput } from '@/types/editorjs';

interface Folder {
  id: string;
  name: string;
  files: NoteFile[];
}

interface NoteFile {
  id: string;
  name: string;
  content: EditorJSOutput | string;
  createdAt: Date;
  updatedAt: Date;
}

interface ParsedFolder {
  id: string;
  name: string;
  files: ParsedNoteFile[];
}

interface ParsedNoteFile {
  id: string;
  name: string;
  content: EditorJSOutput | string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFolders = localStorage.getItem('notes-folders');
    const savedLogin = localStorage.getItem('notes-login');
    
    if (savedFolders) {
      try {
        const parsedFolders = JSON.parse(savedFolders) as ParsedFolder[];
        // Convert date strings back to Date objects
        const foldersWithDates = parsedFolders.map((folder: ParsedFolder) => ({
          ...folder,
          files: folder.files.map((file: ParsedNoteFile) => ({
            ...file,
            createdAt: new Date(file.createdAt),
            updatedAt: new Date(file.updatedAt)
          }))
        }));
        setFolders(foldersWithDates);
      } catch (error) {
        console.error('Error loading folders:', error);
        // If there's an error loading saved data, use sample data
        setFolders(sampleFolders);
      }
    } else {
      // If no saved data exists, use sample data for first-time users
      setFolders(sampleFolders);
    }

    if (savedLogin) {
      try {
        const loginData = JSON.parse(savedLogin);
        setIsLoggedIn(true);
        setUsername(loginData.username);
      } catch (error) {
        console.error('Error loading login data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('notes-folders', JSON.stringify(folders));
    }
  }, [folders, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('notes-login', JSON.stringify({ username }));
    }
  }, [isLoggedIn, username]);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('notes-login');
  };

  const handleFolderCreate = (name: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      files: []
    };
    setFolders([...folders, newFolder]);
  };

  const handleFolderDelete = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
    if (currentFolder === folderId) {
      setCurrentFolder(null);
    }
  };

  const handleFileCreate = (fileName: string, content: EditorJSOutput | string) => {
    if (!currentFolder) return;

    const newFile: NoteFile = {
      id: Date.now().toString(),
      name: fileName,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setFolders(folders.map(folder => 
      folder.id === currentFolder 
        ? { ...folder, files: [...folder.files, newFile] }
        : folder
    ));
  };

  const handleFileEdit = (fileId: string, fileName: string, content: EditorJSOutput | string) => {
    if (!currentFolder) return;

    setFolders(folders.map(folder => 
      folder.id === currentFolder 
        ? {
            ...folder,
            files: folder.files.map(file =>
              file.id === fileId
                ? { ...file, name: fileName, content, updatedAt: new Date() }
                : file
            )
          }
        : folder
    ));
  };

  const handleFileDelete = (fileId: string) => {
    if (!currentFolder) return;

    setFolders(folders.map(folder => 
      folder.id === currentFolder 
        ? { ...folder, files: folder.files.filter(f => f.id !== fileId) }
        : folder
    ));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Technical Notes</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Welcome, {username}!</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FiLogOut className="text-sm" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-[calc(100vh-200px)]"
        >
          <FolderManager
            folders={folders}
            currentFolder={currentFolder}
            onFolderSelect={setCurrentFolder}
            onFolderCreate={handleFolderCreate}
            onFolderDelete={handleFolderDelete}
            onFileSelect={() => {}} // Handled internally by FolderManager
            onFileCreate={handleFileCreate}
            onFileDelete={handleFileDelete}
            onFileEdit={handleFileEdit}
          />
        </motion.div>
      </div>
    </div>
  );
} 