<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted Access');

$url = JUri::getInstance(); 
$document = JFactory::getDocument();
$document->addScriptOptions('com_ortana', [
  'assets' => JUri::base() . 'components/com_ortana/app/assets/',
  'ajax_url' => $url->toString()
]);

?>
<div ng-app="dashboardApp" ng-controller="dashboardCtrl">
  <div layout="row" layout-xs="column">
    <div style="width: 100%" ng-view></div>
  </div>
</div>
