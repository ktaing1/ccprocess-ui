$(document).ready(function() {
    console.log("TEST");
    $("input").live("focus focusout", function() {
        $("label").each(function() {
            var $input = $(this).next();
            if (($input.val() == "")) {
                $(this).removeClass("focused");
            }
        });
        var $label = $(this).prev();
        if (!($label.hasClass("focused"))) {
            $label.addClass("focused");
        }
    });

    //formatting
    $("input#ccnumber").keydown(function(e) {
    	if (($(this).val().length % 5 == 0) && $(this).val().length > 1) {
    		$(this).val($(this).val() + " ");
    	}
    	$(".creditcard").removeClass("visa");
    	$(".creditcard").removeClass("mastercard");
    	$(".creditcard").removeClass("amex");
    	$(".creditcard").removeClass("discover");
    	$(".creditcard").addClass((checkCard($(this).val())))
    });

    //cc type
    function checkCard(cardnumber) {
	    var visa = /^4[0-9]{6,}$/;
    	var mastercard = /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/;
    	var amex = /^3[47][0-9]{5,}$/;
    	var discover = /^6(?:011|5[0-9]{2})[0-9]{3,}$/;

    	var cardnumber = cardnumber.replace(/\s/g, "");

    	if (visa.test(cardnumber)) {
    		return "visa";
    	}
    	if (mastercard.test(cardnumber)) {
    		return "mastercard";
    	}
    	if (amex.test(cardnumber)) {
    		return "amex";
    	}
    	if (discover.test(cardnumber)) {
    		return "discover";
    	}
    }

});
