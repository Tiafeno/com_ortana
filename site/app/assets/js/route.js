'use strict'

var formRoute = angular.module('formRoute', [ "ngMaterial", "ngRoute" ]);
formRoute.controller('InscriptionCtrl', ['$scope', function( $scope ) {
  
}]);
  /** Controller du formulaire de contact */
formRoute.controller('FormCtrl', ['$scope', '$location', 'OServices', 'OFactory', '$mdDialog',
                                  function( $scope, $location, OServices, OFactory, $mdDialog ) {
    $scope.article = {};
    $scope.ortanaform = {};
    $scope.stat = null;
    $scope.loading = false;
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
    
    $scope.toggleLoading = function() {
      $scope.loading = !$scope.loading;
    }
    /**
     * Envoie le contenue du formulaire à l'administration d'ortana
     * @param {bool} isValid
     * @return {bool}
     */
    $scope.sendEmail = function( isValid ) {
      if ($scope.loading) return;
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
      Form.append('phone', $scope.ortanaform.phone);
      Form.append('description', ($scope.ortanaform.description == undefined) ? '' : $scope.ortanaform.description);
      Form.append('article_id', $scope.article.id);

      $scope.toggleLoading();
      OFactory.formHttp( Form )
        .then(function successCallback( results ) {
          $scope.toggleLoading();
          var rq = results.data;
          if (rq) {
            $scope.ortanaform = {};
            $scope.inscriptionForm.$setPristine();
            $scope.inscriptionForm.$setUntouched();
            $scope.stat = "Votre commande a bien été expédiée. Un(e) responsable vous contactera. Merci";
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Information')
                .textContent($scope.stat)
                .ariaLabel('Alert Dialog Demo')
                .ok('Accepter')
            )
            .then(function() {
              $location.path('/inscription');
            })
          } 
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