import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import type { TikTokVideo } from "@/data/videos";
import { VideoControls } from "@/components/VideoControls";

interface TikTokModalProps {
  video: TikTokVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TikTokModal({ video, open, onOpenChange }: TikTokModalProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!open) {
      setExpanded(false);
    }
  }, [open]);

  const openTikTok = () => {
    window.open(video?.tiktokEmbedUrl ?? "", "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  if (!video) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 18 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
              >
                <div
                  className="relative w-full overflow-hidden rounded-[22px] border border-[#e7e7e7] bg-white text-[#111111] shadow-[0_28px_80px_rgba(0,0,0,0.16)]"
                  style={{ maxWidth: expanded ? "760px" : "620px" }}
                >
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close video"
                      className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#e4e4e4] bg-white text-[#111111] shadow-sm transition hover:border-[#d7d7d7] hover:bg-[#f6f6f6]"
                    >
                      <X size={16} />
                    </button>
                  </Dialog.Close>

                  <div className="relative p-3 sm:p-4">
                    <div className="overflow-hidden rounded-[18px] border border-[#ebebeb] bg-[#f7f7f7]">
                      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                        <iframe
                          src={video.tiktokEmbedUrl}
                          title={video.title}
                          className="h-full w-full border-0"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    <div className="px-1 pb-2 pt-4 sm:px-2">
                      <VideoControls
                        expanded={expanded}
                        onToggleExpand={() => setExpanded((current) => !current)}
                        onClose={() => onOpenChange(false)}
                        onPlay={openTikTok}
                      />

                      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[#efefef]">
                        <div className="h-full w-[48%] rounded-full bg-[#e50914]" />
                      </div>

                      <p className="text-right text-[10px] font-medium tracking-[0.18em] text-[#666666] uppercase">
                        48 sec
                      </p>

                      <div className="pt-5">
                        <div className="mb-3 flex flex-wrap items-center gap-3 text-[#444444]">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e50914]">Now Playing</span>
                          <span className="text-[10px] text-[#777777]">{video.year}</span>
                        </div>

                        <h3 className="text-xl font-black tracking-tight text-[#111111] sm:text-2xl">{video.title}</h3>

                        <div className="mt-5 grid gap-3 text-sm text-[#303030] sm:grid-cols-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">Client</p>
                            <p className="mt-1 font-medium text-[#111111]">{video.client}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">Category</p>
                            <p className="mt-1 font-medium text-[#111111]">{video.category}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">Production Year</p>
                            <p className="mt-1 font-medium text-[#111111]">{video.year}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">Duration</p>
                            <p className="mt-1 font-medium text-[#111111]">{video.duration}</p>
                          </div>
                        </div>

                        <div className="mt-5 space-y-4 text-sm text-[#4a4a4a]">
                          <p>{video.description}</p>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {video.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#e9e9e9] bg-[#f7f7f7] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#505050]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
