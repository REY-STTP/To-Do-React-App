# To-Do React App

Aplikasi To-Do berbasis React yang memungkinkan pengguna untuk menambahkan, mengedit, menghapus, dan melacak tugas-tugas mereka. Proyek ini menggunakan React, Context API untuk manajemen state, dan berkomunikasi dengan API backend untuk CRUD operasi tugas.

## Fitur

- Tambah tugas baru
- Edit tugas yang ada
- Hapus tugas
- Tandai tugas sebagai selesai atau belum selesai
- Melihat daftar tugas dengan status dan tanggal pembuatan

## Teknologi yang Digunakan

- **React**: Library untuk membangun antarmuka pengguna
- **Context API**: Untuk manajemen state global
- **date-fns**: Untuk format dan manipulasi tanggal
- **Fetch API**: Untuk berkomunikasi dengan backend

## Dependensi Backend

Berikut adalah penjelasan mengenai beberapa dependensi utama yang digunakan dalam backend:

- **bcrypt**: 
  - **Deskripsi**: Library untuk melakukan hashing dan verifikasi password secara aman.
  - **Fungsi**: Mengamankan password pengguna dengan hashing sebelum disimpan di database, serta memverifikasi password saat login.

- **jsonwebtoken (JWT)**:
  - **Deskripsi**: Library untuk membuat dan memverifikasi JSON Web Tokens.
  - **Fungsi**: Digunakan untuk otentikasi dan otorisasi. JWT dibuat saat pengguna login dan dikirim dalam header permintaan untuk mengidentifikasi pengguna yang melakukan permintaan ke server.

- **validator**:
  - **Deskripsi**: Library untuk validasi dan sanitasi string.
  - **Fungsi**: Memvalidasi dan membersihkan data input dari pengguna untuk memastikan data yang diterima valid dan aman. Contohnya, memeriksa format email, panjang password, dll.

- **express**:
  - **Deskripsi**: Framework web untuk Node.js.
  - **Fungsi**: Menyediakan alat untuk membangun aplikasi web dan API dengan mudah. Menangani routing, middleware, dan berbagai fungsionalitas server lainnya.

- **mongoose**:
  - **Deskripsi**: Library ODM (Object Data Modeling) untuk MongoDB.
  - **Fungsi**: Memudahkan interaksi dengan database MongoDB. Menyediakan skema untuk data, validasi, dan metode untuk melakukan operasi CRUD.

- **dotenv**:
  - **Deskripsi**: Library untuk memuat variabel lingkungan dari file `.env`.
  - **Fungsi**: Memudahkan konfigurasi aplikasi dengan menyimpan variabel lingkungan (seperti kredensial database dan port) di file `.env`, yang kemudian dimuat ke dalam proses Node.js.


## Instalasi

1. **Clone repository**:

    ```bash
    git clone https://github.com/REY-STTP/To-Do-React-App.git
    ```

2. **Masuk ke direktori proyek**:

    ```bash
    cd To-Do-React-App
    ```

3. **Instal dependensi**:

    1. Terminal 1: Buka direktori backend

        ```bash
        cd backend
        npm install
        ```

    2. Terminal 2: Buka direktori frontend

        ```bash
        cd frontend
        npm install
        ```

4. **Setup .env**:

    1. Buat file bernama `.env` di direktori backend dan isi dengan:

        ```bash
        PORT=4000
        MONGO_URI=mongodb://localhost:27017/Nama-Databasemu
        SECRET=abcdefghijklmnopqrstuvwxyz0123456789
        ```

5. **Jalankan Program**:

    1. Terminal di direktori backend:

        ```bash
        npm run dev
        ```

    2. Terminal di direktori frontend:
    
        ```bash
        npm start
        ```

## Fitur - Fitur

1. **Menambahkan Tugas**: Klik pada tombol "Tambah Tugas" untuk menambahkan tugas baru. Isi form dengan informasi tugas dan klik "Tambah Tugas" untuk menyimpan.

2. **Mengedit Tugas**: Klik pada ikon edit di samping tugas untuk mengubah informasi tugas. Simpan perubahan dengan klik "Simpan".

3. **Menghapus Tugas**: Klik pada ikon hapus di samping tugas untuk menghapus tugas dari daftar.

4. **Menandai Tugas**: Tandai tugas sebagai selesai dengan klik checkbox di sebelah tugas.

## Penutup

**Terima Kasih Telah Menggunakan To-Do React App**

Kami berharap aplikasi ini dapat membantu Anda dalam mengelola tugas-tugas sehari-hari. Jika Anda memiliki pertanyaan, umpan balik, atau ingin berkontribusi pada proyek ini, jangan ragu untuk membuka *issue* atau *pull request* di repository GitHub kami.

- **Repository GitHub**: [To-Do React App](https://github.com/REY-STTP/To-Do-React-App.git)
- **Kontak**: rey.zakaria123@gmail.com

Terima kasih atas dukungan dan kontribusi Anda!