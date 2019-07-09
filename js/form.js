'use strict';
(function () {
  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var typeOfHouse = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var timeArrival = document.querySelector('#timein');
  var timeDeparture = document.querySelector('#timeout');
  var houseType = ['palace', 'flat', 'house', 'bungalo'];

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
          var linkObjPrice = eval('houseTypeAndPrice.' + typeHouseArr[i] + '.price');
          pricePerNight.min = linkObjPrice;
          pricePerNight.placeholder = pricePerNight.min;
        }
      }
    });

/*  typeOfHouse.addEventListener('change', function () {
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
*/
  // Поля «Время заезда» и «Время выезда» синхронизированы

  timeArrival.addEventListener('change', function () {
    timeDeparture.value = timeArrival.value;
  });

  timeDeparture.addEventListener('change', function () {
    timeArrival.value = timeDeparture.value;
  });

})();
