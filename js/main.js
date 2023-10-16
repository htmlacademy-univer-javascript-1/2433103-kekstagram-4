const array = [];
const countObjects = 25;
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateUrlId = createRandomIdFromRangeGenerator(1, 25);
const generateComments = () => {
  const comments = [];
  const generateCommentId = createRandomIdFromRangeGenerator(0, 30);
  const messageArray = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const namesArray = ['Абакум', 'Абрам', 'Абросим', 'Аввакум', 'Август', 'Авдей', 'Авдий', 'Авель'];

  for (let i = 0; i < getRandomInteger(0,30); i++) {
    comments.push({
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: messageArray[getRandomInteger(0,5)],
      name: namesArray[getRandomInteger(0,7)]
    });
  }
  return comments;
};
const createObject = () =>
  ({
    id: generatePhotoId(),
    url: `photos/${generateUrlId()}.jpg`,
    description: 'cool',
    likes: getRandomInteger(15,200),
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

for (let i = 0; i < countObjects; i++) {
  array.push(createObject());
}
