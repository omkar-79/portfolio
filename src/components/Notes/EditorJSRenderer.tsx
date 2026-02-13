'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { EditorJSOutput, EditorJSBlock } from '@/types/editorjs';

interface EditorJSRendererProps {
  data: EditorJSOutput | null;
  className?: string;
}

export default function EditorJSRenderer({ data, className = '' }: EditorJSRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const createBlockElement = useCallback((block: EditorJSBlock): HTMLElement | null => {
    const { type, data: blockData } = block;
    const data = blockData as Record<string, unknown>;

    switch (type) {
      case 'paragraph':
        const p = document.createElement('p');
        p.className = 'text-gray-300 mb-4 leading-relaxed';
        p.textContent = (data.text as string) || '';
        return p;

      case 'header':
        const level = (data.level as number) || 2;
        const header = document.createElement(`h${level}`);
        header.className = `text-white font-bold mb-4 ${
          level === 1 ? 'text-3xl' :
          level === 2 ? 'text-2xl' :
          level === 3 ? 'text-xl' :
          level === 4 ? 'text-lg' :
          'text-base'
        }`;
        header.textContent = (data.text as string) || '';
        return header;

      case 'list':
        const list = document.createElement((data.style as string) === 'ordered' ? 'ol' : 'ul');
        list.className = 'text-gray-300 mb-4 ml-6';
        const items = (data.items as string[]) || [];
        items.forEach((item: string) => {
          const li = document.createElement('li');
          li.className = 'mb-1';
          li.textContent = item;
          list.appendChild(li);
        });
        return list;

      case 'code':
        const codeContainer = document.createElement('div');
        codeContainer.className = 'bg-gray-800 rounded-lg p-4 mb-4';
        const code = document.createElement('pre');
        code.className = 'text-green-400 font-mono text-sm overflow-x-auto';
        code.textContent = (data.code as string) || '';
        codeContainer.appendChild(code);
        return codeContainer;

      case 'quote':
        const quoteContainer = document.createElement('blockquote');
        quoteContainer.className = 'border-l-4 border-blue-500 pl-4 mb-4 italic';
        const quoteText = document.createElement('p');
        quoteText.className = 'text-gray-300 mb-2';
        quoteText.textContent = (data.text as string) || '';
        quoteContainer.appendChild(quoteText);
        if (data.caption) {
          const caption = document.createElement('cite');
          caption.className = 'text-gray-400 text-sm';
          caption.textContent = `— ${data.caption as string}`;
          quoteContainer.appendChild(caption);
        }
        return quoteContainer;

      case 'delimiter':
        const delimiter = document.createElement('hr');
        delimiter.className = 'border-gray-600 my-8';
        return delimiter;

      case 'table':
        const tableContainer = document.createElement('div');
        tableContainer.className = 'overflow-x-auto mb-4';
        const table = document.createElement('table');
        table.className = 'min-w-full border border-gray-600';
        const content = (data.content as string[][]) || [];
        if (content.length > 0) {
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          content[0].forEach((cell: string) => {
            const th = document.createElement('th');
            th.className = 'border border-gray-600 px-4 py-2 text-white font-semibold bg-gray-700';
            th.textContent = cell;
            headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          table.appendChild(thead);
          const tbody = document.createElement('tbody');
          content.slice(1).forEach((row: string[]) => {
            const tr = document.createElement('tr');
            row.forEach((cell: string) => {
              const td = document.createElement('td');
              td.className = 'border border-gray-600 px-4 py-2 text-gray-300';
              td.textContent = cell;
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);
        }
        tableContainer.appendChild(table);
        return tableContainer;

      default:
        const defaultElement = document.createElement('p');
        defaultElement.className = 'text-gray-300 mb-4';
        defaultElement.textContent = JSON.stringify(data);
        return defaultElement;
    }
  }, []);

  const renderContent = useCallback(() => {
    if (!containerRef.current || !data?.blocks) return;
    containerRef.current.innerHTML = '';
    data.blocks.forEach((block) => {
      const element = createBlockElement(block);
      if (element) {
        containerRef.current!.appendChild(element);
      }
    });
  }, [data, createBlockElement]);

  useEffect(() => {
    if (containerRef.current && data) {
      renderContent();
    }
  }, [data, renderContent]);

  return (
    <div 
      ref={containerRef} 
      className={`prose prose-invert max-w-none ${className}`}
    />
  );
} 