/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(document).ready(function(){
    $("#contactForm").on("submit", function(e){
        e.preventDefault();
        var name = $("#name").val(), phone = $("#phone").val(),
            email = $("#email").val(), message = $("#message").val(), valid = true;

        if(name === ""){
            valid = false;
            $("#name").addClass("error");
        }
        if(email === ""){
            valid = false;
            $("#email").addClass("error");
        }
        if(phone === ""){
            valid = false;
            $("#phone").addClass("error");
        }
        if(message === ""){
            valid = false;
            $("#message").addClass("error");
        }

        if(valid) {
            $.ajax({
                type: "POST",
                url: '/mail/contact_me.php',
                data: {name: name, phone: phone, email: email, message: message},
                success: function (content) {
                    if (content === 'OK') {
                        clearForm();
                        $("#success").show().delay(3000).fadeOut();
                    }
                    else
                        console.log(content);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown + textStatus);
                },
                dataType: 'html'
            });
        }
        else
            $("#fail").show().delay(3000).fadeOut();
    });
});

function clearForm() {
    $("#name").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#message").val("");
    $("#name").removeClass("error");
    $("#phone").removeClass("error");
    $("#email").removeClass("error");
    $("#message").removeClass("error");
}
