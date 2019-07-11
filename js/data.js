'use strict';
(function () {

  // работа с шаблоном
  var mapPins = document.querySelector('.map__pins');
  var pinTempalte = document.querySelector('#pin').content;
  var renderPin = function (pin) {
    var pinElement = pinTempalte.cloneNode(true);
    pinElement.querySelector('.map__pin').style.left = pin.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;

    return pinElement;
  };
  window.load(function (pin) {

    var fragment = document.createDocumentFragment();
    for (var j = 0; j < pin.length; j++) {
      fragment.appendChild(renderPin(pin[j]));
    }
    mapPins.appendChild(fragment);
  });
})();
