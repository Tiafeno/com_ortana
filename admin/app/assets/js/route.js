'use strict'
var routeDashboard = angular.module('routeDashboard', [ 'ngMaterial', 'ngRoute' ]);
routeDashboard
  .controller('cpanelCtrl', ["$scope", "$location", "$window", "dashboardFactory", "dashboardServices", "$mdDialog",
                             function( $scope, $location, $window, dashboardFactory, dashboardServices, $mdDialog ) {
    var lostConTest = 0;
    $scope.tarif = {};
    $scope.adminMail = null;
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
      
      dashboardFactory.get( {
        option: "com_ajax",
        plugin: "tarifs",
        method: "getmail",
        format: "json"
      }). then(function successCallback( results ) {
        var rq = results.data;
        $scope.adminMail = rq.data[0];
      })
    };
    $scope.Initialize();

    $scope.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    /**
     * This function update fields database
     * @param {int} article_id 
     * @return {Promise}
     */
    $scope.updateFields = function( article_id ) {
      return new Promise(function(resolve, reject) {
        if ( ! _.isNumber( article_id )) reject( "Variable article_id is not a number" );
        var fields = $scope.getFields( article_id );
        var fieldsJoin = fields.join("|");
        var Form = new FormData();
        Form.append('option', 'com_ajax');
        Form.append('plugin', 'tarifs');
        Form.append('method', 'updateFields');
  
        Form.append('id', parseInt(article_id));
        Form.append('fields', fieldsJoin);
  
        Form.append('format', 'json');
        $scope.toggleProgress();
        dashboardFactory.formHttp( Form )
          .then( function successCallback( results ) {
            $scope.toggleProgress();
            var rq = results.data;
            if (rq.success){
              resolve( rq.data );
            }
          }, function errorCallback( errno ) {
            $window.setTimeout(function() {
              $scope.updateFields( article_id );
            }, 2500);
            
          })
      });
    };

    /**
     * Update article content
     * @param {int} article_id 
     * @return {Promise}
     */
    $scope.updateTarifs = function( article_id ) {
      return new Promise(function(resolve, reject) {
        if ( ! _.isNumber( article_id )) reject( "Variable article_id is not a number" );
        var article = $scope.getArticle( article_id );
        if (false === article ) reject("Article doesn't existe id:" + article_id);
        var Form = new FormData();
        Form.append('option', 'com_ajax');
        Form.append('plugin', 'tarifs');
        Form.append('method', 'updateTarifs');
  
        Form.append('id', parseInt(article_id));
        Form.append('title', article.title);
        Form.append('cost', parseInt(article.cost));
        Form.append('description', article.description);
  
        Form.append('format', 'json');
        $scope.toggleProgress();
        dashboardFactory.formHttp( Form )
          .then( function successCallback( results ) {
            $scope.toggleProgress();
            resolve( results );
          }, function errorCallback( error ) {
            $window.setTimeout(function() {
              $scope.updateTarifs( article_id );
            }, 3000);
          })

      });
    };

    $scope.editTarifDialog = function( ev, article_id ) {
      dashboardServices.setEditArticle( article_id );
      /** mdDialogShow here with dialogEditorCtrl controller */
      $mdDialog.show({
        controller: dialogEditorCtrl,
        scope: $scope,
        preserveScope: true,
        templateUrl: $scope.configs.assets + 'js/partials/dialog.tarif.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose: true
      })
      .then(function( answer ) {
        /** save change */
        
      }, function() {
        
      });
    };

    $scope.editDialog = function( ev, article_id ) {
      dashboardServices.setEditArticle( article_id );
      $mdDialog.show({
        controller: dialogFieldsCtrl,
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

    /**
     * An angular controller
     * @param {$scope}  
     * @param {$mdDialog}  
     * @param {*} dashboardServices 
     */
    function dialogFieldsCtrl( $scope, $mdDialog, dashboardServices ) {
      $scope.id = dashboardServices.getEditId();
      if (_.isNaN($scope.id)) { console.warn( 'Variable `editId` n\est pas definie' ); return;}
      $scope.fields = $scope.getFields( $scope.id );
      $scope.inputField = "";

      $scope._submitField = function() {
        if ($scope.inputField =="" || $scope.inputField == " ") return;
        $scope.fields.push( $scope.inputField );
        $scope.inputField = "";
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.hide = function() {
        $mdDialog.hide();
      };

      /**
       * Save current fields in db and $scope articles
       */
      $scope._saveField = function() {
        $scope.articles = _.map( $scope.articles, function( _art ) {
          if (_art.id == $scope.id.toString())
            _art.fields = $scope.fields;
          return _art;
        });
        $scope.updateFields( $scope.id )
          .then(function onResolve( results ) {

          }, function onReject( errno ) { console.error( errno ); } )
        $mdDialog.hide();
      };

      /**
       * @param {string} fieldTitle 
       * @return {void}
       */
      $scope._deleteField = function( fieldTitle ) {
        $scope.fields = _.reject( $scope.fields, function(title) { return title == fieldTitle});
      }
    }

    function dialogEditorCtrl( $scope, $mdDialog, dashboardServices ) {
      $scope._progress = false;
      $scope._id = dashboardServices.getEditId();
      $scope._editor = $scope.getArticle( $scope._id );
      /** $scope.articles */
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope._toggeProgress = function(){
        $scope._progress = !$scope._progress;
      }

      $scope._saveEditor = function() {
        $scope.articles = _.map( $scope.articles, function( article ) {
          if (article.id != $scope._id.toString()) return article;
          article = _.clone($scope._editor);
          return article;
        });
        $scope._toggeProgress()
        $scope.updateTarifs( $scope._id )
          .then(function onResolve( results ) {

            $scope.$apply(function() {
              // if (results.status == 403 || results.status == 401){
              //   var reloadConfirm = $window.confirm( "Une erreur s'est produits ou vous etes déconnecter." +
              //   " Voulez-vous rafraichir la page?" );
              //   if (reloadConfirm) { location.reload(true); return; }
              // }
              $scope._toggeProgress();
              $mdDialog.hide();
            });

          }, function onReject( errno ) { 
            $scope._toggeProgress();
            console.error( errno ); 
          });
      };
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

    /**
     * This function return array of fields
     * @param {int} $id
     * @return {array}
     */
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
     * @return {void}
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
     * @return {void}
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
   * Delete current article when this element is clicked 
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
      restrict: "A",
      scope: true,
      link: function(scope, element, attrs) {
        var article_id = scope.$eval(attrs.ortEdit);
        element.bind('click', function(ev) {
          scope.editDialog( ev, article_id );
        });
      }
    }
  }])
  .directive('ortUpdate', [function() {
    return {
      restrict: "A",
      scope: true,
      link: function(scope, element, attrs) {
        var article_id = scope.$eval(attrs.ortUpdate);
        element.bind('click', function(ev) {
          scope.editTarifDialog( ev, article_id );
        });
      }
    }
  }])