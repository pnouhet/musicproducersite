import { create } from 'zustand';
import { Product } from '@/lib/data';

interface PlayerState {
  currentTrack: Product | null;
  isPlaying: boolean;
  play: (track: Product) => void;
  pause: () => void;
  toggle: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,

  play: (track) => {
    const { currentTrack, isPlaying } = get();
    // Si on clique sur la même piste, on toggle pause/play
    if (currentTrack?.id === track.id) {
      set({ isPlaying: !isPlaying });
    } else {
      // Sinon on change de piste et on lance
      set({ currentTrack: track, isPlaying: true });
    }
  },

  pause: () => set({ isPlaying: false }),
  
  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));