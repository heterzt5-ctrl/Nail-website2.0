export interface SiteConfig {
  language: string;
  brandName: string;
  copyright: string;
}

export interface NavigationConfig {
  infoLinkLabel: string;
}

export interface ContactEntry {
  label: string;
  value: string;
  href?: string;
}

export interface InfoPageConfig {
  backLinkLabel: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  contactLabel: string;
  contactEntries: ContactEntry[];
}

export interface OverlayConfig {
  frameDetailLabel: string;
  fileLabel: string;
  seriesLabel: string;
  closeLabel: string;
}

export interface ImageItem {
  src: string;
  category: string;
  title: string;
  description: string;
}

export interface GalleryConfig {
  images: ImageItem[];
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "REMY MUSE",
  copyright: "© 2025 REMY MUSE Nail Studio. All rights reserved.",
};

export const navigationConfig: NavigationConfig = {
  infoLinkLabel: "Studio",
};

export const infoPageConfig: InfoPageConfig = {
  backLinkLabel: "Gallery",
  eyebrow: "About — Luxury Nail Art Studio",
  title: "Where precision meets artistry. Every detail, designed for you.",
  paragraphs: [
    "REMY MUSE is a luxury nail studio dedicated to the art of fine manicure. We blend timeless elegance with contemporary trends, creating bespoke nail designs that elevate your personal style. Each visit is an experience — from the moment you step through our doors to the final polish.",
    "Our studio features AI-powered design consultation, AR virtual try-on technology, and smart scheduling to ensure seamless, personalized service. We source only premium, non-toxic products and maintain the highest standards of hygiene and craftsmanship.",
    "Founded on the belief that beauty should be both luxurious and conscious, REMY MUSE offers a sanctuary where artistry and innovation converge. Whether you seek a classic French manicure or an avant-garde statement piece, our master technicians bring your vision to life.",
  ],
  contactLabel: "Connect",
  contactEntries: [
    {
      label: "Book",
      value: "Book Online",
      href: "https://remymuse.studio/book",
    },
    {
      label: "Email",
      value: "hello@remymuse.studio",
      href: "mailto:hello@remymuse.studio",
    },
    {
      label: "Phone",
      value: "+1 (212) 555-0187",
      href: "tel:+12125550187",
    },
    {
      label: "Location",
      value: "128 Mercer Street, SoHo\nNew York, NY 10012",
    },
    {
      label: "Hours",
      value: "Mon – Sat: 10:00 – 20:00\nSun: 11:00 – 18:00",
    },
    {
      label: "Instagram",
      value: "@remymuse.studio",
      href: "https://instagram.com/remymuse.studio",
    },
  ],
};

export const overlayConfig: OverlayConfig = {
  frameDetailLabel: "Design Detail",
  fileLabel: "File",
  seriesLabel: "Collection",
  closeLabel: "Close",
};

