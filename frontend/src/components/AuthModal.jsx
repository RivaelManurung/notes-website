import React, { useState } from "react";
import { Edit3, Eye, EyeOff } from "lucide-react";
import { registerUser, loginUser } from "../services/notesApi";

const AuthModal = ({ handleAuth }) => {
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (authMode === "register") {
        // Pendaftaran
        response = await registerUser(formData);
        alert(response.data.message); // Menampilkan pesan sukses dari backend
        setAuthMode("login"); // Arahkan ke form login
      } else {
        // Login
        response = await loginUser(formData);

        // Destrukturisasi data yang diterima dari backend
        const { token, userId, name } = response.data;

        // Simpan data di localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("notesUser", JSON.stringify({ name, userId }));

        // Kirim data pengguna yang berhasil login ke App.js
        handleAuth({ name, userId });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Otentikasi gagal!");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200 p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-neutral-800 mb-2 tracking-tight">
            Selamat Datang
          </h1>
          <p className="text-neutral-500 font-light">
            Kelola catatan Anda dengan mudah, kapan saja, di mana saja.
          </p>
        </div>
        <div className="flex rounded-lg bg-neutral-100 p-1 mb-6">
          <button
            onClick={() => setAuthMode("login")}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
              authMode === "login"
                ? "bg-white text-indigo-600 shadow-md"
                : "text-neutral-600 hover:text-indigo-600"
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setAuthMode("register")}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
              authMode === "register"
                ? "bg-white text-indigo-600 shadow-md"
                : "text-neutral-600 hover:text-indigo-600"
            }`}
          >
            Daftar
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {authMode === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-5 py-3 bg-neutral-100 border-2 border-transparent rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-neutral-400 font-medium"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-5 py-3 bg-neutral-100 border-2 border-transparent rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-neutral-400 font-medium"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-5 py-3 pr-14 bg-neutral-100 border-2 border-transparent rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-neutral-400 font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.01] transition-all duration-300 font-bold tracking-wide"
          >
            {authMode === "login" ? "Masuk" : "Daftar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;