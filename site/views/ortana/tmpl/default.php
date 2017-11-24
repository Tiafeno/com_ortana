<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
/* Include native jquery libaries */
JHtml::_('jquery.framework');

$url = JUri::getInstance(); 
$document = JFactory::getDocument();
$document->addScriptOptions('com_ortana', [
  'assets' => JPATH_COMPONENT . '/app/assets/',
  'articles' => json_encode($this->articles),
  'ajax_url' => $url->toString()
]);
?>
<div class="item-page" itemscope="" itemtype="https://schema.org/Article">
  <div itemprop="articleBody">
    <div ng-app="ortanaApp" ng-controller="ortanaCtrl">
      <div ng-view></div>
    </div>
  </div>
</div>