'use strict';

var showMap = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsetForm = adForm.querySelectorAll('fieldset');
var adressForm = adForm.querySelector('#address');
var houseType = ['palace', 'flat', 'house', 'bungalo'];
var usersFeature = [];

var locationX = {
  min: 0,
  max: 10
};
var locationY = {
  min: 0,
  max: 10
};

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:

var typeOfHouse = adForm.querySelector('#type');
var pricePerNight = adForm.querySelector('#price');

// вешаем обработчик на select и пишем условия для минимальной цены от значчения типа дома
typeOfHouse.addEventListener('change', function () {
  for (var i = 0; i < houseType.length; i++) {
    if (typeOfHouse.value === houseType[0]) {
      pricePerNight.min = 10000;
      pricePerNight.placeholder = '10000';
    }
    if (typeOfHouse.value === houseType[1]) {
      pricePerNight.min = 1000;
      pricePerNight.placeholder = '1000';
    }
    if (typeOfHouse.value === houseType[2]) {
      pricePerNight.min = 5000;
      pricePerNight.placeholder = '5000';
    }
    if (typeOfHouse.value === houseType[3]) {
      pricePerNight.min = 0;
      pricePerNight.placeholder = '0';
    }
  }
});

// Поля «Время заезда» и «Время выезда» синхронизированы
var timeArrival = adForm.querySelector('#timein');
var timeDeparture = adForm.querySelector('#timeout');

timeArrival.addEventListener('change', function () {
  timeDeparture.value = timeArrival.value;
});

timeDeparture.addEventListener('change', function () {
  timeArrival.value = timeDeparture.value;
});

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

// Перемещения главного маркера (.map__pin--main) по карте...
mapPin.addEventListener('mousedown', function (evt) {
  var tokyoMap = document.querySelector('.map__overlay');
  mapActivation();
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
      buttom: 630,
      left: tokyoMap.offsetLeft,
      right: tokyoMap.offsetWidth
    };

    var nowPinCoords = {
      x: mapPin.offsetLeft - shift.x,
      y: mapPin.offsetTop - shift.y,
    };
    if (nowPinCoords.y <= limitPinCoords.top) {
      mapPin.style.top = limitPinCoords.top + 'px';
    } else if (nowPinCoords.y >= limitPinCoords.buttom) {
      mapPin.style.top = limitPinCoords.buttom + 'px';
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

// генерация рандомных координат
var generateRandomLocation = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// генерация адресов аватаров
var generateAvatar = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

// Выбор случайного типа дома из массива
var generateRandomHouse = function () {
  var randomHouse = Math.floor(Math.random() * houseType.length);
  return houseType[randomHouse];
};

//  Генерация объектов
var generateUsersFeature = function (index) {
  usersFeature.push(
      {author: {
        avatar: generateAvatar(index)
      },
      offer: {
        type: generateRandomHouse()
      },
      location: {
        x: generateRandomLocation(locationX.min, locationX.max),
        y: generateRandomLocation(locationY.min, locationY.max)
      }
      }
  );
  return usersFeature;
};

for (var i = 0; i < 8; i++) {
  generateUsersFeature(i);
}

// работа с шаблоном
