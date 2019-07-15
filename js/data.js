'use strict';
(function () {

  // работа с шаблоном
  window.mapPins = document.querySelector('.map__pins');
  var pinTempalte = document.querySelector('#pin').content;
  window.renderPin = function (pin) {
    var pinElement = pinTempalte.cloneNode(true);
    pinElement.querySelector('.map__pin').style.left = pin.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;

    return pinElement;
  };

  window.advertData = [];
  window.load (function (data) {
    window.advertData = data;
  });
})();
