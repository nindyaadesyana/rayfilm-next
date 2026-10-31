/**
 * KOMPONEN: GallerySection
 * ========================
 * Section katalog brand di halaman utama.
 * Menampilkan slider 3 brand (RAYFILM, Diary Sejiwa, Diary Graduation).
 * Setiap slide punya kolase foto di kanan dan deskripsi brand di kiri.
 *
 * CARA KERJA AUTO-UPDATE FOTO KOLASE:
 * - Foto kolase dibaca OTOMATIS dari folder public/images/<brand>/
 * - File dengan prefix "kolase-" di dalam folder tersebut akan tampil di kolase
 * - Tidak perlu edit kode — cukup tambah/ganti file di folder, refresh halaman
 *
 * CONTOH:
 * - Tambah foto kolase RAYFILM  → taruh file "kolase-namafile.jpg" di public/images/rayfilm/
 * - Tambah foto kolase Diary Graduation → taruh di public/images/diarygraduation/
 *
 * JUMLAH FOTO KOLASE:
 * - Minimum 3 slot selalu ditampilkan (kekurangan diisi placeholder gelap)
 * - Jika ada 4 foto → layout 2×2 grid
 * - Jika ada 3 atau kurang → layout asimetris (1 besar kiri + 2 kecil kanan)
 *
 * CARA UBAH DATA BRAND (nama, deskripsi, layanan):
 * - Edit array `brands` di bawah ini
 * - `slug` harus sesuai dengan nama folder di src/app/catalogue/<slug>/
 *
 * CARA TAMBAH BRAND BARU:
 * 1. Tambah objek baru ke array `brands`
 * 2. Buat halaman baru: src/app/catalogue/<slug>/page.tsx
 * 3. Buat folder foto: public/images/<slug>/
 */

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" />
    </svg>
  );
}

// Tipe data ini dipakai untuk menyimpan foto di setiap slot kolase.
// src bisa null agar sistem menampilkan placeholder jika file belum ada.
interface PhotoEntry {
  src: string | null;  // null = tampilkan placeholder
  label: string;
}

// Fungsi ini memastikan URL gambar selalu unik saat di-render.
// Tujuannya supaya foto baru yang sudah diganti di folder public langsung muncul tanpa cache lama.
const withVersion = (src: string) => `${src}${src.includes("?") ? "&" : "?"}v=${Date.now()}`;

// Data brand di homepage slider.
// Bagian ini hanya mengatur nama, deskripsi, dan link katalog brand.
// Foto kolase tidak didefinisikan di sini karena otomatis dibaca dari folder public/images/<brand>/.
const brands = [
  {
    id:          "rayfilm",
    slug:        "rayfilm",
    // Nama folder foto: public/images/rayfilm/
    // File kolase:      public/images/rayfilm/kolase-*.jpg
    name:        "RAYFILM",
    tagline:     "Visual Production House",
    year:        "Est. 2020",
    description: "From high-energy event documentation to sleek product photography and polished company profiles — RAYFILM delivers cinematic quality across every format. We tell the story of your brand with precision and soul.",
    services:    ["Event Dokumentasi", "Product Foto", "Company Profile"],
    count:       "120+ Projects",
    instagram:   "https://instagram.com/rayfilm_",
  },
  {
    id:          "diarysedjiwa",
    slug:        "diary-sedjiwa",
    // Nama folder foto: public/images/diarysejiwa/
    // File kolase:      public/images/diarysejiwa/kolase-*.jpg
    name:        "Diary Sejiwa",
    tagline:     "Wedding & Prewed Photography",
    year:        "Est. 2021",
    description: "Diary Sejiwa captures the quiet poetry of love — the nervous glance before the vows, the laughter between moments. Specialising in prewedding sessions and wedding day coverage that feel timeless.",
    services:    ["Prewedding", "Wedding"],
    count:       "80+ Sessions",
    instagram:   "https://instagram.com/diary.sejiwa",
    // Nama folder berbeda dengan slug (typo lama di folder)
    folderName:  "diarysejiwa",
  },
  {
    id:          "diarygraduation",
    slug:        "diary-graduation",
    // Nama folder foto: public/images/diarygraduation/
    // File kolase:      public/images/diarygraduation/kolase-*.jpg
    name:        "Diary Graduation",
    tagline:     "Graduation Photography",
    year:        "Est. 2022",
    description: "Years of dedication, one unforgettable milestone. Diary Graduation frames your achievement with elegance — solo portraits, family moments, and candid celebrations that you'll carry for a lifetime.",
    services:    ["Foto Wisuda", "Family Portraits", "Studio Session"],
    count:       "200+ Graduation Clients",
    instagram:   "https://instagram.com/diarygraduation",
  },
];

