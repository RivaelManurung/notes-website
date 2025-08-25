import React from "react";
import ReactQuill from 'react-quill'; // Import library React-Quill
import 'react-quill/dist/quill.snow.css'; // Import stylesheet untuk tampilan editor

import { Edit3, Save, Trash2 } from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MainContent = ({ selectedNote, isEditing, setIsEditing, updateNote, deleteNote }) => {
  if (!selectedNote) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-white/70 backdrop-blur-lg rounded-3xl border border-neutral-200 shadow-xl">
        <div className="text-center text-neutral-400">
          <Edit3 className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
          <h3 className="text-2xl font-semibold mb-2">
            Selamat Datang di Notes App
          </h3>
          <p className="text-neutral-500 mb-6">
            Pilih catatan dari sidebar atau buat catatan baru
          </p>
        </div>
      </div>
    );
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'], 
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean'] 
    ],
  };

  return (
    <div className="flex-1 bg-white/70 backdrop-blur-lg rounded-3xl border border-neutral-200 shadow-xl">
      <div className="h-full flex flex-col">
        <div className="p-8 border-b border-neutral-200 flex justify-between items-start">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote({ ...selectedNote, title: e.target.value })}
                className="text-3xl font-bold text-neutral-800 bg-transparent border-0 outline-none w-full mb-1"
                placeholder="Judul catatan..."
              />
            ) : (
              <h2 className="text-3xl font-bold text-neutral-800 mb-1">{selectedNote.title}</h2>
            )}
            <p className="text-sm text-neutral-500 font-light">
              Dibuat: {formatDate(selectedNote.createdAt)} • Diperbarui: {formatDate(selectedNote.updatedAt)}
            </p>
          </div>
          <div className="flex space-x-3 ml-4 mt-1">
            {isEditing ? (
              <button
                onClick={() => setIsEditing(false)}
                className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md"
                title="Simpan"
              >
                <Save className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 bg-neutral-200 text-neutral-600 rounded-full hover:bg-neutral-300 transition-colors shadow-sm"
                title="Edit"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => deleteNote(selectedNote.id)}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
              title="Hapus"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          {isEditing ? (
            <div className="h-full">
              <ReactQuill
                theme="snow"
                value={selectedNote.content}
                onChange={(content) => updateNote({ ...selectedNote, content: content })}
                className="w-full h-full text-neutral-700 bg-transparent border-0 outline-none text-lg leading-relaxed font-light"
                modules={modules}
                placeholder="Mulai menulis catatan Anda di sini..."
              />
            </div>
          ) : (
            <div className="h-full">
              <div 
                className="whitespace-pre-wrap text-neutral-700 text-lg leading-relaxed font-light font-sans"
                dangerouslySetInnerHTML={{ __html: selectedNote.content }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;