"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";
import { X, ChevronDown, Check, ArrowUpDown } from "lucide-react";

type SortOrder = "none" | "asc" | "desc";

// On crée un composant "interne" pour utiliser useSearchParams proprement
function ShopContent() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("q") || ""; // Récupère "q" dans l'url

  // Catégories (sans "Tous" : aucune case cochée = tout afficher)
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Multi-sélection de catégories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // Tri par prix
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  // On stocke la recherche localement aussi pour pouvoir l'effacer manuellement si on veut
  const [searchFilter, setSearchFilter] = useState(initialSearchQuery);

  // Gestion de l'ouverture des menus déroulants
  const [openMenu, setOpenMenu] = useState<"cat" | "sort" | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Fermeture des dropdowns au clic en dehors
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mise à jour si l'URL change (ex: nouvelle recherche depuis la navbar)
  useEffect(() => {
    setSearchFilter(initialSearchQuery);
    // Si une recherche est faite, on réinitialise les catégories pour ne pas trop restreindre
    if (initialSearchQuery) setSelectedCategories([]);
  }, [initialSearchQuery]);

  // Coche / décoche une catégorie
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const sortLabels: Record<SortOrder, string> = {
    none: "Par défaut",
    asc: "Prix croissant",
    desc: "Prix décroissant",
  };

  // --- LOGIQUE DE FILTRAGE COMBINÉE ---
  const filteredProducts = products
    .filter((p) => {
      // 1. Filtre Catégorie (aucune cochée = toutes)
      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);

      // 2. Filtre Recherche (Titre ou Catégorie)
      const searchLower = searchFilter.toLowerCase();
      const matchSearch =
        searchFilter === ""
          ? true
          : p.title.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower);

      return matchCategory && matchSearch;
    })
    // 3. Tri par prix (on ne mute pas le tableau d'origine grâce au filter ci-dessus)
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const hasActiveFilters = searchFilter !== "" || selectedCategories.length > 0;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen mb-40">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Notre <span className="text-emerald-500">Catalogue</span>
          </h1>
          <p className="text-zinc-400">Explorez notre collection de sons haute définition.</p>
        </div>
      </div>

      {/* Affichage des filtres actifs */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-zinc-400 text-sm">Filtres actifs :</span>
          {searchFilter && (
            <span className="flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-sm border border-white/20">
              "{searchFilter}"
              <button onClick={() => setSearchFilter("")} className="hover:text-red-400">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedCategories.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-sm border border-white/20"
            >
              {cat}
              <button onClick={() => toggleCategory(cat)} className="hover:text-red-400">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Barre de filtres (Catégories + Tri) */}
      <div ref={filtersRef} className="flex flex-wrap gap-3 mb-12">
        {/* Dropdown Catégories (multi-sélection) */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu((m) => (m === "cat" ? null : "cat"))}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-all duration-300",
              selectedCategories.length > 0
                ? "bg-primary text-black border-primary"
                : "bg-black/40 text-zinc-300 border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            Catégories
            {selectedCategories.length > 0 && (
              <span className="bg-black/20 text-black px-1.5 rounded-full text-xs">
                {selectedCategories.length}
              </span>
            )}
            <ChevronDown
              size={16}
              className={cn("transition-transform", openMenu === "cat" && "rotate-180")}
            />
          </button>

          {openMenu === "cat" && (
            <div className="absolute z-20 mt-2 w-56 max-h-72 overflow-y-auto bg-zinc-950 border border-white/10 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
              {categories.map((cat) => {
                const checked = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left text-zinc-300 hover:bg-white/5 transition-colors"
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center w-4 h-4 border transition-colors",
                        checked
                          ? "bg-primary border-primary text-black" : "border-white/30"
                      )}
                    >
                      {checked && <Check size={12} strokeWidth={3} />}
                    </span>
                    {cat}
                  </button>
                );
              })}
              <button
                onClick={() => setSelectedCategories([])}
                disabled={selectedCategories.length === 0}
                className="sticky bottom-0 w-full px-4 py-2 text-xs text-zinc-500 hover:text-white border-t border-white/10 bg-zinc-950 disabled:hover:text-zinc-500 disabled:cursor-not-allowed"
              >
                Tout décocher
              </button>
            </div>
          )}
        </div>

        {/* Dropdown Tri par prix */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu((m) => (m === "sort" ? null : "sort"))}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-all duration-300",
              sortOrder !== "none"
                ? "bg-primary text-black border-primary"
                : "bg-black/40 text-zinc-300 border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            <ArrowUpDown size={16} />
            {sortLabels[sortOrder]}
            <ChevronDown
              size={16}
              className={cn("transition-transform", openMenu === "sort" && "rotate-180")}
            />
          </button>

          {openMenu === "sort" && (
            <div className="absolute z-20 mt-2 w-52 bg-zinc-950 border border-white/10 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
              {(["none", "asc", "desc"] as SortOrder[]).map((order) => (
                <button
                  key={order}
                  onClick={() => {
                    setSortOrder(order);
                    setOpenMenu(null);
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors",
                    sortOrder === order ? "text-primary" : "text-zinc-300"
                  )}
                >
                  {sortLabels[order]}
                  {sortOrder === order && <Check size={14} strokeWidth={3} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grille de résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-zinc-500 border border-dashed border-zinc-800 bg-zinc-900/30">
            <p className="text-lg">Aucun produit ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchFilter("");
                setSelectedCategories([]);
                setSortOrder("none");
              }}
              className="mt-4 text-primary hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant Principal avec Suspense (Requis par Next.js pour useSearchParams)
export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Chargement du catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
