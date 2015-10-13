(function () {
  'use strict';

  function formatAddress () {
    return function(item){

      var address = '';

      if(!item) {
        return address;
      }

      address += item.address1 || '';
      address += item.address2 ? ', ' + item.address2 : '';
      address += item.town ? ', ' + item.town : '';
      address += item.county ? ', ' + item.county : '';
      address += item.country ? ', ' + item.country : '';
      address += item.postcode ? ', ' + item.postcode : '';

      return address;
    };
  }

  angular
    .module('app')
    .filter('formatAddress', formatAddress);
})();