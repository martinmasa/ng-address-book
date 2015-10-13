(function () {
  'use strict';

  function ContactEditController ($location, $routeParams, ContactService) {

    // private
    var _contactId = $routeParams.contactId ? parseInt($routeParams.contactId) : 0,
        _originalContact = _contactId > 0 ? ContactService.getById(_contactId) : null;

    // public
    var editContact = _originalContact ? angular.copy(_originalContact) : null;

    function saveContact (editContact) {
      if(editContact.id && editContact.id > 0){
        ContactService.update(editContact);
      }
      else {
        ContactService.save(editContact);
      }

      _originalContact = null;
      editContact = {};
      $location.path('/contacts');
    }

    // exports
    angular.extend(this, {
      editContact: editContact,
      saveContact: saveContact
    });
  }

  ContactEditController.$inject = ['$location', '$routeParams', 'ContactService'];

  angular
    .module('app.contacts')
    .controller('ContactEditController', ContactEditController);
})();