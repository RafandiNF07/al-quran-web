import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSuratData } from '../hooks/useSuratData';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { SuratHeader } from '../components/DetailSurat/SuratHeader';
import { SuratNavigation } from '../components/DetailSurat/SuratNavigation';
import { TabNavigation } from '../components/DetailSurat/TabNavigation';
import { AyatCard } from '../components/DetailSurat/AyatCard';

type ActiveTab = 'ayat' | 'tafsir';

function DetailSurat() {
  const { nomor } = useParams();
  const [activeTab, setActiveTab] = useState<ActiveTab>('ayat');
  const [selectedQori, setSelectedQori] = useState<string>('06');

  const { detailSurat, tafsirSurat, loading, loadingTafsir, error } = useSuratData(nomor, activeTab);
  const { playingId, isBuffering, handleAudio } = useAudioPlayer();

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Memuat detail surat...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  if (!detailSurat) {
    return <div className="p-10 text-center text-gray-600">Data surat tidak ditemukan.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6">
      <Link to="/" className="mb-6 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900">
        ← Kembali ke daftar surat
      </Link>

      <SuratHeader 
        detailSurat={detailSurat} 
        selectedQori={selectedQori} 
        setSelectedQori={setSelectedQori} 
        playingId={playingId} 
        isBuffering={isBuffering} 
        onPlayFull={() => handleAudio(detailSurat.audioFull[selectedQori], 0)} 
      />

      <SuratNavigation 
        suratSebelumnya={detailSurat.suratSebelumnya} 
        suratSelanjutnya={detailSurat.suratSelanjutnya} 
      />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'ayat' ? (
        <section className="mt-5 space-y-4">
          {detailSurat.ayat.map((ayat) => (
            <AyatCard 
              key={ayat.nomorAyat} 
              ayat={ayat} 
              selectedQori={selectedQori} 
              playingId={playingId} 
              isBuffering={isBuffering} 
              onPlayAyat={handleAudio} 
            />
          ))}
        </section>
      ) : (
        <section className="mt-5 space-y-4">
          {loadingTafsir ? (
            <div className="p-10 text-center text-emerald-600 animate-pulse font-medium">Memuat tafsir...</div>
          ) : tafsirSurat?.tafsir.map((item) => (
            <article key={item.ayat} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="mb-2 text-sm font-medium text-emerald-700">Ayat {item.ayat}</p>
              <p className="leading-relaxed text-gray-800">{item.teks}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default DetailSurat;