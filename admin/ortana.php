<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
JLoader::register('comDocument', dirname(__FILE__) . '/app/inc/document.inc.php', true);

$controller = JControllerLegacy::getInstance('Ortana');
$controller->execute(JFactory::getApplication()->input->get('task'));
$controller->redirect();