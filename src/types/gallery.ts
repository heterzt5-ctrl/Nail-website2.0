export interface GalleryItem {
  id: string;
  src: string;
  storage_path: string;
  type: 'image' | 'video';
  thumbnail?: string | null;
  category: string;
  title: string;
  description: string;
  span: 'tall' | 'short';
  is_trending: boolean;
  tags: string; // JSON string array
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const GALLERY_CATEGORIES = [
  'French tip',
  'Ombre',
  'Chrome',
  'Cat eye',
  '3D floral',
  'Character',
  'Nail art',
  'Glass Nails',
  'Chrome Luxe',
  'Bridal',
  'Minimalist',
  'Marble Luxe',
  'Botanical',
  'Crystal',
  'Interior',
  'Uncategorized',
] as const;

export type GalleryCategory = typeof GALLERY_CATEGORIES[number];
