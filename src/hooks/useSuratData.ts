import { useEffect, useState } from 'react';
import { getApiErrorMessage, quranService } from '../services/api';
import type { SuratDetail, SuratTafsir } from '../types/quran';

type UseSuratDataResult = {
  detailSurat: SuratDetail | null;
  tafsirSurat: SuratTafsir | null;
  loading: boolean;
  error: string | null;
};

export function useSuratData(nomor: string | undefined): UseSuratDataResult {
  const [detailSurat, setDetailSurat] = useState<SuratDetail | null>(null);
  const [tafsirSurat, setTafsirSurat] = useState<SuratTafsir | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchSuratData = async () => {
      const nomorSurat = Number(nomor);

      if (!nomorSurat || Number.isNaN(nomorSurat)) {
        setError('Nomor surat tidak valid.');
        setLoading(false);
        setDetailSurat(null);
        setTafsirSurat(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [detail, tafsir] = await Promise.all([
          quranService.getSuratDetail(nomorSurat),
          quranService.getTafsirSurat(nomorSurat),
        ]);

        if (isActive) {
          setDetailSurat(detail);
          setTafsirSurat(tafsir);
        }
      } catch (error) {
        if (isActive) {
          setError(getApiErrorMessage(error));
          setDetailSurat(null);
          setTafsirSurat(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchSuratData();

    return () => {
      isActive = false;
    };
  }, [nomor]);

  return { detailSurat, tafsirSurat, loading, error };
}