export const galleryConfig: GalleryConfig = {
  images: [
    {
      src: "/images/nail_01.jpg",
      category: "Glass Nails",
      title: "Ethereal — No. 01",
      description: "Translucent jelly nails with liquid chrome waves. A signature REMY MUSE design that captures light and movement, creating an ethereal, glass-like finish that shifts with every gesture.",
    },
    {
      src: "/images/nail_02.jpg",
      category: "Chrome Luxe",
      title: "Gilded — No. 02",
      description: "Pure 24K gold chrome with a French silhouette. Bold yet refined, this design embodies opulence with a mirror-like finish that demands attention in any setting.",
    },
    {
      src: "/images/nail_03.jpg",
      category: "Gold Foil",
      title: "Dust & Gold — No. 03",
      description: "Nude matte base with hand-applied gold leaf fragments. Each nail becomes a canvas of organic luxury, where no two designs are exactly alike.",
    },
    {
      src: "/images/nail_04.jpg",
      category: "Vamp Romantic",
      title: "Merlot — No. 04",
      description: "Deep burgundy with gold swirl accents and layered jewelry. This dramatic, romantic design draws from vintage aesthetics with a modern, editorial edge.",
    },
    {
      src: "/images/nail_05.jpg",
      category: "Bridal",
      title: "Petals — No. 05",
      description: "Pearl chrome with sculpted 3D floral embellishments. Our most requested bridal design, featuring hand-crafted porcelain flowers and micro-crystal centers.",
    },
    {
      src: "/images/nail_06.jpg",
      category: "Ombre",
      title: "Rosé — No. 06",
      description: "Soft pink-to-white gradient with scattered gold leaf. A delicate, feminine design that transitions seamlessly from day to evening occasions.",
    },
    {
      src: "/images/nail_07.jpg",
      category: "Minimalist",
      title: "Ink — No. 07",
      description: "Bold black geometric line art on a crisp white canvas. Inspired by modernist painting, this minimalist design speaks through its precise, confident strokes.",
    },
    {
      src: "/images/nail_08.jpg",
      category: "Marble Luxe",
      title: "Verde — No. 08",
      description: "Emerald green with hand-painted gold kintsugi veins. A celebration of imperfection and beauty, inspired by the Japanese art of repairing broken pottery with gold.",
    },
    {
      src: "/images/nail_09.jpg",
      category: "Glitter",
      title: "Lilac Dream — No. 09",
      description: "Lavender base with silver glitter ombre and crystal accents. Soft, dreamy, and undeniably glamorous — perfect for special celebrations.",
    },
    {
      src: "/images/nail_10.jpg",
      category: "Botanical",
      title: "Sakura — No. 10",
      description: "Milky white nails with hand-painted cherry blossom branches. Each petal is individually rendered by our master artists for a truly bespoke botanical piece.",
    },
    {
      src: "/images/nail_11.jpg",
      category: "Chrome",
      title: "Rose Gold — No. 11",
      description: "Warm rose gold mirror chrome with delicate stacking rings. The ultimate in understated luxury, this metallic finish flatters every skin tone.",
    },
    {
      src: "/images/nail_12.jpg",
      category: "Animal Print",
      title: "Tortoise — No. 12",
      description: "Amber tortoiseshell pattern with gold micro-flecks. A sophisticated take on animal print that evokes vintage luxury accessories.",
    },
    {
      src: "/images/nail_13.jpg",
      category: "Constellation",
      title: "Midnight — No. 13",
      description: "Navy blue with hand-painted gold constellation patterns. A celestial design that maps the stars onto your fingertips with astronomical precision.",
    },
    {
      src: "/images/nail_14.jpg",
      category: "Pearl",
      title: "Velvet Pearl — No. 14",
      description: "Blush pink velvet matte with delicate pearl embellishments. Soft, tactile, and irresistibly feminine — like wearing silk on your nails.",
    },
    {
      src: "/images/nail_15.jpg",
      category: "Holographic",
      title: "Prism — No. 15",
      description: "Full-spectrum holographic chrome that captures every color of the rainbow. A futuristic, show-stopping design for the bold at heart.",
    },
    {
      src: "/images/nail_16.jpg",
      category: "Classic",
      title: "Rouge — No. 16",
      description: "Timeless crimson red with gold half-moon cuticle detail. A modern reinterpretation of the classic Hollywood glamour manicure.",
    },
    {
      src: "/images/nail_17.jpg",
      category: "Line Art",
      title: "Gilded Veins — No. 17",
      description: "Nude pink base with fine gold line art — delicate swirls and micro-dots. Inspired by natural mineral veins, this design is subtle yet intricate.",
    },
    {
      src: "/images/nail_18.jpg",
      category: "Coral",
      title: "Sunset — No. 18",
      description: "Warm coral with gold foil flake accents. A sun-kissed design that brings warmth and vitality, perfect for summer evenings.",
    },
    {
      src: "/images/nail_19.jpg",
      category: "Geometric",
      title: "Slate — No. 19",
      description: "Matte slate grey with silver chrome geometric patterns. Sharp, architectural lines meet soft grey tones for a contemporary, urban aesthetic.",
    },
    {
      src: "/images/nail_20.jpg",
      category: "Crystal",
      title: "Champagne — No. 20",
      description: "Gold glitter with Swarovski crystal placement. The ultimate celebration nail — designed for moments when only the most dazzling will do.",
    },
    {
      src: "/images/nail_21.jpg",
      category: "Chain",
      title: "Link — No. 21",
      description: "Dusty mauve with 3D gold chain embellishments. A bold, fashion-forward statement that bridges the gap between jewelry and nail art.",
    },
    {
      src: "/images/nail_22.jpg",
      category: "Metallic",
      title: "Tidal — No. 22",
      description: "Teal base with silver chrome wave patterns. Fluid and dynamic, this design captures the motion of ocean waves in metallic form.",
    },
    {
      src: "/images/nail_23.jpg",
      category: "Botanical",
      title: "Lavender Fields — No. 23",
      description: "Pale lilac with hand-painted lavender sprigs. A serene, pastoral design that brings the tranquility of Provence to your fingertips.",
    },
    {
      src: "/images/nail_24.jpg",
      category: "Dark Luxe",
      title: "Obsidian — No. 24",
      description: "Black matte with gold studded geometric patterns. Powerful, confident, and unapologetically bold — for those who command the room.",
    },
  ],
};
