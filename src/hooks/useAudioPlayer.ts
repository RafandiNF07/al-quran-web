import { useEffect, useRef, useState } from 'react';

type UseAudioPlayerResult = {
  playingId: number | null;
  isBuffering: boolean;
  toggleAudio: (audioUrl: string, id: number) => Promise<void>;
  stopAudio: () => void;
};

export function useAudioPlayer(): UseAudioPlayerResult {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.onended = () => {
      setPlayingId(null);
      setIsBuffering(false);
    };

    return () => {
      audio.pause();
      audioRef.current = null;
      setPlayingId(null);
      setIsBuffering(false);
    };
  }, []);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    setPlayingId(null);
    setIsBuffering(false);
  };

  const toggleAudio = async (audioUrl: string, id: number) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audioUrl) {
      alert('Audio untuk Qori ini belum tersedia. Silakan pilih Qori lain.');
      return;
    }

    if (id === playingId) {
      stopAudio();
      return;
    }

    try {
      setPlayingId(id);
      setIsBuffering(true);
      audio.pause();
      audio.src = audioUrl;
      audio.load();
      await audio.play();
      setIsBuffering(false);
    } catch (error) {
      console.error('Playback failed:', error);
      setPlayingId(null);
      setIsBuffering(false);
    }
  };

  return { playingId, isBuffering, toggleAudio, stopAudio };
}
