'use strict'
var routeDashboard = angular.module('routeDashboard', [ 'ngMaterial', 'ngRoute' ]);
routeDashboard
  .controller('cpanelCtrl', ["$scope", "dashboardFactory", "dashboardServices", "$mdDialog",
                             function( $scope, dashboardFactory, dashboardServices, $mdDialog ) {

    $scope.tarif = {};
    $scope.progressbar = false;
    $scope.toggleProgress = function() {
      $scope.progressbar = $scope.progressbar ? false : true;
    };
    $scope.Initialize = function() {
      var Form = new FormData();
      Form.append('option', 'com_ajax');
      Form.append('plugin', 'tarifs');
      Form.append('method', 'selectAll');
      Form.append('format', 'json');

      dashboardFactory.formHttp( Form )
        .then( function successCallback( results ) {
          var request = results.data;
          if (request.success)
            /** Return data array in array */
            $scope.articles = _.flatten(request.data);
        })
    };
    $scope.Initialize();

    $scope.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    $scope.editDialog = function( ev, article_id ) {
      dashboardServices.setEditArticle( article_id );
      $mdDialog.show({
        controller: dialogCtrl,
        scope: $scope,
        preserveScope: true,
        templateUrl: $scope.configs.assets + 'js/partials/dialog.edit.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose: true
      })
      .then(function(answer) {
        /** save change */
        dashboardServices.resetEdit();
      }, function() {
        dashboardServices.resetEdit();
      });
    };

    function dialogCtrl( $scope, $mdDialog, dashboardFactory, dashboardServices ) {
      $scope.id = dashboardServices.getEditId();
      if (_.isNaN($scope.id)) { console.warn( 'Variable `editId` n\est pas definie' ); return;}
      $scope.fields = $scope.getFields( $scope.id );
      $scope.inputField = "";

      $scope.submitField = function() {
        if ($scope.inputField =="" || $scope.inputField == " ") return;
        $scope.fields.push( $scope.inputField );
        $scope.inputField = "";

        /** update global article value */
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.saveField = function() {
        $scope.articles = _.map( $scope.articles, function( _art ) {
          if (_art.id == $scope.id.toString())
            _art.fields = $scope.fields;
          return _art;
        });
        $mdDialog.hide();
      };

      $scope.deleteField = function( fieldTitle ) {
        $scope.fields = _.reject( $scope.fields, function(title) { return title == fieldTitle});
        console.log( $scope.fields );
      }
    }

    /**
     * Get article by id
     * @param {int} $id 
     * @return {object} result 
     */
    $scope.getArticle = function( $id ) {
      var result = _.findWhere( $scope.articles, {id: $id.toString()});
      if (result == undefined) return false;
      return result;
    };

    $scope.getFields = function( $id ) {
      var article = $scope.getArticle( $id );
      var fields = article.fields;
      if (_.isNull(fields)) return [];
      var fieldArray = _.isArray(fields) ? fields : fields.split('|');
      return fieldArray;
    }

    /**
     * This function is call after save tarif
     * @param {object} submitTarif 
     */
    $scope.refresh = function( submitTarif ) {
      var articles = new Array( $scope.articles );
      var filter = _.findWhere( articles, { title: submitTarif.title });
      if (filter == undefined) 
        $scope.Initialize();
    };
    /**
     * Save tarif in database
     * @param {bool} isValid 
     */
    $scope.saveTarifs = function( isValid ) {
      if ( ! isValid ) return false;
      var Form = new FormData();
      Form.append('option', 'com_ajax');
      Form.append('plugin', 'tarifs');
      Form.append('method', 'insert');
      Form.append('format', 'json');

      Form.append('title', $scope.tarif.title.trim());
      Form.append('cost', $scope.tarif.cost);
      Form.append('desc', $scope.tarif.description);
      $scope.toggleProgress();
      dashboardFactory.formHttp( Form )
        .then( function successCallback( results ) {
          $scope.toggleProgress();
          var request = results.data;
          if (request.success) {
            var submitTarif = _.union( $scope.tarif );
            $scope.tarif = {};
            $scope.tarifForm.$setUntouched();
            $scope.tarifForm.$setPristine();

            /** Code here, after submit and insert article */
            $scope.refresh( submitTarif );
          }
        })
    };
  
  }])
  /**
   * Delete article
   */
  .directive('ortDelete', ['dashboardFactory', '$mdDialog', function( dashboardFactory, $mdDialog ) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        var article_id = scope.$eval( attrs.ortDelete );
        var article = scope.getArticle( article_id ) ;
        element.bind('click', function(e) {
          var params = {
            option: 'com_ajax',
            plugin: 'tarifs',
            method: 'delete',
            format: 'json',
            id: parseInt( article_id )
          };
          var confirm = $mdDialog.confirm()
            .title( article.title )
            .textContent( 'Voulez vous vraiment supprimer cette article?.' )
            .ariaLabel('Lucky day')
            .ok( 'Supprimer' )
            .cancel( 'Annuler' );

          $mdDialog.show(confirm).then(function() {
            scope.toggleProgress();
            dashboardFactory.get( params )
              .then(function successCallback( results ) {
                scope.toggleProgress();
                var data = results.data;
                if (data.success)
                  scope.Initialize();
              });
          }, function() {

          });
        });
      }
    }
  }])
  .directive('ortEdit', [function() {
    return {
      restrict: "AEC",
      scope: true,
      link: function(scope, element, attrs) {
        var article_id = scope.$eval(attrs.ortEdit);
        element.bind('click', function(ev) {
          scope.editDialog( ev, article_id );
        });
      }
    }
  }])