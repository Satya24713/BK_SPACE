
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

const TRACKS = [
  { title: 'Meditation - Deep Silence', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-impromptu-01-115324.mp3' },
  { title: 'Om Shanti - Instrumental', url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_106368d374.mp3?filename=relax-meditation-123497.mp3' },
];

interface AudioContextType {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: typeof TRACKS[0];
  togglePlay: () => void;
  nextTrack: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Playback error', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    // Auto-play next track
    setTimeout(() => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, 100);
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      currentTrackIndex,
      currentTrack: TRACKS[currentTrackIndex],
      togglePlay,
      nextTrack,
      audioRef
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
