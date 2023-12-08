import {getData} from './api.js';
import {renderPicture} from './renderPictures.js';
import './form.js';
import {showAlertWhenUploadError} from './alert.js';

getData(renderPicture, showAlertWhenUploadError);
