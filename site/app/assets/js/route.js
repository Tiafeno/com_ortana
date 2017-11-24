'use strict'

var routeFormInjectable = angular.module('routeFormInjectable', [ 'ngMaterial'])
  .controller('InscriptionCtrl', ['$scope', 'OServices', 
  function( $scope, OServices ) {
    
  }])
  /** Controller du formulaire de contact */
  .controller('FormCtrl', ['$scope', '$location', 'OServices', 'OFactory', 
  function( $scope, $location, OServices, OFactory ) {
    $scope.Articles = {};
    /**
     * Récuperer l'article selectionner et les stockers
     * @param {void}
     * @return {Promise} Objet
     */
    OServices.getChoosenArticleFn()
      .then(function successCallback( response ) {
        if ( ! _.isObject( response )) $location.path('/inscription');
        $scope.Articles = response;
      }).catch(function() { 
        console.warn('Error on get article');
        $location.path('/inscription');
      });
    
    /**
     * @function sendMail
     * Envoie le contenue du formulaire à l'administration d'ortana
     * @param {$event, form}
     * @return {bool}
     */
    $scope.sendEmail = function( $event, $form ) {

    };
  }])
  .directive('chooseArticle', ['OServices', '$location', 
    function( OServices, $location) {
      return {
        restrict: "A",
        scope: true,
        link: function(scope, element, attr) {
          var article_id = parseInt(attr.chooseArticle);
          
          /** @desc Selectionner une article dans le service */
          OServices.chooseArticleFn( article_id );
          element.bind('click', function(ev) {
            scope.$apply(function() {
              $location.path( '/inscription/formulaire' );
            })
          })
        }
      }
  }]);