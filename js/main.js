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
  if (timeArrival.value === '12:00') {
    timeDeparture.value = '12:00';
  }
  if (timeArrival.value === '13:00') {
    timeDeparture.value = '13:00';
  }
  if (timeArrival.value === '14:00') {
    timeDeparture.value = '14:00';
  }
});

timeDeparture.addEventListener('change', function () {
  if (timeDeparture.value === '12:00') {
    timeArrival.value = '12:00';
  }
  if (timeDeparture.value === '13:00') {
    timeArrival.value = '13:00';
  }
  if (timeDeparture.value === '14:00') {
    timeArrival.value = '14:00';
  }
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

var locationPin = function () {
  mapPin.addEventListener('mouseup', function () {
    adressForm.value = mapPin.offsetLeft + ', ' + mapPin.offsetTop;
  });
};

mapPin.addEventListener('click', function () {
  locationPin();
  mapActivation();
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
