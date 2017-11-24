<?php
/**
 * @copyright   Copyright (C) 2017 ORTANA, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

JLoader::register('comDocument', JPATH_COMPONENT . '/app/inc/document.inc.php');
JLoader::register('comOrtanaHelper', JPATH_COMPONENT . '/helpers/helper.php');

$controller = JControllerLegacy::getInstance('Ortana');

$input = JFactory::getApplication()->input;
$controller->execute($input->getCmd('task'));

$controller->redirect();