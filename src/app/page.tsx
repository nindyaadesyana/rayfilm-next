/**
 * HALAMAN UTAMA: /
 * ================
 * File ini adalah root page aplikasi RAYFILM.
 * Semua section disusun di sini secara berurutan dari atas ke bawah.
 *
 * URUTAN SECTION:
 * 1. Navbar       — fixed top bar, muncul setelah scroll melewati hero
 * 2. HeroSection  — full-screen background foto dengan headline
 * 3. AboutSection — profil RAYFILM + foto founder & co-founder
 * 4. ClientsSection — marquee logo klien
 * 5. GallerySection — slider 3 brand catalogue (RAYFILM, Diary Sedjiwa, Diary Graduation)
 * 6. ContactSection — form kontak + info WhatsApp/Instagram/Email
 * 7. Footer       — copyright + sosial media
 *
 * CARA TAMBAH SECTION BARU:
 * 1. Buat file komponen baru di src/components/NamaSection.tsx
 * 2. Import di sini: import NamaSection from "@/components/NamaSection"
 * 3. Tambahkan <NamaSection /> di antara section yang sesuai
 */

import Navbar          from "@/components/Navbar";
import HeroSection     from "@/components/HeroSection";
import AboutSection    from "@/components/AboutSection";
import ClientsSection  from "@/components/ClientsSection";
import GallerySection  from "@/components/GallerySection";
import ContactSection  from "@/components/ContactSection";
import Footer          from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar: muncul saat scroll melewati hero section */}
      <Navbar />

      {/* Hero: background foto fullscreen + headline */}
      <HeroSection />

      {/* About: deskripsi RAYFILM + foto founder */}
      <AboutSection />

      {/* Clients: marquee logo klien — edit di ClientsSection.tsx */}
      <ClientsSection />

      {/* Gallery/Catalogue: slider 3 brand */}
      <GallerySection />

      {/* Contact: form + info kontak */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
