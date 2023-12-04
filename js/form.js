import {isEscapeKey} from './util.js';
import {isHashtagsCountCorrect, isDescriptionCountCorrect, isSeparatorCorrect, isHashtagCorrect,
  isHashtagNotRepeat, MAX_DESCRIPTIONS_COUNT, MAX_HASHTAGS_COUNT} from './validators.js';
import {getScaleOptions} from './scaleOptions.js';

const imgUploadForm = document.body.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');

const scaleOptions = getScaleOptions(imgPreview, scaleControlValue);
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

pristine.addValidator(textHashtags, isHashtagCorrect, 'Один или несколько введеных хештегов - некорректен');
pristine.addValidator(textHashtags, isSeparatorCorrect, 'Введен неверный разделитель');
pristine.addValidator(textHashtags, isHashtagsCountCorrect, `Максимальное количество хештегов - ${MAX_HASHTAGS_COUNT}`);
pristine.addValidator(textHashtags, isHashtagNotRepeat, 'Хештеги регистронезависимы и не должны повторяться');
pristine.addValidator(textDescription, isDescriptionCountCorrect,
  `Максимальная длина комментария - ${MAX_DESCRIPTIONS_COUNT} символов`);
const closeModal = (evt) => {
  if ((isEscapeKey(evt) && document.activeElement !== textHashtags
    && document.activeElement !== textDescription) || evt.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadCancel.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModal);
    imgUploadForm.reset();

    scaleControlSmaller.removeEventListener('click', scaleOptions.decreaseValue);
    scaleControlBigger.removeEventListener('click', scaleOptions.increaseValue);
  }
};

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
  scaleControlSmaller.addEventListener('click', scaleOptions.decreaseValue);
  scaleControlBigger.addEventListener('click', scaleOptions.increaseValue);
  scaleOptions.init();
});

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

