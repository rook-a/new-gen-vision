import courses from './data.json';

// data test

const requiredRange1 = [null, 200];
const requiredRange2 = [100, 350];
const requiredRange3 = [200, null];

type RequiredRange = (number | null)[];

interface Course {
  name: string;
  prices: RequiredRange;
}

// filter

const filteredWithPrice = (courses: Course[], requiredRange: RequiredRange) => {
  const [from, to] = requiredRange;

  if (from === null && to === null) {
    return courses;
  }

  return courses.filter(({ prices }) => {
    const [priceFrom, priceTo] = prices;

    if (priceFrom === null && priceTo === null) {
      return true;
    }

    if (from <= priceFrom && from < priceTo && to >= priceTo && to > from) {
      return true;
    }

    if (from === null && to >= priceTo && priceTo === null && to > priceFrom) {
      return true;
    }

    if (to === null && from <= priceFrom) {
      return true;
    }

    return false;
  });
};

// sort
//...
