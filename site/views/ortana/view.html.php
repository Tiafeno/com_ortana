<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
class OrtanaViewOrtana extends JViewLegacy
{
  function display($tpl = null)
  {
    $this->articles = comOrtanaHelper::getArticles();
    /* Mootools JavaScript Framework */
    JHtml::_('behavior.framework');
    /* Include native jquery libaries */
    JHtml::_('jquery.framework');
    comDocument::frontHead();
    parent::display( $tpl );
  }
}