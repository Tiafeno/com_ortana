'use strict'

var formRoute = angular.module('formRoute', [ "ngMaterial", "ngRoute" ]);
formRoute.controller('InscriptionCtrl', ['$scope', function( $scope ) {
}]);
  /** Controller du formulaire de contact */
formRoute.controller('FormCtrl', ['$scope', '$location', 'OServices', 'OFactory', 
                                  function( $scope, $location, OServices, OFactory ) {
    $scope.article = {};
    $scope.ortanaform = {};
    /**
     * Récuperer l'article selectionner et les stockers
     * @param {void}
     * @return {Promise} Objet
     */
    OServices.getChoosenArticleFn()
      .then(function successCallback( response ) {
        if (_.isNull( response )) $location.path('/inscription');
        $scope.article = response;
      }, function errorCallback( errno ) {
        $location.path('/inscription');
      });
    /**
     * Envoie le contenue du formulaire à l'administration d'ortana
     * @param {bool} isValid
     * @return {bool}
     */
    $scope.sendEmail = function( isValid ) {
      var Form = new FormData();
      Form.append('option', 'com_ortana');
      Form.append('task', 'sendMail');
      Form.append('format', 'json');
      /** params */
      Form.append('firstname', $scope.ortanaform.firstname);
      Form.append('lastname', $scope.ortanaform.lastname);
      Form.append('society', $scope.ortanaform.society);
      Form.append('adress', $scope.ortanaform.adress);
      Form.append('email', $scope.ortanaform.clientEmail);
      Form.append('description', $scope.ortanaform.description);
      Form.append('article_id', $scope.article.id);
      OFactory.formHttp( Form )
        .then(function successCallback( results ) {
          var rq = results.data;
          console.log(rq);
        })
    };
}]);

formRoute.directive('chooseArticle', ['OServices', '$location', 
  function( OServices, $location) {
    return {
      restrict: "A",
      scope: true,
      link: function(scope, element, attr) {
        var article_id = parseInt(attr.chooseArticle);
        /** @desc Selectionner une article dans le service */
        element.bind('click', function(ev) {
          scope.$apply(function() {
            OServices.chooseArticleFn( article_id );
            $location.path( '/inscription/formulaire' );
          })
        })
      }
    }
}]);