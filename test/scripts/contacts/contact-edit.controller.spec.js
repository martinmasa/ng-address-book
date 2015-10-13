(function () {
  'use strict';

  describe('ContactEditController', function() {

    var $location,
        $controller,
        ContactEditController,
        ContactService,
        testContact = [
            { id: 3, firstName: 'Emma', lastName: 'Jane', address1: '2 Malta Street', address2: '', town: 'Manchester',
              county: 'Lancashire', country: 'United Kingdom', postcode: 'M4 7BH' }
          ];

    beforeEach(function() {
      module('app.contacts');

      inject(function (_$location_ , _$controller_, _ContactService_) {
        $location = _$location_;
        ContactService = _ContactService_;
        $controller = _$controller_;
      });

    });

    describe('Initialisation', function() {

        var contactServiceGetByIdSpy;

        beforeEach(function() {
          contactServiceGetByIdSpy = spyOn(ContactService, 'getById').and.returnValue(testContact);
        });

        it('should assign null to editContact if contactId parameter is not provided', function() {
          ContactEditController = $controller('ContactEditController', {$location: $location, $routeParams: {}, ContactService: ContactService});
          expect(contactServiceGetByIdSpy).not.toHaveBeenCalled();
          expect(ContactEditController.editContact).toBeNull();
        });

        it('should assign a contact to editContact if contactId parameter is provided', function() {
          ContactEditController = $controller('ContactEditController', {$location: $location, $routeParams: {contactId: 3}, ContactService: ContactService});
          expect(contactServiceGetByIdSpy).toHaveBeenCalledWith(3);
          expect(ContactEditController.editContact).toEqual(testContact);
        });

    });

    describe('saveContact', function() {

      var contactServiceSaveSpy = null,
          contactServiceUpdateSpy = null,
          locationPathSpy = null;

      beforeEach(function() {
        ContactEditController = $controller('ContactEditController', {$location: $location, $routeParams: {}, ContactService: ContactService});
        contactServiceSaveSpy = spyOn(ContactService, 'save');
        contactServiceUpdateSpy = spyOn(ContactService, 'update');
        locationPathSpy = spyOn($location, 'path');
      });

      it('should save new contact if contact ID is not provided or not greater than 0', function() {
        var newContact = { id: -1, firstName: 'Emma', lastName: 'Jane', country: 'United Kingdom', postcode: 'M4 7BH' }
        ContactEditController.saveContact(newContact);
        expect(contactServiceSaveSpy).toHaveBeenCalledWith(newContact);
        expect(contactServiceUpdateSpy).not.toHaveBeenCalled();
      });

      it('should update contact if contact ID is provided and greater than 0', function() {
        var updatedContact = { id: 3, firstName: 'Emma', lastName: 'Jane', country: 'United Kingdom', postcode: 'M4 7BH' }
        ContactEditController.saveContact(updatedContact);
        expect(contactServiceUpdateSpy).toHaveBeenCalledWith(updatedContact);
        expect(contactServiceSaveSpy).not.toHaveBeenCalled();
      });

      it('should set editContact value to null after saving or updating', function() {
        ContactEditController.saveContact({ id: 3, firstName: 'Emma', lastName: 'Jane', country: 'United Kingdom', postcode: 'M4 7BH' });
        expect(ContactEditController.editContact).toBeNull();
      });

      it('should redirect to "/contacts" after saving or updating', function() {
        ContactEditController.saveContact({ id: 3, firstName: 'Emma', lastName: 'Jane', country: 'United Kingdom', postcode: 'M4 7BH' });
        expect(locationPathSpy).toHaveBeenCalledWith('/contacts');
      });

    });

  });
})();