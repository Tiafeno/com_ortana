'use strict'

ortanaForm
  .factory('OFactory', ['$http', '$q', function( $http, $q) {
    return {
      /**
       * @return {Promise}
       */
      getCategories: function() {
        return $http.get( Opt.ajax_url, {
          params: {
            option: 'com_ajax',
            module: 'ortana',
            method: 'getCategories',
            format: 'json'
          }
        })
      },

      /**
      * @param {FormData}
      * @return {Promise}
      */
      formHttp: function( form ) {
        return $http({
          url: Opt.ajax_url,
          method: "POST",
          headers: { 'Content-Type': undefined },
          data: form
        });
      }
    }
  }])
  .service('OServices', ['$http', '$q', function( $http, $q ) {
    var self = this;
    var articles = [];
    var selectedArticle = null;

    /**
     * @function chooseArticleFn
     * @desc Find article and set this in `selectedArticle` variable
     * @param <article_id> int
     * @return Object
    */
    self.chooseArticleFn = function( article_id ) {
      if ( ! _.isNumber(article_id) || _.isNaN(article_id) ) return false;
      return selectedArticle = _.find( articles, function( _art ) { 
        return parseInt(_art.id) == article_id; 
      });
    };

    self.getChoosenArticleFn = function() {
      return new Promise(function(resolve, reject) {
        if (_.isNull(selectedArticle)) reject('Error: There are no items to select');
        resolve( selectedArticle );
      });
    };
    self.getArticlesFn = function() { 
      return new Promise(function(resolve, reject) {
        if (_.isEmpty(articles)) reject('Error: Variable article is empty');
        resolve( articles );
      }); 
    };
    self.setArticlesFn = function( art_ ) { return articles = art_; };
    self.getPriceFn = function( article_id ) {
      this._articles = _.find( articles, function( _art ) { 
        return parseInt(_art.id) == article_id; 
      });
      return this._articles.cost;
    };
  }])
  .controller('ortanaCtrl', ['$scope', 'OFactory', 'OServices', 
    function( $scope, OFactory, OServices ) {
      $scope.Categories = [];
      $scope.Articles = [];
      /** set Articles */
      var articles = [];
      articles = _.union( JSON.parse(Opt.articles) );
      OServices.setArticlesFn( $scope.Articles = articles );
      /** get Categories */
      var OForm = new FormData();
      OForm.append('option', 'com_ajax');
      OForm.append('module', 'ortana');
      OForm.append('method', 'getCategories');
      OForm.append('format', 'json');
      OFactory.formHttp( OForm )
        .then( function successCallback( results ) {
          var request = results.data;
          if (request.success)
            $scope.Categories = request.data;
        });
  }])
  .config(['$routeProvider', function( $routeProvider ) {
    $routeProvider
      .when('/inscription', {
        templateUrl: Opt.assets + 'js/partials/inscription.html',
        controller: 'InscriptionCtrl'
      })
      .when('/inscription/formulaire', {
        templateUrl: Opt.assets + 'js/partials/form.html',
        controller: 'FormCtrl'
      })
      .otherwise({
        redirectTo: '/inscription'
      });
    
  }]);