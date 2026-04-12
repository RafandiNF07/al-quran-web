import type { Tafsir } from '../../types/quran';

type TafsirListProps = {
  tafsirList: Tafsir[];
};

export function TafsirList({ tafsirList }: TafsirListProps) {
  return (
    <section className="mt-5 space-y-4">
      {tafsirList.map((item) => (
        <article key={item.ayat} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm font-medium text-emerald-700">Ayat {item.ayat}</p>
          <p className="leading-relaxed text-gray-800">{item.teks}</p>
        </article>
      ))}
    </section>
  );
}
