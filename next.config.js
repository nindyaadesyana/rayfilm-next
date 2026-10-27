/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Matikan optimasi cache bawaan Next.js untuk foto lokal
    // Ini memastikan foto yang diganti di folder public/images/ langsung terbaca
    // tanpa perlu clear cache manual.
    // Cara kerja: Next.js tidak akan cache gambar di-server, selalu baca file terbaru.
    minimumCacheTTL: 0,
  },
};

module.exports = nextConfig;
