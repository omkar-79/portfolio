'use client';

import { useEffect, useRef } from 'react';

interface EditorJSRendererProps {
  data: any;
  className?: string;
}

export default function EditorJSRenderer({ data, className = '' }: EditorJSRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && data) {
      renderContent();
    }
  }, [data]);

  const renderContent = () => {
    if (!containerRef.current || !data.blocks) return;

    containerRef.current.innerHTML = '';

    data.blocks.forEach((block: any) => {
      const element = createBlockElement(block);
      if (element) {
        containerRef.current!.appendChild(element);
      }
    });
  };

  const createBlockElement = (block: any) => {
    const { type, data } = block;

    switch (type) {
      case 'paragraph':
        const p = document.createElement('p');
        p.className = 'text-gray-300 mb-4 leading-relaxed';
        p.textContent = data.text || '';
        return p;

      case 'header':
        const header = document.createElement(`h${data.level}`);
        header.className = `text-white font-bold mb-4 ${
          data.level === 1 ? 'text-3xl' :
          data.level === 2 ? 'text-2xl' :
          data.level === 3 ? 'text-xl' :
          data.level === 4 ? 'text-lg' :
          'text-base'
        }`;
        header.textContent = data.text || '';
        return header;

      case 'list':
        const list = document.createElement(data.style === 'ordered' ? 'ol' : 'ul');
        list.className = 'text-gray-300 mb-4 ml-6';
        
        data.items.forEach((item: string) => {
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
        code.textContent = data.code || '';
        codeContainer.appendChild(code);
        return codeContainer;

      case 'quote':
        const quoteContainer = document.createElement('blockquote');
        quoteContainer.className = 'border-l-4 border-blue-500 pl-4 mb-4 italic';
        
        const quoteText = document.createElement('p');
        quoteText.className = 'text-gray-300 mb-2';
        quoteText.textContent = data.text || '';
        quoteContainer.appendChild(quoteText);
        
        if (data.caption) {
          const caption = document.createElement('cite');
          caption.className = 'text-gray-400 text-sm';
          caption.textContent = `— ${data.caption}`;
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
        
        if (data.content && data.content.length > 0) {
          // Create header row
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          data.content[0].forEach((cell: string) => {
            const th = document.createElement('th');
            th.className = 'border border-gray-600 px-4 py-2 text-white font-semibold bg-gray-700';
            th.textContent = cell;
            headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          table.appendChild(thead);
          
          // Create body rows
          const tbody = document.createElement('tbody');
          data.content.slice(1).forEach((row: string[]) => {
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
  };

  return (
    <div 
      ref={containerRef} 
      className={`prose prose-invert max-w-none ${className}`}
    />
  );
} 