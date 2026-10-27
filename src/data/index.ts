export interface Founder {
  id: number;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  skills: string[];
  instagram: string;
  photo: string | null;
}

export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  bg: string; // CSS background for placeholder card
}

export interface MuseumWork {
  id: number;
  title: string;
  credit: string;
  year: string;
  description: string;
}

export type MuseumCategory = "prewed" | "wisuda" | "event";

// Data founder ini dipakai di section About Us.
// Fungsi utama: menampung nama, role, bio singkat, dan foto tiap orang agar UI bisa menampilkan profil dengan konsisten.
export const founders: Founder[] = [
  {
    id: 1,
    name: "Maulana Muhammad Rayhan",
    role: "Founder & Head of Photography",
    shortBio: "Visionary filmmaker with 8+ years crafting cinematic experiences across weddings, commercials, and cultural events.",
    fullBio: "Maulana Muhammad Rayhan is the visual mind behind RAYFILM, leading its photographic direction and shaping the visual identity of every project. With over five years of experience in photography and visual storytelling, he specializes in capturing authentic moments through a thoughtful balance of light, composition, and emotion.From intimate prewedding sessions to weddings and diverse creative projects, his approach goes beyond documenting moments — it is about preserving the atmosphere, the subtle details, and the emotions that make every story unique. Driven by a keen eye for detail and a passion for visual expression, he strives to create imagery that feels timeless, intentional, and deeply personal.",
    skills: ["Cinematic Direction", "Color Grading", "Narrative Editing", "Drone Cinematography", "Documentary"],
    instagram: "https://instagram.com/rayhancoo",
    photo: "/images/aboutus/founder.jpeg",
  },
  {
    id: 2,
    name: "Ilham Raihan Wiguna",
    role: "Co-Founder & Creative Director",
    shortBio: "Strategic producer managing productions from concept to final delivery with precision and elegance.",
    fullBio: "A Communication Science graduate and Master of Management student specializing in marketing based in Semarang. Focusing on videography, motion graphics, digital marketing campaigns, and project management, Raihan has created company profiles, commercial advertisements, and event documentations.",
    skills: ["videography", "motion graphics", "Cinematographer", "Motion Graphic", "⁠Advertising", " ⁠Content Creator", "⁠Public Speaking","Project Management"],
    instagram: "https://instagram.com/ilhamraiyhan",
    photo: "/images/aboutus/cofounder.jpeg",
  },
  /*..{
    id: 3,
    name: ".....",
    role: "Co-Founder & Head of Photography",
    shortBio: "Award-winning photographer capturing the silent poetry in every scene — light, shadow, and emotion.",
    fullBio: "Dimas Putra's photography is defined by a poet's sensibility and a technician's precision. He leads RAYFILM's photography department with an aesthetic rooted in the interplay of natural light, authentic emotion, and architectural framing. His editorial work has been featured in regional lifestyle publications, and his event portfolios have been sought after by prominent families and organisations alike.",
    skills: ["Editorial Photography", "Event Coverage", "Portrait Lighting", "Studio Photography", "Retouching"],
    linkedin: "https://linkedin.com",
    photo: null,
  },..*/
];

// Data slider ini dipakai untuk hero carousel atau section yang menampilkan proyek unggulan.
// Setiap item berisi judul, kategori, tahun, dan warna background untuk placeholder card.
export const sliderItems: SlideItem[] = [
  { id: 1, title: "Golden Hour Story",  subtitle: "Prewed · 2025",  category: "Prewed", year: "2025", bg: "#1a1a1a" },
  { id: 2, title: "Wisuda UNDIP 2025",  subtitle: "Wisuda · 2025",  category: "Wisuda", year: "2025", bg: "#2e2e2e" },
  { id: 3, title: "Grand Gala Night",   subtitle: "Event · 2024",   category: "Event",  year: "2024", bg: "#3a3a3a" },
  { id: 4, title: "Beach Romance",      subtitle: "Prewed · 2025",  category: "Prewed", year: "2025", bg: "#252525" },
  { id: 5, title: "Academic Milestone", subtitle: "Wisuda · 2024",  category: "Wisuda", year: "2024", bg: "#323232" },
  { id: 6, title: "Corporate Summit",   subtitle: "Event · 2024",   category: "Event",  year: "2024", bg: "#1e1e1e" },
];

// Fungsi ini membuat data karya untuk tiap kategori (prewed, wisuda, event).
// Tujuannya supaya format data konsisten dan mudah ditampilkan di halaman museum/portfolio.
const makeWorks = (cat: string, items: { title: string; desc: string }[]): MuseumWork[] =>
  items.map((t, i) => ({
    id: i + 1,
    title: t.title,
    credit: `RAYFILM Studio · ${cat}`,
    year: i % 3 === 0 ? "2025" : "2024",
    description: t.desc,
  }));

