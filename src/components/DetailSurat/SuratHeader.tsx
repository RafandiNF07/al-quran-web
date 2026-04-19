import type { SuratDetail } from '../../types/quran';

const QORI_LIST = [
	{ id: '01', name: 'Abdullah Al-Juhany' },
	{ id: '02', name: 'Abdul-Muhsin Al-Qasim' },
	{ id: '03', name: 'Abdurrahman as-Sudais' },
	{ id: '04', name: 'Ibrahim Al-Dossari' },
	{ id: '05', name: 'Mishary Rashid Al-Afasy' },
	{ id: '06', name: 'Yasser-Al-Dosari' },
];

type SuratHeaderProps = {
  detailSurat: SuratDetail;
  selectedQori: string;
  setSelectedQori: (val: string) => void;
  playingId: number | null;
  isBuffering: boolean;
  onPlayFull: () => void;
};

export function SuratHeader({
  detailSurat,
  selectedQori,
  setSelectedQori,
  playingId,
  isBuffering,
  onPlayFull,
}: SuratHeaderProps) {
  return (
    <header className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-sm text-gray-500">Surat ke-{detailSurat.nomor}</p>
          <h1 className="text-2xl font-bold text-emerald-900 md:text-3xl">{detailSurat.namaLatin}</h1>
          <p className="mt-1 text-gray-600">{detailSurat.arti}</p>
          <p className="mt-3 text-sm text-gray-500">
            {detailSurat.jumlahAyat} ayat • {detailSurat.tempatTurun}
          </p>
          <button
            onClick={onPlayFull}
            className={`mt-4 flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition ${
              playingId === 0 ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {playingId === 0 ? (isBuffering ? '⏳ Memuat...' : '⏹ Berhenti') : '▶ Putar Satu Surat'}
          </button>
          <div className="mt-4">
            <label className="text-xs font-medium text-gray-500 block mb-1">Pilih Qori:</label>
            <select
              value={selectedQori}
              onChange={(e) => setSelectedQori(e.target.value)}
              className="rounded-lg border border-emerald-100 bg-white p-2 text-sm text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {QORI_LIST.map((qori) => (
                <option key={qori.id} value={qori.id}>{qori.name}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-4xl text-emerald-700" dir="rtl">
          {detailSurat.nama}
        </p>
      </div>
    </header>
  );
}
