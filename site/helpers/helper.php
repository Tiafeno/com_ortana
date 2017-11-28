<?php

defined('_JEXEC') or die;

abstract class comOrtanaHelper
{

  public static function getArticles() {
    // Obtain a database connection
    $db = JFactory::getDbo();
    $query = $db->getQuery(true)
                ->select($db->quoteName(array('id', 'title', 'cost', 'description', 'fields')))
                ->from($db->quoteName('#__ortana_articles'));
    $db->setQuery($query);
    return $db->loadObjectList();
  }
}