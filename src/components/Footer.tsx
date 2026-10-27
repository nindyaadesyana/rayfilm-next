/**
 * KOMPONEN: Footer
 * ================
 * Footer paling bawah halaman.
 *
 * CARA UBAH LINK SOSIAL MEDIA:
 * - Edit array `socials` di bawah ini
 * - `href` untuk WhatsApp: "https://wa.me/628XXXXXXXXXX" (ganti nomor)
 * - `href` untuk Instagram: "https://instagram.com/username_akun"
 * - `href` untuk Email: "mailto:email@domain.com"
 *
 * CARA UBAH TEKS TAGLINE FOOTER:
 * - Cari teks "Dream · Create · Inspire" di bagian bawah komponen
 */
"use client";

import { MessageCircle, Mail } from "lucide-react";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const socials = [
  { icon: MessageCircle, href: "https://wa.me/6285848664492",    label: "WhatsApp"  },
  { icon: InstagramIcon, href: "https://instagram.com/rayfilm_", label: "Instagram" },
  { icon: Mail,          href: "mailto:hello@rayfilm.id",         label: "Email"     },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#f0f0f0]">

          {/* Brand */}
          <div>
            <div className="mb-1.5">
              <span className="font-black text-base tracking-[0.18em] text-[#0a0a0a]">RAYFILM  </span>
            </div>
            <div className="mb-1.5">
              <span className="font-black text-base tracking-[0.18em] text-[#0a0a0a]">DIARY SEJIWA</span>
            </div>
            <p className="text-xs text-[#9a9a9a] max-w-[220px] leading-relaxed">
              Production House · Video Ads · TikTok · Reels · Company Profile · Commercial
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[#e4e4e4] flex items-center justify-center text-[#9a9a9a] hover:text-[#0a0a0a] hover:border-[#0a0a0a] transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#c8c8c8]">
            &copy; {new Date().getFullYear()} RAYFILM Production House. All rights reserved.
          </p>
          <p className="text-xs italic text-[#c8c8c8]">Dream · Create · Inspire</p>
        </div>
      </div>
    </footer>
  );
}
