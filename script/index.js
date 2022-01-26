document.addEventListener("DOMContentLoaded",function(e) {
    /* Affichage des dates de collectes et distributions */
    function date(year, month, day, hour){
        return new Date(year, month, day, hour);
    }
    
    function getLiteralDay(date){
        switch(date.getDay()){
            case 1:
                return "Lundi";
            case 2:
                return "Mardi";
            case 3:
                return "Mercredi";
            case 4:
                return "Jeudi";
            case 5:
                return "Vendredi";
            case 6:
                return "Samedi";
            case 7:
                return "Dimanche";
        }
    }
    
    function getLiteralMonth(date){
        switch(date.getMonth()){
            case 0:
                return "Janvier";
            case 1:
                return "Février";
            case 2:
                return "Mars";
            case 3:
                return "Avril";
            case 4:
                return "Mai";
            case 5:
                return "Juin";
            case 6:
                return "Juillet";
            case 7:
                return "Aout";
            case 8:
                return "Septembre";
            case 9:
                return "Octobre";
            case 10:
                return "Novembre";
            case 11:
                return "Decembre";          
        }
    }

    const year = new Date().getFullYear();
    let collecte=[
        {begin: date(2021, 10, 15, 15), end: date(2021, 10, 15, 17)},
        {begin: date(2021, 10, 22, 15), end: date(2021, 10, 22, 17)},
        {begin: date(2021, 10, 29, 15), end: date(2021, 10, 29, 17)},
        {begin: date(2021, 11, 06, 15), end: date(2021, 11, 06, 17)},
        {begin: date(2021, 11, 13, 15), end: date(2021, 11, 13, 17)},

        {begin: date(year, 0, 31, 15), end: date(year, 0, 31, 17)},
        {begin: date(year, 1, 7, 15), end: date(year, 1, 7, 17)},
        {begin: date(year, 1, 14, 15), end: date(year, 1, 14, 17)},
        {begin: date(year, 1, 21, 15), end: date(year, 1, 21, 17)}
    ];

    let distribution=[
        {begin: date(2021, 10, 18, 14), end: date(2021, 10, 18, 17)},
        {begin: date(2021, 11, 02, 14), end: date(2021, 11, 02, 17)},
        {begin: date(2021, 11, 16, 14), end: date(2021, 11, 16, 17)},

        {begin: date(year, 0, 06, 14), end: date(year, 0, 06, 17)},
        {begin: date(year, 0, 20, 14), end: date(year, 0, 20, 17)},
        {begin: date(year, 1, 03, 14), end: date(year, 1, 03, 17)},

    ];

    for(let i=0; i<collecte.length; i++){
        if (new Date(collecte[i].end.getTime()) > Date.now()){
            document.getElementById("collecte").innerText += " " + getLiteralDay(collecte[i].begin) + " " + collecte[i].begin.getDate() + " " + getLiteralMonth(collecte[i].begin) + " de " + collecte[i].begin.getHours() + "h à " + collecte[i].end.getHours() + "h.";
            break;
        }
    }

    for(let i=0; i< distribution.length; i++){
        if(new Date(distribution[i].end.getTime()) > Date.now()){
            document.getElementById("distribution").innerText += " " + getLiteralDay(distribution[i].begin) + " " + distribution[i].begin.getDate() + " " + getLiteralMonth(distribution[i].begin) + " de " + distribution[i].begin.getHours() + "h à " + distribution[i].end.getHours() + "h.";
            break;
        }
    }    
    
    /* Affichage de la carte */

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

    /* Affichage du header */

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
});
