
import React, { useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaMusic } from 'react-icons/fa';
import { useAudio } from '../contexts/AudioContext';

// The visible UI component to place in Headers
export const AudioWidget: React.FC = () => {
  const { isPlaying, currentTrack, togglePlay, nextTrack } = useAudio();

  return (
    <div className={`flex items-center gap-2 bg-orange-100/60 backdrop-blur-md border border-bk-gold/40 rounded-full p-1 pr-3 shadow-sm transition-all duration-300 ${isPlaying ? 'ring-1 ring-bk-gold/50' : ''}`}>
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-bk-glow to-bk-accent flex items-center justify-center text-white shadow-inner border border-white/20 ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <FaMusic size={12} />
      </div>
      
      <div className="flex flex-col max-w-[80px] lg:max-w-[120px]">
           <span className="text-[9px] font-bold text-bk-text truncate leading-tight">{currentTrack.title}</span>
      </div>

      <button onClick={togglePlay} className="text-bk-text hover:text-bk-glow p-1 transition-colors">
        {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
      </button>
      <button onClick={nextTrack} className="text-bk-text hover:text-bk-glow p-1 transition-colors">
        <FaStepForward size={10} />
      </button>
    </div>
  );
};

// The headless component to handle actual audio playback globally
export const BackgroundAudio: React.FC = () => {
  const { currentTrack, audioRef, nextTrack } = useAudio();

  return (
    <audio 
      ref={audioRef} 
      src={currentTrack.url}
      onEnded={nextTrack}
      className="hidden"
    />
  );
};

export default AudioWidget;
