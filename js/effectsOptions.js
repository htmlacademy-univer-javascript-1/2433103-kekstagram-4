const DEFAULT_EFFECT = 'none';
const generateOptionsForSlider = (min, max, step, start) => ({
  range: {min, max},
  start,
  step,
});

const optionsForSlider = {
  'none': generateOptionsForSlider(0, 100, 1, 100),
  'chrome': generateOptionsForSlider(0, 1, 0.1, 1),
  'sepia': generateOptionsForSlider(0, 1, 0.1, 1),
  'marvin': generateOptionsForSlider(0, 100, 1, 100),
  'phobos': generateOptionsForSlider(0, 3, 0.1, 3),
  'heat': generateOptionsForSlider(0, 3, 0.1, 3)
};

const optionsForFilter = {
  'none': () => 'none',
  'chrome': (value) => `grayscale(${value})`,
  'sepia': (value) => `sepia(${value})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value}px)`,
  'heat': (value) => `brightness(${value})`
};

const getEffectsOptions = (effectLevelValue, effectLevel) => {

  let currentEffect = 'none';
  const hideElementsIfEffectIsNone = () => {
    if (currentEffect === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  };
  const init = () => {
    currentEffect = DEFAULT_EFFECT;
    hideElementsIfEffectIsNone();
  };
  const setCurrentEffect = (value) => {
    currentEffect = value;
    hideElementsIfEffectIsNone();
  };
  const getOptions = () => optionsForSlider[currentEffect];
  const getStyles = () => optionsForFilter[currentEffect](effectLevelValue.value);
  hideElementsIfEffectIsNone();

  return {
    init,
    setCurrentEffect,
    getOptions,
    getStyles
  };

};

export {getEffectsOptions};
