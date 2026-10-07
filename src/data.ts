import type { CollectionData } from './types';

export const collection: CollectionData = {
  title: 'Turtleboards',
  tagline: 'Surf Slow, Enjoy the Ride',
  artistName: '[Artist Name — replace]',
  rightsNotice: 'All artwork is original and created by the artist. All rights reserved.',

  // ─── Thumbnail marquee on the landing panel ───
  marqueeThumbs: [
    { slot: 1, filename: 'thumb-01.webp', alt: 'Surfboard thumbnail 1' },
    { slot: 2, filename: 'thumb-02.webp', alt: 'Surfboard thumbnail 2' },
    { slot: 3, filename: 'thumb-03.webp', alt: 'Surfboard thumbnail 3' },
    { slot: 4, filename: 'thumb-04.webp', alt: 'Surfboard thumbnail 4' },
    { slot: 5, filename: 'thumb-05.webp', alt: 'Surfboard thumbnail 5' },
    { slot: 6, filename: 'thumb-06.webp', alt: 'Surfboard thumbnail 6' },
    { slot: 7, filename: 'thumb-07.webp', alt: 'Surfboard thumbnail 7' },
    { slot: 8, filename: 'thumb-08.webp', alt: 'Surfboard thumbnail 8' },
    { slot: 9, filename: 'thumb-09.webp', alt: 'Surfboard thumbnail 9' },
    { slot: 10, filename: 'thumb-10.webp', alt: 'Surfboard thumbnail 10' },
    { slot: 11, filename: 'thumb-11.webp', alt: 'Surfboard thumbnail 11' },
    { slot: 12, filename: 'thumb-12.webp', alt: 'Surfboard thumbnail 12' },
  ],

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
  // Order: Beach Dreams, Featured 1, Summer Postcards, Featured 2, Add It Up,
  //         Featured 3, Behind the Sunscreen, On the Horizon
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
      id: 'featured-board-1',
      title: 'Featured Board I',
      subtitle: 'A closer look',
      direction: 'right',
      intro: '[Placeholder] A featured board shown as a webm animation. Longer description but not itemised.',
      expansionType: 'featured-board',
      expansion: {
        title: 'Featured Board I',
        featured: {
          slot: 501,
          filename: 'featured-501.webm',
          name: '[Featured Board I name — replace]',
          description: '[Placeholder] A longer description of this featured board — the design story, the inspiration, the details that make it special. Not itemised, just flowing text.',
        },
      },
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
      id: 'featured-board-2',
      title: 'Featured Board II',
      subtitle: 'Another closer look',
      direction: 'right',
      intro: '[Placeholder] A second featured board shown as a webm animation. Longer description but not itemised.',
      expansionType: 'featured-board',
      expansion: {
        title: 'Featured Board II',
        featured: {
          slot: 502,
          filename: 'featured-502.webm',
          name: '[Featured Board II name — replace]',
          description: '[Placeholder] A longer description of this second featured board — the design story, the inspiration, the details.',
        },
      },
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
      id: 'featured-board-3',
      title: 'Featured Board III',
      subtitle: 'Yet another closer look',
      direction: 'right',
      intro: '[Placeholder] A third featured board shown as a webm animation. Longer description but not itemised.',
      expansionType: 'featured-board',
      expansion: {
        title: 'Featured Board III',
        featured: {
          slot: 503,
          filename: 'featured-503.webm',
          name: '[Featured Board III name — replace]',
          description: '[Placeholder] A longer description of this third featured board — the design story, the inspiration, the details.',
        },
      },
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
  ],
};
