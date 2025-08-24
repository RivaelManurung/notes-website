// src/hooks/useNotes.js
import { useState, useEffect } from "react";
import { fetchNotes, createNote, updateNote, deleteNote as deleteNoteApi } from "../services/notesApi";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Ganti data demo dengan fetching dari API
  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetchNotes();
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    if (localStorage.getItem('token')) { // Fetch notes hanya jika pengguna login
      getNotes();
    }
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNewNote = async () => {
    try {
      const newNote = { title: "Untitled Note", content: "" };
      const response = await createNote(newNote);
      setNotes([response.data, ...notes]);
      setSelectedNote(response.data);
      setIsEditing(true);
    } catch (error) {
      console.error("Gagal membuat notes:", error);
    }
  };

  const updateNote = async (updatedNote) => {
    // ... panggil updateNote dari notesApi.js
    // ...
  };

  const deleteNote = async (noteId) => {
    // ... panggil deleteNoteApi dari notesApi.js
    // ...
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