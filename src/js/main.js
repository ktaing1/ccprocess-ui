$(document).ready(function() {

    /**
     ** On focus in or out, handle the placeholder > label
     ** transition.
     ** 
     ** If there was an error state on the input,
     ** and now the input has changed, remove the
     ** error underline state.
     **/
    $("input, select").live("focus focusout", function() {
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

        if ($(this).hasClass("error") && $(this).val() !== "") {
            $(this).removeClass("error");
        }
    });

    $("input, select").live("focusout", function(){
        var $label = $(this).prev();
        if ($(this).val() == "" && $label.hasClass("focused")) {
            $label.removeClass("focused");
        }
    });

    /**
     ** add the visual space every 4 numbers.
     ** determine credit card type, then show
     ** that credit card image.
     **/
    $("input#ccnumber").keyup(function(e) {
        var cardnumber = $(this).val();
        var lastcharSpace = cardnumber.substr(cardnumber.length - 1) == " ";
        if ((cardnumber.replace(/\s/g, "").length % 4 == 0) && !lastcharSpace && cardnumber.replace(/\s/g, "").length > 1 && (e.keyCode !== 8) && (e.which !== 17)) {
            $(this).val($(this).val() + " ");
        }
        $(".creditcard").removeClass("visa");
        $(".creditcard").removeClass("mastercard");
        $(".creditcard").removeClass("amex");
        $(".creditcard").removeClass("discover");
        $(".creditcard").addClass((checkCard($(this).val())))
    });

    $("input#expiration").keydown(function(e) {
        var v = $(this).val();
        if (v.match(/^\d{2}$/) !== null && e.keyCode !== 8) {
            $(this).val(v + '/');
        }
    });

    /**
     ** Pass through credit card info,
     ** returns credit card type
     ** if not Visa, Mastercard, Amex, or Discover
     ** return "other" so as to not discount
     ** other credit card vendors.
     **/
    function checkCard(cardnumber) {
        var visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
        var mastercard = /^(?:5[1-5][0-9]\d{1}|222[1-9]|2[3-6][0-9]\d{1}|27[01][0-9]|2‌​720)([\ \-]?)\d{4}\1\d{4}\1\d{4}$/;
        var amex = /^3[47][0-9]{13}$/;
        var discover = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/;

        var cardnumber = cardnumber.replace(/\s/g, "");

        if (visa.test(cardnumber)) {
            return "visa";
        } else if (mastercard.test(cardnumber)) {
            return "mastercard";
        } else if (amex.test(cardnumber)) {
            return "amex";
        } else if (discover.test(cardnumber)) {
            return "discover";
        } else {
            return "other"
        }
    }

});
