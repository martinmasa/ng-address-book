(function () {
  'use strict';

  function ContactsController ($rootScope, $location, ContactService) {

    // public
    var contacts = ContactService.getAll();

    $rootScope.filterLetters = $rootScope.filterLetters || '';
    $rootScope.selectedContacts = $rootScope.selectedContacts || [];

    function setFilterLetters (filterLetters) {
      $rootScope.filterLetters = angular.isString(filterLetters) ? filterLetters : '';
    }

    function toggleSelection (contact) {
      var contactIdIndex = $rootScope.selectedContacts.indexOf(contact.id);

      if (contactIdIndex > -1) {
        $rootScope.selectedContacts.splice(contactIdIndex, 1);
      }
      else {
        $rootScope.selectedContacts.push(contact.id);
      }
    }

    function deleteContact (contact) {
      if (confirm('Are you sure you want to delete ' + contact.firstName + ' ' + contact.lastName + '?')) {
        ContactService.delete(contact.id);
        $location.path('/contacts');
      }
    }

    // exports
    angular.extend(this, {
      contacts: contacts,
      setFilterLetters: setFilterLetters,
      toggleSelection: toggleSelection,
      deleteContact: deleteContact
    });
  }

  ContactsController.$inject = ['$rootScope', '$location', 'ContactService'];

  angular
    .module('app.contacts')
    .controller('ContactsController', ContactsController);

})();