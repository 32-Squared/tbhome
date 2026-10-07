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
      title: 'Collection Details',
      subtitle: 'The full picture',
      direction: 'left',
      intro: '[Placeholder] Overview of the collection — how many boards, the themes, the materials, and what makes this set special.',
      expansionType: 'text-only',
      expansion: {
        title: 'Collection Details',
        bodyText: '[Placeholder] Replace with full collection details: number of boards, time span, themes, materials, exhibition history, and any other context. Scrolls vertically.',
      },
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
      subtitle: 'A fun rundown of board qualities',
      direction: 'right',
      intro: '[Placeholder] A playful, non-uniform gallery of thumbnails with a sentence or two about what makes each board special.',
      expansionType: 'beach-dreams',
      expansion: {
        title: 'Beach Dreams',
        beachDreamsText: '[Placeholder] Replace with a fun descriptive intro for the Beach Dreams gallery.',
        thumbnails: [
          { slot: 201, filename: 'thumb-201.webp', alt: 'Beach Dreams board 1' },
          { slot: 202, filename: 'thumb-202.webp', alt: 'Beach Dreams board 2' },
          { slot: 203, filename: 'thumb-203.webp', alt: 'Beach Dreams board 3' },
          { slot: 204, filename: 'thumb-204.webp', alt: 'Beach Dreams board 4' },
          { slot: 205, filename: 'thumb-205.webp', alt: 'Beach Dreams board 5' },
          { slot: 206, filename: 'thumb-206.webp', alt: 'Beach Dreams board 6' },
          { slot: 207, filename: 'thumb-207.webp', alt: 'Beach Dreams board 7' },
          { slot: 208, filename: 'thumb-208.webp', alt: 'Beach Dreams board 8' },
        ],
      },
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
      subtitle: 'Technical details',
      direction: 'right',
      homeCorner: 'right',
      intro: '[Placeholder] A single textblock of technical details — dimensions, materials, fin setups, construction methods.',
      expansionType: 'add-it-up',
      expansion: {
        title: 'Add It Up',
        techText: '[Placeholder] Replace with technical details: board dimensions, volumes, fin setups, construction methods, resin types, and any other specs. This is a single flowing text block decorated with 1-2 small board images.',
        decorations: [
          { slot: 113, kind: 'board', filename: 'board-113.webp', alt: 'Decorative board', sizeClass: 'w-24 h-24', positionClass: 'top-8 right-4', floatAnim: 'animate-float-gentle' },
          { slot: 114, kind: 'thumb', filename: 'thumb-114.webp', alt: 'Decorative thumb', sizeClass: 'w-16 h-16', positionClass: 'bottom-12 left-4', floatAnim: 'animate-float-soft' },
        ],
      },
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
      title: 'Behind the Sunscreen',
      subtitle: 'How the boards are made',
      direction: 'right',
      homeCorner: 'right',
      intro: '[Placeholder] An orderly, step-by-step showcase of the board-making process with medium images and text blocks.',
      expansionType: 'behind-sunscreen',
      expansion: {
        title: 'Behind the Sunscreen',
        steps: [
          { slot: 301, filename: 'board-301.webp', alt: 'Step 1', title: '[Placeholder] Step 1: Shaping', text: '[Placeholder] Describe the shaping process — the blank, the planer, the rails, the rocker.' },
          { slot: 302, filename: 'board-302.webp', alt: 'Step 2', title: '[Placeholder] Step 2: Glassing', text: '[Placeholder] Describe the glassing — resin, fiberglass, squeegees, and curing.' },
          { slot: 303, filename: 'board-303.webp', alt: 'Step 3', title: '[Placeholder] Step 3: Artwork', text: '[Placeholder] Describe the artwork process — your original designs, how they are applied.' },
          { slot: 304, filename: 'board-304.webp', alt: 'Step 4', title: '[Placeholder] Step 4: Finishing', text: '[Placeholder] Describe the finishing — sanding, gloss coat, and final polish.' },
        ],
      },
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
