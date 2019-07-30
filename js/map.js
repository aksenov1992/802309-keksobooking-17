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

  // вешаем обработчик на родителя пинов, для делегирования и рендерим карточки.
  var showCard = function (evt, createCard) {
    window.mapPins.addEventListener('keydown', onEscPressClose);

    createCard = function () {
      var target = evt.target;
      while (target !== window.mapPins) {
        if (target.alt === 'Метка объявления') {

          var targetCard = window.advertData.filter(function (elem) {
            var targerLink = target.src.substring(target.src.length - elem.author.avatar.length);

            return elem.author.avatar === targerLink;
          });
          window.appendItem(targetCard, window.renderCard);

        }
        // удаляем карточку.
        if (target.className === 'popup__close') {
          target.offsetParent.remove();
          return;
        }
        target = target.parentNode;
      }
    };
    createCard();
    document.addEventListener('keydown', onEscPressClose);

  };

  var onEscPressClose = function (target) {
    var buttonClose = document.querySelector('.popup__close');

    if (target.key === 'Escape' && buttonClose) {
      document.removeEventListener('keydown', onEscPressClose);
      buttonClose.offsetParent.remove();
    }
  };

  window.mapPins.addEventListener('click', showCard);

  // Перемещения главного маркера (.map__pin--main) по карте.
  mapPin.addEventListener('mousedown', function (evt) {
    var tokyoMap = document.querySelector('.map__overlay');
    mapActivation();
    window.renderQuantityPins();

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
