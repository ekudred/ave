$(document).ready(function(){
    $('.product-images').slick({
        infinite: true,
        slidesToScroll: true,
        draggable: true,
        // centerMode: true,
        // variableWidth: true,
        slidesToShow: 1,
        adaptiveHeight: true,
        speed: 100,
        fade: true,
        cssEase: 'linear'
    });
});