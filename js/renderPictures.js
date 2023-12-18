import {thumbnailClickHandler} from './renderBigPicture.js';

const templatePicture = document.querySelector('#picture').content;
const fragment = new DocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const renderPicture = (data, isReplace = false) => {
  if (isReplace) {
    const currentPictures = document.body.querySelectorAll('.picture');
    currentPictures.forEach((item) => item.remove());
  }
  data.forEach((item, index) => {
    const picture = templatePicture.cloneNode(true);
    const pictureImg = picture.querySelector('.picture__img');
    pictureImg.src = item.url;
    pictureImg.alt = item.description;
    const pictureInfo = picture.querySelector('.picture__info');
    pictureInfo.querySelector('.picture__comments').textContent = item.comments.length;
    pictureInfo.querySelector('.picture__likes').textContent = item.likes;
    picture.querySelector('.picture').dataset.index = index.toString();
    fragment.append(picture);
  });
  picturesContainer.append(fragment);
  thumbnailClickHandler(data);
};

export {renderPicture};

