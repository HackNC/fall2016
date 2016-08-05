var init = function(){
    //Entry point of this JS file
    window.isBrowserMobile = isMobile();
    mobileinit();
    // mapinit();
    faqinit();
    navbarinit();

    $(window).resize(navbarinit);

    // Compensate for navbar overlap
    var shiftWindow = function() { scrollBy(0, -40) };
    if (location.hash) shiftWindow();
    window.addEventListener("hashchange", shiftWindow);
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
function mobileinit() {
    buttonCheckScroll(); //do this once when the page loads
    if (window.isBrowserMobile){
        // Setup for mobile browsers
        console.log("Mobile Browser Detected");
        $(".apply").css("position", "relative");
        $(".parallax").css("display", "none");
        $(".mobile-no-parallax").css("display", "block");
        $("#navbar").removeClass("relative");
        $("#navbar").css("top", "1px")
        $(".parallax").remove();
        $(".parallax-mirror").remove();
    } else {
        //setup for desktop browsers
        console.log("Full Browser Detected");
        // $(".apply").css("position", "fixed");
        $(window).scroll(function(){
            buttonCheckScroll();
        });
    }
}
function faqinit(){
    $(".faq").on("click", function(){
        if($(this).hasClass("toggled")) {
            $(this).children(".faq-body").slideUp(200);
            $(this).animate({"height": "100%"}, 200).removeClass("toggled");
        } else {
            $(this).animate({"height": "250px"}, 200).addClass("toggled");
            $(this).children(".faq-body").slideDown(200);
        }
        /*$(this).children(".faq-body").slideToggle("slow", function(){
          if($(this).hasClass("toggled")){
              $(this).animate({"height" : "330px"});
          }  
        });*/
    });
}
function navbarinit(){
    navbar = $("#navbar");
    navheight = navbar.offset().top
    checkNavBar = function(){
        var to_top = navheight - $(window).scrollTop()
        if (to_top < 0){
            navbar.addClass("sticky");
            navbar.removeClass("relative");
        } else {
            navbar.removeClass("sticky");
            navbar.addClass("relative");
        }
    }
    if (!isMobile()){
        $(window).scroll(checkNavBar)
        checkNavBar();
    }
}
function isMobile() {
    var check = false;
    console.log(navigator.userAgent + navigator.vendor + window.opera);
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|\.net|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    /* IE's rendering is trash.  Treat it as mobile ----------^
       That way it doesn't have to work it's little tail off trying to keep up with our parallax.  Poor baby.
    */  
    return check;
}
function buttonCheckScroll(){
    /* Button Not shown until after the page has loaded to prevent flashing */
    var button = $(".apply");
    button.css("opacity", Math.abs(1 - ($(window).scrollTop() / 200)));
    if ($(window).scrollTop() > 200){
        button.css("display", "none");
    } else {
        button.css("display", "inline-block");
    } 
}