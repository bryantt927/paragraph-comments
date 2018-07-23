/*
 *Check to see if boolean_current_content_type module variable is true. It's an array of selected content types in the module settings
 * If so, load all paragraph tags into an array. Loop through paragraphs array and append a Div below each. Div will include the clickable
 * image to expand Div to see comments and link to add comments. Hide each div to start. Add a handler for each div.
 * Note, each element contains the paragraphID from the database.
 */

jQuery(document).ready(function () {


    //Variable passed from paragraph_comments.module specifying if current content type is select in admin for paragraph comments
    //if (drupalSettings.paragraph_comments.paragraph_comments.boolean_current_content_type == true && drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_permissions == true) {
	if (drupalSettings.paragraph_comments.paragraph_comments.boolean_current_content_type == true && drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_permissions){
		//console.log(" Boolean is true " + drupalSettings.paragraph_comments.paragraph_comments.boolean_current_content_type)
        //Put each <p> element in an array
        //var paragraph_array = jQuery(".field-name-body p");
					//alert("hey " + jQuery(paragraph_array[1]).text());
		//var str = jQuery( "p:first" ).text();

		//This works
        /*
		p = jQuery( "p" ).toArray();
		var a = [];
  		for ( var i = 0; i < p.length; i++ ) {
    		a.push( p[ i ].innerHTML );
  		}
		alert(a.length + "jj");
		*/
	var paragraph_array = jQuery( "p" ).toArray();
	for (i = 0; i < paragraph_array.length; i++) {
		//console.log(" initial length = " + i);
	}
		
	//remove p elements without pid.  This happens when drupal sticks in extra p tags at beginning and end after a node is saved
	for (i = 0; i < paragraph_array.length; i++) {
		if (jQuery(paragraph_array[i]).text() == "") {
			paragraph_array.splice(i, 1)
		}	
	}

		for (i = 0; i < paragraph_array.length; i++) {
		//console.log(" length after splice = " + i);
		}

        //drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid is an array that's filled on hook_node_view and hook_node_presave in paragraph_comments.module
        //Loops through paragraphs, finds the paragraphcommentsid in the html, adds a random id to any that don't already have it, then fills this Drupal.settings array.
        //We will loop through this array adding addition elements in the jquery and assign them the matching paragraphid.
        //Note we now have the id of the image and link as just the number from paragraphcommentsid. The others have a prefix. This will make it easier to specify
        //the div to hold the comment in the click function without using string functions.
        for (i = 0; i < paragraph_array.length; i++) {

		//This if statement for defined is because Drupal is putting in empty <p> tags before and after main body.  So have to ignore those without an id. Do this in for loops below as well.
		if (typeof drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i] !== 'undefined') {
		//put in if statement for drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid is defined
          //console.log(drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid);

           // Temporary variable holding the element containing the paragraph text.
			//['#attached']['drupalSettings']['paragraph_comments']['paragraph_comments']['paragraph_comment_text']
			//alert("test Jquery variable" + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid);
            var temp = document.getElementById(drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid);
			//alert("temp is " + temp + " i is" + i + " length is " + paragraph_array.length + " PID is " + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid );
            var temp_text = temp.textContent;
                //escape forward slash, we'll put them back in ParagraphCommentsController openParagraphCommentModalForm{}
            var temp_text = temp_text.replace(/\//g, "esc_forward_slash");
                //escape question mark
            var temp_text = temp_text.replace(/\?/g, "esc_question_mark");
			var temp_text = temp_text.replace(/"/g, 'esc_quote');
			//console.log(' temp text is ' + temp_text);


            //Paragraph Commment Count
            //was in line 75 right before href class="use-ajax" data-dialog-type="modal"
            //var strParagraphID = drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid;
            jQuery(paragraph_array[i]).append('<div class="paragraph-comments-buttons"><div class="paragraph-comments-count" id = "commentCount' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '" id="commentCount' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '"></div><div id="hide-show" class="paragraph-comments-show"><a href="#' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '"><img id="image' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '" src="' + drupalSettings.paragraph_comments.paragraph_comments.base_url + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_path + '/images/view_comment.png" border="0" alt="View comments"></a></div><div id="hide-show" class="paragraph-comments-add-comment-perfect"><a id="addCommentPerfect' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '" class="use-ajax" data-dialog-type="modal" href="' + drupalSettings.paragraph_comments.paragraph_comments.base_url + '/paragraph_comments_perfect_form/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_nid + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_content_type + '/' + temp_text + '" ><img src="' + drupalSettings.paragraph_comments.paragraph_comments.base_url + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_path + '/images/submit_perfect.png" border="0" alt="Add paragraph comment"></a></div><div id="hide-show" class="paragraph-comments-add-comment"><a id="addComment' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '" class="use-ajax" data-dialog-type="modal"  href="' + drupalSettings.paragraph_comments.paragraph_comments.base_url + '/paragraph_comments_comment_form/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_nid + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_content_type + '/' + temp_text + '" ><img src="' + drupalSettings.paragraph_comments.paragraph_comments.base_url + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_path + '/images/submit_comment.png" border="0" alt="Add paragraph comment"></a></div></div></div>');

//console.log(' Pre hide it1');

            //Expandable Div that holds comments 
            jQuery(paragraph_array[i]).append('<div class="slidingDiv" id="slidingDiv' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid + '"> </div>');
			//console.log(' Pre hide it2');

        }
		} //end if variable defined
		//console.log(' Pre hide it3');
        //Loop through each paragraph, hide the sliding Div on load or refresh
		
		//console.log(' hide it1');
        for (i = 0; i < paragraph_array.length; i++) {
		if (typeof drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i] !== 'undefined') {
			//console.log(' hide it2');
            jQuery('#slidingDiv' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid).hide();
        }
		}

        //Loop through and assign functions to elements. The image to expand the div has a click event. Note, we're looking for elements with the id (# in jquery) that has only the number 
        //from paragraphcommentsid. Only the image link that expands and contracts the div doesn't have a prefix on the id. For the comment count, we're assigning the click event to the div, then
        //triggering it. coudn't use 'ready' since the element is the document, so not able to retrieve paragraphID

//Test Popup

		
        for (i = 0; i < paragraph_array.length; i++) {
		if (typeof drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i] !== 'undefined') {
			//console.log(' In loop for events ' + i);
            jQuery('#image' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid).click({
                div: 'slidingDiv' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid
            }, handleClick);
            jQuery('#commentCount' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid).click({
                div: 'commentCount' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid
            }, countReady);
            jQuery('#commentCount' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comment_text[i].pid).trigger("click");
        }
		}
        //end if statement
    
    }


    //here is the event launched from handler for each paragraph link. The div is the parameter that contains the div id that we can hide and show
    function handleClick(event) {
        var strID = event.target.id;
        strID = event.target.id.replace("image", "");
        jQuery('#slidingDiv' + strID).slideToggle();
        //see if the slidingDiv has any text. If so, trim function should be greater than 1. No need to run select query for comments again.
        if (jQuery("#slidingDiv" + strID).text().trim().length == 0) {
            //If doesn't already have comment text in Div, we'll call this function via callback url below: paragraph_comments_get_comments($paragraphcommentid)
            jQuery.get(drupalSettings.paragraph_comments.paragraph_comments.base_url + "/paragraph_comments_get_comments/" + strID,
                function (data) {
                    //The id of image(the target) is the paragraphcomments id. By adding the prefex slidingDiv we can specify the Div that should contain the corresponding comments
                    //Take data returned from function above and append paragraph with comment
                    jQuery("#slidingDiv" + strID).append("<p>" + data + " </p>")
                }, "json");
        }
        return false;
    }


    function countReady(event) {
        //for the comment count the ID is commentCount + the id, so we strip "commentCount" before sending it to the paragraph_comments_get_comment_count function
        //then append the value returned from the function to the commentCount Div id
        var strID = event.target.id;
        strID = strID.replace("commentCount",
            "");
        //alert("strID is " + strID);
        jQuery.get(drupalSettings.paragraph_comments.paragraph_comments.base_url + "/paragraph_comments_get_comment_count/" + strID,
            function (data) {
                jQuery("#commentCount" + strID).append("<p>" + data + " </p>")
            }, "json");
    }

    //if they hit the 'X' to close the overlay without submitting a comment, call function from module to empty paragraph id from user session.
    jQuery("#overlay-close-wrapper a").click(function() {
		//put ajax call to /paragraph_comments_delete_paragraphid
		jQuery.ajax({
      				type:'POST',
      				url:'/paragraph_comments_delete_paragraphid',
      				success: function(){
					}
				})

    });

});



/*

   //Global function that captures the paragraph text string when the "Submit Comment" button is clicked. 
   function captureString(event, paragraphText) {
      var strID2 = event.target.id;
      var response = ''; 
	         alert(event.target.id);
	document.getElementById(strID2).style.color="blue";
      var p2 = paragraphText; 
      var barP = p2.innerText; 
      barP.replace("\/\n/" + "gSubmit Comment",""); 
      var url = drupalSettings.paragraph_comments.paragraph_comments.base_url + "/paragraph_comments_comment_form/" + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_nid + '/' + strID2 + '/' + drupalSettings.paragraph_comments.paragraph_comments.paragraph_comments_content_type + '/' + barP; 

	var pageoffset = document.body.scrollTop;
	//window.location.hash = '#slidingDiv1453858';
        //onload='location.href="#myanchor2664687" '
        //window.location.href = url + '#myanchor2664687';
       // parent.bottom.location.href="bottom2.html
 
        console.log("here");
        

      return false;
   }
 
*/
