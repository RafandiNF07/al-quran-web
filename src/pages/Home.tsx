import { useMemo, useState } from 'react';
import { CardSurat } from '../components/CardSurat';
import { useDaftarSurat } from '../hooks/useDaftarSurat';

function Home() {
  const { daftarSurat, loading, error } = useDaftarSurat();
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSurat = useMemo(
    () =>
      daftarSurat.filter((surat) => {
        if (!normalizedQuery) {
          return true;
        }

        return (
          surat.namaLatin.toLowerCase().includes(normalizedQuery) ||
          surat.arti.toLowerCase().includes(normalizedQuery) ||
          surat.nomor.toString().includes(normalizedQuery) ||
          surat.tempatTurun.toLowerCase().includes(normalizedQuery)
        );
      }),
    [daftarSurat, normalizedQuery]
  );

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Memuat daftar surat...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mx-auto mb-6 max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama surat, arti, tempat turun, atau nomor..."
          className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
        />
        {filteredSurat.length > 0 && normalizedQuery.length > 0 ? (
          <p className="w-full rounded-xl px-4 py-3 outline-none transition focus:border-emerald-500">
            {`hasil yang ditemukan adalah: ${filteredSurat.length}`}
          </p>
        ) : null}
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
}

export default Home;