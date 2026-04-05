// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { quranService } from '../services/api';
import { CardSurat } from '../components/CardSurat';
import type { SuratBase } from '../types/quran';

export const Home = () => {
  const [daftarSurat, setDaftarSurat] = useState<SuratBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let isActive = true;

    const fetchDaftarSurat = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await quranService.getDaftarSurat();
        if (isActive) {
          setDaftarSurat(data);
        }
      } catch {
        if (isActive) {
          setError('Gagal memuat daftar surat. Coba lagi beberapa saat.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchDaftarSurat();
    return () => {
      isActive = false;
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSurat = daftarSurat.filter((surat) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      surat.namaLatin.toLowerCase().includes(normalizedQuery) ||
      surat.arti.toLowerCase().includes(normalizedQuery) ||
      surat.nomor.toString().includes(normalizedQuery)
    );
  });

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Memuat daftar surat...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <h1 className="mb-2 text-center text-3xl font-bold text-emerald-800">Al-Quran Digital</h1>
      <p className="mb-8 text-center text-gray-600">Jelajahi surat, ayat, dan tafsir dengan cepat.</p>

      <div className="mx-auto mb-6 max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama surat, arti, atau nomor..."
          className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
        />
      </div>

      {filteredSurat.length === 0 ? (
        <p className="py-10 text-center text-gray-600">Surat tidak ditemukan.</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurat.map((surat) => (
          <CardSurat key={surat.nomor} surat={surat} />
        ))}
      </div>
    </div>
  );
};