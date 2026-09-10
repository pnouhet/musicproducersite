import React from "react";
import Link from "next/link";

export default function SideNav() {
    return (
        <nav className="fixed top-0 left-0 w-1/8 h-full z-50 border-r border-white/10 bg-black/50 backdrop-blur-md">
            <div className="container flex flex-col gap-8">
                <div className="border-b border-white/10 p-4 h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                    Music<span className="text-emerald-400">Producer</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="px-4 hidden md:grid gap-4 text-2xl font-medium text-zinc-400">
                <Link href="/catalogue" className="hover:text-emerald-500 transition-colors">Catalogue</Link>
                <Link href="/presets" className="hover:text-emerald-500 transition-colors">Presets</Link>
                <Link href="/templates" className="hover:text-emerald-500 transition-colors">Templates</Link>
                <Link href="/blog" className="hover:text-emerald-500 transition-colors">Blog</Link>
                </div>
            </div>
        </nav>
    )
}