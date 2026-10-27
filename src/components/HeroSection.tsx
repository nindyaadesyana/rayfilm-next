/**
 * KOMPONEN: HeroSection
 * =====================
 * Menampilkan section pertama (hero) di halaman utama.
 * Berisi foto background fullscreen + navbar overlay + headline teks.
 *
 * CARA GANTI FOTO BACKGROUND HERO:
 * 1. Siapkan foto baru (disarankan resolusi minimal 1920×1080, format .jpg/.jpeg)
 * 2. Rename file menjadi BACKGROUNDHERO.jpeg (atau nama lain)
 * 3. Taruh di folder: public/images/
 * 4. Jika nama file berbeda, ubah src pada komponen <Image> di bawah:
 *    src="/images/NAMA_FILE_BARU.jpeg"
 *
 * CARA UBAH TEKS HEADLINE:
 * - Cari bagian <motion.h1> dan ubah teks di dalamnya
 * - "Dream. Create. Inspire." bisa diubah sesuai kebutuhan
 *
 * CARA UBAH TAGLINE:
 * - Cari <motion.p> setelah h1 dan ubah isinya
 *
 * CARA UBAH LINK NAVBAR:
 * - Edit array `navLinks` di bagian atas file ini
 * - `href` menggunakan anchor (#home, #about, dll) yang merujuk ke id section
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Home",      href: "#home"    },
  { label: "About Us",  href: "#about"   },
  { label: "Catalogue", href: "#gallery" },
  { label: "Find Us",   href: "#contact" },
];

export default function HeroSection() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Background photo ─────────────────────────────────────────────── */}
      <Image
        src="/images/BACKGROUNDHERO.jpeg"
        alt="RAYFILM background"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Very subtle top-only vignette — keeps nav readable, photo clear ── */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between px-6 pt-5 pb-3"
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="text-white font-black text-base tracking-[0.18em] uppercase hover:opacity-60 transition-opacity"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          RAYFILM
        </button>

        {/* Desktop nav — 4 links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-white/90 hover:text-white text-sm font-medium transition-colors"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile nav */}
        <nav className="flex md:hidden items-center gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-white/90 hover:text-white text-[11px] font-medium transition-colors"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* ── Headline — upper-center, clear of the people in the photo ────── */}
      <div className="relative z-20 flex flex-col items-start justify-start px-8 md:px-14 mt-16 md:mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="font-black leading-[0.90] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
        >
          Dream.{" "}
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.65)",
            }}
          >
            Create.
          </span>
          <br />
          Inspire.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-5 text-white/80 text-sm md:text-base font-light max-w-xs md:max-w-sm leading-relaxed tracking-wide"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
        >
          We craft visual stories that move audiences and build brands.
          Video Ads, TikTok, Reels, Company Profiles — made with precision and soul.
        </motion.p>
      </div>

      {/* ── Spacer ────────────────────────────────────────────────────────── */}
      <div className="flex-1" />

    </section>
  );
}
