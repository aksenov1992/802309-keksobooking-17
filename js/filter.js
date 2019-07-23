'use strict';
(function () {
  var deletePin = function () {
    var pin = document.querySelectorAll('.map__pin');
    if (pin) {
      pin.forEach(function (el) {
        window.mapPins.removeChild(el);
      });
    }
  };

  window.renderQuantityPins = function () {
    var fivePins = window.advertData.slice(0, 5);
    var fragment = document.createDocumentFragment();
    fivePins.forEach(function (pin) {
      fragment.appendChild(window.renderPin(pin));
      fragment.appendChild(window.renderCard(pin));
    });
    window.mapPins.appendChild(fragment);
  };

  var housingTypeMap = document.querySelector('#housing-type');
  housingTypeMap.addEventListener('change', function () {
    deletePin();
    var housesTypes = window.advertData.filter(function (elem) {
      return elem.offer.type === housingTypeMap.value;
    }).slice(0, 5);
    var fragment = document.createDocumentFragment();
    housesTypes.forEach(function (pin) {
      fragment.appendChild(window.renderPin(pin));
    });
    window.mapPins.appendChild(fragment);
  });
})();
