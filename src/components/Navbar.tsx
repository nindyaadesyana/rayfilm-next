/**
 * KOMPONEN: Navbar
 * ================
 * Fixed top navigation bar yang muncul setelah user scroll melewati hero section.
 * Di hero section, navbar sudah ada secara terpisah (di HeroSection.tsx).
 *
 * CARA UBAH LINK NAVIGASI:
 * - Edit array `links` di bawah ini
 * - `label` = teks yang tampil
 * - `href`  = anchor id section tujuan (contoh: "#about" → section id="about")
 *
 * CARA UBAH WARNA NAVBAR:
 * - Cari className dengan "bg-white/95" untuk background
 * - Cari "text-[#0a0a0a]" untuk warna teks
 *
 * CARA TAMBAH TOMBOL CTA:
 * - Tambahkan button di antara <ul> dan hamburger button
 */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home",      href: "#home"    },
  { label: "About Us",  href: "#about"   },
  { label: "Catalogue", href: "#gallery" },
  { label: "Find Us",   href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const nav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Hidden while still in hero; slides in after scrolling past it
  if (!scrolled) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 inset-x-0 z-50 bg-[#111111]/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => nav("#home")}
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            <img
              src="/images/Logo Ray Film.png"
              alt="Rayfilm logo"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </button>

          {/* Desktop — 4 links */}
          <ul className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => nav(l.href)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active === l.href.slice(1)
                      ? "bg-white text-[#0a0a0a] shadow-sm"
                      : "text-[#e6e6e6] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#0a0a0a] p-1"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 right-0 z-40 w-64 bg-white border-l border-[#e8e8e8] flex flex-col pt-20 pb-8 px-8 shadow-lg"
            >
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => nav(l.href)}
                      className={`w-full text-left py-3.5 text-sm font-medium border-b border-[#f4f4f4] transition-colors ${
                        active === l.href.slice(1)
                          ? "text-[#0a0a0a]"
                          : "text-[#6b6b6b] hover:text-[#0a0a0a]"
                      }`}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-black/15 md:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
