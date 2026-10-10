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
  green: 'rgba(150, 225, 160, 0.36)', // Dry Off
  red: 'rgba(215, 60, 60, 0.40)', // Information Kiosk
};

// Every card in the Town: asphalt grey
const TOWN_CARD = 'rgba(84, 86, 92, 0.82)';

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
  // Listed nearest-to-Home first. On screen, left to right: The Pier (edge panel),
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
      decorations: [
        { slot: 119, kind: 'thumb', filename: 'radiant.webp', alt: 'Radiant', sizeClass: 'w-16 h-16', positionClass: 'top-12 left-6', rotation: 0, floatAnim: 'animate-float-soft', zIndex: 2, framed: true },
        { slot: 120, kind: 'thumb', filename: 'seascape.webp', alt: 'Seascape', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-6', rotation: -4, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true },
      ],
    },
    {
      id: 'thirty-two-squared',
      title: '32 Squared',
      subtitle: 'Presented by...',
      subtitleItalic: true,
      direction: 'left',
      phosphene: { filename: 'fly.webp', motion: 'fly' },
      cardColor: CARD.beach[0],
      homeCorner: 'left',
      intro:
        'A chaotic world of ideas, dreams and confusions ultimately pointed towards making all look twice at the world. Maybe even three times.',
      href: '/32-squared.html',
      linkLabel: 'What?',
      decorations: [
        { slot: 101, kind: 'board', filename: 'diesel.webp', alt: 'Diesel', sizeClass: 'w-28 h-28', positionClass: 'top-12 right-8', rotation: -8, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 102, kind: 'thumb', filename: 'flies.webp', alt: 'Flies', sizeClass: 'w-20 h-20', positionClass: 'bottom-16', rotation: 5, floatAnim: 'animate-float-soft', zIndex: 2, framed: true, centerX: true },
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
        { slot: 104, kind: 'thumb', filename: 'design.webp', alt: 'Design', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-12', rotation: 6, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true },
        { slot: 105, kind: 'thumb', filename: 'colorific.webp', alt: 'Colorific', sizeClass: 'w-16 h-16', positionClass: 'top-16 left-12', rotation: -12, floatAnim: 'animate-float-soft', zIndex: 2, framed: true },
      ],
    },
    {
      id: 'collection-details',
      title: 'Information Kiosk',
      subtitle: 'Official Stuff',
      direction: 'left',
      cardColor: CARD.red,
      homeCorner: 'bottom-right',
      href: '/information-kiosk.html',
      linkLabel: 'Always Open',
      decorations: [
        { slot: 103, kind: 'thumb', filename: 'meteors.webp', alt: 'Meteors', sizeClass: 'w-24 h-24', positionClass: 'top-20 left-6', rotation: 10, floatAnim: 'animate-float-soft', zIndex: 2, framed: true },
      ],
    },
    {
      id: 'dry-off',
      title: 'Dry Off',
      subtitle: 'The Mainland',
      direction: 'left',
      phosphene: { filename: 'fluff.webp', motion: 'fluff' },
      cardColor: CARD.green,
      homeCorner: 'bottom-left',
      intro: 'Head inland to check out all the off-chain projects from 32 Squared.',
      linkLabel: 'Free Parking',
      branch: 'town', // slides down into the Town scene (see `branches` below)
      decorations: [
        { slot: 106, kind: 'thumb', filename: 'butterflies.webp', alt: 'Butterflies', sizeClass: 'w-24 h-24', positionClass: 'top-14 right-10', rotation: -5, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true },
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
        { slot: 107, kind: 'thumb', filename: 'suns.webp', alt: 'Suns', sizeClass: 'w-28 h-28', positionClass: 'top-10 left-6', rotation: -7, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true },
        { slot: 108, kind: 'thumb', filename: 'flower.webp', alt: 'Flower', sizeClass: 'w-20 h-20', positionClass: 'bottom-20', rotation: 8, floatAnim: 'animate-float-soft', zIndex: 2, framed: true, centerX: true },
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
        { slot: 112, kind: 'thumb', filename: 'wave1card.webp', alt: 'Wave One logo', sizeClass: 'w-28 h-28', positionClass: 'top-14 right-8', rotation: 7, floatAnim: 'animate-float-soft', zIndex: 2 },
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
        { slot: 110, kind: 'thumb', filename: 'boards.webp', alt: 'Boards', sizeClass: 'w-32 h-32', positionClass: 'bottom-10 right-10', rotation: 4, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true },
        { slot: 111, kind: 'thumb', filename: 'swirl.webp', alt: 'Swirl', sizeClass: 'w-20 h-20', positionClass: 'top-16 left-10', rotation: -6, floatAnim: 'animate-float-soft', zIndex: 2, framed: true, spin: 'ccw' },
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
        { slot: 115, kind: 'thumb', filename: 'wave2logo.webp', alt: 'Wave Two logo', sizeClass: 'w-28 h-28', positionClass: 'top-14 right-8', rotation: 5, floatAnim: 'animate-float-gentle', zIndex: 2 },
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
        { slot: 109, kind: 'thumb', filename: 'circle.webp', alt: 'Circle', sizeClass: 'w-16 h-16', positionClass: 'top-12 left-6', rotation: -10, floatAnim: 'animate-float-soft', zIndex: 2, framed: true },
        { slot: 121, kind: 'thumb', filename: 'bloom.webp', alt: 'Bloom', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-6', rotation: 6, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true },
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
        { slot: 116, kind: 'thumb', filename: 'wave3logo.webp', alt: 'Wave Three logo', sizeClass: 'w-28 h-28', positionClass: 'top-14 right-8', rotation: -7, floatAnim: 'animate-float-soft', zIndex: 2 },
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
        { slot: 113, kind: 'thumb', filename: 'lightning.webp', alt: 'Lightning', sizeClass: 'w-24 h-24', positionClass: 'top-16 left-8', rotation: -8, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true, blink: true },
        { slot: 114, kind: 'thumb', filename: 'warp.webp', alt: 'Warp', sizeClass: 'w-16 h-16', positionClass: 'bottom-16 right-12', rotation: 10, floatAnim: 'animate-float-soft', zIndex: 2, framed: true },
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
      linkLabel: 'Roll By',
      hidden: false, // set to true to hide until this wave rotates in
      decorations: [
        { slot: 122, kind: 'thumb', filename: 'wave4logo.webp', alt: 'Wave Four logo', sizeClass: 'w-28 h-28', positionClass: 'top-14 left-8', rotation: -5, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
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
        { slot: 117, kind: 'thumb', filename: 'vista.webp', alt: 'Vista', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-12', rotation: 6, floatAnim: 'animate-float-gentle', zIndex: 2, framed: true },
        { slot: 118, kind: 'thumb', filename: 'rainbow.webp', alt: 'Rainbow', sizeClass: 'w-16 h-16', positionClass: 'top-14 right-6', rotation: -12, floatAnim: 'animate-float-soft', zIndex: 2, framed: true },
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
      linkLabel: 'Check In',
      hidden: false, // set to true to hide until this wave rotates in
      decorations: [
        { slot: 123, kind: 'thumb', filename: 'wave5logo.webp', alt: 'Wave Five logo', sizeClass: 'w-28 h-28', positionClass: 'top-14 left-8', rotation: 5, floatAnim: 'animate-float-gentle', zIndex: 2 },
      ],
    },
  ],

  // ─── BRANCH SCENES: slide-down scenes, opened from a main-scroll panel button with `branch: '<id>'` ───
  // The Town: its own little horizontal scroll under Dry Off. Every Town card is asphalt grey.
  branches: [
    {
      id: 'town',
      origin: 'dry-off',
      panels: [
        {
          id: 'parking',
          title: 'Free Parking',
          direction: 'right',
          cardColor: TOWN_CARD,
          intro: 'Head to the Boardwalk, Beach and Turtleboards.',
          linkLabel: 'Go Surfing!',
          exit: true, // slides back up to Dry Off
          noHome: true,
          phosphene: { filename: 'fluff.webp', motion: 'fluff' },
        },
        {
          id: 'mall',
          title: 'Souvenirs Squared',
          subtitle: 'The Mall',
          direction: 'right',
          cardColor: TOWN_CARD,
          intro: 'Did it really happen without the t-shirt to prove it?',
          linkLabel: 'Opening Soon',
          inactive: true,
        },
        {
          id: 'daycare',
          title: 'Daycare Center',
          subtitle: 'Free Babysitting',
          direction: 'right',
          cardColor: TOWN_CARD,
          intro: 'Some activities for the kid in us, you might want to grab your crayons.',
          href: '/daycare.html',
          linkLabel: 'Take a Break',
          phosphene: { filename: 'balloon.webp', motion: 'balloon' },
        },
        {
          id: 'town-hall',
          title: 'Town Hall',
          direction: 'right',
          cardColor: TOWN_CARD,
          intro: "Someone's got to be in charge, I'm still training the staff.",
          linkLabel: 'Under Construction',
          inactive: true,
          siteMapIcon: true,
          phosphene: [
            { filename: 'fly.webp', motion: 'fly' },
            { filename: 'workerfly.webp', motion: 'fly', durationScale: 2 }, // stays twice as long
          ],
        },
      ],
    },
  ],
};

// Panels marked hidden: true stay in the data but are left out of the scroll until they rotate in.
collection.rightPanels = collection.rightPanels.filter((p) => !p.hidden);
