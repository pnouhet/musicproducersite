"use client";

import { Product } from "@/lib/data";
import { Play, Pause, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { currentTrack, isPlaying, play } = usePlayerStore();
  
  // Est-ce que ce produit est celui qui joue actuellement ?
  const isCurrent = currentTrack?.id === product.id;
  const isActive = isCurrent && isPlaying;

  return (
    <div className="group relative bg-card border border-white/5 overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
      
      {/* Image Container */}
      <div className="relative aspect-[3/2] overflow-hidden bg-zinc-900">
        <Link href={`/products/${product.id}`} className="block w-full h-full cursor-pointer">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
        </Link>
        
        {/* Overlay Play Button (Apparaît au hover ou si actif) */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <button 
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                play(product);
            }}
            className={cn("bg-primary text-black p-4 transform transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-primary/20")}
          >
            {isActive ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-0.5"/>}
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 space-y-2">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            <div className="flex justify-between items-start">
                <div className="pb-4">
                    <h3 className={cn("font-bold tracking-tight text-lg truncate", isCurrent ? "text-primary" : "text-white")}>
                    {product.title}
                    </h3>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">{product.category}</p>
                </div>
                    <span className="font-mono text-primary font-bold text-lg">{product.price}€</span>
            </div>
          </Link>
        
        <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 mt-2 hover:bg-gradient-to-br from-emerald-500 to-slate-900 hover:border-none" variant="outline">
          <ShoppingCart className="w-4 h-4" />
            Ajouter au panier
        </Button>
      </div>
    </div>
  );
}