/**
 * HALAMAN: /catalogue/rayfilm
 * ============================
 * Halaman portofolio brand RAYFILM.
 * Berisi: header info, video Netflix-style, TikTok embeds, dan grid foto.
 *
 * CARA GANTI FOTO GRID:
 * - Tambah/hapus/ganti file di folder: public/images/rayfilm/
 * - Edit array `photos` di bawah (ganti nama file sesuai file yang ada di folder)
 * - Format: { src: "/images/rayfilm/NAMA_FILE.JPG" }
 *
 * CARA TAMBAH VIDEO TIKTOK BARU:
 * - Buka TikTok, copy URL video
 * - Ambil angka ID di akhir URL, contoh: .../video/7064916397859540225 → ID = 7064916397859540225
 * - Tambah objek ke array `tiktokVideos`:
 *   { id: "7064916397859540225", client: "Nama Klien", caption: "Keterangan" }
 *
 * CARA GANTI VIDEO MP4 FEATURED:
 * - Ganti file di: public/videos/rayfilm-workshop.mp4
 * - Atau ubah konstanta VIDEO_SRC di bawah ke path file baru
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Play, Clock, Tag } from "lucide-react";
import { TikTokCard } from "@/components/TikTokCard";
import { videos } from "@/data/videos";

// Navigasi atas halaman katalog.
// Fungsi utamanya agar user bisa kembali ke home atau ke bagian lain tanpa kehilangan konteks.
const navLinks = [
  { label: "Home",      href: "/#home"    },
  { label: "About Us",  href: "/#about"   },
  { label: "Catalogue", href: "/#gallery" },
  { label: "Find Us",   href: "/#contact" },
];

// ── Foto grid akan dibaca otomatis dari folder public/images/rayfilm/ ───────
// Jadi update file di folder cukup, tanpa harus edit array di sini.

// URL video utama yang tampil di featured card.
// Video ini berfungsi sebagai preview visual hero di halaman katalog brand.
const VIDEO_SRC = "/videos/rayfilm-workshop.mp4";

// ── Netflix Video Card (hover to preview, click to fullscreen) ────────────────
function NetflixVideoCard() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovered, setHovered]       = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setHovered(true);
      videoRef.current?.play().catch(() => {});
    }, 180);
  };

  const handleLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <motion.div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={hovered
          ? { scale: 1.06, y: -12, zIndex: 30, boxShadow: "0 32px 72px rgba(0,0,0,0.28)" }
          : { scale: 1,    y: 0,   zIndex: 1,  boxShadow: "0 4px 20px rgba(0,0,0,0.08)"  }
        }
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{ border: "1px solid #e8e8e8" }}
        onClick={() => setFullscreen(true)}
      >
        <div style={{ aspectRatio: "16/9", position: "relative" }}>
          <video ref={videoRef} src={VIDEO_SRC} muted loop playsInline preload="metadata" className="w-full h-full object-cover" />
          <motion.div animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.18)" }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.35)" }}>
              <Play size={26} className="text-white ml-1" fill="white" />
            </div>
          </motion.div>
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)" }}>
              Watch Film
            </span>
          </div>
        </div>

        {/* Info panel muncul saat hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div key="info" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden" style={{ background: "#111" }}>
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-white font-black text-base leading-tight">Workshop Paiton</p>
                    <p className="text-white/50 text-xs mt-0.5">Production Documentation</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setFullscreen(true); }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                    style={{ background: "#fff", color: "#111" }}>
                    <Play size={11} fill="#111" /> Play
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="flex items-center gap-1 text-[10px] text-white/40"><Clock size={10} /> 2024</span>
                  <span className="text-white/20 text-[10px]">·</span>
                  <span className="flex items-center gap-1 text-[10px] text-white/40"><Tag size={10} /> Event Dokumentasi</span>
                </div>
                <p className="text-white/50 text-[11px] leading-relaxed">
                  Behind-the-scenes coverage of the Paiton Workshop — capturing energy, collaboration, and the creative process in motion.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div key="fs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setFullscreen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }} className="relative w-full max-w-5xl mx-4 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              <video src={VIDEO_SRC} controls autoPlay className="w-full rounded-2xl" style={{ maxHeight: "82vh" }} />
              <button onClick={() => setFullscreen(false)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.65)", color: "#fff" }}><X size={16} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Photo Card (hover popup + lightbox) ───────────────────────────────────────
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
        {/* unoptimized=true → foto selalu dibaca langsung dari disk, tidak di-cache Next.js */}
        <Image src={src} alt={`RAYFILM photo ${index + 1}`} fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover" quality={90} unoptimized />
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-end p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}>
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">View</span>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {full && (
          <motion.div key={`lb-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setFull(false)}>
            <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22 }} className="relative mx-4" onClick={(e) => e.stopPropagation()}>
              {/* unoptimized=true di lightbox juga supaya foto HD langsung dari disk */}
              <Image src={src} alt={`RAYFILM photo ${index + 1}`} width={1600} height={1200}
                className="rounded-2xl object-contain" style={{ maxHeight: "88vh", maxWidth: "90vw", width: "auto" }}
                quality={100} unoptimized />
              <button onClick={() => setFull(false)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.65)", color: "#fff" }}><X size={16} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
// withVersion dipakai untuk memaksa browser reload asset gambar/foto
// ketika data foto diambil ulang dari API. Tujuannya agar user tidak melihat cache lama.
const withVersion = (src: string) => `${src}${src.includes("?") ? "&" : "?"}v=${Date.now()}`;

// Data reel Instagram yang akan ditampilkan di katalog.
// =====
// Struktur data ini hanya menyimpan ID reel dan judul video.
// ID reel digunakan untuk membangun URL embed Instagram:
// https://www.instagram.com/reel/{id}/embed/?cr=1&v=14
// Kenapa hanya ID? Karena ini paling sederhana dan mudah dikelola.
// Jika nanti ingin menambah/diganti video, cukup edit array ini saja.
const instagramReels = [
  { id: "DbS7H4TSFC4", title: "Video 1" },
  { id: "DYR7bEmSnLf", title: "Video 2" },
  { id: "DPyfU0KEr_G", title: "Video 3" },
  { id: "DPi0TaTkmu9", title: "Video 4" },
] as const;

// Komponen card reel Instagram.
// =====
// Fungsi utama komponen ini adalah menampilkan video dari Instagram di dalam iframe,
// dengan tampilan card yang rapi dan konsisten di halaman katalog.
// Karena embed Instagram bersifat cross-origin, kita tidak bisa mengubah UI di dalam iframe
// secara penuh. Solusi yang dipakai adalah menampilkan frame card yang tetap terkontrol
// dari sisi aplikasi, lalu iframe dipasang di dalam area card tersebut.
export function InstagramReelCard({ reel }: { reel: (typeof instagramReels)[number] }) {
  // isHovered dipakai untuk mengecek apakah mouse sedang berada di area card.
  // state ini bisa dipakai nanti kalau mau menambah efek khusus seperti zoom,
  // overlay, atau autoplay conditional.
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-[24px] border border-neutral-200 bg-neutral-900 shadow-md transition-all duration-300 ${isHovered ? "scale-[1.01]" : ""} hover:-translate-y-1 hover:shadow-xl`}
      // Aspect ratio 9:16 dibuat agar bentuknya mirip seperti reel Instagram vertical,
      // jadi tampilannya tidak gepeng dan lebih konsisten dengan format video reels.
      style={{ aspectRatio: "9 / 16" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/*
        Iframe di bawah ini menampilkan video reel dari Instagram.
        URL embed dibuat secara dinamis dari `reel.id`.

        Catatan penting:
        - Instagram embed tidak bisa dikustom CSS sepenuhnya dari sisi aplikasi.
        - Karena itu, kita fokus pada layout card-nya agar tetap bersih.
        - `loading="lazy"` membantu mengurangi beban pada saat halaman pertama kali dimuat.
      */}
      <iframe
        src={`https://www.instagram.com/reel/${reel.id}/embed/?cr=1&v=14`}
        title={reel.title}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}

