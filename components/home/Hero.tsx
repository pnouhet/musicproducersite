import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden">
      
      <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">
          Meilleur Samples 2026
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white glow-text uppercase">
          Découvre les sons du <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-zinc-200">futur !</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
          Une collection exclusive de samples et de sons organiques, modernes et audacieux.
          <br />
          Conçu pour les producteurs exigeants.
        </p>
        
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/catalogue">
              <Button size="lg" className="bg-primary text-black hover:text-white hover:bg-linear-to-br from-emerald-500 to-slate-900 font-bold px-8">
                Explorer le Catalogue
              </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
            Démos Gratuites
          </Button>
        </div>
      </div>
    </section>
  );
}