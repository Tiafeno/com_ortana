'use strict'

/* Variable global for module application */
var Opt = Joomla.getOptions('com_ortana');
var Mail = 'admin@ortana.mg';

/* Application module */
var ortanaForm = angular.module("ortanaApp", [ "ngRoute", "ngMaterial", "routeFormInjectable" ]);
