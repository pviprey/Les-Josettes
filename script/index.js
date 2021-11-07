document.addEventListener("DOMContentLoaded",function(e) {
    var yellowPin = L.icon({
        iconUrl: 'images/yellowPin.png',
        iconSize:     [70, 70], // size of the icon
        iconAnchor:   [35, 59], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -65] // point from which the popup should open relative to the iconAnchor
    });

    const latitudeSlhs=47.233721458651196;
    const longitudeSlhs=6.025049819255769;
    let mymap = L.map('map', { 
        center: [latitudeSlhs, longitudeSlhs], 
        zoom: 15,
        scrollWheelZoom: false
    });
    L.marker([latitudeSlhs, longitudeSlhs], {icon: yellowPin}).addTo(mymap).bindPopup("Université SLHS<br>32 Rue Megevand, 25000 Besançon");
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(mymap);
    document.getElementById('slhs').addEventListener('click', function(e){
        mymap.panTo(new L.latLng(latitudeSlhs, longitudeSlhs));
        document.getElementById("slhs").classList.add("est_centre");
    });

    mymap.addEventListener('mousemove', function(e){
        if(mymap.getCenter().equals([latitudeSlhs, longitudeSlhs], 0.0001)){
            document.getElementById("slhs").classList.add("est_centre");
        }else{
            document.getElementById("slhs").classList.remove("est_centre");
        }
    });


    let header = document.getElementsByTagName("header");
    header[0].querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    header[0].addEventListener('mouseover', function(e){
        if(e.target.tagName === 'A'){
            e.target.previousElementSibling?.children[0].classList.add("siblingHovered");
            
            e.target.addEventListener('mouseleave', function(event){
                if(e.target === event.target){
                    e.target.previousElementSibling?.children[0].classList.remove("siblingHovered");
                }
            });
        }else{
            if(e.target.tagName === 'DIV'){
                e.target.parentElement.previousElementSibling?.children[0].classList.add("siblingHovered");
                
                e.target.addEventListener('mouseleave', function(event){
                    if(e.target === event.target){
                        e.target.parentElement.previousElementSibling?.children[0].classList.remove("siblingHovered");
                    }
                });
            }
        }
    });

    // let body = document.getElementsByTagName("body");
    // let footer = document.createElement("footer");
    // footer.classList.add("alligne");
    // let p = document.createElement("p");
    // p.innerHTML = "Site carte de visite | Réalisé par <a href=\"https://github.com/pviprey\">Pierre Viprey</a>"
    // footer.appendChild(p);
    // body.insertAdjacentElement('afterend', footer);
});