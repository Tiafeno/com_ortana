<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
/* Include native jquery libaries */
JHtml::_('jquery.framework');

$url = JUri::getInstance(); 
$document = JFactory::getDocument();
$document->addScriptOptions('com_ortana', [
  'assets' => JUri::base() . 'modules/mod_ortana/app/assets/',
  'articles' => json_encode($this->articles),
  'ajax_url' => $url->toString()
]);
?>
<div ng-app="OApp" ng-controller="OController">
  <div ng-view></div>
</div>