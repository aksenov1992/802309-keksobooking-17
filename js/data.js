'use strict';
(function () {
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
var generateAvatar = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

// Выбор случайного типа дома из массива
var generateRandomHouse = function () {
  var randomHouse = Math.floor(Math.random() * window.form.houseType.length);
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
})();
