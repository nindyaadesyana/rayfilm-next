export type TikTokVideo = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  description: string;
  tags: string[];
  thumbnail: string;
  tiktokEmbedUrl: string;
};

export const videos: TikTokVideo[] = [
  {
    id: "7064916397859540225",
    title: "Behind The Scene - Brand Campaign",
    client: "Jenius",
    category: "Commercial Video",
    year: "2025",
    duration: "45 Seconds",
    description:
      "A cinematic behind-the-scenes production showcasing the creative process, directing, lighting, and final commercial footage produced by Rayfilm.",
    tags: ["Commercial", "Branding", "Social Media", "Cinematic"],
    thumbnail: "/images/rayfilm/DSC08264.JPG",
    tiktokEmbedUrl: "https://www.tiktok.com/@jeniusconnect/video/7064916397859540225",
  },
  {
    id: "7063051895077752066",
    title: "Creative Launch Reel",
    client: "Jenius",
    category: "Brand Story",
    year: "2025",
    duration: "30 Seconds",
    description:
      "Fast-moving brand storytelling crafted to highlight product value, human emotion, and visually rich social-first content.",
    tags: ["Brand Story", "Short Form", "Campaign", "Reel"],
    thumbnail: "/images/rayfilm/DSCF6413.JPG",
    tiktokEmbedUrl: "https://www.tiktok.com/@jeniusconnect/video/7063051895077752066",
  },
  {
    id: "7059366096830221569",
    title: "Product Feature in Motion",
    client: "Jenius",
    category: "Product Video",
    year: "2024",
    duration: "40 Seconds",
    description:
      "An energetic product showcase mixing motion graphics, close-ups, and quick transitions that keep the message clear and memorable.",
    tags: ["Product", "Motion", "Social", "Marketing"],
    thumbnail: "/images/rayfilm/DSCF6696.JPG",
    tiktokEmbedUrl: "https://www.tiktok.com/@jeniusconnect/video/7059366096830221569",
  },
  {
    id: "6888668975161511169",
    title: "Campaign Highlight",
    client: "Grab",
    category: "Commercial Video",
    year: "2024",
    duration: "48 Seconds",
    description:
      "An editorial-style campaign clip with polished storytelling, premium lighting, and dynamic pacing for digital audiences.",
    tags: ["Commercial", "Campaign", "Editorial", "Digital"],
    thumbnail: "/images/rayfilm/DSCF7386.JPG",
    tiktokEmbedUrl: "https://www.tiktok.com/@grabid/video/6888668975161511169",
  },
];
