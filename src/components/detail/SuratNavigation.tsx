import { Link } from 'react-router-dom';
import type { SuratNavigasi } from '../../types/quran';

type SuratNavigationProps = {
  suratSebelumnya: SuratNavigasi | null;
  suratSelanjutnya: SuratNavigasi | null;
};

export function SuratNavigation({ suratSebelumnya, suratSelanjutnya }: SuratNavigationProps) {
  return (
    <nav className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {suratSebelumnya ? (
        <Link
          to={`/surat/${suratSebelumnya.nomor}`}
          className="rounded-xl border border-emerald-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-xs font-medium text-gray-500">Surat Sebelumnya</p>
          <p className="mt-1 text-sm font-semibold text-emerald-900">
            {suratSebelumnya.nomor}. {suratSebelumnya.namaLatin}
          </p>
          <p className="text-xs text-gray-600">{suratSebelumnya.jumlahAyat} ayat</p>
        </Link>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
          <p className="text-xs font-medium text-gray-500">Surat Sebelumnya</p>
          <p className="mt-1 text-sm font-semibold text-gray-400">Tidak ada</p>
        </div>
      )}

      {suratSelanjutnya ? (
        <Link
          to={`/surat/${suratSelanjutnya.nomor}`}
          className="rounded-xl border border-emerald-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-xs font-medium text-gray-500">Surat Selanjutnya</p>
          <p className="mt-1 text-sm font-semibold text-emerald-900">
            {suratSelanjutnya.nomor}. {suratSelanjutnya.namaLatin}
          </p>
          <p className="text-xs text-gray-600">{suratSelanjutnya.jumlahAyat} ayat</p>
        </Link>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
          <p className="text-xs font-medium text-gray-500">Surat Selanjutnya</p>
          <p className="mt-1 text-sm font-semibold text-gray-400">Tidak ada</p>
        </div>
      )}
    </nav>
  );
}
