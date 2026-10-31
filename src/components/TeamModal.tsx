"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { founders } from "@/data";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" />
    </svg>
  );
}

interface Props { open: boolean; onClose: () => void; }

export default function TeamModal({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-[4%] bottom-[4%] z-[70] max-w-2xl mx-auto overflow-y-auto rounded-2xl bg-white border border-[#e4e4e4] shadow-2xl"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-7 py-4 bg-white/95 backdrop-blur border-b border-[#f0f0f0]">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9a9a9a] mb-0.5">Full Profiles</p>
                <h2 className="text-lg font-bold text-[#0a0a0a]">The People Behind RAYFILM</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#e4e4e4] flex items-center justify-center text-[#6b6b6b] hover:bg-[#f2f2f2] transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content */}
            <div className="px-7 py-7 flex flex-col gap-8">
              {founders.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex flex-col sm:flex-row gap-5 ${
                    i < founders.length - 1 ? "pb-8 border-b border-[#f0f0f0]" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-xl overflow-hidden bg-[#f2f2f2] border border-[#e8e8e8]">
                    {f.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={f.photo} alt={f.name} className="w-full h-full object-contain object-center bg-[#f2f2f2]" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User size={32} className="text-[#c8c8c8]" />
                      </div>
                    )}
                  </div>
                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-[#0a0a0a]">{f.name}</h3>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a9a9a] mt-0.5">{f.role}</p>
                      </div>
                      <a
                        href={f.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#f2f2f2] border border-[#e4e4e4] flex items-center justify-center text-[#6b6b6b] hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all"
                      >
                        <InstagramIcon size={14} />
                      </a>
                    </div>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed mt-2 mb-3">{f.fullBio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {f.skills.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#f2f2f2] border border-[#e8e8e8] text-[#6b6b6b]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
