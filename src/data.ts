import type { CollectionData } from './types';

// Landing marquee: how many boards scroll past, starting at board401-ui.webp.
// 12 = first dozen; 32 = the whole lineup (401–432). The scroll speed adjusts automatically.
const MARQUEE_FIRST_SLOT = 401;
const MARQUEE_COUNT = 12;

export const collection: CollectionData = {
  title: 'Turtleboards',
  tagline: 'Surf Slow, Enjoy the Ride',
  artistName: '[Artist Name — replace]',
  rightsNotice: 'All artwork is original and created by the artist. All rights reserved.',

  // ─── Thumbnail marquee on the landing panel ───
  // board401-ui.webp … (transparent 1:1 board thumbnails, shown rotated 90° clockwise).
  marqueeThumbs: Array.from({ length: MARQUEE_COUNT }, (_, i) => {
    const n = MARQUEE_FIRST_SLOT + i;
    return { slot: n, filename: `board${n}-ui.webp`, alt: `Turtleboard ${n}` };
  }),

  // ─── LEFT (scroll left from landing) ───
  // Listed nearest-to-Home first. On screen, left to right: Under Construction (edge panel),
  // Dry Off, Information Kiosk, Malecón Plaza, 32 Squared, Visitor Center, Home.
  leftPanels: [
    {
      id: 'visitor-center',
      title: 'Visitor Center',
      subtitle: 'New to Enjin?',
      direction: 'left',
      tint: 'purple',
      intro: 'A simple step-by-step guide to begin collecting NFTs on the Enjin Matrixchain.',
      href: '/guide.html',
      linkLabel: 'Open the Guide',
    },
    {
      id: 'thirty-two-squared',
      title: '32 Squared',
      subtitle: 'Presented by...',
      subtitleItalic: true,
      direction: 'left',
      homeCorner: 'left',
      intro:
        'A chaotic world of ideas, dreams and confusions ultimately pointed towards making all look twice at the world. Maybe even three times.',
      href: '/32-squared.html',
      linkLabel: 'What?',
      decorations: [
        { slot: 101, kind: 'board', filename: 'board-101.webp', alt: 'Decorative board', sizeClass: 'w-28 h-28', positionClass: 'top-12 right-8', rotation: -8, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 102, kind: 'thumb', filename: 'thumb-102.webp', alt: 'Decorative thumb', sizeClass: 'w-20 h-20', positionClass: 'bottom-16 left-10', rotation: 5, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'malecon-plaza',
      title: 'Malecón Plaza',
      subtitle: 'The Whole Party',
      direction: 'left',
      intro: 'Everything going on from the world of 32 Squared on Enjin.',
      linkLabel: 'Setting Up',
      inactive: true, // build the page, then replace this with href: '/…html'
      decorations: [
        { slot: 104, kind: 'board', filename: 'board-104.webp', alt: 'Decorative board', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-12', rotation: 6, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 105, kind: 'thumb', filename: 'thumb-105.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'top-16 left-12', rotation: -12, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'collection-details',
      title: 'Information Kiosk',
      subtitle: 'Official Stuff',
      direction: 'left',
      tint: 'yellow',
      href: '/information-kiosk.html',
      linkLabel: 'Always Open',
      decorations: [
        { slot: 103, kind: 'thumb', filename: 'thumb-103.webp', alt: 'Decorative thumb', sizeClass: 'w-24 h-24', positionClass: 'top-20 left-6', rotation: 10, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'dry-off',
      title: 'Dry Off',
      subtitle: 'The Mainland',
      direction: 'left',
      homeCorner: 'left',
      intro: 'Head inland to check out all the off-chain projects from 32 Squared.',
      linkLabel: 'Road Closed',
      inactive: true, // build the page, then replace this with href: '/…html'
      decorations: [
        { slot: 106, kind: 'board', filename: 'board-106.webp', alt: 'Decorative board', sizeClass: 'w-24 h-24', positionClass: 'top-14 right-10', rotation: -5, floatAnim: 'animate-float-gentle', zIndex: 2 },
      ],
    },
  ],

  // ─── RIGHT (scroll right from landing) ───
  // Order: Beach Dreams, Wave 1, Summer Postcards, Wave 2, Behind the Sunscreen, Wave 3,
  //         Add It Up, Wave 4, On the Horizon, Wave 5 — then the Honu edge panel.
  rightPanels: [
    {
      id: 'beach-dreams',
      title: 'Beach Dreams',
      subtitle: 'The Story',
      direction: 'right',
      homeCorner: 'right',
      tint: 'yellow',
      intro: 'How and Why Turtleboards came to exist.',
      href: '/beach-dreams.html',
      linkLabel: "It's Not Long",
      decorations: [
        { slot: 107, kind: 'board', filename: 'board-107.webp', alt: 'Decorative board', sizeClass: 'w-28 h-28', positionClass: 'top-10 right-6', rotation: -7, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 108, kind: 'thumb', filename: 'thumb-108.webp', alt: 'Decorative thumb', sizeClass: 'w-20 h-20', positionClass: 'bottom-20 left-8', rotation: 8, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'wave-1',
      title: 'Wave One',
      subtitle: 'Summer Postcards',
      direction: 'right',
      shape: 'oval',
      intro: 'Keeping summer alive year round.',
      href: '/wave-1.html',
      linkLabel: 'Surf In',
      decorations: [
        { slot: 112, kind: 'thumb', filename: 'thumb-112.webp', alt: 'Decorative thumb', sizeClass: 'w-20 h-20', positionClass: 'top-14 right-8', rotation: 7, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'summer-postcards',
      title: 'Summer Postcards',
      subtitle: 'The Full Lineup',
      direction: 'right',
      homeCorner: 'right',
      tint: 'yellow',
      intro: 'Have a closer look at all 32 Turtleboards.',
      href: '/postcards.html',
      linkLabel: 'See the Lineup',
      decorations: [
        { slot: 110, kind: 'board', filename: 'board-110.webp', alt: 'Decorative board', sizeClass: 'w-32 h-32', positionClass: 'bottom-10 right-10', rotation: 4, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 111, kind: 'thumb', filename: 'thumb-111.webp', alt: 'Decorative thumb', sizeClass: 'w-20 h-20', positionClass: 'top-16 left-10', rotation: -6, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'wave-2',
      title: 'Wave Two',
      subtitle: 'Leafing Autumn',
      direction: 'right',
      shape: 'oval',
      intro: 'Riding out the sunset vibes.',
      href: '/wave-2.html',
      linkLabel: 'Drop By',
      decorations: [
        { slot: 115, kind: 'board', filename: 'board-115.webp', alt: 'Decorative board', sizeClass: 'w-28 h-28', positionClass: 'bottom-14 left-10', rotation: 5, floatAnim: 'animate-float-gentle', zIndex: 2 },
      ],
    },
    {
      id: 'behind-sunscreen',
      title: 'Behind The Sunscreen',
      subtitle: 'The Factory',
      direction: 'right',
      homeCorner: 'right',
      tint: 'yellow',
      intro: "How do you create a million surfboards? Here's my step-by-step process.",
      href: '/behind-the-sunscreen.html',
      linkLabel: 'Step inside',
      decorations: [
        { slot: 109, kind: 'thumb', filename: 'thumb-109.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'top-12 left-6', rotation: -10, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'wave-3',
      title: 'Wave Three',
      subtitle: 'Iceboards',
      direction: 'right',
      shape: 'oval',
      intro: 'Enjoyment takes on many states.',
      href: '/wave-3.html',
      linkLabel: 'Slide In',
      decorations: [
        { slot: 116, kind: 'thumb', filename: 'thumb-116.webp', alt: 'Decorative thumb', sizeClass: 'w-20 h-20', positionClass: 'top-14 left-8', rotation: -7, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'add-it-up',
      title: 'Add It Up',
      subtitle: 'The Mathematics',
      direction: 'right',
      homeCorner: 'right',
      intro: 'Specific numbers behind the not-so-complicated selection process.',
      href: '/add-it-up.html',
      linkLabel: "It's Simple",
      decorations: [
        { slot: 113, kind: 'board', filename: 'board-113.webp', alt: 'Decorative board', sizeClass: 'w-24 h-24', positionClass: 'top-16 left-8', rotation: -8, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 114, kind: 'thumb', filename: 'thumb-114.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'bottom-16 right-12', rotation: 10, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'wave-4',
      title: 'Wave Four',
      subtitle: 'Spring in Session',
      direction: 'right',
      homeCorner: 'right',
      shape: 'oval',
      intro: 'Expectation is a forward force.',
      href: '/wave-4.html',
      linkLabel: 'Roll Through',
      hidden: false, // set to true to hide until this wave rotates in
    },
    {
      id: 'on-the-horizon',
      title: 'On the Horizon',
      subtitle: 'The Sun Never Sets',
      direction: 'right',
      intro: "There's still more planned on this itinerary.",
      href: '/on-the-horizon.html',
      linkLabel: 'Gaze Ahead',
      decorations: [
        { slot: 117, kind: 'board', filename: 'board-117.webp', alt: 'Decorative board', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-12', rotation: 6, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 118, kind: 'thumb', filename: 'thumb-118.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'top-16 left-12', rotation: -12, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'wave-5',
      title: 'Wave Five',
      subtitle: 'Celebrate Summer',
      direction: 'right',
      homeCorner: 'right',
      shape: 'oval',
      intro: 'Harmony in completion.',
      href: '/wave-5.html',
      linkLabel: 'Check it Out',
      hidden: false, // set to true to hide until this wave rotates in
    },
  ],
};

// Panels marked hidden: true stay in the data but are left out of the scroll until they rotate in.
collection.rightPanels = collection.rightPanels.filter((p) => !p.hidden);
