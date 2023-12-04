const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTIONS_COUNT = 120;
const SEPARATOR = ' ';

const regExpHashtag = new RegExp('^#[0-9A-Za-zа-яА-Я]{1,19}$');
const regExpDescription = new RegExp(`^.{0,${MAX_DESCRIPTIONS_COUNT}}$`);

const isHashtagCorrect = (value) => {
  if (value !== '') {
    const hashtags = value.toLowerCase().trim().split(SEPARATOR);
    return hashtags.every((hashtag) => regExpHashtag.test(hashtag));
  }
  return true;
};
const isSeparatorCorrect = (value) => {
  if (value !== '') {
    const hashtags = value.toLowerCase().trim().split(SEPARATOR);
    const hashtagsCount = value.split('').filter((sym) => sym === '#').length;
    return hashtagsCount === hashtags.length;
  }
  return true;
};
const isHashtagsCountCorrect = (value) => {
  if (value !== '') {
    const hashtagsCount = value.toLowerCase().trim().split(SEPARATOR).length;
    return hashtagsCount <= MAX_HASHTAGS_COUNT;
  }
  return true;
};
const isHashtagNotRepeat = (value) => {
  if (value !== '') {
    const hashtags = value.toLowerCase().trim().split(SEPARATOR);
    const hashtagsSet = new Set(hashtags);
    return hashtags.length === hashtagsSet.size;
  }
  return true;
};
const isDescriptionCountCorrect = (value) => regExpDescription.test(value);

export {isHashtagsCountCorrect, isDescriptionCountCorrect, isSeparatorCorrect,
  isHashtagCorrect, isHashtagNotRepeat, MAX_DESCRIPTIONS_COUNT, MAX_HASHTAGS_COUNT};
