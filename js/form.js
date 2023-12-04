import {isEscapeKey} from './util.js';
import {
  isHashtagsCountCorrect, isDescriptionCountCorrect, isSeparatorCorrect, isHashtagCorrect,
  isHashtagNotRepeat, MAX_DESCRIPTIONS_COUNT, MAX_HASHTAGS_COUNT
} from './validators.js';
import {getScaleOptions} from './scaleOptions.js';
import {getEffectsOptions} from './effectsOptions.js';

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
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectList = imgUploadForm.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsOptions = getEffectsOptions(effectLevelValue, effectLevel);
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
const thumbnailClickEffects = (evt) => {
  const selectedEffect = evt.target.closest('.effects__radio');

  if (selectedEffect) {
    effectsOptions.setCurrentEffect(selectedEffect.value);
    effectLevelSlider.noUiSlider.updateOptions(effectsOptions.getOptions());
    imgPreview.style.transform = effectsOptions.getStyles();
  }
};
const submitForm = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};
const closeModal = (evt) => {
  if ((isEscapeKey(evt) && document.activeElement !== textHashtags
    && document.activeElement !== textDescription) || evt.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadCancel.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModal);

    scaleControlSmaller.removeEventListener('click', scaleOptions.decreaseValue);
    scaleControlBigger.removeEventListener('click', scaleOptions.increaseValue);

    effectList.addEventListener('click', thumbnailClickEffects);

    imgUploadForm.reset();
    imgUploadForm.removeEventListener('submit', submitForm);
  }
};

noUiSlider.create(effectLevelSlider, effectsOptions.getOptions());

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);

  scaleControlSmaller.addEventListener('click', scaleOptions.decreaseValue);
  scaleControlBigger.addEventListener('click', scaleOptions.increaseValue);
  scaleOptions.init();

  effectsOptions.init();
  effectList.addEventListener('click', thumbnailClickEffects);
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgPreview.style.filter = effectsOptions.getStyles();
  });

  imgUploadForm.addEventListener('submit', submitForm);
});

