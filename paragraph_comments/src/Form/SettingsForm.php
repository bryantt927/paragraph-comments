<?php
/**
 * @file
 * Contains Drupal\paragraph_comments\Form\SettingsForm.
 */
namespace Drupal\paragraph_comments\Form;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
/**
 * Class SettingsForm.
 *
 * @package Drupal\paragraph_comments\Form
 */
class SettingsForm extends ConfigFormBase {
  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'paragraph_comments.settings',
    ];
  }
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'settings_form';
  }
  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('paragraph_comments.settings');
   /** $form['bio'] = array(
      '#type' => 'textarea',
      '#title' => $this->t('Bio'),
      '#default_value' => $config->get('bio'),
    );
	*/
	
	$types = node_type_get_types();
	//kint($types);
	$typeLoop = 0;
    foreach($types as $node_type) {
     $options[$node_type->id()] = $node_type->id();
	 $typeLoop = $typeLoop +1;
    }

    $form['paragraph_comments_content_types'] = array(
      '#description' => t('A clickable image and expandable div will be available on these content types to let users submit comments on each paragraph.'),
      '#type' => 'checkboxes',
      '#title' => t('Users can leave comments per paragraph on these content types'),
      '#options' => $options,
      //#default value must be same name as in $form_state if foreach loop below, note also the default value blog only gets set if paragraph_node_types is empty.
      '#default_value' => $config->get('paragraph_comments_content_types'),
    );
/*
   $defaultTextOption['comment_text_default'] = 'Set comment text area with text of paragraph as default';

   $form['paragraph_comments_copy_comment_as_default'] = array(
    '#title' => t('<b>Prepopulate paragraph comment textarea with paragraph text</b>'),
    '#description' => t('The comment area can be populated with the paragraph text by default.  Useful if commenters will be correcting the paragraphs'),
    '#options' => $defaultTextOption,
    '#type' => 'checkboxes',
   //this now always says true, look here http://drupal.stackexchange.com/questions/42571/how-to-check-a-checkbox-by-default-in-froms-api
   //need to do this via variable get
    //'#default_value' => array("comment_text_default"),
    '#default_value' => $config->get('paragraph_comments_copy_comment_as_default'),
**/
 // );

    return parent::buildForm($form, $form_state);
  }
  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);
    $this->config('paragraph_comments.settings')
      ->set('paragraph_comments_content_types', $form_state->getValue('paragraph_comments_content_types'))
	 // ->set('paragraph_comments_copy_comment_as_default', $form_state->getValue('paragraph_comments_copy_comment_as_default'))
      ->save();
  }
}
