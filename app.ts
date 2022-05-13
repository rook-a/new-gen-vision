const enum SortingByPriceType {
  Ascending = 'ascending',
  Descending = 'descending',
  Default = 'default',
}

type RequiredRange = (number | null)[];

interface Course {
  name: string;
  prices: RequiredRange;
}

// data test

const courses = [
  { name: 'Courses in England', prices: [0, 100] },
  { name: 'Courses in Germany', prices: [500, null] },
  { name: 'Courses in Italy', prices: [100, 200] },
  { name: 'Courses in Russia', prices: [null, 400] },
  { name: 'Courses in China', prices: [50, 250] },
  { name: 'Courses in USA', prices: [200, null] },
  { name: 'Courses in Kazakhstan', prices: [56, 324] },
  { name: 'Courses in France', prices: [null, null] },
];

const requiredRange1 = [null, 200];
const requiredRange2 = [100, 350];
const requiredRange3 = [200, null];

// filter

const filteredByPrice = (courses: Course[], requiredRange: RequiredRange) => {
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

const sortedByPrice = (courses: Course[], sortingType: SortingByPriceType) => {
  switch (sortingType) {
    case SortingByPriceType.Default:
      return courses;
    case SortingByPriceType.Ascending:
      return courses.sort((a, b) => {
        if (a.prices[0] === null || b.prices[0] === null) {
          return -1;
        }

        return a.prices[0] - b.prices[0];
      });
    case SortingByPriceType.Descending:
      return courses.sort((a, b) => {
        if (a.prices[0] === null || b.prices[0] === null) {
          return -1;
        }

        return b.prices[0] - a.prices[0];
      });
    default:
      throw new Error(`Unexpected sorting type ${sortingType}`);
  }
};
