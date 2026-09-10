"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Product } from "@/lib/data";

interface WaveformProps {
  product: Product;
}

export default function Waveform({ product }: WaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);
  
  // On récupère les actions du store global pour couper le StickyPlayer si besoin
  const { pause: pauseGlobal } = usePlayerStore();

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Configuration de l'apparence
    wavesurfer.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgb(63, 63, 70)",      // Gris foncé (Zinc-700) pour la partie non lue
      progressColor: "rgb(16, 185, 129)", // Vert Neon (Emerald-500) pour la progression
      cursorColor: "rgb(52, 211, 153)",   // Curseur encore plus clair
      barWidth: 3,                        // Largeur des barres (style histogramme)
      barGap: 2,                          // Espace entre les barres
      barRadius: 3,                       // Arrondi des barres
      height: 120,                        // Hauteur du visuel
      normalize: true,                    // Maximise la hauteur des pics
      url: product.audioSrc,              // L'audio à charger
    });

    // 2. Gestion des événements
    wavesurfer.current.on("play", () => setIsPlayingLocal(true));
    wavesurfer.current.on("pause", () => setIsPlayingLocal(false));

    // Cleanup quand on quitte la page
    return () => {
      wavesurfer.current?.destroy();
    };
  }, [product.audioSrc]);

  // Fonction pour gérer le Play/Pause
  const handlePlayPause = () => {
    if (wavesurfer.current) {
      if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.pause();
      } else {
        // IMPORTANT : Si on lance la waveform, on coupe le lecteur global du bas
        pauseGlobal(); 
        wavesurfer.current.play();
      }
    }
  };

  return (
    <div className="w-full bg-black/40 border border-white/9 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        
        {/* Bouton de contrôle */}
        <button
          onClick={handlePlayPause}
          className="shrink-0 w-16 h-16 bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          {isPlayingLocal ? (
            <Pause fill="currentColor" size={24} />
          ) : (
            <Play fill="currentColor" size={24} />
          )}
        </button>

        {/* Le conteneur où la waveform va se dessiner */}
        <div className="flex-1" ref={containerRef} />
      </div>
    </div>
  );
}