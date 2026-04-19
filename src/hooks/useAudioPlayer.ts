import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudioPlayer() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.onended = () => {
      setPlayingId(null);
    };

    return () => {
      audio.pause();
      audioRef.current = null;
      setPlayingId(null);
    };
  }, []);

  const handleAudio = useCallback(async (audioUrl: string, nomorAyat: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioUrl) {
      alert("Audio untuk Qori ini belum tersedia. Silakan pilih Qori lain.");
      return;
    }
    
    if (nomorAyat === playingId) {
      audio.pause();
      setPlayingId(null);
    } else {
      try {
        setPlayingId(nomorAyat);
        setIsBuffering(true);
        audio.pause();
        audio.src = audioUrl;
        audio.load();
        await audio.play();
        setIsBuffering(false);
      } catch (e) {
        console.error("Playback failed: ", e);
        setPlayingId((prevId) => (prevId === nomorAyat ? null : prevId));
        setIsBuffering(false);
      }
    }
  }, [playingId]);

  return { playingId, isBuffering, handleAudio };
}
