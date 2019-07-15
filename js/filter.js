'use strict';

var housingTypeMap = document.querySelector('#housing-type');

housingTypeMap.addEventListener('change', function () {

  window.load(function (pin) {

    var housesTypes = pin.filter(function (elem) {
      return elem.offer.type === housingTypeMap.value;
    });
    var fragment = document.createDocumentFragment();
    housesTypes.forEach(function(pin) {
      fragment.appendChild(window.renderPin(pin));
    });
    window.mapPins.appendChild(fragment);

});
});
window.load(function (pin) {

  var housesTypes = pin.filter(function (elem) {
    return elem.offer.type === true;
  });
  console.log(housesTypes);
  if (housingTypeMap.value === housesTypes) {

  }


  var fivePins = pin.slice(0, 5);
  var fragment = document.createDocumentFragment();
  fivePins.forEach(function(pin) {
    fragment.appendChild(window.renderPin(pin));
  });
  window.mapPins.appendChild(fragment);
});
