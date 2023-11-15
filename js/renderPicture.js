import {generateData} from './data.js';

const templatePicture = document.body.querySelector('#picture').content;
const fragment = new DocumentFragment();
const picturesContainer = document.body.querySelector('.pictures');
const data = generateData();
data.forEach((item)=> {
  const template = templatePicture.cloneNode(true);
  const picture = template.querySelector('.picture__img');
  picture.src = item.url;
  picture.alt = item.description;
  const pictureInfo = template.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__comments').textContent = item.comments.length;
  pictureInfo.querySelector('.picture__likes').textContent = item.likes;
  fragment.append(template);
});
picturesContainer.append(fragment);


