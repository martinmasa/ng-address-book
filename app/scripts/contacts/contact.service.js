(function () {
  'use strict';

  function ContactService ($localStorage) {

    var ContactService = {},
        initialContacts = [
            { id: 1, firstName: 'Alex', lastName: 'Smith', address1: '10 Woodgate Road', address2: 'Whalley Range',
              town: 'Manchester', county: '', country: 'United Kingdom', postcode: 'M16 8LX'},
            { id: 2, firstName: 'Jane', lastName: 'Doe', address1: '3 Lancaster Court', address2: 'Ducks Hill Road',
              town: 'Northwood', county: 'Middlesex', country: 'United Kingdom', postcode: 'HA6 2QD'},
            { id: 3, firstName: 'Emma', lastName: 'Jane', address1: '2 Malta Street', address2: '', town: 'Manchester',
              county: 'Lancashire', country: 'United Kingdom', postcode: 'M4 7BH'}
          ];

    $localStorage.contacts = $localStorage.contacts || initialContacts;

    ContactService.getAll = function () {
      return $localStorage.contacts;
    };

    ContactService.getById = function (contactId) {
      for (var i = 0; i < $localStorage.contacts.length; i++) {
        if ($localStorage.contacts[i].id === contactId) {
          return $localStorage.contacts[i];
        }
      }
      return null;
    };

    ContactService.save = function (contact) {
      if(!contact) {
        console.error('ContactService.save: error saving contact: ' + contact);
        return;
      }

      contact.id = new Date().getTime();
      $localStorage.contacts.push(contact);
      return contact;
    };

    ContactService.update = function (contact) {

      if(!contact || !contact.id){
        console.error('ContactService.update: error updating contact: ' + contact);
        return;
      }

      for (var i = 0; i < $localStorage.contacts.length; i++) {
        if ($localStorage.contacts[i].id === contact.id) {
          $localStorage.contacts[i] = contact;
        }
      }
    };

    ContactService.delete = function (contactId) {
      for (var i = $localStorage.contacts.length - 1; i >= 0; i--) {
        if ($localStorage.contacts[i].id === contactId) {
          $localStorage.contacts.splice(i, 1);
          break;
        }
      }
    };

    return ContactService;
  }

  ContactService.$inject = ['$localStorage'];

  angular
    .module('app.contacts')
    .service('ContactService', ContactService );
})();