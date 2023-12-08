import {isEscapeKey} from './util.js';

const showAlertWhenUploadError = (message) => {
  const template = document.querySelector('#upload-data-error').content;
  const alertContainer = template.cloneNode(true);
  alertContainer.querySelector('.error-text').textContent = message;
  document.body.appendChild(alertContainer);
  setTimeout(() => document.body.querySelector('.upload-data-error').remove(), 3000);
};
const closeSuccessMessageModal = (evt) => {
  const alertContainer = document.body.querySelector('.success');
  const errorInner = alertContainer.querySelector('.success__inner');

  if (isEscapeKey(evt) || evt.target.closest('.success__button') || !(evt.composedPath().includes(errorInner)) ) {
    alertContainer.remove();
    evt.target.removeEventListener('click', closeSuccessMessageModal);
    window.removeEventListener('keydown', closeSuccessMessageModal);
    window.removeEventListener('click', closeSuccessMessageModal);
  }
};
const showAlertWhenSendSuccess = () => {
  const template = document.body.querySelector('#success').content;
  const alertContainer = template.cloneNode(true);
  const successButton = alertContainer.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessageModal);
  window.addEventListener('keydown', closeSuccessMessageModal);
  window.addEventListener('click', closeSuccessMessageModal);
  document.body.append(alertContainer);
};
const closeFailMessageModal = (evt) => {
  const alertContainer = document.body.querySelector('.error');
  const errorInner = alertContainer.querySelector('.error__inner');
  if (isEscapeKey(evt) || !(evt.composedPath().includes(errorInner)) || evt.target.closest('.error__button')) {
    alertContainer.remove();
    evt.target.removeEventListener('click', closeFailMessageModal);
    window.removeEventListener('keydown', closeFailMessageModal);
    window.removeEventListener('click', closeFailMessageModal);
  }
};

const showAlertWhenSendFail = () => {
  const template = document.body.querySelector('#error').content;
  const alertContainer = template.cloneNode(true);
  const errorButton = alertContainer.querySelector('.error__button');

  errorButton.addEventListener('click', closeFailMessageModal);
  window.addEventListener('click', closeFailMessageModal);
  window.addEventListener('keydown', closeFailMessageModal);
  document.body.append(alertContainer);
};

export {showAlertWhenUploadError, showAlertWhenSendSuccess, showAlertWhenSendFail};
