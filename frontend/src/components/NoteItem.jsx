import React from "react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const NoteItem = ({ note, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-indigo-400/50 hover:shadow-md ${
        isSelected
          ? "bg-gradient-to-r from-indigo-50 to-sky-50 border-indigo-200 shadow-xl"
          : "bg-white/80 hover:bg-white/95"
      }`}
    >
      <h3 className="font-semibold text-neutral-800 mb-2 line-clamp-1">{note.title}</h3>
      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{note.content || "Tidak ada konten"}</p>
      <div className="flex justify-between items-center text-xs text-neutral-400">
        <span>{formatDate(note.updatedAt)}</span>
        <span className="bg-neutral-200 text-neutral-600 font-medium px-2 py-1 rounded-full">{note.category}</span>
      </div>
    </div>
  );
};

export default NoteItem;