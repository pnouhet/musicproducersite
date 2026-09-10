"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "@/store/usePlayerStore";

interface SamplePreviewProps {
  name: string;
  subtitle: string;
  src: string;
}

export default function SamplePreview({ name, subtitle, src }: SamplePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pour couper le lecteur global du bas quand on lance un aperçu
  const { pause: pauseGlobal } = usePlayerStore();

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgb(63, 63, 70)",
      progressColor: "rgb(16, 185, 129)",
      cursorColor: "rgb(52, 211, 153)",
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 36,
      normalize: true,
      url: src,
    });

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    wavesurfer.current.on("finish", () => setIsPlaying(false));

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [src]);

  const handlePlayPause = () => {
    if (!wavesurfer.current) return;
    if (wavesurfer.current.isPlaying()) {
      wavesurfer.current.pause();
    } else {
      pauseGlobal();
      wavesurfer.current.play();
    }
  };

  return (
    <div className="flex items-center gap-4 bg-black/40 border border-white/10 p-4 hover:border-white/20 transition-colors">
      {/* Bouton play / pause */}
      <button
        onClick={handlePlayPause}
        className="shrink-0 w-10 h-10 bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label={isPlaying ? "Pause" : "Lecture"}
      >
        {isPlaying ? (
          <Pause fill="currentColor" size={16} />
        ) : (
          <Play fill="currentColor" size={16} />
        )}
      </button>

      {/* Waveform */}
      <div className="flex-1 min-w-0" ref={containerRef} />

      {/* Infos */}
      <div className="shrink-0 text-right max-w-[40%]">
        <p className="text-sm font-bold text-white truncate">{name}</p>
        <p className="text-xs text-primary truncate">{subtitle}</p>
      </div>
    </div>
  );
}
