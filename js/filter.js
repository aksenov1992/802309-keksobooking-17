'use strict';
(function () {
  window.deletePin = function () {
    var pin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pin) {
      pin.forEach(function (el) {
        window.mapPins.removeChild(el);
      });
    }
  };

  // работа с фильтрами
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelected = mapFilters.querySelectorAll('select');

  var valueFilters = {
    guests: 'any',
    price: 'any',
    rooms: 'any',
    type: 'any',
    features: []
  };

  var getFilteredValue = function (evt) {
    var target = evt.target;

    mapFiltersSelected.forEach(function (ev) {
      if (target.id === ev.id) {
        valueFilters[target.id.slice('housing-'.length)] = target.value;
      }
    });

    if (target.tagName === 'INPUT' && target.checked) {
      valueFilters.features.push(target.value);

    } else if (target.tagName === 'INPUT') {
      valueFilters.features.splice(valueFilters.features.indexOf(target.value), 1);
    }
    var actualPinsArray = getActualPins(valueFilters);
    window.deletePin();
    window.appendItem(actualPinsArray.slice(0, 5), window.renderPin);
  };

  var getActualPins = function (actualFilter) {
    var filteredPins = [];

    window.advertData.forEach(function (element) {

      var elementType = '';
      if (element.offer.type === actualFilter.type) {
        elementType = element.offer.type;
      } else if (actualFilter.type === 'any') {
        elementType = true;
      }

      var elementPrice = parseInt(element.offer.price, 10);
      if (actualFilter.price === 'any') {
        elementPrice = 'any';

      } else if (elementPrice <= 10000) {
        elementPrice = 'low';

      } else if (elementPrice >= 50000) {
        elementPrice = 'hight';

      } else {
        elementPrice = 'middle';
      }

      var elementRooms = '';
      if (element.offer.rooms === parseInt(actualFilter.rooms, 10)) {
        elementRooms = element.offer.rooms;
      } else if (actualFilter.rooms === 'any') {
        elementRooms = true;
      }

      var elementGuests = '';
      if (element.offer.guests === parseInt(actualFilter.guests, 10)) {
      elementGuests = element.offer.guests;
      } else if (actualFilter.guests === 'any') {
          elementGuests = true;
      }

      var itemFeatures = '';
      if (actualFilter.features.length > 0) {
        actualFilter.features.forEach(function (elem) {
          if (element.offer.features.indexOf(elem) !== -1) {
            itemFeatures = element.offer.features;
          }
        });
      } else {
          itemFeatures = true;
      }

      if (elementType && elementPrice === actualFilter.price && elementRooms && elementGuests && itemFeatures) {
        filteredPins.push(element);
      }
    });
    return filteredPins;
  };

  mapFilters.addEventListener('change', getFilteredValue);

})();
