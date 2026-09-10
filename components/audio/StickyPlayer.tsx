"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { cn } from "@/lib/utils";

export default function StickyPlayer() {
  const { currentTrack, isPlaying, toggle, pause } = usePlayerStore();
  
  // Références pour Wavesurfer
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  
  // État local pour le volume
  const [volume, setVolume] = useState(0.7);

  // 1. Initialisation de Wavesurfer quand la piste change
  useEffect(() => {
    if (!currentTrack || !containerRef.current) return;

    // Si une instance existe déjà, on la détruit pour éviter les doublons
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    // Création de la nouvelle instance
    wavesurfer.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgb(113, 113, 122)",    // Zinc-500 (Gris moyen)
      progressColor: "rgb(16, 185, 129)", // Emerald-500 (Vert Neon)
      cursorColor: "rgb(255, 255, 255)",  // Blanc
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 40,                         // Hauteur compacte pour la barre du bas
      barHeight: 0.8,                     // Hauteur relative des barres
      url: currentTrack.audioSrc,
    });

    // On attend que l'audio soit décodé et prêt avant de lancer
    wavesurfer.current.on('ready', () => {
        // On règle le volume initial une fois prêt
        if (wavesurfer.current) {
            wavesurfer.current.setVolume(volume);
            
            // Si le store dit qu'on doit jouer, on joue maintenant !
            if (isPlaying) {
                wavesurfer.current.play();
            }
        }
    });

    // Gestion des événements
    wavesurfer.current.on('finish', () => {
        pause(); // Stop quand c'est fini
    });

    // Petit bonus : Si on clique sur la waveform pour changer le temps, on s'assure que ça joue
    wavesurfer.current.on('interaction', () => {
        if (!isPlaying) {
           toggle(); // On met à jour le store pour que le bouton Play devienne Pause
           wavesurfer.current?.play();
        }
    });

    // On règle le volume initial
    wavesurfer.current.setVolume(volume);

    // Auto-play si on est censé jouer
    if (isPlaying) {
      wavesurfer.current.play();
    }

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [currentTrack]); // Se relance si on change de piste

  // 2. Synchronisation Play/Pause (Store -> Wavesurfer)
  useEffect(() => {
    if (!wavesurfer.current) return;

    if (isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [isPlaying]);

  // 3. Gestion du Volume
  const onVolumeChange = (value: number[]) => {
    const newVol = value[0];
    setVolume(newVol);
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newVol);
    }
  };

  // Si pas de piste, on cache le lecteur (ou on peut laisser une barre vide)
  if (!currentTrack) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 z-50 transition-transform duration-500 ease-in-out",
      currentTrack ? "translate-y-0" : "translate-y-full"
    )}>
      
      <div className="h-20 container mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
        
        {/* --- ZONE 1 : INFO TRACK --- */}
        <div className="flex items-center gap-4 w-1/3 md:w-1/4 min-w-0">
          <div className="relative h-12 w-12 shrink-0 bg-zinc-800 overflow-hidden hidden sm:block border border-white/10">
              <Image src={currentTrack.image} alt="cover" fill className="object-cover" />
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-white truncate text-sm">{currentTrack.title}</p>
            <p className="text-xs text-primary truncate">{currentTrack.category}</p>
          </div>
        </div>

        {/* --- ZONE 2 : CONTROLS & WAVEFORM --- */}
        <div className="flex flex-1 items-center gap-6 justify-center max-w-2xl">
           
           {/* Boutons Play/Pause */}
           <div className="flex items-center gap-4 shrink-0">
              <button className="text-zinc-400 hover:text-white transition hidden md:block">
                  <SkipBack size={20} />
              </button>
              
              <button 
                onClick={toggle}
                className="h-10 w-10 bg-white text-black flex items-center justify-center hover:scale-105 transition active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                {isPlaying ? <Pause size={20} fill="black"/> : <Play size={20} fill="black" className="ml-0.5"/>}
              </button>
              
              <button className="text-zinc-400 hover:text-white transition hidden md:block">
                  <SkipForward size={20} />
              </button>
           </div>

           {/* La Waveform (Cachée sur mobile très petit, visible dès qu'il y a de la place) */}
           <div className="flex-1 h-10 w-full min-w-25 cursor-pointer opacity-80 hover:opacity-100 transition-opacity hidden sm:block" ref={containerRef} />
        </div>

        {/* --- ZONE 3 : VOLUME & ACTIONS --- */}
        <div className="w-1/3 md:w-1/4 flex justify-end items-center gap-4">
            
            {/* Slider Volume (Desktop only) */}
            <div className="hidden md:flex items-center gap-2 w-24">
               <Volume2 size={18} className="text-zinc-400" />
               <Slider 
                  defaultValue={[0.7]} 
                  max={1} 
                  step={0.01} 
                  value={[volume]}
                  onValueChange={onVolumeChange}
                  className="w-full cursor-pointer" 
               />
            </div>

            {/* Bouton Fermer */}
            <button 
                onClick={() => pause()} // Optionnel : on pourrait vider le currentTrack pour fermer complètement
                className="text-zinc-500 hover:text-white transition"
            >
                <X size={20} />
            </button>
        </div>

      </div>
    </div>
  );
}