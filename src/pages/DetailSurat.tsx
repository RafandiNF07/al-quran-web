import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AyatList } from '../components/detail/AyatList';
import { SuratHeader } from '../components/detail/SuratHeader';
import { SuratNavigation } from '../components/detail/SuratNavigation';
import { TafsirList } from '../components/detail/TafsirList';
import type { QoriId } from '../constants/qori';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useSuratData } from '../hooks/useSuratData';

type ActiveTab = 'ayat' | 'tafsir';

function DetailSurat() {
	const { nomor } = useParams();
	const { detailSurat, tafsirSurat, loading, error } = useSuratData(nomor);
	const { playingId, isBuffering, toggleAudio } = useAudioPlayer();
	const [activeTab, setActiveTab] = useState<ActiveTab>('ayat');
	const [selectedQori, setSelectedQori] = useState<QoriId>('06');

	if (loading) {
		return <div className="p-10 text-center text-gray-600">Memuat detail surat...</div>;
	}

	if (error) {
		return <div className="p-10 text-center text-red-600">{error}</div>;
	}

	if (!detailSurat) {
		return <div className="p-10 text-center text-gray-600">Data surat tidak ditemukan.</div>;
	}

	const suratSebelumnya = detailSurat.suratSebelumnya || null;
	const suratSelanjutnya = detailSurat.suratSelanjutnya || null;

	return (
		<div className="mx-auto max-w-4xl p-4 md:p-6">
			<Link to="/" className="mb-6 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900">
				← Kembali ke daftar surat
			</Link>

			<SuratHeader
				detailSurat={detailSurat}
				selectedQori={selectedQori}
				onSelectQori={setSelectedQori}
				onToggleAudio={(audioUrl, id) => {
					void toggleAudio(audioUrl, id);
				}}
				playingId={playingId}
				isBuffering={isBuffering}
			/>

			<SuratNavigation suratSebelumnya={suratSebelumnya} suratSelanjutnya={suratSelanjutnya} />

			<div className="mt-6 flex gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-1">
				<button
					type="button"
					onClick={() => setActiveTab('ayat')}
					className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
						activeTab === 'ayat' ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-700 hover:bg-white/60'
					}`}
				>
					Ayat
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('tafsir')}
					className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
						activeTab === 'tafsir' ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-700 hover:bg-white/60'
					}`}
				>
					Tafsir
				</button>
			</div>

			{activeTab === 'ayat' ? (
				<AyatList
					ayatList={detailSurat.ayat}
					selectedQori={selectedQori}
					playingId={playingId}
					isBuffering={isBuffering}
					onToggleAudio={(audioUrl, id) => {
						void toggleAudio(audioUrl, id);
					}}
				/>
			) : (
				<TafsirList tafsirList={tafsirSurat?.tafsir ?? []} />
			)}
		</div>
	);
}
export default DetailSurat;