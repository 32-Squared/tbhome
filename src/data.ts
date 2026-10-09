import type { CollectionData } from './types';

// Card colours (semi-transparent, so the backdrop still shows through the glass).
// Wave drops: very light blue (1) to dark blue (5). Beach square cards: very light yellow to orange,
// left to right. Boardwalk cards: each its own colour.
const CARD = {
  wave: [
    'rgba(200, 235, 255, 0.40)',
    'rgba(140, 200, 245, 0.42)',
    'rgba(80, 150, 225, 0.45)',
    'rgba(40, 95, 190, 0.50)',
    'rgba(20, 50, 140, 0.55)',
  ],
  beach: [
    'rgba(255, 246, 185, 0.34)', // Beach Dreams
    'rgba(255, 232, 130, 0.34)', // Summer Postcards
    'rgba(255, 212, 90, 0.36)', // Behind the Sunscreen
    'rgba(255, 170, 60, 0.38)', // Add It Up
    'rgba(255, 130, 40, 0.40)', // On the Horizon
  ],
  purple: 'rgba(150, 105, 220, 0.32)', // Visitor Center, Malecón Plaza
  yellow: 'rgba(255, 205, 70, 0.30)', // Information Kiosk
  green: 'rgba(150, 225, 160, 0.36)', // Dry Off
  red: 'rgba(215, 60, 60, 0.40)', // 32 Squared
};

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
      phosphene: { filename: 'enjin.webp', motion: 'spin' },
      cardColor: CARD.purple,
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
      phosphene: { filename: 'fly.webp', motion: 'fly' },
      cardColor: CARD.red,
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
      phosphene: { filename: 'balloon.webp', motion: 'balloon' },
      cardColor: CARD.purple,
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
      cardColor: CARD.yellow,
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
      phosphene: { filename: 'fluff.webp', motion: 'fluff' },
      cardColor: CARD.green,
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
      shape: 'square',
      cardArt: 'golden.webp',
      cardColor: CARD.beach[0],
      homeCorner: 'right',
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
      cardColor: CARD.wave[0],
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
      shape: 'square',
      cardArt: 'delivered.webp',
      cardColor: CARD.beach[1],
      homeCorner: 'right',
      intro: '32 Turtleboards\nfrom 32 Squared',
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
      cardColor: CARD.wave[1],
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
      phosphene: { filename: 'bubble.webp', motion: 'bubble' },
      shape: 'square',
      cardArt: 'specs.webp',
      cardColor: CARD.beach[2],
      homeCorner: 'right',
      intro: 'How do you create a million surfboards?',
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
      cardColor: CARD.wave[2],
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
      shape: 'square',
      cardArt: 'tallies.webp',
      cardColor: CARD.beach[3],
      homeCorner: 'right',
      intro: 'All the numbers behind the process.',
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
      cardColor: CARD.wave[3],
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
      shape: 'square',
      cardArt: 'arcane.webp',
      cardColor: CARD.beach[4],
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
      cardColor: CARD.wave[4],
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