export default function RayfilmCatalogue() {
  // State photos ini menampung semua foto hasil fetch dari API.
  // Halaman kemudian memetakan tiap item menjadi card foto untuk ditampilkan.
  const [photos, setPhotos] = useState<Array<{ src: string }>>([]);

  useEffect(() => {
    let active = true;

    const loadPhotos = async () => {
      try {
        const response = await fetch("/api/photos?brand=rayfilm", { cache: "no-store" });
        const data = await response.json() as { grid?: string[] };
        const nextPhotos = (data.grid ?? []).map((src) => ({ src: withVersion(src) }));

        if (active) {
          setPhotos(nextPhotos.length > 0 ? nextPhotos : [{ src: withVersion("/images/rayfilm/DSC08264.JPG") }]);
        }
      } catch {
        if (active) {
          setPhotos([{ src: withVersion("/images/rayfilm/DSC08264.JPG") }]);
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

      {/* Navbar */}
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

        {/* ── Featured: 2-kolom header + Netflix video card ─────────────── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-4">Catalogue</p>
            <h1 className="font-black tracking-tight leading-[0.92] mb-3" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#0a0a0a" }}>RAYFILM</h1>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#bbb] mb-6">Visual Production House</p>
            <p className="text-[#6b6b6b] text-[0.94rem] leading-relaxed max-w-sm mb-8">
              Event documentation, product photography, and company profiles — cinematic quality across every format.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Event Dokumentasi", "Product Foto", "Company Profile"].map((s) => (
                <span key={s} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{ border: "1px solid #e8e8e8", color: "#6b6b6b", background: "#fafafa" }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="py-8 px-4">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-5">Featured Film</p>
            <NetflixVideoCard />
          </div>
        </motion.div>

        {/* ── TikTok Embeds — sebelum foto grid ─────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
          className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-2">Social Media</p>
              <h2 className="text-2xl font-black tracking-tight text-[#0a0a0a]">Featured on TikTok</h2>
            </div>
            <span className="text-xs text-[#ccc] font-medium">{videos.length} videos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <TikTokCard key={video.id} video={video} />
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-24">
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-2">Social Media</p>
              <h2 className="text-[clamp(2rem,3vw,3.2rem)] font-black tracking-[-0.04em] text-[#0a0a0a]">Instagram Reels</h2>
            </div>
            <span className="text-xs text-[#b8b8b8] font-medium tracking-[0.06em] uppercase">{instagramReels.length} reels</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {instagramReels.map((reel) => (
              <InstagramReelCard key={reel.id} reel={reel} />
            ))}
          </div>
        </motion.div>

        {/* ── Foto Grid — 5 kolom ────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-2">Portfolio</p>
              <h2 className="text-2xl font-black tracking-tight text-[#0a0a0a]">Photos</h2>
            </div>
            <span className="text-xs text-[#ccc] font-medium">{photos.length} frames</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {photos.map((p, i) => <PhotoCard key={i} src={p.src} index={i} />)}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
