<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');

$url = JUri::getInstance(); 
$document = JFactory::getDocument();
$document->addScriptOptions('com_ortana', [
  'assets' => JUri::base() . 'components/com_ortana/app/assets/',
  'articles' => json_encode($this->articles)
]);
?>

<div ng-app="ortanaApp" ng-controller="ortanaCtrl">
  <div layout="row" layout-xs="column">
    <div style="width: 100%" ng-view></div>
  </div>
</div>