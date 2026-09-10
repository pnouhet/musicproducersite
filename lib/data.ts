export interface SamplePreview {
  name: string;
  src: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  audioSrc: string;
  tags: string[];
  contents: string[];
  samples: SamplePreview[];
}

// Pool d'URLs audio réutilisables (déjà utilisées ailleurs = lecture garantie)
const AUDIO_POOL = [
  "https://cdn.pixabay.com/audio/2024/07/30/audio_2944d6d258.mp3",
  "https://cdn.pixabay.com/audio/2024/07/05/audio_923e4d8360.mp3",
  "https://cdn.pixabay.com/audio/2024/03/21/audio_b20bc53f05.mp3",
  "https://cdn.pixabay.com/audio/2024/02/27/audio_b0df7463a4.mp3",
];

// Génère 4 aperçus de samples nommés à partir du pool audio
const makeSamples = (label: string): SamplePreview[] =>
  AUDIO_POOL.map((src, i) => ({ name: `${label} ${i + 1}`, src }));

export const products: Product[] = [
  {
    id: "1",
    title: "FOREST ECHOES",
    category: "Ambient / Drone",
    price: 29.00,
    description: "Un pack de samples atmosphérique, conçu pour créer des ambiances complexes et des textures modernes. Inclut des pads aériens, des synthétiseurs aux sonorités spacieuses, des loops de mélodies préfaites et des textures organiques.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
    audioSrc: "https://cdn.pixabay.com/audio/2022/01/30/audio_874db07cfd.mp3",
    tags: ["One-Shots", "Loops", "Synth", "FX", "MIDI"],
    contents: [
      "60+ Atmospheric One-Shots",
      "30 Pads & Drone Loops",
      "20 FX & Risers",
      "15 MIDI Files",
    ],
    samples: makeSamples("Sample"),
  },
  {
    id: "2",
    title: "ACID RAIN",
    category: "Dubstep",
    price: 40.00,
    description: "",
    image: "https://plus.unsplash.com/premium_photo-1669844485001-a47ffd5c9aed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc: "https://cdn.pixabay.com/audio/2024/05/04/audio_ed692ea9f8.mp3",
    tags: ["Drumloops", "Bass", "One-Shots", "FX", "Project Files"],
    contents: [
      "80+ Dubstep One-Shots",
      "40 Drumloops & Fills",
      "25 Bass / Growl Shots",
      "30 FX & Transitions",
      "3 Project Files (Ableton)",
    ],
    samples: makeSamples("Sample"),
  },
  {
    id: "3",
    title: "ICE MOUNTAIN",
    category: "Drum & Bass",
    price: 60.00,
    description: "",
    image: "https://plus.unsplash.com/premium_photo-1669868118193-1d39f8baf75a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aWNlJTIwbW91bnRhaW58ZW58MHx8MHx8fDA%3D",
    audioSrc: "https://cdn.pixabay.com/audio/2025/07/03/audio_808dbd30b1.mp3",
    tags: ["Drumloops", "Bass", "Loops", "One-Shots", "MIDI"],
    contents: [
      "100+ Drum One-Shots",
      "50 Drum & Bass Loops",
      "30 Reese / Bass Loops",
      "20 MIDI Files",
    ],
    samples: makeSamples("Sample"),
  },
  {
    id: "4",
    title: "CYBER JUNGLE",
    category: "Drum & Bass",
    price: 35.00,
    description: "",
    image: "https://plus.unsplash.com/premium_photo-1687428554393-abae29906c75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc: "https://cdn.pixabay.com/audio/2025/12/05/audio_6ee4e0339d.mp3",
    tags: ["Drumloops", "Bass", "Synth", "FX", "One-Shots"],
    contents: [
      "90+ Jungle One-Shots",
      "45 Breakbeat Loops",
      "30 Synth / Bass Loops",
      "25 FX & Atmospheres",
    ],
    samples: makeSamples("Sample"),
  },
  {
    id: "5",
    title: "DEEP MOSS",
    category: "Techno",
    price: 25.00,
    description: "",
    image: "https://images.unsplash.com/photo-1464809142576-df63ca4ed7f0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc: "https://cdn.pixabay.com/audio/2026/01/18/audio_1c204bf41a.mp3",
    tags: ["Loops", "Drumloops", "Synth", "One-Shots", "Presets"],
    contents: [
      "70+ Techno One-Shots",
      "40 Drumloops & Percs",
      "25 Synth / Lead Loops",
      "20 Serum Presets",
    ],
    samples: makeSamples("Sample"),
  },
  {
    id: "6",
    title: "ARGILE CAVE",
    category: "Atmosphere",
    price: 20.00,
    description: "",
    image: "https://images.unsplash.com/photo-1613410881978-0ddd6ecbd6f0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc: "https://cdn.pixabay.com/audio/2025/03/31/audio_694aae46ba.mp3",
    tags: ["One-Shots", "FX", "Synth", "Loops"],
    contents: [
      "50+ Organic One-Shots",
      "30 Cave / Drone Textures",
      "20 Synth Loops",
      "15 FX & Impacts",
    ],
    samples: makeSamples("Sample"),
  },
  {
    id: "7",
    title: "GLOWING STREAM",
    category: "Pop / Dance",
    price: 50.00,
    description: "",
    image: "https://images.unsplash.com/photo-1769364323382-e2de114ab151?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc: "https://cdn.pixabay.com/audio/2024/12/13/audio_5b66d3a5e8.mp3",
    tags: ["Vocals", "MIDI", "Synth", "Loops", "Project Files"],
    contents: [
      "60+ Pop / Dance One-Shots",
      "35 Synth & Pluck Loops",
      "20 Vocal Chops",
      "25 MIDI Files",
      "2 Project Files (FL Studio)",
    ],
    samples: makeSamples("Sample"),
  },
  {
    id: "8",
    title: "HOLD ME CLOSE",
    category: "Deep House",
    price: 60.00,
    description: "Un pack de sample Deep House aux allures professionnels, inclus des boucles de mélodies de synthétiseurs, des pads envoûtants, des leads typiques de la Deep House, des presets de pianos type rhodes, des drums modernes déjà mixés prêtes à l'emploi. Ainsi que 3 samples de vocals originaux.",
    image: "https://plus.unsplash.com/premium_photo-1749812612139-550efefc2ba3?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioSrc: "https://cdn.pixabay.com/audio/2025/12/07/audio_a7a98c0845.mp3",
    tags: ["Vocals", "Synth", "Loops", "Presets", "Project Files", "Bass"],
    contents: [
      "40 Melody & Synth Loops",
      "20 Rhodes / Piano Presets",
      "15 Deep House Drum Loops",
      "3 Original Vocal Samples",
      "2 Project Files (Ableton)",
    ],
    samples: makeSamples("Sample"),
  },
];