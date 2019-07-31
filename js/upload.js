'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.renderSuccessMessage();
        window.form.reset();
        window.deletePin();
        window.giveDefaultCoords();
        onSuccess(xhr.response);
      } else {
        window.renderErrorMessage();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
