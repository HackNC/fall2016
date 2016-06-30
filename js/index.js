function init(){
    //Entry point of this JS file
    window.isMobile = window.innerWidth < 768;
    mapinit();
    $(window).scroll(function(){
        if (!isMobile){
            button = $(".apply");
            button.css("opacity", Math.abs(1 - ($(window).scrollTop() / 250)));
            if ($(window).scrollTop() > 250){
                button.css("display", "none");
            } else {
                button.css("display", "inline-block");
            }
        }
    });
}
function mapinit(){
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 15,

            scrollwheel: false,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(35.9095693, -79.0476501), // New York

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"stylers":[{"hue":"#2C2C31"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2C2C31"}]}]
        };

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(35.9095693, -79.0476501),
            map: map,
            title: 'Carmichael Arena'
        });
    }
}