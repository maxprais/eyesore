/**
 * Created by User on 3/11/2016.
 */
videoControls = {};

(function () {
    videoControls.endedHandler = function () {
        console.log('playing');
        var vid = $('.eyesorevid');
        vid.load();
    };
})(videoControls);

subscribe = {};

(function () {

    $('.email-input').on('click', function () {
        $('.subscribe').removeClass('hidden');
    });

    $('.subscribe').on('click', function () {
        var emailAddress = $('.email-input').val();
        $('.email-input').val(' ');
        subscribe.newUser(emailAddress);

    });

    subscribe.newUser = function (email) {
        $.ajax({
            url: '/subscribe/',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({email: email}),
            success: function (response){
                var result = response['result'];
                subscribe.handleServerResponse(result);
            }
        })
    };

    subscribe.handleServerResponse = function (response) {
        if (response === 'success'){
            var compResponse = $('<p></p>', {text: 'Thanks! You\'ve been subscribed', class: 'compResponse'});
        }
        else if (response === 'fail') {
            compResponse = $('<p></p>', {text: 'You were already subscribed', class: 'compResponse'});
        }

        $('.input-field').append(compResponse);
        subscribe.responseMessage();
    };

    subscribe.responseMessage = function () {
        $('.subscribe').addClass('hidden');
        $('.compResponse').fadeOut(10000, function () {
            $('.compResponse').remove();
        });
    }
})(subscribe);

$(function () {
    var previousScroll = 0;
    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();

        if (currentScroll > 0){
            $('.navis').fadeOut();
        }
        else {
            $('.navis').fadeIn();
        }
        previousScroll = currentScroll;

    });
});

//CSRF and Cookies
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});