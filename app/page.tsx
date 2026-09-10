import Hero from "@/components/home/Hero";
import { CardImage } from "@/components/products/card2";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LiquidBackground from "@/components/ui/LiquidBackground";


export default function Home() {
  const featuredProducts = products.slice(5,8);
  const vedetteSongs = products.slice(-6,8);

  return (
    <div className="min-h-screen w-full">
      <LiquidBackground />
      <Hero />
      
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Dernières <span className="text-emerald-500">Sorties</span>
          </h2>
          <span className="text-zinc-500 text-sm">Sélection des dernières sorties</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/catalogue">
            <Button size="lg" className="group bg-linear-to-br from-emerald-500 to-slate-900 text-zinc-200 hover:text-white px-8 py-6 text-lg">
              Voir le catalogue
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white">En <span className="text-emerald-500">vedettes</span></h3>
          <span className="text-zinc-500 text-sm">Les coups de cœur</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {vedetteSongs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}