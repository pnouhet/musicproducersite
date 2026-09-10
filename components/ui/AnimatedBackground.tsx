"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialisation du bruit (3D pour avoir x, y et le temps)
    const noise3D = createNoise3D();

    let animationId: number;
    let particles: Particle[] = [];
    let w: number, h: number;
    let time = 0;

    // Configuration des particules
    const particleCount = 70; // Nombre de lignes (réduire si ça lag)
    const zoom = 0.003; // Zoom du bruit (plus petit = vagues plus larges)
    const speed = 0.001; // Vitesse de l'animation

    class Particle {
      x: number;
      y: number;
      color: string;
      size: number;
      angle: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Couleurs basées sur ta charte (Emerald / Zinc)
        // On varie l'opacité pour la profondeur
        const isEmerald = Math.random() > 0.6;
        this.color = isEmerald 
          ? `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.1})` // Emerald
          : `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`; // Blanc très transparent
        
        this.size = Math.random() * 2 + 0.5;
        this.angle = 0;
      }

      update() {
        // Le "Flow Field" : l'angle dépend de la position et du bruit
        // On utilise time pour faire bouger le champ de vecteurs doucement
        const n = noise3D(this.x * zoom, this.y * zoom, time * speed);
        this.angle = n * Math.PI * 2; // Angle en radians

        this.x += Math.cos(this.angle) * 1; // Vitesse de déplacement X
        this.y += Math.sin(this.angle) * 1; // Vitesse de déplacement Y

        // Si la particule sort de l'écran, on la remet de l'autre côté
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Astuce pour créer des trainées : on ne nettoie pas complètement l'écran
      // On dessine un rectangle noir semi-transparent par dessus
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; 
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      time++;
      animationId = requestAnimationFrame(animate);
    };

    // Lancer
    init();
    animate();

    // Gérer le redimensionnement
    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    // Nettoyage quand le composant est démonté
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}