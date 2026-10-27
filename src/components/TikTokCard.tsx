/**
 * KOMPONEN: TikTokCard
 * ====================
 * Kartu TikTok yang pakai embed resmi TikTok biar cover dan klik-nya sama persis seperti TikTok asli.
 */

"use client";

import { useEffect } from "react";
import type { TikTokVideo } from "@/data/videos";

function getTikTokHandle(url: string) {
  const match = url.match(/https:\/\/www\.tiktok\.com\/(@[^/]+)\/video\//);
  return match ? match[1] : "@tiktok";
}

export function TikTokCard({ video }: { video: TikTokVideo }) {
  const handle = getTikTokHandle(video.tiktokEmbedUrl);

  useEffect(() => {
    const scriptId = "tiktok-embed-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        aspectRatio: "9 / 16",
        borderRadius: "18px",
        background: "#111111",
        cursor: "pointer",
        transform: "translateZ(0)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px) scale(1.01)";
        el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onClick={() => window.open(video.tiktokEmbedUrl, "_blank", "noopener,noreferrer")}
    >
      <blockquote
        className="tiktok-embed"
        cite={video.tiktokEmbedUrl}
        data-video-id={video.id}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          margin: 0,
          borderRadius: "18px",
          overflow: "hidden",
          background: "#111111",
          display: "block",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "none",
          padding: 0,
          outline: "none",
        }}
      >
        <section style={{ display: "none" }}>
          <a target="_blank" rel="noreferrer" title={handle} href={`${video.tiktokEmbedUrl}?refer=embed`}>{handle}</a>
        </section>
      </blockquote>
    </div>
  );
}
