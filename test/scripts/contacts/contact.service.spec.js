(function () {
  'use strict';

  describe('ContactService', function () {

    var ContactService,
        $localStorage,
        initialContacts = [
            { id: 1, firstName: 'Alex', lastName: 'Smith', address1: '10 Woodgate Road', address2: 'Whalley Range',
              town: 'Manchester', county: '', country: 'United Kingdom', postcode: 'M16 8LX'},
            { id: 2, firstName: 'Jane', lastName: 'Doe', address1: '3 Lancaster Court', address2: 'Ducks Hill Road',
              town: 'Northwood', county: 'Middlesex', country: 'United Kingdom', postcode: 'HA6 2QD'},
            { id: 3, firstName: 'Emma', lastName: 'Jane', address1: '2 Malta Street', address2: '', town: 'Manchester',
              county: 'Lancashire', country: 'United Kingdom', postcode: 'M4 7BH'}
          ];

    beforeEach(function() {
      module('app.contacts');

      inject(function (_ContactService_, _$localStorage_) {
        $localStorage = _$localStorage_;
        ContactService = _ContactService_;
      });

    });

    afterEach(function() {
      $localStorage.contacts = null;
    });

    describe('initialisation', function () {

      it('should assign initialContacts to $localStorage.contacts', function () {
        expect($localStorage.contacts).toEqual(initialContacts);
      });

    });

    describe('getAll', function() {

      it('should return all contacts', function() {
        expect(ContactService.getAll()).toEqual(initialContacts);
      });

    });

    describe('getById', function() {

      it('should return the contact associated with given id if it exists', function() {
        var contact = ContactService.getById(2);
        expect(contact.id).toEqual(2);
        expect(contact).toEqual(initialContacts[1]);
      });

      it('should return null if no contact associated with given id', function() {
        var contact = ContactService.getById(12345);
        expect(contact).toBeNull();
      });

    });

    describe('save', function() {
      var contactsPushSpy;

      beforeEach(function() {
        contactsPushSpy = spyOn($localStorage.contacts, 'push').and.callThrough();
      });

      it('should not add new item to $localStorage.contacts if argument is undefined ', function() {
        ContactService.save();
        expect(contactsPushSpy).not.toHaveBeenCalled();
      });

      it('should not add new item to $localStorage.contacts if argument is null', function() {
        ContactService.save(null);
        expect(contactsPushSpy).not.toHaveBeenCalled();
      });

      it('should add new item to $localStorage.contacts', function() {
        ContactService.save({ firstName: 'Alex', lastName: 'Smith' });
        expect(contactsPushSpy).toHaveBeenCalled();
        expect($localStorage.contacts.length).toEqual(4);
      });

    });

    describe('update', function () {

      it('should not update if argument is undefined', function() {
        ContactService.update();
        expect($localStorage.contacts).toEqual(initialContacts);
      });

      it('should not update if argument is null ', function() {
        ContactService.update(null);
        expect($localStorage.contacts).toEqual(initialContacts);
      });

      it('should not update if argument does not have an id property', function() {
        ContactService.update({a: 2, b: 5, c: "c"});
        expect($localStorage.contacts).toEqual(initialContacts);
      });

      it('should not update if contact with id to update is not found in existing $localStorage.contacts', function() {
        ContactService.update({id: 22, firstName: 'Jane', lastName: 'Dough' });
        expect($localStorage.contacts).toEqual(initialContacts);
      });

      it('should update $localStorage.contacts with new details', function() {
        ContactService.update({id: 2, firstName: 'Jane', lastName: 'Dough' });
        expect($localStorage.contacts).not.toEqual(initialContacts);
        expect($localStorage.contacts.length).toEqual(3);
        expect($localStorage.contacts[1].lastName).toEqual('Dough');
      });

    });

    describe('delete', function() {

      var contactsSpliceSpy;

      beforeEach(function() {
        contactsSpliceSpy = spyOn($localStorage.contacts, 'splice').and.callThrough();
      });

      it('should not delete if contactId does not match an existing contact', function() {
        ContactService.delete(5);
        expect($localStorage.contacts.length).toEqual(initialContacts.length);
        expect(contactsSpliceSpy).not.toHaveBeenCalled();
      });

      it('should delete if contactId matches an existing contact', function() {
        ContactService.delete(1);
        expect($localStorage.contacts.length).toEqual(2);
        expect(contactsSpliceSpy).toHaveBeenCalledWith(0, 1);
      });
    });

  });
})();