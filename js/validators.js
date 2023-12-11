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

const getMaxDescriptionCount = () => MAX_DESCRIPTIONS_COUNT;
const getMaxHashtagsCount = () => MAX_HASHTAGS_COUNT;

export {isHashtagsCountCorrect, isDescriptionCountCorrect,
  isHashtagCorrect, isHashtagNotRepeat, getMaxDescriptionCount, getMaxHashtagsCount};
