"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const navLinks = [
  { label: "Home",      href: "/#home"    },
  { label: "About Us",  href: "/#about"   },
  { label: "Catalogue", href: "/#gallery" },
  { label: "Find Us",   href: "/#contact" },
];

// No photos yet — add when ready:
// { src: "/images/diarysedjiwa/filename.jpg" }
const photos: { src: string }[] = [];

function PhotoCard({ src, index }: { src: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [full, setFull]       = useState(false);

  return (
    <>
      <motion.div
        className="relative cursor-pointer overflow-hidden rounded-xl"
        style={{ border: "1px solid #f0f0f0", aspectRatio: "3/4" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={hovered ? { scale: 1.04, boxShadow: "0 12px 36px rgba(0,0,0,0.18)" } : { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        transition={{ duration: 0.28 }}
        onClick={() => setFull(true)}
      >
        <Image src={src} alt={`Diary Sedjiwa photo ${index + 1}`} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover" quality={90} />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-end p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">View</span>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {full && (
          <motion.div key={`lb-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setFull(false)}
          >
            <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22 }} className="relative mx-4" onClick={(e) => e.stopPropagation()}
            >
              <Image src={src} alt={`Diary Sedjiwa photo ${index + 1}`} width={1600} height={1200}
                className="rounded-2xl object-contain" style={{ maxHeight: "88vh", maxWidth: "90vw", width: "auto" }} quality={100} />
              <button onClick={() => setFull(false)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.65)", color: "#fff" }}>
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function DiarySedjiwa() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ebebeb]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[#0a0a0a] font-black text-base tracking-[0.18em] uppercase hover:opacity-60 transition-opacity">RAYFILM</Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => <Link key={l.href} href={l.href} className="text-sm font-medium text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">{l.label}</Link>)}
          </nav>
          <nav className="flex md:hidden items-center gap-4">
            {navLinks.map((l) => <Link key={l.href} href={l.href} className="text-[11px] font-medium text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">{l.label}</Link>)}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-4">Catalogue</p>
          <h1 className="font-black tracking-tight leading-[0.92] mb-3" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#0a0a0a" }}>Diary Sedjiwa</h1>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#bbb] mb-6">Wedding & Prewed Photography</p>
          <p className="text-[#6b6b6b] text-base leading-relaxed max-w-lg mb-8">
            The quiet poetry of love — prewedding sessions and wedding day coverage that feel timeless.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Prewedding", "Wedding"].map((s) => (
              <span key={s} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ border: "1px solid #e8e8e8", color: "#6b6b6b", background: "#fafafa" }}>{s}</span>
            ))}
          </div>
        </motion.div>

        {photos.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#f4f4f4" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <p className="text-[#0a0a0a] font-semibold text-lg mb-2">Coming Soon</p>
            <p className="text-[#aaa] text-sm max-w-xs leading-relaxed">Photos will appear here once they&apos;re added.</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-8">Photos</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {photos.map((p, i) => <PhotoCard key={i} src={p.src} index={i} />)}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
