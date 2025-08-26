// src/services/notesApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

// Fungsi untuk pendaftaran (Register)
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

// Fungsi untuk login
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

// Fungsi untuk mendapatkan semua notes milik pengguna yang login
export const fetchNotes = async () => {
  return await axios.get(`${API_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Fungsi untuk membuat notes baru
export const createNote = async (noteData) => {
  return await axios.post(`${API_URL}/notes`, noteData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Fungsi untuk memperbarui notes
export const updateNote = async (id, noteData) => {
  return await axios.put(`${API_URL}/notes/${id}`, noteData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Fungsi untuk menghapus notes
export const deleteNote = async (id) => {
  return await axios.delete(`${API_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};