const TOTAL  = brands.length;
const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

// Jumlah minimum slot yang selalu ditampilkan di kolase.
// Jika file kurang dari 3, sistem akan otomatis menempatkan placeholder agar layout tetap rapi.
const MIN_SLOTS = 3;

// ── PhotoSlot — slot foto tunggal di kolase ───────────────────────────────────
// Menampilkan foto nyata (jika src ada) atau placeholder gelap (jika null).
function PhotoSlot({ src, label, index }: { src: string | null; label: string; index: number }) {
  const shades = ["#161616", "#1e1e1e", "#1a1a1a"];
  if (src) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={withVersion(src)}
          alt={label}
          fill
          sizes="(max-width: 768px) 50vw, 30vw"
          className="object-cover"
          quality={90}
          unoptimized
        />
      </div>
    );
  }
  // Placeholder — tampil saat foto belum ada
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: shades[index % shades.length] }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
        {label}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function GallerySection() {
  // State utama slider:
  // - current = brand yang sedang aktif
  // - dir = arah pergeseran (next/prev)
  // - autoRef = timer auto-slide
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);
  const autoRef               = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX                = useRef(0);

  // photosMap menyimpan hasil fetch foto kolase per brand-id
  // key: brand.id, value: array src string
  const [photosMap, setPhotosMap] = useState<Record<string, PhotoEntry[]>>({});

  // ── Fetch foto kolase dari API saat komponen pertama kali mount ──────────────
  // API /api/photos?brand=<folderName> membaca folder public/images/<folderName>/
  // dan mengembalikan list file kolase (prefix "kolase-") secara otomatis.
  useEffect(() => {
    brands.forEach(async (brand) => {
      // Gunakan folderName jika ada (untuk Diary Sejiwa yang foldernya berbeda)
      const folder = (brand as typeof brands[0] & { folderName?: string }).folderName ?? brand.id;
      try {
        const res  = await fetch(`/api/photos?brand=${folder}`, { cache: "no-store" });
        const data = await res.json() as { kolase: string[]; grid: string[] };

        // Buat array PhotoEntry — minimal MIN_SLOTS slot
        const kolaseSrcs = data.kolase ?? [];
        const slots: PhotoEntry[] = [];

        for (let i = 0; i < Math.max(MIN_SLOTS, kolaseSrcs.length); i++) {
          const src = kolaseSrcs[i];
          slots.push({
            src:   src ? withVersion(src) : null, // force browser reload saat file baru diganti
            label: `Photo ${i + 1}`,
          });
        }

        setPhotosMap((prev) => ({ ...prev, [brand.id]: slots }));
      } catch {
        // Jika fetch gagal, isi semua slot dengan placeholder
        const fallback: PhotoEntry[] = Array.from({ length: MIN_SLOTS }, (_, i) => ({
          src:   null,
          label: `Photo ${i + 1}`,
        }));
        setPhotosMap((prev) => ({ ...prev, [brand.id]: fallback }));
      }
    });
  }, []);

  // ── Navigasi slider ──────────────────────────────────────────────────────────
  const goTo   = useCallback((idx: number, direction: number) => { setDir(direction); setCurrent(idx); }, []);
  const goNext = useCallback(() => goTo((current + 1) % TOTAL, 1),  [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + TOTAL) % TOTAL, -1), [current, goTo]);

  // Auto-play — ganti slide setiap 6 detik
  useEffect(() => {
    autoRef.current = setInterval(goNext, 6000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [goNext]);

  const pause  = () => { if (autoRef.current) clearInterval(autoRef.current); };
  const resume = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(goNext, 6000);
  }, [goNext]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) diff > 0 ? goNext() : goPrev();
  };

  const brand  = brands[current];
  const photos = photosMap[brand.id] ?? Array.from({ length: MIN_SLOTS }, (_, i) => ({ src: null, label: `Photo ${i + 1}` }));
  const is4    = photos.length === 4;

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center:              ({ opacity: 1, x: 0 }),
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-white border-t border-[#ebebeb]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#aaa] mb-3">Catalogue</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">Our Brands</h2>
          </div>
          <p className="hidden md:block text-sm font-medium tabular-nums" style={{ color: "#ccc" }}>
            <span className="text-[#0a0a0a] font-black">{String(current + 1).padStart(2, "0")}</span>
            {" / "}{String(TOTAL).padStart(2, "0")}
          </p>
        </div>

        {/* ── Slide ──────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={brand.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SPRING}
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

              {/* LEFT — teks brand ────────────────────────────────────────── */}
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-black tracking-widest" style={{ color: "#ccc" }}>
                      {String(current + 1).padStart(2, "0")}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase" style={{ background: "#f4f4f4", color: "#888" }}>
                      {brand.year}
                    </span>
                  </div>
                  <h3 className="font-black tracking-tight leading-[0.92] mb-3" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", color: "#0a0a0a" }}>
                    {brand.name}
                  </h3>
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-7" style={{ color: "#bbb" }}>
                    {brand.tagline}
                  </p>
                  <p className="text-[#5a5a5a] text-[0.93rem] leading-[1.75] mb-8 max-w-[420px]">
                    {brand.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {brand.services.map((s) => (
                      <span key={s} className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ border: "1px solid #e8e8e8", color: "#6b6b6b", background: "#fafafa" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-semibold tracking-wide" style={{ color: "#aaa" }}>{brand.count}</p>
                </div>

                {/* Tombol See All Photos */}
                <div>
                  <Link
                    href={`/catalogue/${brand.slug}`}
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold transition-all"
                    style={{ background: "#0a0a0a", color: "#fff" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2e2e2e"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0a0a0a"; }}
                  >
                    See All Photos
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* RIGHT — kolase foto ─────────────────────────────────────── */}
              {/* Layout berubah otomatis: 4 foto = 2×2, 3 foto = asimetris  */}
              <div
                className="gap-3"
                style={{
                  display:               "grid",
                  gridTemplateColumns:   "repeat(2, 1fr)",
                  gridTemplateRows:      "repeat(2, 1fr)",
                  height:                "clamp(300px, 40vw, 500px)",
                }}
              >
                {is4 ? (
                  // Layout 2×2 — semua slot equal
                  photos.map((p, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl overflow-hidden"
                      style={{ border: "1px solid #f0f0f0" }}
                    >
                      <PhotoSlot src={p.src} label={p.label} index={i} />
                      {/* Overlay "View All" di slot terakhir */}
                      {i === photos.length - 1 && (
                        <Link
                          href={`/catalogue/${brand.slug}`}
                          className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity"
                          style={{ background: "rgba(0,0,0,0.55)" }}
                        >
                          <span className="text-white text-[10px] font-bold tracking-widest uppercase">View All</span>
                          <ArrowRight size={10} className="text-white" />
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  // Layout asimetris: slot 0 besar (row-span-2), slot 1 & 2 kecil
                  <>
                    <div className="row-span-2 rounded-2xl overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
                      <PhotoSlot src={photos[0]?.src ?? null} label={photos[0]?.label ?? ""} index={0} />
                    </div>
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
                      <PhotoSlot src={photos[1]?.src ?? null} label={photos[1]?.label ?? ""} index={1} />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
                      <PhotoSlot src={photos[2]?.src ?? null} label={photos[2]?.label ?? ""} index={2} />
                      <Link
                        href={`/catalogue/${brand.slug}`}
                        className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.55)" }}
                      >
                        <span className="text-white text-[10px] font-bold tracking-widest uppercase">View All</span>
                        <ArrowRight size={10} className="text-white" />
                      </Link>
                    </div>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigasi bawah ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-14 pt-8 border-t border-[#f0f0f0]">
          {/* Brand tabs */}
          <div className="flex items-center gap-6 md:gap-10">
            {brands.map((b, i) => (
              <button
                key={b.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className="flex flex-col items-start gap-1.5 transition-all"
                style={{ opacity: i === current ? 1 : 0.3 }}
              >
                <span className="block h-px transition-all duration-300" style={{ width: i === current ? 28 : 14, background: "#0a0a0a" }} />
                <span className="text-[11px] font-semibold tracking-wide text-[#0a0a0a] leading-none">{b.name}</span>
              </button>
            ))}
          </div>

          {/* Tombol panah */}
          <div className="flex items-center gap-2">
            <button onClick={goPrev} aria-label="Previous" className="w-10 h-10 rounded-full flex items-center justify-center transition-all" style={{ border: "1px solid #e4e4e4", background: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.borderColor = "#0a0a0a"; (e.currentTarget.firstElementChild as SVGElement).style.stroke = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e4e4e4"; (e.currentTarget.firstElementChild as SVGElement).style.stroke = "#0a0a0a"; }}
            >
              <ChevronLeft size={16} stroke="#0a0a0a" />
            </button>
            <button onClick={goNext} aria-label="Next" className="w-10 h-10 rounded-full flex items-center justify-center transition-all" style={{ border: "1px solid #e4e4e4", background: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.borderColor = "#0a0a0a"; (e.currentTarget.firstElementChild as SVGElement).style.stroke = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e4e4e4"; (e.currentTarget.firstElementChild as SVGElement).style.stroke = "#0a0a0a"; }}
            >
              <ChevronRight size={16} stroke="#0a0a0a" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
