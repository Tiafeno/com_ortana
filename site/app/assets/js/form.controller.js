'use strict'

ortanaForm
  .controller('ortanaCtrl', ['$scope', 'OServices', function( $scope, OServices ) {
    'use strict'
    var colors = [
      { 
        shared: {background: "rgb(72, 61, 139)"}, 
        h2: {color: "rgb(72, 61, 139)"}, 
        aside: {border: "1px solid rgb(72, 61, 139)"},
        list: {background: "rgba(72, 61, 139, 0.27)"} 
      },
      { 
        shared: {background: "rgb(20, 84, 197)"}, 
        h2: {color: "rgb(20, 84, 197)"}, 
        aside: {border: "1px solid rgb(20, 84, 197)"},
        list: {background: "rgba(20, 84, 197, 0.27)"} 
      },
      { 
        shared: {background: "rgb(130, 197, 20)"}, 
        h2: {color: "rgb(130, 197, 20)"}, 
        aside: {border: "1px solid rgb(130, 197, 20)"},
        list: {background: "rgba(130, 197, 20, 0.27)"} 
      },
      { 
        shared: {background: "rgb(130, 23, 195)"}, 
        h2: {color: "rgb(130, 23, 195)"}, 
        aside: {border: "1px solid rgb(130, 23, 195)"},
        list: {background: "rgba(130, 23, 195, 0.27)"} 
      }
    ];
    $scope.articles = [];
    $scope.configs = Joomla.optionsStorage.com_ortana;
    /** set Articles */
    var articles = [];
    articles = _.union( JSON.parse($scope.configs.articles) );
    $scope.articles = _.map( articles, function(article, index) {
      if ( ! _.isNull(article.fields))
        article.fields = article.fields.split("|");
      article.style = bg[ _.random(0, 3) ];
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
    var configs = Joomla.optionsStorage.com_ortana;
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