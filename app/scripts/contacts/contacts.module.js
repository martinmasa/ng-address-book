(function () {
  'use strict';

  // setup contacts module
  angular
    .module('app.contacts', [
      'ngRoute',
      'ngStorage'
    ])
    .config(['$routeProvider',function ($routeProvider) {

      // TODO: switch to ui-router

      $routeProvider
        .when('/contacts', {
          templateUrl: 'scripts/contacts/views/contact-list.html',
          controller: 'ContactsController',
          controllerAs: 'contactsvm'
        })
        .when('/contacts/:contactId', {
          templateUrl: 'scripts/contacts/views/contact-form.html',
          controller: 'ContactEditController',
          controllerAs: 'contacteditvm'
        })
        .otherwise({
          redirectTo: '/contacts'
        });

    }]);
})();