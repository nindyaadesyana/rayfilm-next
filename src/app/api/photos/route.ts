/**
 * API ROUTE: /api/photos?brand=rayfilm
 * =====================================
 * Endpoint ini membaca isi folder foto di dalam public/images/<brand>/
 * secara dinamis saat halaman di-request.
 *
 * CARA KERJA:
 * - Terima query param `brand` (contoh: ?brand=rayfilm)
 * - Baca semua file gambar di folder public/images/<brand>/
 * - Return array path URL yang bisa langsung dipakai <Image src="..." />
 *
 * CARA TAMBAH FOTO:
 * - Cukup taruh file gambar (.jpg/.jpeg/.png/.webp) ke folder:
 *   public/images/<nama-brand>/
 * - Tidak perlu edit kode apapun — foto otomatis muncul saat halaman di-refresh
 *
 * BRAND YANG DIDUKUNG:
 * - rayfilm       → public/images/rayfilm/
 * - diarysejiwa   → public/images/diarysejiwa/
 * - diarygraduation → public/images/diarygraduation/
 *
 * KOLASE vs GRID:
 * - File dengan prefix "kolase-" masuk ke collage di halaman utama
 * - File lain masuk ke grid foto di halaman catalogue
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Menentukan ekstensi file yang dianggap sebagai gambar oleh sistem.
// Tujuannya supaya API hanya membaca file foto yang valid, bukan file lain.
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];

export async function GET(req: NextRequest) {
  // Fungsi ini dipanggil saat komponen galeri fetch ke /api/photos?brand=...
  // Tujuannya adalah membaca isi folder foto tiap brand dan mengirimkan list file yang bisa dipakai di UI.
  const brand = req.nextUrl.searchParams.get("brand");

  if (!brand) {
    return NextResponse.json({ error: "Missing brand param" }, { status: 400 });
  }

  // Prioritaskan folder public/images/<brand>/, lalu fallback ke PICT/<brand>/
  // Ini penting supaya website tetap bisa membaca gambar baru meski asset disimpan di folder sumber.
  const candidates = [
    path.join(process.cwd(), "public", "images", brand),
    path.join(process.cwd(), "PICT", brand),
    path.join(process.cwd(), "PICT", brand, "kolase"),
  ];

  let files: string[] = [];
  let sourceDir = "";

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      sourceDir = candidate;
      try {
        files = fs.readdirSync(candidate);
        break;
      } catch {
        continue;
      }
    }
  }

  if (!sourceDir) {
    return NextResponse.json({ kolase: [], grid: [] });
  }

  // Filter hanya file gambar dan urutkan berdasarkan nomor file untuk konsistensi layout.
  // Tujuannya supaya foto tampil sesuai urutan angka di nama file, bukan mengikuti urutan acak filesystem.
  const images = files
    .filter((f) => IMAGE_EXTS.some((ext) => f.toLowerCase().endsWith(ext.toLowerCase())))
    .sort((a, b) => {
      const getSortValue = (name: string) => {
        const match = name.match(/(\d+)/);
        const number = match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
        const text = name.replace(/\d+/g, "");
        return { number, text };
      };

      const aValue = getSortValue(a);
      const bValue = getSortValue(b);

      if (aValue.number !== bValue.number) {
        return aValue.number - bValue.number;
      }

      return aValue.text.localeCompare(bValue.text);
    });

  const toKolaseUrl = (fileName: string) => {
    if (fileName.startsWith("kolase-")) return `/images/${brand}/${fileName}`;
    return `/images/${brand}/kolase-${fileName}`;
  };

  const toGridUrl = (fileName: string) => `/images/${brand}/${fileName}`;
  const isKolaseSource = sourceDir.endsWith(path.join("PICT", brand, "kolase")) || sourceDir.endsWith("/kolase") || sourceDir.endsWith("\\kolase");

  const kolase = isKolaseSource
    ? images.map((f) => toKolaseUrl(f))
    : images.filter((f) => f.startsWith("kolase-")).map((f) => toKolaseUrl(f));

  const grid = images
    .filter((f) => !f.startsWith("kolase-"))
    .filter((f) => !(isKolaseSource && f))
    .map((f) => toGridUrl(f));

  // Mengirimkan dua kategori file ke frontend:
  // - kolase: foto yang dipakai di homepage / slider brand
  // - grid: foto yang dipakai di halaman catalogue tiap brand
  const response = NextResponse.json({ kolase, grid });

  // Cache dinonaktifkan supaya saat file baru diganti, browser tidak memakai versi lama.
  response.headers.set("Cache-Control", "no-store");
  return response;
}
