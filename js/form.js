import {isEscapeKey} from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTIONS_COUNT = 120;
const SEPARATOR = ' ';

const imgUploadForm = document.body.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const regExpHashtag = new RegExp('^#[0-9A-Za-zа-яА-Я]{1,19}$');
const regExpDescription = new RegExp(`^.{0,${MAX_DESCRIPTIONS_COUNT}}$`);
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

pristine.addValidator(textHashtags, (value) => {
  if (value !== '') {
    const hashtags = value.toLowerCase().trim().split(SEPARATOR);
    return hashtags.every((hashtag) => regExpHashtag.test(hashtag));
  }
  return true;
}, 'Один или несколько введеных хештегов - некорректен');

pristine.addValidator(textHashtags, (value) => {
  if (value !== '') {
    const hashtags = value.toLowerCase().trim().split(SEPARATOR);
    const hashtagsCount = value.split('').filter((sym) => sym === '#').length;
    return hashtagsCount === hashtags.length;
  }
  return true;
}, 'Введен неверный разделитель');

pristine.addValidator(textHashtags, (value) => {
  if (value !== '') {
    const hashtagsCount = value.toLowerCase().trim().split(SEPARATOR).length;
    return hashtagsCount <= MAX_HASHTAGS_COUNT;
  }
  return true;
}, `Максимальное количество хештегов - ${MAX_HASHTAGS_COUNT}`);

pristine.addValidator(textHashtags, (value) => {
  if (value !== '') {
    const hashtags = value.toLowerCase().trim().split(SEPARATOR);
    const hashtagsSet = new Set(hashtags);
    return hashtags.length === hashtagsSet.size;
  }
  return true;
}, 'Хештеги регистронезависимы и не должны повторяться');

pristine.addValidator(textDescription, (value) => regExpDescription.test(value),
  `Максимальная длина комментария - ${MAX_DESCRIPTIONS_COUNT} символов`);
const closeModal = (evt) => {
  if ((isEscapeKey(evt) && document.activeElement !== textHashtags
    && document.activeElement !== textDescription) || evt.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadCancel.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModal);
    uploadFile.reset();
  }
};

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
});

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
