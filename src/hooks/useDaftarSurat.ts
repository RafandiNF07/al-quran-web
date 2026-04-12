import { useEffect, useState } from 'react';
import { getApiErrorMessage, quranService } from '../services/api';
import type { SuratBase } from '../types/quran';

type UseDaftarSuratResult = {
  daftarSurat: SuratBase[];
  loading: boolean;
  error: string | null;
};

export function useDaftarSurat(): UseDaftarSuratResult {
  const [daftarSurat, setDaftarSurat] = useState<SuratBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        if (isActive) {
          setError(getApiErrorMessage(error));
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

  return { daftarSurat, loading, error };
}
