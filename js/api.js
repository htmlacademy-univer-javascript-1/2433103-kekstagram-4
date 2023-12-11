const getData = (onSuccess, onFail) => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFail('Ошибка при загрузке данных с сервера'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://29.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else  {
        onFail();
      }
    }).catch(() => onFail());
};

export {getData, sendData};
