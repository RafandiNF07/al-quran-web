import { useState, useEffect } from 'react';
import { quranService } from '../services/api';
import type { SuratDetail, SuratTafsir } from '../types/quran';

type ActiveTab = 'ayat' | 'tafsir';

export function useSuratData(nomor: string | undefined, activeTab: ActiveTab) {
  const [detailSurat, setDetailSurat] = useState<SuratDetail | null>(null);
  const [tafsirSurat, setTafsirSurat] = useState<SuratTafsir | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingTafsir, setLoadingTafsir] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching khusus Detail Surat
  useEffect(() => {
    let isActive = true;
    const fetchDetailSurat = async () => {
      const nomorSurat = Number(nomor);
      if (!nomorSurat || Number.isNaN(nomorSurat)) {
        setError('Nomor surat tidak valid.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const detail = await quranService.getSuratDetail(nomorSurat);
        if (isActive) {
          setDetailSurat(detail);
        }
      } catch {
        if (isActive) {
          setError('Gagal memuat detail surat. Coba lagi beberapa saat.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };
    fetchDetailSurat();
    return () => {
      isActive = false;
    };
  }, [nomor]);

  // Fetching khusus Tafsir (Lazy Fetch)
  useEffect(() => {
    let isActive = true;
    const fetchTafsir = async () => {
      const nomorSurat = Number(nomor);
      if (activeTab === 'tafsir' && !tafsirSurat) {
        try {
          setLoadingTafsir(true);
          const tafsir = await quranService.getTafsirSurat(nomorSurat);
          if (isActive) {
            setTafsirSurat(tafsir);
          }
        } catch {
          console.error("Gagal memuat tafsir");
        } finally {
          if (isActive) {
            setLoadingTafsir(false);
          }
        }
      }
    };
    fetchTafsir();
    return () => {
      isActive = false;
    };
  }, [activeTab, nomor, tafsirSurat]);

  return { detailSurat, tafsirSurat, loading, loadingTafsir, error };
}
