$(document).ready(function(){
	var currentModal;
    $("*[data-toggle='modal']").live("click", function(){
    	var targetModal = $(this).attr("data-target");
    	currentModal = targetModal;
    	$(targetModal).fadeIn();
    });
    $(".modal .close").live("click", function(){
    	$(currentModal).fadeOut();
    });

});