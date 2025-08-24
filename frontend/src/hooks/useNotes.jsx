import { useState } from "react";

// Data demo Anda, idealnya ini akan datang dari API
const demoNotes = [
  {
    id: 1,
    title: "Meeting Notes - Project Alpha",
    content: "Discussed project timeline, resource allocation, and deliverables. Key points:\n- Phase 1: Research & Planning (2 weeks)\n- Phase 2: Development (6 weeks)\n- Phase 3: Testing & Deployment (2 weeks)",
    createdAt: "2025-01-20T10:30:00Z",
    updatedAt: "2025-01-20T15:45:00Z",
    category: "Work",
  },
  {
    id: 2,
    title: "Shopping List",
    content: "• Milk\n• Bread\n• Eggs\n• Apples\n• Chicken breast\n• Rice\n• Vegetables for salad",
    createdAt: "2025-01-19T08:15:00Z",
    updatedAt: "2025-01-19T08:15:00Z",
    category: "Personal",
  },
  {
    id: 3,
    title: "Book Ideas",
    content: "Fiction novel concepts:\n1. Time-traveling detective in Victorian London\n2. AI consciousness in a post-apocalyptic world\n3. Magic realism in contemporary Indonesia",
    createdAt: "2025-01-18T14:20:00Z",
    updatedAt: "2025-01-20T11:30:00Z",
    category: "Creative",
  },
];

const useNotes = () => {
  const [notes, setNotes] = useState(demoNotes); // Menggunakan data demo
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Bagian ini akan diganti dengan panggilan API di masa depan
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: "Personal",
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    );
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  return {
    notes,
    filteredNotes,
    searchTerm,
    setSearchTerm,
    selectedNote,
    setSelectedNote,
    isEditing,
    setIsEditing,
    createNewNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;