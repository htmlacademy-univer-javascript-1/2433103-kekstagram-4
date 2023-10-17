const ARRAY = [];
const COUNT_OBJECT = 25;
const GENERATE_PHOTO_ID = createRandomIdFromRangeGenerator(1, COUNT_OBJECT);
const GENERATE_URL_ID = createRandomIdFromRangeGenerator(1, COUNT_OBJECT);
const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Абакум', 'Абрам', 'Абросим', 'Аввакум', 'Август', 'Авдей', 'Авдий', 'Авель'];
const DESCRIPTIONS = ['fine', 'cute', 'cool', 'ugly', 'funny', 'happy', 'fat'];
const generateComments = () => {
  const COMMENTS_BORDER_COUNT = [0,30];
  const AVATAR_COUNT = [1,6];
  const MESSAGE_COUNT = [0,5];
  const NAME_COUNT = [0,7];
  const GENERATE_COMMENT_ID = createRandomIdFromRangeGenerator(...COMMENTS_BORDER_COUNT);
  const COMMENTS = [];

  for (let i = 0; i < getRandomInteger(...COMMENTS_BORDER_COUNT); i++) {
    COMMENTS.push({
      id: GENERATE_COMMENT_ID(),
      avatar: `img/avatar-${getRandomInteger(...AVATAR_COUNT)}.svg`,
      message: MESSAGES[getRandomInteger(...MESSAGE_COUNT)],
      name: NAMES[getRandomInteger(...NAME_COUNT)]
    });
  }
  return COMMENTS;
};
const createObject = () => {
  const DESCRIPTIONS_COUNT = [0,6];
  const LIKES_BORDER_COUNT = [15,200];
  return ({
    id: GENERATE_PHOTO_ID(),
    url: `photos/${GENERATE_URL_ID()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(...DESCRIPTIONS_COUNT)],
    likes: getRandomInteger(...LIKES_BORDER_COUNT),
    comments: generateComments()
  });
};
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

for (let i = 0; i < COUNT_OBJECT; i++) {
  ARRAY.push(createObject());
}
