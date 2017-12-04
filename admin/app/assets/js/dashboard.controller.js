'use strict';

dashboard
  /**
  * Main controller
  */
  .controller('dashboardCtrl', ['$scope', 'dashboardFactory', 'dashboardServices', function( $scope, dashboardFactory, dashboardServices ) {
    $scope.configs = dashboardServices.setConfig();
    $scope.articles = [];
  }])
  /**
  * Factory service http
  */
  .factory('dashboardFactory', ["$http", function( $http ) {
    return {
      /**
      * @param {FormData}
      * @return {Promise}
      */
      formHttp: function( form ) {
        return $http({
          url: "index.php",
          method: "POST",
          headers: { 'Content-Type': undefined },
          data: form
        });
      },
      /**
      * @param {object}
      */
      get: function( query ) {
        return $http.get( "index.php", {
          params: query
        })
      }
    };
  }])
  /**
  * Service
  */
  .service('dashboardServices', [function() {
    var self = this;
    var config = null;
    var editId = NaN;
    self.setConfig = function() {
      if (_.isNull( config )) 
        return config = Joomla.optionsStorage.com_ortana;
    };
    self.setEditArticle = function( id ) { editId = parseInt(id); };
    self.getEditId = function() { return editId; }
    self.resetEdit = function() { return editId = NaN; }
    self.getConfig = function() { return config; }
  }])
  /**
  * Route configuration
  */
  .config(['$routeProvider', '$mdThemingProvider', function( $routeProvider, $mdThemingProvider ) {
    var options = Joomla.optionsStorage.com_ortana;
    var assets = options.assets;
    $routeProvider
      .when('/dashboard', {
        templateUrl: assets + 'js/partials/cpanel.html',
        controller: 'cpanelCtrl'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('green')
      .dark();

  }]);