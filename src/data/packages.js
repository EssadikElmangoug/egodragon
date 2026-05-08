export const RATE_PER_WEEK = 500 // USD per person per week
export const MIN_NIGHTS = 7

export const experience = {
  name: 'Igo Dragon Full Experience',
  emoji: '☯',
  tagline: 'All services included. One experience.',
  ratePerWeek: RATE_PER_WEEK,
  included: [
    'Accommodation in authentic Moroccan family home',
    '3 traditional Moroccan bio meals per day',
    'Kung Fu & Wing Chun martial arts',
    'Aerobics & daily fitness sessions',
    'Guided meditation under desert stars',
    'Yoga at sunrise & sunset',
    'Tai Chi & Qigong practice',
    'Trekking, hiking & oasis exploration',
    'Wild camping under the stars',
    'Swimming in natural springs & rivers',
    'Medical dressage therapy',
    'Body cleanse & traditional bio food recipes',
    'Personal coaching sessions',
    'Addiction & rehabilitation support',
    'Moroccan culture & family life immersion',
    'Complete digital detox environment',
  ],
}

// Price = $500/week prorated by actual nights
export const calcTotal = (nights, guests = 1) => {
  if (nights <= 0) return 0
  return Math.round((nights / 7) * RATE_PER_WEEK * Math.max(guests, 1))
}
