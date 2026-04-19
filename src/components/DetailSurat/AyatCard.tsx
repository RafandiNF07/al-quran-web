import type { Ayat } from '../../types/quran';

type AyatCardProps = {
  ayat: Ayat;
  selectedQori: string;
  playingId: number | null;
  isBuffering: boolean;
  onPlayAyat: (audioUrl: string, nomorAyat: number) => void;
};

export function AyatCard({ ayat, selectedQori, playingId, isBuffering, onPlayAyat }: AyatCardProps) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-emerald-700">Ayat {ayat.nomorAyat}</p>
        <button
          onClick={() => onPlayAyat(ayat.audio[selectedQori], ayat.nomorAyat)}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
            playingId === ayat.nomorAyat
              ? 'bg-red-100 text-red-600'
              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
          }`}
        >
          {playingId === ayat.nomorAyat ? (
            isBuffering ? (
              <span className="text-[10px] animate-pulse">Wait</span>
            ) : '||'
          ) : '▶'}
        </button>
      </div>
      <p className="text-right text-3xl leading-loose text-emerald-900" dir="rtl">
        {ayat.teksArab}
      </p>
      <p className="mt-4 text-sm italic text-gray-600">{ayat.teksLatin}</p>
      <p className="mt-3 text-base leading-relaxed text-gray-800">{ayat.teksIndonesia}</p>
    </article>
  );
}
