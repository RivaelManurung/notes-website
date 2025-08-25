import { useState, useEffect } from "react";
import { fetchNotes, createNote, updateNote as updateNoteApi, deleteNote as deleteNoteApi } from "../services/notesApi";

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

  // Fungsi untuk memperbarui catatan
  const updateNote = async (updatedNote) => {
    try {
      // Segera perbarui state lokal untuk respons real-time
      setSelectedNote(updatedNote);
      // Update state notes global
      setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));

      // Panggil API untuk menyimpan perubahan ke backend
      await updateNoteApi(updatedNote.id, updatedNote);
    } catch (error) {
      console.error("Gagal memperbarui catatan:", error);
    }
  };

  // Fungsi untuk menghapus catatan
  const deleteNote = async (noteId) => {
    try {
      // Panggil API untuk menghapus dari backend
      await deleteNoteApi(noteId);
      
      // Perbarui state notes lokal dengan menghapus catatan
      setNotes(notes.filter((note) => note.id !== noteId));

      // Reset state yang dipilih setelah penghapusan
      setSelectedNote(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
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