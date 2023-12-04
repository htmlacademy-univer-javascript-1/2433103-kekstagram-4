const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const getScaleOptions = (imgUpload, scaleControlValue) => {
  let currentScale;
  const applySettings = () => {
    scaleControlValue.value = `${currentScale}%`;
    imgUpload.style.transform = `scale(${currentScale / 100})`;

  };
  const init = () => {
    currentScale = MAX_SCALE_VALUE;
    applySettings();
  };
  const increaseValue = () => {
    if (currentScale !== MAX_SCALE_VALUE) {
      currentScale += SCALE_STEP;
      applySettings();

    }
  };
  const decreaseValue = () => {
    if (currentScale !== MIN_SCALE_VALUE) {
      currentScale -= SCALE_STEP;
      applySettings();

    }
  };
  init();

  return {
    currentScale,
    init,
    increaseValue,
    decreaseValue
  };
};

export {getScaleOptions};
