import React from "react";
import { Search, Download, User, LogOut, Edit3 } from "lucide-react";

const Header = ({ user, setSearchTerm, handleLogout }) => {
  const exportNotes = (format) => {
    alert(`Exporting to ${format.toUpperCase()} format... (Not connected to API yet)`);
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <Edit3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Modern Notes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari catatan..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-neutral-100 border border-neutral-300 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none transition-all w-64 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => exportNotes("pdf")}
                className="p-2 text-neutral-600 hover:text-indigo-600 hover:bg-neutral-200 rounded-full transition-all duration-200"
                title="Export PDF"
              >
                <Download className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 px-3 py-2 bg-neutral-100 rounded-full border border-neutral-300">
                <User className="w-4 h-4 text-neutral-500" />
                <span className="text-sm font-medium text-neutral-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-neutral-600 hover:text-red-600 hover:bg-neutral-200 rounded-full transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;