var mapOptions = null;
var map = null;

var infowindow;
(function () {
    google.maps.Map.prototype.markers = new Array();
    google.maps.Map.prototype.getMarkers = function ()
    {
    return this.markers
    };

    google.maps.Map.prototype.clearMarkers = function () 
    {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = new Array();
    };

    google.maps.Marker.prototype._setMap = google.maps.Marker.prototype.setMap;
    google.maps.Marker.prototype.setMap = function (map) 
    {
        if (map) {
            map.markers[map.markers.length] = this;
        }
        this._setMap(map);
    }
})();
    


function initMap() {
    
    lat= 19.01826447750003;
    lng = -98.24133396148682;
    
    
    mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
    
    google.maps.event.addListener(map, 'click', function (event) {
        
        lat =event.latLng.lat();
        lng=event.latLng.lng();

        document.getElementById('lat').value=lat;
        document.getElementById('lng').value=lng;
        
        map.clearMarkers();
        drawMarker();
    });

    drawMarker();

}

    
function drawMarker() 
{
    var infowindow = new google.maps.InfoWindow();
    var marker, i; 
    var message = document.getElementById('message_marker').value;
    var nombre = message;
    var characterPin = document.getElementById('character_marker').value;
    
    var color = document.getElementById('marker_color_picker').value;
    var pinColor = color !== undefined ? color.replace('#', '') : '000000';

    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + characterPin + "|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        icon: pinImage,
        title: message,
        map: map
    });

    

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(nombre);
            infowindow.open(map, marker);
        }
    })(marker, i));
    
}


function obtenerDireccion()
{
    var geocoder = new google.maps.Geocoder;
    
    var mylat = document.getElementById('lat').value;
    var mylng = document.getElementById('lng').value;

    var latlng = {lat: parseFloat(mylat), lng: parseFloat(mylng)};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
        if (results[0]) {
            swal({
                icon: "success",
                text: results[0].formatted_address
            });
        } else {
            swal({
                icon: "info",
                text: "No hay resultados"
            });
        }
        } else {
            swal({
                icon: "error",
                text: "Geocoder failed due to: " +  status
            });
        }
    });
}

function obtenerClima()
{
    var lat = document.getElementById('lat').value;
    var lng = document.getElementById('lng').value;
    // var apiKey = "2af72ef62258728d72777bef612f2a3e";
    var apiKey = '8abe9c195f290074129c14ed2ef8aac1';

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + 
    lat + "&lon=" + lng + "&appid=" + apiKey, function(data) 
    {
        swal({
            icon: "success",
            text:
            "Nombre: " + data.name + "\n" +
            "Latitud: " + data.coord.lat + "\n" +
            "Longitud: " + data.coord.lon + "\n" +
            "Temperatura: " + data.main.temp + "\n" +
            "Presion: " + data.main.pressure + "\n" +
            "Humedad: " + data.main.humidity + "\n" +
            "Temperatura Minima: " + data.main.temp_min + "\n" +
            "Temperatura Maxima: " + data.main.temp_max + "\n" +
            "Visibilidad: " +  data.visibility + "\n" +
            "Velocidad del viento: " + data.wind.speed + "\n" +
            "Nubes: " + data.clouds.all
        });
    })
    .fail(function() {
        swal({
            icon:"error",
            text: "Error al tratar de encontrar el clima"
        });
    });
}