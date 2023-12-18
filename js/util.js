const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const sortByCommentsLength = (a, b) => {
  if (a.comments.length > b.comments.length) {
    return -1;
  }
  if (a.comments.length < b.comments.length) {
    return 1;
  }
  return 0;
};
const getCountRandomPictures = (data, count) => {
  const numbersArray = [];
  const generateNumbers = createRandomIdFromRangeGenerator(0, 24);
  for (let i = 0; i < count; i++) {
    numbersArray.push(generateNumbers());
  }
  const tempPicturesArray = [];
  data.forEach((item, i) => {
    if (numbersArray.includes(i)) {
      tempPicturesArray.push(data[i]);
    }
  });
  return tempPicturesArray;
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';
export {
  createRandomIdFromRangeGenerator,
  getRandomInteger,
  isEscapeKey,
  sortByCommentsLength,
  getCountRandomPictures,
  debounce
};

