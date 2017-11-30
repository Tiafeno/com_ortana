<?php
/**
 * @copyright   Copyright (C) 2017 ORTANA, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

JLoader::register('Smarty', JPATH_COMPONENT . '/engine/smarty/Smarty.class.php');
JLoader::register('Engine', JPATH_COMPONENT . '/engine/Engine.php');
JLoader::register('comDocument', JPATH_COMPONENT . '/app/inc/document.inc.php');
JLoader::register('comOrtanaHelper', JPATH_COMPONENT . '/helpers/helper.php');

$controller = JControllerLegacy::getInstance('Ortana');

$input = JFactory::getApplication()->input;
$controller->execute($input->getCmd('task'));

$controller->redirect();