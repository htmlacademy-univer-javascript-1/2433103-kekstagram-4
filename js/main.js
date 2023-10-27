const COUNT_OBJECT = 25;
const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Абакум', 'Абрам', 'Абросим', 'Аввакум', 'Август', 'Авдей', 'Авдий', 'Авель'];
const DESCRIPTIONS = ['fine', 'cute', 'cool', 'ugly', 'funny', 'happy', 'fat'];
const generatePhotoId = createRandomIdFromRangeGenerator(1, COUNT_OBJECT);
const generateUrlId = createRandomIdFromRangeGenerator(1, COUNT_OBJECT);
const COMMENTS_COUNT = 30;
const AVATAR_COUNT = 6;
const MESSAGE_COUNT = 5;
const NAME_COUNT = 7;
const DESCRIPTIONS_COUNT = 6;
const LIKES_MAX_COUNT = 200;
const LIKES_MIN_COUNT = 15;
const generateComments = () => {
  const generateCommentId = createRandomIdFromRangeGenerator(0, COMMENTS_COUNT);
  const comments = [];

  for (let i = 0; i < getRandomInteger(0, COMMENTS_COUNT); i++) {
    comments.push({
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
      message: MESSAGES[getRandomInteger(0, MESSAGE_COUNT)],
      name: NAMES[getRandomInteger(0, NAME_COUNT)]
    });
  }
  return comments;
};
const createObject = () =>
  ({
    id: generatePhotoId(),
    url: `photos/${generateUrlId()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS_COUNT)],
    likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
    comments: generateComments()
  });
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}
function createRandomIdFromRangeGenerator (min, max) {

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
}

const array = Array.from({length: COUNT_OBJECT}, createObject);
