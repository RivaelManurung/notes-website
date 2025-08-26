import { useState, useEffect } from "react";
import { fetchNotes, createNote, updateNote as updateNoteApi, deleteNote as deleteNoteApi } from "../services/notesApi";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetchNotes();
          setNotes(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil notes:", error);
      }
    };
    getNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNewNote = async () => {
    try {
      const newNoteData = { title: "Untitled Note", content: "" };
      const response = await createNote(newNoteData);
      setNotes([response.data, ...notes]);
      setSelectedNote(response.data);
      setIsEditing(true);
    } catch (error) {
      console.error("Gagal membuat notes:", error);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      await updateNoteApi(updatedNote.id, updatedNote);
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      setSelectedNote(updatedNote);
    } catch (error) {
      console.error("Gagal memperbarui notes:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await deleteNoteApi(noteId);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      setSelectedNote(null);
    } catch (error) {
      console.error("Gagal menghapus notes:", error);
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