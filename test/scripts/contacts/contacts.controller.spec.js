(function () {
  'use strict';

  describe('ContactsController', function() {

    var $rootScope,
        $location,
        ContactsController,
        ContactService,
        contactServiceGetAllSpy,
        contacts = [
            { id: 1, firstName: 'Alex', lastName: 'Smith', address1: '10 Woodgate Road', address2: 'Whalley Range',
              town: 'Manchester', county: '', country: 'United Kingdom', postcode: 'M16 8LX'},
            { id: 2, firstName: 'Jane', lastName: 'Doe', address1: '3 Lancaster Court', address2: 'Ducks Hill Road',
              town: 'Northwood', county: 'Middlesex', country: 'United Kingdom', postcode: 'HA6 2QD'},
            { id: 3, firstName: 'Emma', lastName: 'Jane', address1: '2 Malta Street', address2: '', town: 'Manchester',
              county: 'Lancashire', country: 'United Kingdom', postcode: 'M4 7BH'}
          ];

    beforeEach(function() {
      module('app.contacts');

      inject(function (_$rootScope_, _$controller_, _$location_, _ContactService_) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        ContactService = _ContactService_;
        contactServiceGetAllSpy = spyOn(ContactService, 'getAll').and.returnValue(contacts);
        ContactsController = _$controller_('ContactsController', {$rootScope: $rootScope, $location: $location, ContactService: ContactService});
      });

    });

    describe('Initialisation', function() {

      it('should assign result from ContactService.getAll to contacts property', function() {
        expect(ContactsController.contacts).toEqual(contacts);
        expect(contactServiceGetAllSpy).toHaveBeenCalled();
      });

      it('should set $rootScope.filterLetters to an empty string', function() {
        expect($rootScope.filterLetters).toEqual('');
      });

      it('should set $rootScope.selectedContacts to an empty array', function() {
        expect($rootScope.selectedContacts).toEqual([]);
      });

    });

    describe('setFilterLetters', function() {

      it('should set $rootScope.filterLetters to empty if undefined is passed in', function() {
        ContactsController.setFilterLetters();
        expect($rootScope.filterLetters).toEqual('');
      });

      it('should set $rootScope.filterLetters to empty if null is passed in', function() {
        ContactsController.setFilterLetters(null);
        expect($rootScope.filterLetters).toEqual('');
      });

      it('should set $rootScope.filterLetters to empty if non-string is passed in', function() {
        ContactsController.setFilterLetters(1234);
        expect($rootScope.filterLetters).toEqual('');
      });

      it('should set $rootScope.filterLetters to passed in argument if it is a string', function() {
        ContactsController.setFilterLetters('ABCD');
        expect($rootScope.filterLetters).toEqual('ABCD');
      });

    });

    describe('toggleSelection', function() {

      it('should add contacttId to $rootScope.selectedContacts if its not present' , function() {
        ContactsController.toggleSelection({id: 1});
        expect($rootScope.selectedContacts).toContain(1);
      });

      it('should remove contactId from $rootScope.selectedContacts if its present', function() {
        ContactsController.toggleSelection({id: 2});
        expect($rootScope.selectedContacts).toContain(2);
        ContactsController.toggleSelection({id: 2});
        expect($rootScope.selectedContacts).not.toContain(2);
      });

    });

    describe('deleteContact', function() {

      it('should not delete contact if confirm returns false', function() {
        var confirmSpy = spyOn(window, 'confirm').and.returnValue(false),
            contactServiceDeleteSpy = spyOn(ContactService, 'delete');
        ContactsController.deleteContact({id: 2, firstName: 'Jane', lastName: 'Doe' });
        expect(confirmSpy.calls.count()).toEqual(1);
        expect(contactServiceDeleteSpy).not.toHaveBeenCalled();
      });

      it('should delete contact if confirm returns true', function() {
        var confirmSpy = spyOn(window, 'confirm').and.returnValue(true),
            contactServiceDeleteSpy = spyOn(ContactService, 'delete'),
            locationGoSpy = spyOn($location, 'path');
        ContactsController.deleteContact({id: 2, firstName: 'Jane', lastName: 'Doe' });
        expect(confirmSpy.calls.count()).toEqual(1);
        expect(contactServiceDeleteSpy).toHaveBeenCalledWith(2);
        expect(locationGoSpy).toHaveBeenCalledWith('/contacts');
      });

    });

  });
})();