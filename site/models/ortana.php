<?php

// No direct access to this file
defined('_JEXEC') or die('Restricted access');
class OrtanaModelOrtana extends JModelItem
{
	protected $message;
	public function getMsg()
	{
		if (!isset($this->message))
		{
			$jinput = JFactory::getApplication()->input;
			$id     = $jinput->get('id', 1, 'INT');

			switch ($id)
			{
				case 2:
					$this->message = 'Good bye World!';
					break;
				default:
				case 1:
					$this->message = 'Hello World!';
					break;
			}
		}

		return $this->message;
	}
}