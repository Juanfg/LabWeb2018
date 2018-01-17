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
    var nombre = sessionStorage.nombreCliente;
    var message = "Tec de Mty";
    
        var pinColor = "000000";

    
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            icon: pinImage,
            title: '' + message,
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
    alert("obteniendo direccion ...");

    var geocoder = new google.maps.Geocoder;
    
    var mylat = document.getElementById('lat').value;
    var mylng = document.getElementById('lng').value;

    var latlng = {lat: parseFloat(mylat), lng: parseFloat(mylng)};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
        if (results[0]) {
            //window.alert(results[0].formatted_address);
            window.alert(JSON.stringify(results[0]));
            
        } else {
            window.alert('No results found');
        }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}


function obtenerClima()
{
    alert("obteniendo clima ...");

    var lat = 19.0433;
    var lng = -98.2019;
    var apiKey = "2af72ef62258728d72777bef612f2a3e";

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + 
    lat + "&lon=" + lng + "&appid=" + apiKey, function(data) 
    {
        alert(JSON.stringify(data));
    })
}

 