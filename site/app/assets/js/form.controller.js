'use strict'

ortanaForm
  .controller('ortanaCtrl', ['$scope', 'OServices', function( $scope, OServices ) {
    'use strict'
    $scope.articles = [];
    $scope.configs = Joomla.getOptions('com_ortana');
    /** set Articles */
    var articles = [];
    articles = _.union( JSON.parse($scope.configs.articles) );
    $scope.articles = _.map( articles, function(article) {
      if ( ! _.isNull(article.fields))
        article.fields = article.fields.split("|");
      return article;
    });
    OServices.setArticlesFn( $scope.articles );
  }])
  .factory('OFactory', ['$http', function( $http ) {
    return {
      /**
      * @param {FormData}
      * @return {Promise}
      */
      formHttp: function( form ) {
        return $http({
          url: 'index.php',
          method: "POST",
          headers: { 'Content-Type': undefined },
          data: form
        });
      }
    }
  }])

  .service('OServices', [function() {
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
      return selectedArticle = _.findWhere( articles, {id: article_id.toString()} );
    };
    self.getChoosenArticleFn = function() {
      return new Promise(function(resolve, reject) {
        if (_.isNull(selectedArticle)) reject('getChoosenArticleFn: There are no items to select');
        resolve( selectedArticle );
      });
    };
    self.getArticlesFn = function() { 
      return new Promise(function(resolve, reject) {
        if (_.isEmpty(articles)) reject('Error: Variable article is empty');
        resolve( articles );
      }); 
    };
    self.setArticlesFn = function( art_ ) { 
      return articles = art_; 
    };
    self.getPriceFn = function( article_id ) {
      var articles = _.findWhere( articles, {id: article_id});
      return this.articles.cost;
    };
  }])

  .config(['$routeProvider', function( $routeProvider ) {
    var configs = Joomla.getOptions('com_ortana');
    $routeProvider
      .when('/inscription', {
      templateUrl: configs.assets + 'js/partials/inscription.html',
      controller: 'InscriptionCtrl'
    })
      .when('/inscription/formulaire', {
      templateUrl: configs.assets + 'js/partials/form.html',
      controller: 'FormCtrl'
    })
      .otherwise({
      redirectTo: '/inscription'
    });

  }]);