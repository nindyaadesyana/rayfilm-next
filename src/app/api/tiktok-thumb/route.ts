/**
 * API ROUTE: /api/tiktok-thumb?url=<tiktok-url>
 * ================================================
 * Fetch thumbnail resmi dari TikTok oEmbed API.
 * Dipanggil dari client (TikTokCard) saat komponen mount.
 *
 * TikTok oEmbed API: https://www.tiktok.com/oembed?url=<video-url>
 * Returns: { thumbnail_url, title, author_name, ... }
 */

import { NextRequest, NextResponse } from "next/server";

function extractThumbnailFromHtml(html: string): string | null {
  const matches = html.matchAll(/https?:\/\/[^\"\'\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\"\'\s>]+)?/gi);
  const urls = Array.from(matches, (m) => m[0].replace(/&amp;/g, "&"));

  return urls.find((item) => item.includes("tiktokcdn") || item.includes("tiktok")) ?? urls[0] ?? null;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    const oembedRes = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Referer": "https://www.tiktok.com/",
        },
        cache: "no-store",
      }
    );

    if (oembedRes.ok) {
      const data = await oembedRes.json() as { thumbnail_url?: string; title?: string };
      if (data.thumbnail_url) {
        return NextResponse.json({
          thumbnail_url: data.thumbnail_url,
          title: data.title ?? null,
        });
      }
    }

    const videoId = url.match(/\/video\/(\d+)/)?.[1];
    if (!videoId) {
      return NextResponse.json({ thumbnail_url: null, title: null }, { status: 200 });
    }

    const embedRes = await fetch(`https://www.tiktok.com/embed/v2/${videoId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.tiktok.com/",
      },
      cache: "no-store",
    });

    if (!embedRes.ok) {
      return NextResponse.json({ thumbnail_url: null, title: null }, { status: 200 });
    }

    const embedHtml = await embedRes.text();
    const thumbnailUrl = extractThumbnailFromHtml(embedHtml);

    return NextResponse.json({
      thumbnail_url: thumbnailUrl ?? null,
      title: null,
    });
  } catch {
    return NextResponse.json({ thumbnail_url: null, title: null }, { status: 200 });
  }
}
