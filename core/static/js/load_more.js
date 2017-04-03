$(document).ready(function(){
    var clicks = 0;

    $('.show-less').hide().fadeOut("slow");

    // AJAX GET
    $('.show-more').click(function(){
        if (clicks <= 2){
          clicks += 1;
        }
        $.ajax({
            type: "GET",
            url: "/ajax/more/",
            success: function(data) {

                var i = 0;
                var ports;
                if(clicks == 1){

                    ports = 3;
                    $('.show-more').text('Carregar todos');

                }else if (clicks == 2){

                    i = 3;
                    ports = data.length;
                    $('.show-more').text('Carregar mais');
                    $('.show-more').hide().fadeOut("slow");
                    $('.show-less').show().fadeIn(2000);

                }

                for(i; i < ports; i++){


                    //Portfolio grids

                    $('#portfolio-load-grid').append($(
                    '<div class="col-md-4 col-sm-6 portfolio-item">'
                    +'<a href="#portfolioModal'+data[i].pk+'" class="portfolio-link" data-toggle="modal">'+
                    '<div class="portfolio-hover">'+'<div class="portfolio-hover-content">'
                    +'<i class="fa fa-plus fa-3x"></i>'
                    +'</div>'
                    +'</div>'
                    +'<img src="/media/'+data[i].fields.miniature_image+'" class="img-responsive" alt="">'
                    +'</a>'
                    +'<div class="portfolio-caption">'
                    +'<h4>'+data[i].fields.miniature_title+'</h4>'
                    +'<p class="text-muted">'+data[i].fields.category+'</p>'
                    +'</div>'
                    +'</div>').fadeIn(2000));

                    //Portfolio modals

                    $('#portfolio-load-modals').append(
                    '<div class="portfolio-modal modal fade" id="portfolioModal'+data[i].pk+'" tabindex="-1" role="dialog" aria-hidden="true">'
                    +'<div class="modal-dialog">'
                    +'<div class="modal-content">'
                    +'<div class="close-modal" data-dismiss="modal">'
                    +'<div class="lr">'
                    +'<div class="rl">'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'<div class="container">'
                    +'<div class="row">'
                    +'<div class="col-lg-8 col-lg-offset-2">'
                    +'<div class="modal-body">'
                    +'<h2>'+data[i].fields.project_name+'</h2>'
                    +'<p class="item-intro text-muted">'+data[i].fields.intro+'</p>'
                    +'<img class="img-responsive img-centered" src="/media/'+data[i].fields.image+'" alt="">'
                    +'<p>'+data[i].fields.description+'</p>'
                    +'<ul class="list-inline">'
                    +'<li>Data:'+data[i].fields.date+'</li>'
                    +'<li>Cliente:'+data[i].fields.client+'</li>'
                    +'<li>Categoria:'+data[i].fields.category+'</li>'
                    +'</ul>'
                    +'<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Fechar </button>'
                    )

                }
                if(clicks == 1){
                    $('body, html').animate({ scrollTop: $("#portfolio-load-grid .portfolio-item:nth-child(4)").offset().top - 70 }, 1000);
                }else if (clicks == 2){
                    $('body, html').animate({ scrollTop: $("#portfolio-load-grid .portfolio-item:nth-child(7)").offset().top - 70 }, 1000);
                }

        }
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



    $('.show-less').click(function(){

        $("#portfolio-load-grid").find(".portfolio-item:gt(2)").fadeOut("slow", function (){ $("#portfolio-load-grid").find(".portfolio-item:gt(2)").remove(); });

        $('.show-more').show().fadeIn(2000);
        $('.show-less').hide().fadeOut("slow");
        $('body, html').animate({ scrollTop: $("#portfolio-load-grid .portfolio-item:first-child").offset().top - 70 }, 1000);
        clicks = 0;

    });
});
