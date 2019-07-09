'use strict';
(function () {
  var houseType = ['palace', 'flat', 'house', 'bungalo'];

  var usersFeature = [];
  var locationX = {
    min: 10,
    max: 800
  };
  var locationY = {
    min: 130,
    max: 620
  };

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
var mapPins = document.querySelector('.map__pins')
var pinTempalte = document.querySelector('#pin').content;
var renderPin = function (pin) {
  var pinElement = pinTempalte.cloneNode(true);
  pinElement.querySelector('.map__pin').style.left = pin.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;

  return pinElement;
}
var fragment = document.createDocumentFragment();
for (var i = 0; i < usersFeature.length; i++) {
  fragment.appendChild(renderPin(usersFeature[i]));
}
mapPins.appendChild(fragment);
})();
