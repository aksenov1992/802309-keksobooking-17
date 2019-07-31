'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  window.form = document.querySelector('.ad-form');
  var fieldsetForm = window.form.querySelectorAll('fieldset');
  var adressForm = window.form.querySelector('#address');
  // повесил обработчик на указатель, активировал форму, задал нчальное значение адреса.
  adressForm.value = mapPin.offsetLeft + ', ' + mapPin.offsetTop;

  var mapActivation = function () {
    if (window.form && map) {
      window.form.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      for (var i = 0; i < fieldsetForm.length; i++) {
        fieldsetForm[i].removeAttribute('disabled');
      }
    }
  };

  // вешаем обработчик на родителя пинов, для делегирования и рендерим карточки.
  var showCard = function (evt, createCard) {

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
          closeCard();
          return;
        }
        target = target.parentNode;
      }
    };
    createCard();
  };

  var closeCard = function () {
    var buttonClose = document.querySelector('.popup__close');
    if (buttonClose) {
      buttonClose.offsetParent.remove();
    }
  };

  window.mapPins.addEventListener('click', showCard);

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  });
  // функция для актвиации карты.
  var activateMap = function () {
    mapActivation();
    window.renderQuantityPins();
    mapPin.removeEventListener('click', activateMap);
  }

  mapPin.addEventListener('click', activateMap);


  // функция дефолтного значения адреса главного пина

  window.giveDefaultCoords = function () {
    mapPin.style.left = '570px';
    mapPin.style.top = '375px';
    adressForm.value = mapPin.offsetLeft + ', ' + mapPin.offsetTop;

  };

  // обработчик для кнопки очиситить

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.reset();
    window.deletePin();
    window.giveDefaultCoords();
  })

  // Перемещения главного маркера (.map__pin--main) по карте.
  mapPin.addEventListener('mousedown', function (evt) {
    var tokyoMap = document.querySelector('.map__overlay');


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

  window.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.form), function (response) {
    });
  });

})();
