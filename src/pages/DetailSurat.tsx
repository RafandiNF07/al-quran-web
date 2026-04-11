//detail surat page
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { quranService } from '../services/api';
import type { SuratDetail, SuratTafsir } from '../types/quran';


type ActiveTab = 'ayat' | 'tafsir';

function DetailSurat() {
	const { nomor } = useParams();

	const [detailSurat, setDetailSurat] = useState<SuratDetail | null>(null);
	const [tafsirSurat, setTafsirSurat] = useState<SuratTafsir | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<ActiveTab>('ayat');

	//audio player
	const [playingId, setPlayingId]=useState<number | null>(null);
	const audioRef=useRef<HTMLAudioElement | null>(null);

	//handle audio
	const handleAudio=async(audioUrl:string, nomorAyat:number)=>{
		const audio = audioRef.current;
		if(!audio) return;
		if(nomorAyat===playingId){
			audio.pause();
			setPlayingId(null);
		}else{
			try{
				audio.pause();
				audio.src=audioUrl;
				audio.load();
				await audio.play();
				setPlayingId(nomorAyat);
			} catch(e){
				console.error("Playback failed: ",e);
				setPlayingId(null);
			}
		}
	}
	useEffect(() => {
		let isActive = true;
		const audio=new Audio();
		audioRef.current=audio;
		audio.onended=()=>{
			setPlayingId(null);
		}
		
		const fetchSuratData = async () => {
			const nomorSurat = Number(nomor);

			if (!nomorSurat || Number.isNaN(nomorSurat)) {
				setError('Nomor surat tidak valid.');
				setLoading(false);
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
			} catch {
				if (isActive) {
					setError('Gagal memuat detail surat. Coba lagi beberapa saat.');
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
        audio.pause();
        audioRef.current = null;
		};
	}, [nomor]);

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

			<header className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<p className="mb-1 text-sm text-gray-500">Surat ke-{detailSurat.nomor}</p>
						<h1 className="text-2xl font-bold text-emerald-900 md:text-3xl">{detailSurat.namaLatin}</h1>
						<p className="mt-1 text-gray-600">{detailSurat.arti}</p>
						<p className="mt-3 text-sm text-gray-500">
							{detailSurat.jumlahAyat} ayat • {detailSurat.tempatTurun}
						</p>
					</div>
					<p className="text-4xl text-emerald-700" dir="rtl">
						{detailSurat.nama}
					</p>
				</div>
			</header>

			<nav className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
				{suratSebelumnya ? (
					<Link
						to={`/surat/${suratSebelumnya.nomor}`}
						className="rounded-xl border border-emerald-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
					>
						<p className="text-xs font-medium text-gray-500">Surat Sebelumnya</p>
						<p className="mt-1 text-sm font-semibold text-emerald-900">{suratSebelumnya.namaLatin}</p>
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
						<p className="mt-1 text-sm font-semibold text-emerald-900">{suratSelanjutnya.namaLatin}</p>
						<p className="text-xs text-gray-600">{suratSelanjutnya.jumlahAyat} ayat</p>
					</Link>
				) : (
					<div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
						<p className="text-xs font-medium text-gray-500">Surat Selanjutnya</p>
						<p className="mt-1 text-sm font-semibold text-gray-400">Tidak ada</p>
					</div>
				)}
			</nav>

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
				<section className="mt-5 space-y-4">
					{detailSurat.ayat.map((ayat) => (
						<article key={ayat.nomorAyat} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
							<div className="flex justify-between items-start mb-4">
								<p className="text-sm font-medium text-emerald-700">Ayat {ayat.nomorAyat}</p>
								<button 
									onClick={() => handleAudio(ayat.audio['01'], ayat.nomorAyat)}
									className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
										playingId === ayat.nomorAyat 
										? 'bg-red-100 text-red-600' 
										: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
									}`}
								>
									{playingId === ayat.nomorAyat ? (
										/* Ikon Pause (SVG atau Text) */
										<span>||</span>
									) : (
										/* Ikon Play (SVG atau Text) */
										<span className="ml-1">▶</span>
									)}
								</button>
							</div>
							<p className="text-right text-3xl leading-loose text-emerald-900" dir="rtl">
								{ayat.teksArab}
							</p>
							<p className="mt-4 text-sm italic text-gray-600">{ayat.teksLatin}</p>
							<p className="mt-3 text-base leading-relaxed text-gray-800">{ayat.teksIndonesia}</p>
						</article>
					))}
				</section>
			) : (
				<section className="mt-5 space-y-4">
					{tafsirSurat?.tafsir.map((item) => (
						<article key={item.ayat} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
							<p className="mb-2 text-sm font-medium text-emerald-700">Ayat {item.ayat}</p>
							<p className="leading-relaxed text-gray-800">{item.teks}</p>
						</article>
					))}
				</section>
			)}
		</div>
	);
};
export default DetailSurat;