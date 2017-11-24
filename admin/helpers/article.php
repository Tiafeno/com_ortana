<?php
defined('_JEXEC') or die;
class comArticleHelper {
  
  public static function getArticles() {
    $db    = JFactory::getDbo();
		$query = $db->getQuery(true);
		$query->select('*')->from($db->quoteName('#__ortana_articles'));
		$db->setQuery($query);
    return $db->loadObjectList();
  }
}