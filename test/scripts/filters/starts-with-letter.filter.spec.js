  'use strict';

  describe('startsWithLetter Filter', function () {

    var filter, items;

    beforeEach(function () {
      module('app');

      inject(function (_$filter_) {
        filter = _$filter_('startsWithLetter');
      });

      items = [
          { id: 1, firstName: 'Emily', lastName: 'Smith', address1: '10 Woodgate Road', address2: 'Whalley Range',
            town: 'Manchester', county: '', country: 'United Kingdom', postcode: 'M16 8LX'},
          { id: 2, firstName: 'Jane', lastName: 'Doe', address1: '3 Lancaster Court', address2: 'Ducks Hill Road',
            town: 'Northwood', county: 'Middlesex', country: 'United Kingdom', postcode: 'HA6 2QD'},
          { id: 3, firstName: 'Emma', lastName: 'Jane', address1: '2 Malta Street', address2: '', town: 'Manchester',
            county: 'Lancashire', country: 'United Kingdom', postcode: 'M4 7BH'}
        ];
    });

    it('should return all the items if filterLetters is not defined', function () {
        expect(filter(items)).toEqual(items);
    });

    it('should return all the items if filterLetters is null', function () {
        expect(filter(items, null)).toEqual(items);
    });

    it('should return all the items if filterLetters is empty', function () {
        expect(filter(items, '')).toEqual(items);
    });

    it('should return all the items if filterLetters is not a String', function () {
        expect(filter(items, 3)).toEqual(items);
    });

    it('should filter items if filterLetters is a single letter', function () {
        var expected = [
          { id: 1, firstName: 'Emily', lastName: 'Smith', address1: '10 Woodgate Road', address2: 'Whalley Range',
            town: 'Manchester', county: '', country: 'United Kingdom', postcode: 'M16 8LX'},
          { id: 3, firstName: 'Emma', lastName: 'Jane', address1: '2 Malta Street', address2: '', town: 'Manchester',
            county: 'Lancashire', country: 'United Kingdom', postcode: 'M4 7BH'}
        ];

        expect(filter(items, 'E')).toEqual(expected);
    });

    it('should filter items if filterLetters is multiple letters', function () {
        var expected = [
          { id: 2, firstName: 'Jane', lastName: 'Doe', address1: '3 Lancaster Court', address2: 'Ducks Hill Road',
            town: 'Northwood', county: 'Middlesex', country: 'United Kingdom', postcode: 'HA6 2QD'},
        ];

        expect(filter(items, 'JKLMN')).toEqual(expected);
    });

    it('should filter items if filterLetters is a combination of letters and other characters', function () {
        var expected = [
          { id: 2, firstName: 'Jane', lastName: 'Doe', address1: '3 Lancaster Court', address2: 'Ducks Hill Road',
            town: 'Northwood', county: 'Middlesex', country: 'United Kingdom', postcode: 'HA6 2QD'},
        ];

        expect(filter(items, 'JK?13:')).toEqual(expected);
    });
  });