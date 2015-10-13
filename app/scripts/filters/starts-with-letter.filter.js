(function () {
  'use strict';

  function startsWithLetter () {
    return function (items, filterLetters) {
      items = items || [];

      // return all contacts if filterLetters is not defined or not a string
      if(!filterLetters || !angular.isString(filterLetters)){
        return items;
      }

      var filtered = [];
      filterLetters = angular.uppercase(filterLetters);

      for (var i = 0; i < items.length; i++) {
        var fName = items[i].firstName ? angular.uppercase(items[i].firstName) : null;

        if (fName && filterLetters.indexOf(fName.charAt(0)) > -1) {
          filtered.push(items[i]);
        }
      }

      return filtered;
    };
  }

  angular
    .module('app')
    .filter('startsWithLetter', startsWithLetter);
})();