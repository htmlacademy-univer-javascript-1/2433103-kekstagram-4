import {isEscapeKey} from './util.js';

const MAX_COMMENT_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');

// сделано, чтобы удалить обработчик, ибо если его не удалить, то:
// при открытии первой фото, то все норм, но при открытии второго и последующх фото (после закрытия первого),
// работает и обработчик предыдущих картинок. Не знаю, правильно ли реализовал, можно, наверное, лучше, но пока смог напистать
// только такое решение
let commentsLoaderFunction;
const closeModal = (evt) => {
  if (isEscapeKey(evt) || evt.type === 'click') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    document.removeEventListener('keydown', closeModal);
    cancelButton.removeEventListener('click', closeModal);
    commentsLoader.removeEventListener('click', commentsLoaderFunction);
  }
};

const drawComment = (comment) => {
  const commentHtml = `<li class="social__comment">
                               <img class="social__picture"
                                src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
                               <p class="social__text">${comment.message}</p>
                               </li>`;
  socialComments.insertAdjacentHTML('beforeend', commentHtml);
};
const drawComments = (comments, number) => {
  socialComments.innerHTML = '';
  comments.forEach((comment, index) => {
    if (index < number) {
      drawComment(comment);
    }});
};
const showCommentsCount = (comments, number) => {
  drawComments(comments, number);
  socialCommentCount.textContent = `${number > commentsCount.textContent ? commentsCount.textContent
    : number} из ${commentsCount.textContent} комментариев`;
  if (number >= commentsCount.textContent) {
    commentsLoader.classList.add('hidden');
  }
};
const openModal = (image) => {
  let commentsNumber = MAX_COMMENT_COUNT;

  bigPictureImg.querySelector('img').src = image.url;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments.length.toString();
  socialCaption.textContent = image.description;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeModal);
  cancelButton.addEventListener('click', closeModal);
  showCommentsCount(image.comments, commentsNumber);

  commentsLoaderFunction = () => {
    commentsNumber += MAX_COMMENT_COUNT;
    showCommentsCount(image.comments, commentsNumber);
    if (commentsNumber >= commentsCount.textContent) {
      commentsNumber = MAX_COMMENT_COUNT;
    }
  };
  commentsLoader.addEventListener('click', commentsLoaderFunction);
};
const thumbnailClickHandler = (data) => {
  pictures.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      openModal(data[picture.dataset.index]);
    }
  });
};

export {thumbnailClickHandler};
