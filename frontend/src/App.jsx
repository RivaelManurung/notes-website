import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import AuthModal from "./components/AuthModal";
import useNotes from "./hooks/useNotes";
import { User, LogOut } from "lucide-react";

const App = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Menggunakan hooks kustom untuk logika notes
  const { 
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
    deleteNote 
  } = useNotes();

  useEffect(() => {
    // Memeriksa token dan data pengguna dari localStorage saat aplikasi dimuat
    const savedUser = localStorage.getItem("notesUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowAuthModal(false);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  // Fungsi yang dipanggil dari AuthModal setelah login/register berhasil
  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("notesUser", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  // Fungsi untuk logout pengguna
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("notesUser");
    setShowAuthModal(true);
    setSelectedNote(null);
  };

  // Jika belum login, tampilkan AuthModal
  if (showAuthModal) {
    return <AuthModal handleAuth={handleAuth} />;
  }

  // Jika sudah login, tampilkan antarmuka utama aplikasi
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-800">
      <Header 
        user={user} 
        setSearchTerm={setSearchTerm} 
        handleLogout={handleLogout} 
      />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8 h-[calc(100vh-120px)]">
          <Sidebar
            notes={filteredNotes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            createNewNote={createNewNote}
          />
          <MainContent
            selectedNote={selectedNote}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default App;