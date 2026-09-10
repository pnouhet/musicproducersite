"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Layers, Mic2, Gift, FileMusic, X } from "lucide-react";
import { useSidebar } from "../context/SidebarContext"; // Assure-toi que ce chemin est bon
import { cn } from "@/lib/utils";

// Liens de navigation de la sidebar
// `extraPaths` : préfixes supplémentaires qui gardent le lien actif
// (ex: une fiche produit /products/xxx surligne "Catalogue")
const navLinks = [
  { href: "/catalogue", label: "Catalogue", icon: Music, extraPaths: ["/products"] },
  { href: "/presets", label: "Presets", icon: Layers },
  { href: "/templates", label: "Templates", icon: FileMusic },
  { href: "/samples", label: "Samples Gratuit", icon: Gift },
  { href: "/blog", label: "Blog", icon: Mic2 },
];

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const pathname = usePathname();

  // On gère les classes manuellement pour être sûr que ça marche
  const sidebarClasses = `
    fixed top-0 left-0 z-50 h-screen w-64 
    border-r border-white/10 bg-black/70 text-white 
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0
  `;

  return (
    <>
      {/* OVERLAY MOBILE (Fond noir quand ouvert) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* LA SIDEBAR */}
      <aside className={sidebarClasses}>
        
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white">
            Music<span className="text-emerald-400">Producer</span>
          </Link>
          {/* Bouton croix visible uniquement sur mobile */}
          <button onClick={closeSidebar} className="md:hidden text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Liens de navigation */}
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map(({ href, label, icon: Icon, extraPaths = [] }) => {
            const paths = [href, ...extraPaths];
            const isActive = paths.some(
              (p) => pathname === p || pathname.startsWith(p + "/")
            );
            return (
              <Link
                key={href}
                href={href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 transition-colors hover:bg-white/5",
                  isActive ? "text-emerald-500" : "text-zinc-400 hover:text-white"
                )}
              >
                <Icon size={16} />
                <span className="text">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-black/95">
          <div className="grid gap-1">
            <div className="text-xs text-zinc-500">Informations légales</div>
            <div className="text-xs text-zinc-500">Confidentialité</div>
            <div className="text-xs text-zinc-500">v1.0 Alpha</div>
          </div>
        </div>
      </aside>
    </>
  );
}