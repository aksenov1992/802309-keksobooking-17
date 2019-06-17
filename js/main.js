'use strict';

var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

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

// генерация рандомных координат
var generateRandomLocation = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// генерация адресов аватаров
var generateAvatar = function () {
  var usersAvatar = [];
  for (var i = 1; i <= 8; i++) {
    var avatars = 'img/avatars/user0' + i + '.png';
    usersAvatar.push(avatars);
  }
  return usersAvatar[i];
};

// Выбор случайного типа дома из массива
var generateRandomHouse = function () {
  var randomHouse = Math.floor(Math.random() * houseType.length);
  return houseType[randomHouse];
};

//  Генерация объектов

var generateUsersFeature = function () {
  usersFeature.push(
      {author: {
          avatar: generateAvatar()
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
console.log(generateUsersFeature());
// работа с шаблоном
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function () {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin');
};
