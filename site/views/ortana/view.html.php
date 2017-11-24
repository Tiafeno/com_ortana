<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
class OrtanaViewOrtana extends JViewLegacy
{
  function display($tpl = null)
  {
    $this->articles = comOrtanaHelper::getArticles();
    comDocument::frontHead( $document );
    parent::display( $tpl );
  }
}