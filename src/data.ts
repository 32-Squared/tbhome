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
  leftPanels: [
    {
      id: 'thirty-two-squared',
      title: '32 Squared',
      subtitle: 'Who shapes these waves',
      direction: 'left',
      homeCorner: 'left',
      intro: '[Placeholder] A short paragraph about the artist — who you are, what inspires your work, and your connection to surf culture and board design.',
      expansionType: 'text-only',
      expansion: {
        title: '32 Squared',
        bodyText: '[Placeholder] Replace this with the full artist bio. Talk about your background, how you got into surfboard art, your creative process, and what drives you to keep making boards. This section scrolls vertically inside the expansion so you can write as much as you like.',
      },
      decorations: [
        { slot: 101, kind: 'board', filename: 'board-101.webp', alt: 'Decorative board', sizeClass: 'w-28 h-28', positionClass: 'top-12 right-8', rotation: -8, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 102, kind: 'thumb', filename: 'thumb-102.webp', alt: 'Decorative thumb', sizeClass: 'w-20 h-20', positionClass: 'bottom-16 left-10', rotation: 5, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'collection-details',
      title: 'Information Kiosk',
      subtitle: 'Official Stuff',
      direction: 'left',
      href: '/information-kiosk.html',
      linkLabel: 'Always Open',
      decorations: [
        { slot: 103, kind: 'thumb', filename: 'thumb-103.webp', alt: 'Decorative thumb', sizeClass: 'w-24 h-24', positionClass: 'top-20 left-6', rotation: 10, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'visitor-center',
      title: 'Visitor Center',
      subtitle: 'New to Enjin?',
      direction: 'left',
      intro: 'A simple step-by-step guide to begin collecting NFTs on the Enjin Matrixchain.',
      href: '/guide.html',
      linkLabel: 'Open the Guide',
    },
    {
      id: 'sneak-peeks',
      title: 'Sneak Peeks',
      subtitle: 'Coming soon to a shore near you',
      direction: 'left',
      intro: '[Placeholder] Teasers for upcoming boards and designs not yet released. A few glimpses of what is on the shaping rack.',
      expansionType: 'text-only',
      expansion: {
        title: 'Sneak Peeks',
        bodyText: '[Placeholder] Replace with sneak peek descriptions of upcoming boards. This section scrolls vertically.',
      },
      decorations: [
        { slot: 104, kind: 'board', filename: 'board-104.webp', alt: 'Decorative board', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-12', rotation: 6, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 105, kind: 'thumb', filename: 'thumb-105.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'top-16 left-12', rotation: -12, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'surf-further',
      title: 'Surf Further',
      subtitle: 'Beyond this collection',
      direction: 'left',
      homeCorner: 'left',
      intro: '[Placeholder] Links, contacts, and where to find more of the work. Social links, exhibitions, and ways to connect.',
      expansionType: 'text-only',
      expansion: {
        title: 'Surf Further',
        bodyText: '[Placeholder] Replace with contact details, social links, exhibition info, and anything else for visitors who want to see more. Scrolls vertically.',
      },
      decorations: [
        { slot: 106, kind: 'board', filename: 'board-106.webp', alt: 'Decorative board', sizeClass: 'w-24 h-24', positionClass: 'top-14 right-10', rotation: -5, floatAnim: 'animate-float-gentle', zIndex: 2 },
      ],
    },
  ],

  // ─── RIGHT (scroll right from landing) ───
  // Order: Beach Dreams, Wave 1, Summer Postcards, Wave 2, Add It Up,
  //         Wave 3, Behind the Sunscreen, On the Horizon, (Wave 4, Wave 5: can be hidden)
  rightPanels: [
    {
      id: 'beach-dreams',
      title: 'Beach Dreams',
      direction: 'right',
      homeCorner: 'right',
      intro: 'Keeping summer alive throughout the year!',
      href: '/beach-dreams.html',
      linkLabel: 'Why?',
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
      intro: 'Riding out the sunset vibes.',
      href: '/wave-2.html',
      linkLabel: 'Drop By',
      decorations: [
        { slot: 115, kind: 'board', filename: 'board-115.webp', alt: 'Decorative board', sizeClass: 'w-28 h-28', positionClass: 'bottom-14 left-10', rotation: 5, floatAnim: 'animate-float-gentle', zIndex: 2 },
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
      id: 'wave-3',
      title: 'Wave Three',
      subtitle: 'Iceboards',
      direction: 'right',
      intro: 'Enjoyment takes on many states.',
      href: '/wave-3.html',
      linkLabel: 'Slide In',
      decorations: [
        { slot: 116, kind: 'thumb', filename: 'thumb-116.webp', alt: 'Decorative thumb', sizeClass: 'w-20 h-20', positionClass: 'top-14 left-8', rotation: -7, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'behind-sunscreen',
      title: 'Behind The Sunscreen',
      subtitle: 'The Factory',
      direction: 'right',
      homeCorner: 'right',
      intro: "How do you create a million surfboards? Here's my step-by-step process.",
      href: '/behind-the-sunscreen.html',
      linkLabel: 'Step inside',
      decorations: [
        { slot: 109, kind: 'thumb', filename: 'thumb-109.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'top-12 left-6', rotation: -10, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'on-the-horizon',
      title: 'On the Horizon',
      subtitle: 'Coming soon to a shore near you',
      direction: 'right',
      intro: '[Placeholder] Teasers for upcoming boards and designs not yet released. A few glimpses of what is on the shaping rack.',
      expansionType: 'text-only',
      expansion: {
        title: 'On the Horizon',
        bodyText: '[Placeholder] Replace with descriptions of upcoming boards. This section scrolls vertically.',
      },
      decorations: [
        { slot: 117, kind: 'board', filename: 'board-117.webp', alt: 'Decorative board', sizeClass: 'w-32 h-32', positionClass: 'bottom-12 right-12', rotation: 6, floatAnim: 'animate-float-gentle', zIndex: 2 },
        { slot: 118, kind: 'thumb', filename: 'thumb-118.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'top-16 left-12', rotation: -12, floatAnim: 'animate-float-soft', zIndex: 2 },
      ],
    },
    {
      id: 'wave-4',
      title: 'Wave Four',
      subtitle: 'Spring in Session',
      direction: 'right',
      homeCorner: 'right',
      intro: 'Expectation is a forward force.',
      href: '/wave-4.html',
      linkLabel: 'Roll Through',
      hidden: false, // set to true to hide until this wave rotates in
    },
    {
      id: 'wave-5',
      title: 'Wave Five',
      subtitle: 'Celebrate Summer',
      direction: 'right',
      homeCorner: 'right',
      intro: 'Harmony in completion.',
      href: '/wave-5.html',
      linkLabel: 'Check it Out',
      hidden: false, // set to true to hide until this wave rotates in
    },
  ],
};

// Panels marked hidden: true stay in the data but are left out of the scroll until they rotate in.
collection.rightPanels = collection.rightPanels.filter((p) => !p.hidden);
