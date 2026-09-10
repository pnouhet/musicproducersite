// import Link from "next/link";
// import { ShoppingCart, Search, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function Navbar() {
//     return (
//         <nav className="h-16 flex items-center justify-end fixed top-0 right-0 left-64 z-40 transition-all duration-300 border-b border-white/10 backdrop-blur-md">
//             <div className="container mx-auto flex justify-end px-4">

//                 {/* Icons / Actions */}
//                 <div className="flex gap-2">
//                 <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
//                     <Search className="h-5 w-5" />
//                 </Button>
//                 <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
//                     <ShoppingCart className="h-5 w-5" />
//                 </Button>
//                 <Button variant="ghost" size="icon" className="md:hidden text-zinc-400">
//                     <Menu className="h-5 w-5" />
//                 </Button>
//                 <Button>
//                     Se connecter
//                 </Button>
//                 </div>
//             </div>
//         </nav>
//     );
// }

"use client"; // Indispensable pour les hooks (useState, useRouter)

import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "../context/SidebarContext";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

  // Focus automatique sur l'input quand on ouvre la recherche
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Fonction de recherche
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault(); // Empêche le rechargement de page si c'est un form
    if (!searchQuery.trim()) {
      setIsSearchOpen(false); // Si vide, on ferme juste
      return;
    }
    
    // Redirection vers le shop avec le paramètre de requête
    router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    // Optionnel : on ferme la recherche après validation ?
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
  };

  return (
    <nav 
        className={cn(
            "h-16 flex items-center justify-end fixed top-0 right-0 z-30 transition-all duration-300 border-b border-white/10 backdrop-blur-md",
            "left-0 md:left-64"
        )}>

        <div className="container mx-auto flex justify-end px-4">

        {/* Icons / Actions Zone */}
        <div className="flex items-center gap-2">
          
            {/* --- SEARCH BAR ANIMÉE --- */}
            <div className="relative flex items-center">
                {/* L'Input qui s'étire */}
                <div 
                    className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out flex items-center",
                        isSearchOpen ? "w-48 md:w-64 opacity-100 mr-2" : "w-0 opacity-0 mr-0"
                    )}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Rechercher un son..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-zinc-900/80 border border-white/10 py-1.5 px-4 text-sm text-white focus:outline-none focus:border-primary placeholder:text-zinc-600"
                    />
                </div>

                {/* Le Bouton Loupe (Toggle) */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => isSearchOpen ? handleSearch() : setIsSearchOpen(true)}
                    className="text-zinc-400 hover:text-white"
                >
                    <Search className="h-5 w-5" />
                </Button>
                
                {/* Bouton croix pour fermer si ouvert (UX Bonus) */}
                {isSearchOpen && (
                    <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                    className="text-zinc-500 hover:text-red-400 -ml-2 animate-in fade-in zoom-in"
                >
                    <X className="h-4 w-4" />
                </Button>
                )}
                </div>

                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                    
                    <Button className="ml-2 bg-white text-black hover:bg-zinc-200 font-bold hidden sm:flex">
                        Se connecter
                    </Button>

                    {/* Bouton Burger */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden text-zinc-400"
                        onClick={toggleSidebar} // L'action magique
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}