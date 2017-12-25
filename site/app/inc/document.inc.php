<?php
defined('_JEXEC') or die;

abstract class comDocument {
  private static function ngApplication() {
    /** Angularjs librarie */
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/angular/angular.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/angular-route/angular-route.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/angular-animate/angular-animate.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/angular-messages/angular-messages.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/angular-aria/angular-aria.min.js' );
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/angular-sanitize/angular-sanitize.min.js' );
    JHtml::script(Juri::base() .  'components/com_ortana/app/libs/angular-material/angular-material.min.js' );
    JHtml::stylesheet(Juri::base() . 'components/com_ortana/app/libs/angular-material/angular-material.css' );
    JHtml::stylesheet( 'https://fonts.googleapis.com/icon?family=Material+Icons' );
    JHtml::stylesheet( 'https://fonts.googleapis.com/css?family=Roboto+Slab:400,700' );
  }

  public static function frontHead() {
    /** underscorejs librarie */
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/underscore/underscore-min.js');
    /** bluebird librarie */
    JHtml::script(Juri::base() . 'components/com_ortana/app/libs/bluebird/bluebird.min.js');
		JHtml::script(Juri::base() . 'components/com_ortana/app/libs/masonry/masonry.pkgd.min.js');
    /** angular framwork */
    self::ngApplication();
    JHtml::stylesheet(Juri::base() . 'components/com_ortana/app/assets/css/style.css' );
    JHtml::stylesheet(Juri::base() . 'components/com_ortana/app/assets/css/custom.css' );
    /** Application angulajs files */
    JHtml::script(Juri::base() . 'components/com_ortana/app/assets/js/route.js');
    JHtml::script(Juri::base() . 'components/com_ortana/app/assets/js/form.js');
    JHtml::script(Juri::base() . 'components/com_ortana/app/assets/js/form.controller.js');
  }
}