export const museumData: Record<MuseumCategory, { label: string; works: MuseumWork[] }> = {
  prewed: {
    label: "Prewed",
    works: makeWorks("Prewed", [
      { title: "Garden Waltz",       desc: "A soft morning in the botanical gardens." },
      { title: "By the Shoreline",   desc: "Waves, sand, and two people in time." },
      { title: "Golden Canopy",      desc: "Autumn light through a bamboo forest." },
      { title: "Urban Romance",      desc: "City streets as a love letter backdrop." },
      { title: "Misty Valley",       desc: "Morning fog on the highlands of Java." },
      { title: "The White Frame",    desc: "Minimalist studio session, raw emotion." },
      { title: "Lakeside Dusk",      desc: "Still water reflecting the last sunset." },
      { title: "Between the Pines",  desc: "Depth and warmth among the trees." },
      { title: "Rooftop at Six",     desc: "City lights begin to flicker awake." },
      { title: "The Long Road",      desc: "An empty road, two hearts, one future." },
      { title: "Bloom",              desc: "A field of white blooms at golden hour." },
      { title: "Cobblestone Lane",   desc: "Old-town charm and modern love." },
      { title: "Rain & Laughter",    desc: "Impromptu rain; the best kind of joy." },
      { title: "Hillside Embrace",   desc: "Overlooking a valley in embrace." },
      { title: "Afternoon Dance",    desc: "Spontaneous movement, captured still." },
      { title: "Café Afternoon",     desc: "Warm light and a shared espresso." },
      { title: "Silhouette",         desc: "Two forms against a burning horizon." },
      { title: "Paper Lanterns",     desc: "Light rising into a dark sky together." },
      { title: "Morning Proposal",   desc: "The quiet moment before forever." },
      { title: "Barefoot on Grass",  desc: "Simple joy, nothing more needed." },
    ]),
  },
  wisuda: {
    label: "Wisuda",
    works: makeWorks("Wisuda", [
      { title: "Cap & Gown",         desc: "The moment a name is called out loud." },
      { title: "First Chapter",      desc: "A degree in hand, a world ahead." },
      { title: "Parents' Pride",     desc: "The look in their eyes says everything." },
      { title: "The Scroll",         desc: "A rolled certificate, years of work." },
      { title: "After the Aisle",    desc: "Walking out into the afternoon light." },
      { title: "Best Friends",       desc: "Four years compressed into one frame." },
      { title: "Solo Portrait",      desc: "Just them, the moment, and the future." },
      { title: "The Toss",           desc: "Caps fill the air with celebration." },
      { title: "Family Frame",       desc: "Three generations, one milestone." },
      { title: "Late Afternoon",     desc: "Campus corridors, slanting gold light." },
      { title: "The Garden Walk",    desc: "Post-ceremony stroll through campus." },
      { title: "Studio Classic",     desc: "Clean background, unmistakable dignity." },
      { title: "Thesis Survivor",    desc: "Resilience earned, now celebrated." },
      { title: "Book of Days",       desc: "A yearbook come to life in one image." },
      { title: "Squad Goals",        desc: "The whole cohort, all grinning wide." },
      { title: "Evening Glow",       desc: "The campus at dusk after the ceremony." },
      { title: "Candid Joy",         desc: "Unposed, un-directed, wholly real." },
      { title: "High Contrast",      desc: "Bold shadows and bright faces." },
      { title: "Detail Shot",        desc: "The tassel, the ring, the hands." },
      { title: "Till Next Time",     desc: "Walking away, carrying everything." },
    ]),
  },
  event: {
    label: "Event",
    works: makeWorks("Event", [
      { title: "Grand Opening",      desc: "Ribbons cut, futures begin." },
      { title: "Stage Lights",       desc: "A speaker, a room, an idea ignites." },
      { title: "The Reception",      desc: "Glasses raised, stories shared." },
      { title: "Panel Discussion",   desc: "Minds in conversation." },
      { title: "Concert Row",        desc: "A thousand faces lit by the stage." },
      { title: "Corporate Gala",     desc: "Elegance and achievement converge." },
      { title: "Fashion Show",       desc: "Movement as art, fabric as language." },
      { title: "Charity Dinner",     desc: "Generosity dressed in its finest." },
      { title: "Award Night",        desc: "The handshake, the trophy, the smile." },
      { title: "Community Fest",     desc: "Culture alive in the open air." },
      { title: "Tech Summit",        desc: "Ideas on a screen, change in the air." },
      { title: "Night Market",       desc: "Warm lights and wonderful chaos." },
      { title: "Networking Mixer",   desc: "Where futures find each other." },
      { title: "Product Launch",     desc: "A reveal captured at its best angle." },
      { title: "Art Exhibition",     desc: "Work on walls, guests in wonder." },
      { title: "Graduation Party",   desc: "After the formality, the real joy." },
      { title: "Music Festival",     desc: "Sound, crowd, energy, memory." },
      { title: "Wedding Reception",  desc: "The whole room dancing as one." },
      { title: "Year-End Gala",      desc: "Closing the year with intention." },
      { title: "Sunrise Ceremony",   desc: "The first light of something new." },
    ]),
  },
};
