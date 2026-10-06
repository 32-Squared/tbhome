export type ImageKind = 'board' | 'thumb' | 'webm';

export type PanelDirection = 'left' | 'right' | 'landing';

export type ExpansionType =
  | 'beach-dreams'
  | 'behind-sunscreen'
  | 'summer-postcards'
  | 'add-it-up'
  | 'featured-board'
  | 'text-only';

export interface DecorativeImage {
  slot: number;
  kind: ImageKind;
  filename: string;
  alt: string;
  /** Tailwind size classes, e.g. "w-32 h-32" */
  sizeClass: string;
  /** Position classes, e.g. "top-10 left-8" */
  positionClass: string;
  /** Rotation in degrees */
  rotation?: number;
  /** Animation class */
  floatAnim?: string;
  /** Z-index */
  zIndex?: number;
}

export interface SummerBoard {
  slot: number;
  /** Full-size board image (1:3, tall) — board###.webp */
  filename: string;
  /** Square thumbnail (1:1) — board###-ui.webp */
  thumbFilename: string;
  name: string;
  description: string;
}

export interface FeaturedBoard {
  slot: number;
  filename: string;
  name: string;
  description: string;
}

export interface CategoryPanel {
  id: string;
  title: string;
  subtitle?: string;
  direction: PanelDirection;
  /** Background gradient classes */
  /** Override home icon corner: 'left' or 'right' (defaults based on isLeft) */
  homeCorner?: 'left' | 'right';
  /** Decorative images scattered on this panel */
  decorations?: DecorativeImage[];
  /** Short intro text shown on the panel */
  intro?: string;
  /** Type of expansion when clicked */
  expansionType?: ExpansionType;
  /** Expansion content */
  expansion?: {
    title: string;
    /** For beach-dreams */
    thumbnails?: { slot: number; filename: string; alt: string }[];
    beachDreamsText?: string;
    /** For behind-sunscreen */
    steps?: { slot: number; filename: string; alt: string; title: string; text: string }[];
    /** For summer-postcards */
    boards?: SummerBoard[];
    /** For add-it-up */
    techText?: string;
    /** Decorative images floating inside the expansion (add-it-up) */
    decorations?: DecorativeImage[];
    /** For featured-board */
    featured?: FeaturedBoard;
    /** For text-only */
    bodyText?: string;
  };
}

export interface CollectionData {
  title: string;
  tagline: string;
  artistName: string;
  rightsNotice: string;
  /** Thumbnail marquee images */
  marqueeThumbs: { slot: number; filename: string; alt: string }[];
  /** Left categories (scroll left from landing) */
  leftPanels: CategoryPanel[];
  /** Right categories (scroll right from landing) */
  rightPanels: CategoryPanel[];
}
