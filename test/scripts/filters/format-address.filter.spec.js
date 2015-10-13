(function () {
  'use strict';

  describe('formatAddress filter', function () {

    var filter,
        contact;

    beforeEach(function() {
      module('app');

      inject(function (_$filter_) {
        var $filter = _$filter_;
        filter = $filter('formatAddress');
      });

      contact = { id: 1, firstName: 'Emily', lastName: 'Smith', address1: '45 Some Road', address2: 'Whalley Range',
            town: 'Manchester', county: 'Lancashire', country: 'United Kingdom', postcode: 'T3 5TT'};
    });


    it('should return an empty string if undefined is passed in', function() {
      expect(filter(undefined)).toEqual('');
    });

    it('should return an empty string if null is passed in', function() {
      expect(filter(null)).toEqual('');
    });

    it('should return an empty string if an incompatible object is passed in', function() {
      expect(filter('Emily')).toEqual('');
      expect(filter(345)).toEqual('');
      expect(filter(['Emily', 'Manchester', 'M16 8LX'])).toEqual('');
      expect(filter({ id: 1, firstName: 'Emily', lastName: 'Smith'})).toEqual('');
    });

    it('should format the address if a compatible object is passed in', function() {
      expect(filter(contact)).toEqual('45 Some Road, Whalley Range, Manchester, Lancashire, United Kingdom, T3 5TT');
    });

    it('should not include blank address properties in the formatted address', function() {
      contact = { id: 1, firstName: 'Emily', lastName: 'Smith', address1: '45 Some Road', address2: '',
            town: 'Manchester', county: '', country: '', postcode: 'T3 5TT'};

      var formattedAddress = filter(contact).split(',');

      angular.forEach(formattedAddress, function (value, key) {
        expect(value.trim()).toBeTruthy();
      });
    });

  });

})();