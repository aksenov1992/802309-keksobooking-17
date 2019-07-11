'use strict';
(function () {
  var showMap = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsetForm = adForm.querySelectorAll('fieldset');
  var adressForm = adForm.querySelector('#address');
  // повесил обработчик на указатель, активировал форму, задал нчальное значение адреса.
  adressForm.value = mapPin.offsetLeft + ', ' + mapPin.offsetTop;
  var mapActivation = function () {
    if (adForm && showMap) {
      adForm.classList.remove('ad-form--disabled');
      showMap.classList.remove('map--faded');
      for (var i = 0; i < fieldsetForm.length; i++) {
        fieldsetForm[i].removeAttribute('disabled');
      }
    }
  };

  // Перемещения главного маркера (.map__pin--main) по карте.
  mapPin.addEventListener('mousedown', function (evt) {
    var tokyoMap = document.querySelector('.map__overlay');
    mapActivation();
    window.load(function (pin) {

      var fragment = document.createDocumentFragment();
      for (var j = 0; j < pin.length; j++) {
        fragment.appendChild(window.renderPin(pin[j]));
      }
      window.mapPins.appendChild(fragment);
    });
    var startPinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startPinCoords.x - moveEvt.clientX,
        y: startPinCoords.y - moveEvt.clientY
      };
      startPinCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var limitPinCoords = {
        top: 130,
        bottom: 630,
        left: tokyoMap.offsetLeft,
        right: tokyoMap.offsetWidth
      };

      var nowPinCoords = {
        x: mapPin.offsetLeft - shift.x,
        y: mapPin.offsetTop - shift.y,
      };
      if (nowPinCoords.y <= limitPinCoords.top) {
        mapPin.style.top = limitPinCoords.top + 'px';
      } else if (nowPinCoords.y >= limitPinCoords.bottom) {
        mapPin.style.top = limitPinCoords.bottom + 'px';
      }
      if (nowPinCoords.x >= (limitPinCoords.right - mapPin.offsetWidth)) {
        mapPin.style.left = limitPinCoords.right - mapPin.offsetWidth + 'px';
      } else if (nowPinCoords.x <= limitPinCoords.left) {
        mapPin.style.left = limitPinCoords.left + 'px';
      }
      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function () {
      adressForm.value = mapPin.offsetLeft + ', ' + mapPin.offsetTop;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
