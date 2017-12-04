<?php
defined('_JEXEC') or die;

class comDocument {
  public function __construct() {}
  private static function ngApplication() {
    /** Angularjs librarie */
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/angular/angular.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/angular-route/angular-route.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/angular-animate/angular-animate.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/angular-messages/angular-messages.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/angular-aria/angular-aria.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/angular-sanitize/angular-sanitize.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/angular-material/angular-material.min.js' );
    
    JHtml::stylesheet(Juri::base() . 'components/com_ortana/app/lib/angular-material/angular-material.css' );
    JHtml::stylesheet(Juri::base() . 'components/com_ortana/app/assets/css/style.css' );
    JHtml::stylesheet( 'https://fonts.googleapis.com/icon?family=Material+Icons' );
    JHtml::stylesheet( 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' );
  }

  public static function backHead() {
    /** underscorejs librarie */
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/underscore/underscore-min.js');
    /** bluebird librarie */
    JHtml::script(Juri::base() . 'components/com_ortana/app/lib/bluebird/bluebird.min.js');
    /** angular framwork */
    self::ngApplication();
    JHtml::script(Juri::base() . 'components/com_ortana/app/assets/js/route.js');
    JHtml::script(Juri::base() . 'components/com_ortana/app/assets/js/dashboard.js');
    JHtml::script(Juri::base() . 'components/com_ortana/app/assets/js/dashboard.controller.js');
  }
}