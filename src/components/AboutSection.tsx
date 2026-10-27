/**
 * KOMPONEN: AboutSection
 * ======================
 * Menampilkan deskripsi RAYFILM dan profil founder + co-founder.
 *
 * CARA GANTI FOTO FOUNDER / CO-FOUNDER:
 * 1. Siapkan foto baru (disarankan rasio portrait 3:4)
 * 2. Rename:
 *    - Foto founder    → founder.jpeg
 *    - Foto co-founder → cofounder.jpeg
 * 3. Taruh di folder: public/images/aboutus/
 * 4. Foto akan otomatis tampil tanpa perlu edit kode
 *
 * CARA UBAH NAMA / ROLE / BIO FOUNDER:
 * - Edit file: src/data/index.ts
 * - Cari array `founders` dan update field yang diperlukan
 * - Field yang bisa diubah: name, role, shortBio, fullBio, skills, instagram
 *
 * CARA TAMBAH FOUNDER BARU:
 * 1. Tambah foto ke public/images/aboutus/ (contoh: foto3.jpeg)
 * 2. Di src/data/index.ts, tambah objek baru ke array founders:
 *    { id: 3, name: "Nama", role: "Role", ..., photo: "/images/aboutus/foto3.jpeg" }
 * 3. Grid akan otomatis menyesuaikan (hanya founder dengan `photo` yang tampil)
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { founders } from "@/data";
import TeamModal from "./TeamModal";

function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" />
    </svg>
  );
}

// Hanya tampilkan founder yang punya foto.
// Ini mencegah card kosong muncul saat data founder masih tanpa photo.
const activeFounders = founders.filter((f) => f.photo);

// Fungsi ini menambahkan query string unik ke URL gambar agar browser tidak memuat cache lama.
// Tujuannya supaya foto baru langsung terlihat setelah file di folder public diganti.
const withVersion = (src: string) => `${src}${src.includes("?") ? "&" : "?"}v=${Date.now()}`;

export default function AboutSection() {
  // State ini mengontrol modal team agar bisa dibuka dan ditutup saat user klik tombol.
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="about" className="py-28 bg-white border-t border-[#ebebeb]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Brand description */}
          <div className="mb-20 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9a9a9a] mb-4"
            >
              About RAYFILM
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl font-black tracking-tight text-[#0a0a0a] leading-[1.05] mb-5"
            >
              We build visual{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #0a0a0a" }}>
                stories
              </span>{" "}
              that drive real impact.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-[#6b6b6b] text-base leading-relaxed"
            >
              RAYFILM is a premium Indonesian production house dedicated to
              transforming raw emotion into timeless visual narratives. From
              intimate prewedding stories to grand events, academic milestones,
              and commercial video content — we bring vision to life with
              precision, artistry, and soul.
            </motion.p>
          </div>

          {/* Founders */}
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9a9a9a] mb-3">
                THE PEOPLE BEHIND RAYFILM
              </p>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0a0a0a] leading-tight mb-5">
                Meet the<br />Founders
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed mb-8 max-w-xs">
                A team of storytellers, directors, and producers who love
                building moments that make a lasting difference.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a0a0a] text-white text-sm font-semibold hover:bg-[#2e2e2e] transition-all hover:gap-3"
              >
                Know the Team
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Right — 2-column founder cards */}
            <div className="grid grid-cols-2 gap-4">
              {activeFounders.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-white border border-[#e8e8e8] hover:border-[#c8c8c8] hover:shadow-md transition-all duration-300"
                >
                  {/* Photo */}
                  <div className="relative aspect-[3/4] bg-[#f2f2f2] overflow-hidden">
                    <Image
                      src={withVersion(f.photo!)}
                      alt={f.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      quality={90}
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3 flex items-end justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#0a0a0a] leading-snug">{f.name}</p>
                      <p className="text-[11px] text-[#9a9a9a] mt-0.5 leading-snug">
                        {f.role.split("&")[0].trim()}
                      </p>
                    </div>
                    <a
                      href={f.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 ml-2 w-7 h-7 rounded-lg bg-[#f2f2f2] border border-[#e4e4e4] flex items-center justify-center text-[#6b6b6b] hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all"
                    >
                      <InstagramIcon size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <TeamModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
