// src/components/CardSurat.tsx
import { Link } from 'react-router-dom';
import type { SuratBase } from '../types/quran';

type CardSuratProps = {
  surat: SuratBase;
};

export const CardSurat = ({ surat }: CardSuratProps) => {
  const { nomor, nama, namaLatin, arti, jumlahAyat, tempatTurun } = surat;

  return (
    <Link
      to={`/surat/${nomor}`}
      className="block rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full font-bold">
            {nomor}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{namaLatin}</h3>
            <p className="text-sm text-gray-600">{arti}</p>
            <p className="text-xs text-gray-500 mt-1">{jumlahAyat} ayat • {tempatTurun}</p>
          </div>
        </div>
        <div className="text-2xl text-emerald-700" dir="rtl">
          {nama}
        </div>
      </div>
    </Link>
  );
};