# paragraph-comments
Drupal module allowing comments on each paragraph, similar to CommentPress for WordPress
Four main things, details below
	1. Set content type that will use the paragraph comments in settings -> admin/config/paragraph_comments/settings
	2. The body of the chose content type must use full html, set in the Format types.  Only allow Full HTML for the role of people writing the nodes.  It's fine if they just have full html for everything, then customize the WYSIWYG tool to be minimalistic and focused on corrections.
	3. Add a comment field to the content type you're using.  Name the comment field field_corrections
	4. Add a field to the comment type, call it field_paragraph_id
	5. Use a theme that requires core/jquery
	6. Set up rule to send a message to author of the node that there's a new comment.

Full notes:

nodes have to be set to Full HTML or else paragraph_id is stripped from <p> tag.  

Add a comment field to the content type you're using.  Make sure machine name is field_corrections or change it in the ParagraphCommentsController file where it says 'field_name' => 'field_corrections'.  Create the field (if 'writing is the content type: /admin/structure/types/manage/writing/fields).  It should look like Comments	field_corrections	Comments.    Then in the comment type you used when adding comments to your content type, you need to add a field for the paragraph id.  I used the default comment type (/admin/structure/comment/manage/comment/fields)with settings as: paragraph_id	field_paragraph_id	Number (integer).  Also make sure Full HTML is only format available for role that will be publishing node of the content type.  Otherwise <P> tags won't work and get the paragraph ID. 

	 If you want to set up notifications of new comments, use rules.
	Important, strange bit in Drupal 8.3.  Once you create a content type, can go right to adding fields, but then it doesn't always show the machine name.  Make sure to give your content type a description.  Also,instead, go back to content types page, edit your content type and add field from there.  DO NOT create the field without being able to see the machine name, even if you know it should call it field_whatever.

I hard coded the subject and body of the paragraph comment form.  You can change them in the ParagraphCommentsController.php file here:
public function openParagraphCommentModalForm($nodeid, $paragraphcommentid, $contenttype, $paragraphtext) {
  \Drupal::logger('paragraph_comments')->notice('Paragraph text is ' . $paragraphtext);
  //create comment array, need to create comment array to create the form.  Comment form is different since it's just a field on content type.
  $values = array(
    'entity_type' => 'node',
    'entity_id' => $nodeid,
    //VERY IMPORTANT TODD - this is the machine name of the comment field you add to whichever content type using for corrections.  See README file.
    'field_name' => 'field_corrections',
    'comment_type' => 'comment',
	'subject' => 'Correction',
    'comment_body' => $paragraphtext,
    );

Drupal 8 lets you add comment fields to the content type.  We don't have to pass paragraphID via session variable as in Drupal 7.  For the content type you're using, add a comment field with the machine name field_paragraph_id with type integer.  admin/structure/comment/manage/comment/fields/add-field  If you change it, look in functions:
	.module file - 
		function paragraph_comments_comment_insert($comment)
		function paragraph_comments_get_comments($paragraphcommentid)
	paragraphCommentsController.php - 
		public function openParagraphCommentModalForm($nodeid, $paragraphcommentid, $contenttype, $paragraphtext) {
 		 \Drupal::logger('paragraph_comments')->notice('Paragraph text is ' . $paragraphtext);
  		//create comment array, need to create comment array to create the form.  Comment form is different since it's just a field on content type.
  		$values = array(
    		'entity_type' => 'node',
    		'entity_id' => $nodeid,
    		//VERY IMPORTANT TODD - this is the machine name of the comment field you add to whichever content type using for corrections.  See README file.
    		'field_name' => 'field_corrections',
    		'comment_type' => 'comment',
			'subject' => 'Correction',
    		'comment_body' => $paragraphtext,
			'field_paragraph_id' => $paragraphcommentid,
    		);
	
