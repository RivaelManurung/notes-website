# Gunakan base image Node.js versi LTS
FROM node:18-alpine

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin semua file dari folder 'backend' ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 5000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]