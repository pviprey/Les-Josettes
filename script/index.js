document.addEventListener("DOMContentLoaded",function(e) {
    function showPosition(position) {
        var mymap = L.map('mapid', {
                        center: L.latLng(position.coords.latitude, position.coords.longitude), 
                        zoom: 16
                    });
    
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(mymap);
        
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
            .bindPopup("<b>Coucou</b><br />Je suis ici !");
    
    }
            
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                document.body.innerHTML = "L'utilisateur n'a pas accepté la géolocalisation."
                break;
            case error.POSITION_UNAVAILABLE:
                document.body.innerHTML = "La position n'est pas disponible."
                break;
            case error.TIMEOUT:
                document.body.innerHTML = "Time out."
                break;
            case error.UNKNOWN_ERROR:
                document.body.innerHTML = "Erreur inconnue."
                break;
        }
    }

    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.body.innerHTML = "Pas de géolocalisation disponible.";
    }
});