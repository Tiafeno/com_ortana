<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
class OrtanaViewOrtana extends JViewLegacy
{
  function display($tpl = null)
  {
    $this->msg = $this->get('Msg');
    if (count($errors = $this->get('Errors')))
    {
      JLog::add(implode('<br />', $errors), JLog::WARNING, 'jerror');
      return false;
    }
    parent::display( $tpl );
  }
}