<?php
defined('_JEXEC') or die;

abstract class comDocument {
  private static function ngApplication( &$document ) {
    /** Angularjs librarie */
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/angular/angular.js' );
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/angular-route/angular-route.js' );
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/angular-animate/angular-animate.min.js' );
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/angular-messages/angular-messages.min.js' );
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/angular-aria/angular-aria.min.js' );
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/angular-sanitize/angular-sanitize.min.js' );
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/angular-material/angular-material.min.js' );
    $document->addStyleSheet( JUri::base() . 'components/com_ortana/app/lib/angular-material/angular-material.css' );
    $document->addStyleSheet( 'https://fonts.googleapis.com/icon?family=Material+Icons' );
  }

  public static function frontHead( &$document ) {
    /** underscorejs librarie */
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/underscore/underscore-min.js');
    /** bluebird librarie */
    $document->addScript( JUri::base() . 'components/com_ortana/app/lib/bluebird/bluebird.min.js');
    /** angular framwork */
    self::ngApplication( $document );
    $document->addStyleSheet( JUri::base() . 'components/com_ortana/app/lib/assets/css/style.css' );
    $document->addStyleSheet( JUri::base() . 'components/com_ortana/app/lib/assets/css/custom.css' );
    /** Application angulajs files */
    $document->addScript( JUri::base() . 'components/com_ortana/app/assets/js/route.js');
    $document->addScript( JUri::base() . 'components/com_ortana/app/assets/js/form.js');
    $document->addScript( JUri::base() . 'components/com_ortana/app/assets/js/form.controller.js');
  }
}