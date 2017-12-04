
(function($){
	$(document).ready(function() {
		$('.grid').masonry({
			// options
			itemSelector: '.grid-item',
			columnWidth: 4
		});
	});
})(jQuery);
/* Application module */
var ortanaForm = angular.module("ortanaApp", [ "formRoute", "ngRoute", "ngMaterial", "ngSanitize", "ngMessages" ]);
