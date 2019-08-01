'use strict';
(function () {

  // работа с шаблоном
  window.fragment = document.createDocumentFragment();
  window.mapPins = document.querySelector('.map__pins');
  var pinTempalte = document.querySelector('#pin').content;
  window.renderPin = function (pin) {
    var pinElement = pinTempalte.cloneNode(true);
    pinElement.querySelector('.map__pin').style.left = pin.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;

    return pinElement;
  };

  window.advertData = [];

  window.load(function (data) {
    window.advertData = data;
  });
  // шаблон для карточки
  var cardTemplate = document.querySelector('#card').content;

  window.renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до' + card.offer.checkout + '.';
    cardElement.querySelector('.popup__description').textContent = card.offer.description;


    var cardFeature = cardElement.querySelector('.popup__features');
    cardFeature.innerHTML = '';

    card.offer.features.forEach(function (elem) {
      var tempFeature = document.createElement('li');
      tempFeature.classList.add('popup__feature', 'popup__feature--' + elem);

      cardFeature.appendChild(tempFeature);
    });

    var cardPhoto = cardElement.querySelector('.popup__photos');
    cardPhoto.innerHTML = '';

    card.offer.photos.forEach(function (elem) {
      var tempPhoto = document.createElement('img');

      tempPhoto.classList.add('popup__photo');
      tempPhoto.src = elem;
      tempPhoto.style.width = '45px';
      tempPhoto.style.height = '40px';
      tempPhoto.style.alt = 'Фотография жилья';

      cardPhoto.appendChild(tempPhoto);
    });

    return cardElement;
  };
  // шаблон для удачной отправки формы
  var successMessageTemplate = document.querySelector('#success').content;

  window.renderSuccessMessage = function () {
    var successElement = successMessageTemplate.cloneNode(true);
    successElement.querySelector('.success').id = 'message';
    document.querySelector('main').appendChild(successElement);

    mainPage.addEventListener('click', closePopUp);
    mainPage.addEventListener('keydown', closePopUp);
  };
  // шаблон для не удачной отправки формы
  var errorMessageTemplate = document.querySelector('#error').content;

  window.renderErrorMessage = function () {
    var errorElement = errorMessageTemplate.cloneNode(true);
    errorElement.querySelector('.error').id = 'message';
    document.querySelector('main').appendChild(errorElement);

    mainPage.addEventListener('click', closePopUp);
    mainPage.addEventListener('keydown', closePopUp);
  };

  // функкция удаления сообщения
  var mainPage = document.querySelector('main');

  var closePopUp = function () {
    var message = document.querySelector('#message');
    if (message) {
      message.remove();
      mainPage.removeEventListener('click', closePopUp);
      mainPage.removeEventListener('keydown', closePopUp);
    }
  };

  window.appendItem = function (array, whatRender) {
    array.forEach(function (element) {
      window.fragment.appendChild(whatRender(element));
    });
    window.mapPins.appendChild(window.fragment);
  };
})();
