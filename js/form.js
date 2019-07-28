'use strict';
(function () {
  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var typeOfHouse = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var timeArrival = document.querySelector('#timein');
  var timeDeparture = document.querySelector('#timeout');
  var quantityRooms = document.querySelector('#room_number');
  var quantityGuests = document.querySelector('#capacity')

  // вешаем обработчик на select и пишем условия для минимальной цены от значчения типа дома
  var houseTypeAndPrice = {
    'palace': {
      name: 'Дворец',
      price: 10000
    },
    'flat': {
      name: 'Квартира',
      price: 1000
    },
    'house': {
      name: 'Дом',
      price: 5000
    },
    'bungalo': {
      name: 'Бунгало',
      price: 0
    },
  };

  typeOfHouse.addEventListener('change', function () {
    var typeHouseArr = Object.keys(houseTypeAndPrice);
    for (var i = 0; i < typeHouseArr.length; i++) {
      if (typeHouseArr[i] === typeOfHouse.value) {
        var linkObjPrice = houseTypeAndPrice[typeHouseArr[i]].price;
        pricePerNight.min = linkObjPrice;
        pricePerNight.placeholder = pricePerNight.min;
      }
    }
  });

  // Поля «Время заезда» и «Время выезда» синхронизированы

  timeArrival.addEventListener('change', function () {
    timeDeparture.value = timeArrival.value;
  });

  timeDeparture.addEventListener('change', function () {
    timeArrival.value = timeDeparture.value;
  });

  // соответствия количества гостей с количеством комнат.
  var quantityRoomsAndGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  quantityRooms.addEventListener('change', function () {
    var optionQuantityGuests = quantityGuests.querySelectorAll('option');

    var quantityRoomsArr = Object.keys(quantityRoomsAndGuests);

    quantityRoomsArr.forEach(function (quantity) {
      if (quantity === quantityRooms.value) {
        optionQuantityGuests.forEach(function (elem) {
          if ( !~quantityRoomsAndGuests[quantity].indexOf(elem.value)) {
            elem.setAttribute('disabled', true);
          } else {
            elem.removeAttribute('disabled');
          }
        })
      }
    });

  });



})();
