import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import AuthModal from "./components/AuthModal";
import useNotes from "./hooks/useNotes";

const App = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
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
    const savedUser = localStorage.getItem("notesUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowAuthModal(false);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("notesUser", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("notesUser");
    setShowAuthModal(true);
    setSelectedNote(null);
  };

  if (showAuthModal) {
    return <AuthModal handleAuth={handleAuth} />;
  }

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