<?php
class OrtanaViewDashboard extends JViewLegacy
{
	function display($tpl = null)
	{
		$document = JFactory::getDocument();
		
		JHtml::_('bootstrap.framework');
		/* Include native jquery libaries */
		JHtml::_('jquery.framework');
		comDocument::backHead();

		$this->items		= $this->get('Items');
		JToolBarHelper::title('ORTANA Dashboard');
		
		if (count($errors = $this->get('Errors'))) { 
			JError::raiseError(500, implode('<br />', $errors));
			return false;
		}
		

		parent::display($tpl);
	}
}