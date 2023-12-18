import {renderPicture} from './renderPictures.js';
import {sortByCommentsLength, getCountRandomPictures, debounce} from './util.js';

const PICTURES_COUNT_FOR_RANDOM = 10;
const imgFilters = document.body.querySelector('.img-filters');
let data;
const removeLastActiveButton = () => {
  const lastActiveButton = imgFilters.querySelector('.img-filters__button--active');
  lastActiveButton.classList.remove('img-filters__button--active');
};

const availableFilters = {
  'filter-discussed': (button) => {
    removeLastActiveButton();
    button.classList.add('img-filters__button--active');
    const tempData = data.slice().sort(sortByCommentsLength);
    renderPicture(tempData, true);
  },
  'filter-default': (button) => {
    removeLastActiveButton();
    button.classList.add('img-filters__button--active');
    renderPicture(data, true);
  },
  'filter-random': (button) => {
    removeLastActiveButton();
    button.classList.add('img-filters__button--active');
    const tempPictureArray = getCountRandomPictures(data, PICTURES_COUNT_FOR_RANDOM);
    renderPicture(tempPictureArray, true);
  }
};
const thumbnailClickFilter = () => {
  imgFilters.addEventListener('click', debounce((evt) => {
    const button = evt.target.closest('[type=button]');
    if (button) {
      evt.preventDefault();
      availableFilters[button.id](button);
    }
  }));
};
const showImgFilters = (items) => {
  data = items.slice();
  imgFilters.classList.remove('img-filters--inactive');
  thumbnailClickFilter();
};

export {showImgFilters};
