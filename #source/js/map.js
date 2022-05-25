ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [51.511561, -0.139167],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-icon.png',
            iconImageSize: [50, 50],
            iconImageOffset: [0, 0]
        });
        
    myMap.behaviors.disable('scrollZoom');
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

        myMap.behaviors.disable('drag');
    }

    myMap.geoObjects
        .add(myPlacemark);
});