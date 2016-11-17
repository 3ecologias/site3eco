$(document).ready(function(){
    var clicks = 0;

    // $('.show-less').hide().fadeOut("slow");

    // AJAX GET
    $('.show-more-posts').click(function(){
        $.ajax({
            type: "GET",
            url: "/ajax/more-posts/",
            success: function(data) {
                if(clicks < data.length){
                    var spl = data[clicks].fields.date.split('-');
                    var year = spl[0];
                    //Posts
                    if((clicks%2)==0){
                        $('body, html').animate({ scrollTop: $("#posts-list li:last-child").offset().top - $(window).height()/2 + 70 }, 1000);
                        $('<li>'+
                                '<div class="timeline-image">'+
                                    '<img class="img-circle img-responsive" src="/media/'+data[clicks].fields.thumb+'" alt="">'+
                                '</div>'+
                                '<div class="timeline-panel">'+
                                    '<div class="timeline-heading">'+
                                        '<h4>'+data[clicks].fields.title+'</h4>'+
                                        '<h5 class="subheading">'+year+'</h5>'+
                                    '</div>'+
                                    '<div class="timeline-body">'+
                                        '<p class="text-muted">'+data[clicks].fields.text+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</li>'

                        ).insertBefore('.timeline li:last-child');
                    }else{
                        $('body, html').animate({ scrollTop: $("#posts-list li:last-child").offset().top - $(window).height()/2 + 70}, 1000);
                        $('<li class="timeline-inverted">'+
                                '<div class="timeline-image">'+
                                    '<img class="img-circle img-responsive" src="/media/'+data[clicks].fields.thumb+'" alt="">'+
                                '</div>'+
                                '<div class="timeline-panel">'+
                                    '<div class="timeline-heading">'+
                                        '<h4>'+data[clicks].fields.title+'</h4>'+
                                        '<h5 class="subheading">'+year+'</h5>'+
                                    '</div>'+
                                    '<div class="timeline-body">'+
                                        '<p class="text-muted">'+data[clicks].fields.text+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</li>'

                            ).insertBefore('.timeline li:last-child');

                    }

                    clicks +=1;
                }else{
                    $('.timeline li:last-child').remove();
                    $('.timeline').append(
                        '<li class="timeline-inverted" id="last-timeline">'+
                        '<div class="timeline-image">'+
                        '<h4>Não há <br> mais <br> posts <h4>'+
                        ' </li>'
                    )
                }
            },
        });
        
    });


    // CSRF code
    function getCookie(name) {
        var cookieValue = null;
        var i = 0;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (i; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
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
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


    // Recolher

    

    // $('.show-less').click(function(){

    //     $("#portfolio-load-grid").find(".portfolio-item:gt(2)").fadeOut("slow", function (){ $("#portfolio-load-grid").find(".portfolio-item:gt(2)").remove(); });

    //     $('.show-more').show().fadeIn(2000);
    //     $('.show-less').hide().fadeOut("slow");
    //     $('body, html').animate({ scrollTop: $("#portfolio-load-grid .portfolio-item:first-child").offset().top - 70 }, 1000);

    // });
});