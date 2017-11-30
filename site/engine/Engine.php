<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');

class Engine extends Smarty {
  function __construct() {
    parent::__construct();
    $this->setTemplateDir(JPATH_COMPONENT . '/engine/templates/');
    $this->setCompileDir(JPATH_COMPONENT . '/engine/templates_c/');
    $this->setConfigDir(JPATH_COMPONENT . '/engine/configs/');
    $this->setCacheDir(JPATH_COMPONENT . '/engine/cache/');
    $this->caching = 0;
    $this->force_compile = true;
    $this->debugging = false;
  }
}