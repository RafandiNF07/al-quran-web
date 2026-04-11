# Al-Quran Web

Aplikasi web Al-Quran berbasis React + TypeScript untuk menampilkan daftar surat, detail ayat, tafsir, dan audio murattal dari API publik equran.id.

## Fitur Utama

- Menampilkan daftar 114 surat Al-Quran.
- Pencarian surat berdasarkan nama latin, arti, tempat turun, atau nomor surat.
- Halaman detail surat dengan:
  - Metadata surat (nama, arti, jumlah ayat, tempat turun).
  - Daftar ayat lengkap (arab, latin, terjemahan Indonesia).
  - Tafsir per ayat.
  - Pemutar audio satu surat penuh atau per ayat.
  - Pilihan qori.
- Navigasi ke surat sebelumnya dan surat selanjutnya.
- Penanganan state loading dan error pada proses fetch data.

## Tech Stack

- React 19
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Sumber Data API

Project ini menggunakan API publik dari equran.id:

- Base URL: https://equran.id/api/v2
- Endpoint yang dipakai:
  - GET /surat
  - GET /surat/:nomor
  - GET /tafsir/:nomor

## Menjalankan Project Secara Lokal

### 1) Clone repository

```bash
git clone https://github.com/username/al-quran-web.git
cd al-quran-web
```

### 2) Install dependencies

```bash
npm install
```

### 3) Setup environment variable

Buat file .env di root project:

```env
VITE_API_KEY=https://equran.id/api/v2
```

Catatan: walaupun namanya VITE_API_KEY, variabel ini digunakan sebagai base URL API.

### 4) Jalankan development server

```bash
npm run dev
```

Buka browser ke alamat yang tampil di terminal (biasanya http://localhost:5173).

## Scripts

- npm run dev: Menjalankan aplikasi mode development.
- npm run build: Build produksi (TypeScript + Vite build).
- npm run preview: Menjalankan preview hasil build.
- npm run lint: Menjalankan ESLint.

## Struktur Folder

```text
src/
  components/     # Komponen UI reusable (Navbar, Footer, CardSurat)
  pages/          # Halaman utama dan detail surat
  routes/         # Konfigurasi routing aplikasi
  services/       # Layer pemanggilan API (axios)
  types/          # TypeScript interfaces untuk contract data API
```

## Catatan Pengembangan

- Routing utama:
  - / untuk daftar surat.
  - /surat/:nomor untuk detail surat.
- Request API dipusatkan di service layer agar komponen tetap fokus ke UI dan state.

## Kontribusi

Issue, saran, dan pull request sangat terbuka.

## Lisensi

Project ini dibuat untuk pembelajaran. Silakan sesuaikan lisensi sesuai kebutuhan sebelum dipublikasikan.
