/** @typedef {{ slug: string; title: string; date: string; excerpt: string; category: string; readMinutes: number; body: string[] }} BlogPost */

/** @type {BlogPost[]} */
export const blogPosts = [
  {
    slug: 'first-week-at-the-oasis',
    title: 'What to Expect in Your First Week',
    date: '2026-04-02',
    excerpt:
      'From arrival in Ouarzazate to your first sunrise session — a grounded look at how we ease you into rhythm, rest, and training.',
    category: 'Guest stories',
    readMinutes: 6,
    body: [
      'Your first days here are not about proving anything. They are about arriving — in body, breath, and attention. Most guests tell us the landscape does half the work: the desert light, the quiet after dark, and the simple fact that nowhere else needs you for a while.',
      'Mornings often begin with movement: martial arts fundamentals, mobility, or a guided walk. Afternoons might blend coaching, recovery, or structured downtime. We pace the week so your nervous system can downshift without guilt.',
      'By day five, many people notice sleep deepening, appetite stabilizing, and a quieter mind between sessions. That is the foundation everything else builds on.',
    ],
  },
  {
    slug: 'training-without-burnout',
    title: 'Training Hard Without Burning Out',
    date: '2026-03-18',
    excerpt:
      'Discipline does not require collapse. Here is how we balance intensity with recovery in a high-desert setting.',
    category: 'Training',
    readMinutes: 5,
    body: [
      'Intensity only works when recovery is honest. Our coaches watch load, sleep, and stress signals — not to nag, but to keep you in the zone where adaptation happens.',
      'Hydration, electrolytes, and shade matter more than most urban routines prepare you for. We build those basics into the day so willpower is not your only tool.',
      'The goal is sustainable edge: leave stronger than you arrived, not depleted.',
    ],
  },
  {
    slug: 'morocco-beyond-the-itinerary',
    title: 'Morocco Beyond the Itinerary',
    date: '2026-02-07',
    excerpt:
      'Culture here is not a sidebar — shared meals, language, and local craft weave through the stay if you want them.',
    category: 'Culture',
    readMinutes: 4,
    body: [
      'We are guests in a living place, not a backdrop. When we share Moroccan dishes or visit a nearby village, it is with respect for pace and privacy — yours and theirs.',
      'Many visitors discover that slowing down changes how they notice detail: the sound of tea poured from height, the geometry of kasbahs against the sky.',
      'Take what resonates; leave the rest. The retreat is yours to shape within the container we hold together.',
    ],
  },
]

/** @param {string} slug */
export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug)
}

export function formatBlogDate(isoDate) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}
