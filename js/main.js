'use strict';

var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

var avatarUser = [];
var houseType = ['palace', 'flat', 'house', 'bungalo'];
var locationX;
var locationY;

// генерация рандомныъ координат
locationX = function () {
  var min = 0;
  var max = 1067;
  return Math.floor(Math.random() * (max - min)) + min;
};

locationY = function () {
  var min = 130;
  var max = 630;
  return Math.floor(Math.random() * (max - min)) + min;
};

// генерация адресов аватаров
var generateAvatar = function() {
  for (var i = 1; i <= 8; i++) {
    var avatars = 'img/avatars/user0' + i + '.png';
    avatarUser.push(avatars);
  }
  return avatarUser;
};
// работа с шаблоном
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function () {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin');00
}
