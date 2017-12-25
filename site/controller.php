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

  protected function getarticle( $article_id ) {
    $db = JFactory::getDbo();
    $query = $db->getQuery(true);
    $query->select($db->quoteName(array('title', 'description', 'cost')))
          ->from($db->quoteName($this->db))
          ->where($db->quoteName('id') . " = " . $article_id);
    $db->setQuery($query);
    return $db->loadObject();
  }

  protected function getMail() {
    $app	= JFactory::getApplication();
    $params = $app->getParams();
    return empty($params['email']) ? 'contact@ortana.mg' : $params[ 'email' ];
  }
  
  public function sendMail() {
    $engine = new Engine();

    $app = JFactory::getApplication();
    $input = $app->input;
    $firstname = $input->getString( 'firstname', '', 'STRING' );
    $lastname = $input->getString( 'lastname', '', 'STRING' );
    $society = $input->getString( 'society', '', 'STRING' );
    $adress = $input->getString( 'adress', '', 'STRING' );
    $mail = $input->getString( 'email', '', 'STRING' );
    $description = $input->getString( 'description', '', 'STRING' );
    $phone = $input->get( 'phone' );
    $article_id = $input->getInt( 'article_id' );
    /** assign variable in template */
    $engine->assign('firstname', $firstname);
    $engine->assign('lastname', $lastname);
    $engine->assign('society', $society);
    $engine->assign('adress', $adress);
    $engine->assign('mail', $mail);
    $engine->assign('phone', $phone);
    $engine->assign('description', $description);

    $article = $this->getarticle( $article_id );
    $engine->assign('article', $article);

    $sender = [$mail, $firstname . ' ' . $lastname];
    $recipient = $this->getMail();
    $template = $engine->fetch( "mail.tpl" );

    $mailer = JFactory::getMailer();
    $mailer->isHtml(true);
    $mailer->setSender($sender);
    $mailer->addRecipient([$recipient]);
    $mailer->setSubject('Inscription - ORTANA');
    $mailer->setBody($template);
    /** sending */
    $send = $mailer->Send();
    echo json_encode($send);
  }
   
}