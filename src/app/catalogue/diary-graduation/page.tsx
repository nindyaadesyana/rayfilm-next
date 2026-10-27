"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

// Navigasi halaman katalog.
// Fungsi utamanya adalah agar user bisa berpindah antar bagian homepage dan halaman brand tanpa reload penuh.
const navLinks = [
  { label: "Home",      href: "/#home"    },
  { label: "About Us",  href: "/#about"   },
  { label: "Catalogue", href: "/#gallery" },
  { label: "Find Us",   href: "/#contact" },
];

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
        onClick={() => setFull(true)}
      >
        <Image
          src={src}
          alt={`Diary Graduation photo ${index + 1}`}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          quality={90}
          unoptimized
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-end p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">View</span>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {full && (
          <motion.div
            key={`lb-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setFull(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative max-w-4xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={`Diary Graduation photo ${index + 1}`}
                width={1600}
                height={1200}
                className="rounded-xl object-contain max-h-[90vh] w-auto"
                quality={100}
                unoptimized
              />
              <button
                onClick={() => setFull(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const withVersion = (src: string) => `${src}${src.includes("?") ? "&" : "?"}v=${Date.now()}`;

export default function DiaryGraduation() {
  // State ini menampung daftar foto yang dibaca dari API.
  // Jadi halaman tidak perlu hardcode nama file satu per satu.
  const [photos, setPhotos] = useState<Array<{ src: string }>>([]);

  useEffect(() => {
    // useEffect ini dipanggil saat halaman pertama kali render.
    // Tugasnya adalah fetch data foto dari API dan menyimpannya ke state untuk ditampilkan di grid.
    let active = true;

    const loadPhotos = async () => {
      try {
        const response = await fetch("/api/photos?brand=diarygraduation", { cache: "no-store" });
        const data = await response.json() as { grid?: string[] };
        const nextPhotos = (data.grid ?? []).map((src) => ({ src: withVersion(src) }));

        if (active) {
          setPhotos(nextPhotos.length > 0 ? nextPhotos : [{ src: withVersion("/images/diarygraduation/DSCF3341.jpeg") }]);
        }
      } catch {
        if (active) {
          setPhotos([{ src: withVersion("/images/diarygraduation/DSCF3341.jpeg") }]);
        }
      }
    };

    loadPhotos();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ebebeb]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[#0a0a0a] font-black text-base tracking-[0.18em] uppercase hover:opacity-60 transition-opacity">
            RAYFILM
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <nav className="flex md:hidden items-center gap-4">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-[11px] font-medium text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-4">Catalogue</p>
          <h1 className="font-black tracking-tight leading-[0.92] mb-3" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#0a0a0a" }}>
            Diary Graduation
          </h1>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#bbb] mb-6">Graduation Photography</p>
          <p className="text-[#6b6b6b] text-base leading-relaxed max-w-lg mb-8">
            Years of dedication, one unforgettable milestone. Solo portraits, family moments, and candid celebrations that you&apos;ll carry for a lifetime.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Foto Wisuda", "Family Portraits", "Studio Session"].map((s) => (
              <span key={s} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ border: "1px solid #e8e8e8", color: "#6b6b6b", background: "#fafafa" }}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 5-column photo grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-8">Photos</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {photos.map((p, i) => (
              <PhotoCard key={i} src={p.src} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
