import React from "react";
import { Plus } from "lucide-react";
import NoteItem from "./NoteItem";

const Sidebar = ({ notes, selectedNote, setSelectedNote, createNewNote }) => {
  return (
    <div className="w-80 bg-white/70 backdrop-blur-lg rounded-3xl border border-neutral-200 shadow-xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <button
          onClick={createNewNote}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 hover:shadow-md hover:scale-[1.01] transition-all duration-300 font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>Catatan Baru</span>
        </button>
      </div>
      <div className="overflow-y-auto flex-1 pb-4">
        {notes.length === 0 ? (
          <div className="p-6 text-center text-neutral-500">
            <p>Belum ada catatan</p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                isSelected={selectedNote?.id === note.id}
                onClick={() => setSelectedNote(note)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;