"use client";

import { useParams } from "next/navigation";
import { products } from "@/lib/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, ShieldCheck, Zap } from "lucide-react";
import Waveform from "@/components/audio/Waveform";
import SamplePreview from "@/components/audio/SamplePreview";
import Link from "next/link";
import { ArrowLeft, Package, PackageOpen, AudioLines } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  
  // On cherche le produit qui correspond à l'ID de l'URL
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div className="text-center py-20 text-white">Produit introuvable.</div>;
  }


  return (
    <div className="container mx-auto px-4 py-12 pb-40">
        <Link href="/catalogue" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au catalogue
        </Link>

        <div className="grid gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
                {/* COLONNE GAUCHE (Image + Player) - Prend 7 colonnes sur 12 */}
                <div className="lg:col-span-6 space-y-8">
                    {/* Image Principale */}
                    <div className="relative aspect-video w-full overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority // Charge l'image en priorité
                        />
                    </div>
                    {/* WAVEFORM*/}
                    <div className="animate-in slide-in-from-bottom-4 duration-700 delay-300">
                        <h3 className="text-sm font-mono text-zinc-500 mb-3 uppercase tracking-widest">Aperçu Audio</h3>
                        <Waveform product={product} />
                    </div>
                </div>
                {/* Colonne Droite : Infos */}
                <div className="lg:col-span-6 grid gap-8">
                    <div className="grid gap-4">
                        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">
                        {product.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        {product.title}
                        </h1>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            {product.description
                                ? product.description
                                : "Pas encore de description pour ce pack de samples."}
                        </p>
                    </div>
                    <span className="text-4xl font-bold text-white">{product.price.toPrecision(4)}€</span>
                    <div className="grid items-center gap-6 p-6 bg-white/5 border border-white/5">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <Check className="text-emerald-500" size={20} /> <span>100% Royalty Free</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <Zap className="text-emerald-500" size={20} /> <span>Téléchargement Instantané</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <ShieldCheck className="text-emerald-500" size={20} /> <span>Fichiers WAV 24-bit HQ</span>
                            </div>
                        </div>
                        <Button size="lg" className="flex-1 bg-primary text-black hover:text-white hover:bg-linear-to-br from-emerald-500 to-slate-900 font-bold h-14 text-lg">
                            <ShoppingCart className="mr-2 size-4" />
                            Ajouter au panier
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inclus dans le pack (tags) */}
                <div className="lg:col-span-3 space-y-4">
                    <h2 className="flex gap-2 items-center text-xl font-bold text-white"><Package size={24} className="text-white/70"/>Inclus dans le pack</h2>
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 text-sm text-zinc-200 bg-white/5 border border-white/10 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contenu du pack (détail) */}
                <div className="lg:col-span-3 space-y-4">
                    <h2 className="flex gap-2 items-center text-xl font-bold text-white"><PackageOpen size={24} className="text-white/70"/>Contenu du pack</h2>
                    <ul className="flex flex-wrap gap-2">
                        {product.contents.map((item) => (
                            <li key={item} className="px-3 py-2 text-sm text-zinc-300 bg-white/5 border border-white/10 rounded-full w-fit">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Aperçu des Samples */}
                <div className="lg:col-span-6 space-y-4">
                    <h2 className="flex gap-2 items-center text-xl font-bold text-white"><AudioLines size={24} className="text-white/70"/>Aperçu des Samples</h2>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                        {product.samples.map((sample) => (
                            <SamplePreview
                                key={sample.name}
                                name={sample.name}
                                subtitle={product.title}
                                src={sample.src}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}