"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

// Navigasi halaman katalog.
// Fungsi utamanya adalah agar user bisa berpindah antar bagian homepage dan halaman brand tanpa reload penuh.
const navLinks = [
  { label: "Home",      href: "/#home"    },
  { label: "About Us",  href: "/#about"   },
  { label: "Catalogue", href: "/#gallery" },
  { label: "Find Us",   href: "/#contact" },
];

function PhotoCard({ src, index, onOpen }: { src: string; index: number; onOpen: (index: number) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-xl"
      style={{ border: "1px solid #f0f0f0", aspectRatio: "3/4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
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
  );
}

const withVersion = (src: string) => `${src}${src.includes("?") ? "&" : "?"}v=${Date.now()}`;

export default function DiaryGraduation() {
  // State ini menampung daftar foto yang dibaca dari API.
  // Jadi halaman tidak perlu hardcode nama file satu per satu.
  const [photos, setPhotos] = useState<Array<{ src: string }>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  useEffect(() => {
    if (activeIndex === null || photos.length === 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
      }
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, photos.length]);

  const currentPhoto = activeIndex !== null ? photos[activeIndex] : null;
  const activePhotoIndex = activeIndex ?? 0;
  
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ebebeb]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-60 transition-opacity">
            <img src="/images/Logo Ray Film.png" alt="RAYFILM logo" className="h-8 md:h-9 w-auto object-contain" />
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
        <Link href="/#gallery" aria-label="Back to catalogue" className="mb-8 inline-flex items-center justify-center text-[#0a0a0a] transition-transform hover:-translate-x-1">
          <ArrowLeft size={20} />
        </Link>
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
              <PhotoCard key={i} src={p.src} index={i} onOpen={setActiveIndex} />
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6"
              onClick={() => setActiveIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveIndex((prev) => prev === null ? null : (prev - 1 + photos.length) % photos.length)}
                  className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  onClick={() => setActiveIndex((prev) => prev === null ? null : (prev + 1) % photos.length)}
                  className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm"
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} />
                </button>

                <button
                  onClick={() => setActiveIndex(null)}
                  className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm"
                  aria-label="Close photo"
                >
                  <X size={18} />
                </button>

                <div className="mx-auto flex max-h-[88vh] items-center justify-center overflow-hidden rounded-2xl bg-black/40">
                  <Image
                    src={currentPhoto.src}
                    alt={`Diary Graduation photo ${activePhotoIndex + 1}`}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 768px) 90vw, 80vw"
                    className="block max-h-[88vh] w-auto object-contain"
                    style={{ display: "block" }}
                    quality={100}
                    unoptimized
                  />
                </div>

                <div className="mt-4 text-center text-[11px] font-semibold tracking-[0.18em] uppercase text-white/70">
                  {activePhotoIndex + 1} / {photos.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
