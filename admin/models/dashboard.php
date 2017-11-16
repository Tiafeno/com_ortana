<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
class OrtanaModelDashboard extends JModelList
{
	protected function getListQuery()
	{
		$db    = JFactory::getDbo();
		$query = $db->getQuery(true);
		$query->select('*')->from($db->quoteName('#__ortana_articles'));
		return $query;
	}
}