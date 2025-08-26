// src/components/MenuBar.js
import React from 'react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Code, Quote, Undo, Redo, RemoveFormatting } from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center p-2 border-b border-neutral-200">
      {/* Undo & Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={`p-2 rounded-md ${editor.can().undo() ? '' : 'text-neutral-400 cursor-not-allowed'}`}
        title="Undo"
      >
        <Undo className="w-5 h-5 text-neutral-600" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={`p-2 rounded-md ${editor.can().redo() ? '' : 'text-neutral-400 cursor-not-allowed'}`}
        title="Redo"
      >
        <Redo className="w-5 h-5 text-neutral-600" />
      </button>

      <div className="w-[1px] h-6 bg-neutral-200 mx-2" />

      {/* Basic Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-md ${editor.isActive('bold') ? 'bg-neutral-200' : ''}`}
        title="Bold"
      >
        <Bold className="w-5 h-5 text-neutral-600" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md ${editor.isActive('italic') ? 'bg-neutral-200' : ''}`}
        title="Italic"
      >
        <Italic className="w-5 h-5 text-neutral-600" />
      </button>

      <div className="w-[1px] h-6 bg-neutral-200 mx-2" />

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-md ${editor.isActive('heading', { level: 1 }) ? 'bg-neutral-200' : ''}`}
        title="Heading 1"
      >
        <Heading1 className="w-5 h-5 text-neutral-600" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-md ${editor.isActive('heading', { level: 2 }) ? 'bg-neutral-200' : ''}`}
        title="Heading 2"
      >
        <Heading2 className="w-5 h-5 text-neutral-600" />
      </button>

      <div className="w-[1px] h-6 bg-neutral-200 mx-2" />

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-md ${editor.isActive('bulletList') ? 'bg-neutral-200' : ''}`}
        title="Bullet List"
      >
        <List className="w-5 h-5 text-neutral-600" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-md ${editor.isActive('orderedList') ? 'bg-neutral-200' : ''}`}
        title="Ordered List"
      >
        <ListOrdered className="w-5 h-5 text-neutral-600" />
      </button>

      <div className="w-[1px] h-6 bg-neutral-200 mx-2" />

      {/* Blockquote & Code Block */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-md ${editor.isActive('blockquote') ? 'bg-neutral-200' : ''}`}
        title="Blockquote"
      >
        <Quote className="w-5 h-5 text-neutral-600" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded-md ${editor.isActive('codeBlock') ? 'bg-neutral-200' : ''}`}
        title="Code Block"
      >
        <Code className="w-5 h-5 text-neutral-600" />
      </button>

      <div className="w-[1px] h-6 bg-neutral-200 mx-2" />
      
      {/* Clear Formatting */}
      <button
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className="p-2 rounded-md"
        title="Clear Formatting"
      >
        <RemoveFormatting className="w-5 h-5 text-neutral-600" />
      </button>
    </div>
  );
};

export default MenuBar;