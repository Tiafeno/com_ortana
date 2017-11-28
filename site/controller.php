<?php
// No direct access to this file
defined('_JEXEC') or die('Restricted access');
class OrtanaController extends JControllerLegacy
{
  protected $db = '#__ortana_articles';
  public function getarticles() {
   $db = JFactory::getDbo();
    $query = $db->getQuery(true);
    $query->select($db->quoteName(array('title', 'id', 'description', 'cost', 'fields')))
          ->from($db->quoteName($this->db));
    $db->setQuery($query);
    $results = $db->loadObjectList();
    echo json_encode($results);
  }
  
  public function sendMail() {
    $app = JFactory::getApplication();
    $input = $app->input;
    $firstname = $input->getString( 'firstname', '', 'STRING' );
    $lastname = $input->getString( 'lastname', '', 'STRING' );
    $society = $input->getString( 'society', '', 'STRING' );
    $adress = $input->getString( 'adress', '', 'STRING' );
    $mail = $input->getString( 'email', '', 'STRING' );
    $article_id = $input->getInt( 'article_id' );

    $sender = [$mail, $firstname + ' ' + $lastname];
    $template = @file_get_contents(JPATH_COMPONENT . '/app/inc/mail.tmpl.php');
    $body = $template; // Fix: Use template engine
    $mailer = JFactory::getMailer();
    $mailer->isHtml(true);
    $mailer->setSender($sender);
    $mailer->addRecipient("tiafenofnel@gmail.com");
    $mailer->setSubject('Inscription - ORTANA');
    $mailer->setBody($body);
    $send = $mailer->Send();
    echo json_encode($send);
  }
   
}