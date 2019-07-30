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
    window.appendItem(fivePins, window.renderPin);
  };

  var changePin = function () {
    if (housingTypeMap.value == 'any') {
      window.renderQuantityPins();
    } else {
      var housesTypes = window.advertData.filter(function (elem) {
        return elem.offer.type === housingTypeMap.value;
      }).slice(0, 5);
      window.appendItem(housesTypes, window.renderPin);
    }
  };
  var housingTypeMap = document.querySelector('#housing-type');

  housingTypeMap.addEventListener('change', function () {
    deletePin();
    changePin();
  });
})();
