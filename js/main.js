$(document).ready(function(){
    $.ajax({
        url:"http://test.masuno.pe/images.php",
        method:"get",
        success: function(data){
            data.forEach(function(element,index) {
                active = index == 0 ? 'active':''
                html = "<div class='slide "+active+"' data-id='"+index+"'><img src='"+element+"'/></div>";
                dots = "<a href='javascript:;' class='"+active+"' data-id='"+index+"'><i class='fa fa-circle'></i></a>"
                $('.slider-ctn').prepend(html);
                $('.slider-nav').append(dots);
            }, this);
            bindNav();
        }
    });
    $('.slider-arrows a').on('click',function(){
        var currentSlide = $('.slide.active');
        var id = currentSlide.data('id');
        var lenght = $('.slide').length - 1;
        $('.slide.active').removeClass('active');
        $('.slider-nav .active').removeClass('active');
        if($(this).hasClass('btn-next')){
            id = id + 1;
            if(id > lenght){id=0;}
            $(".slide[data-id='"+id+"']").addClass('active');
            $(".slider-nav [data-id='"+id+"']").addClass('active');
        }else{
            id = id-1;
            if(id < 0){id=lenght;}
            $(".slide[data-id='"+id+"']").addClass('active');
            $(".slider-nav [data-id='"+id+"']").addClass('active');
        }
    });
    $('nav ul a').on('click', function(){
        $(this).parent().find('.submenu').toggleClass('active');
    });
    var bindNav = function(){$('.slider-nav a').on('click',function(){
        $('.slide.active').removeClass('active');
        $('.slider-nav .active').removeClass('active');
        var id = $(this).data('id');
        $(".slide[data-id='"+id+"']").addClass('active');
        $(".slider-nav [data-id='"+id+"']").addClass('active');
    });};
    $('.btn-send').on('click',function(){
        var form = $('#contact-form');
        var isValid = form.parsley().validate();
        console.log(JSON.stringify( form.serializeArray() ));
        if(isValid){
            var formData = {
                    "username":$('[name="username"]').val(),
                    "password":$('[name="password"]').val(),
                    "email":$('[name="email"]').val(),
                    "description":$('[name="description"]').val()
                };
            console.log(formData);
            $.ajax({
                url:"http://test.masuno.pe/form.php",
                method:"POST",
                data:formData,
                success:function(data){
                    console.log(data)
                    // Al parecer las variables que estoy enviando al servicio no coinciden
                }
            });
        }
    });
    $('.search-ctn input').on('click', function(){
        $(this).parent().addClass('active');
    });
    $('.fa-close').on('click',function(){
        $('.search-ctn').removeClass('active');
    });
    $('.fa-search').on('click',function(){
        alert('Funcion de busqueda');
    });
    $('.fa-bars').on('click',function(){
        $('nav > ul').toggle('fade');
    });
});