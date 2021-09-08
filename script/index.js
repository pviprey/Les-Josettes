function copyText(element) {
    let range, selection;
    element = document.getElementById("mail"); 
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    try {
      document.execCommand('copy');
      alert('mail copié');
    }
    catch (err) {
      alert('unable to copy text');
    }
}

document.addEventListener("DOMContentLoaded",function(e) {
    function getMonthName(nb){
        switch(nb){
            case 0:return "Janvier";
            case 1:return "Février";
            case 2:return "Mars";
            case 3:return "Avril";
            case 4:return "Mai";
            case 5:return "Juin";
            case 6:return "Juillet";
            case 7:return "Août";
            case 8:return "Septembre";
            case 9:return "Octobre";
            case 10:return "Novembre";
            case 11:return "Décembre";
        }
    }

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
        if(mymap.getCenter().equals([latitudeSlhs, longitudeSlhs], 0.001)){
            document.getElementById("slhs").classList.add("est_centre");
        }else{
            document.getElementById("slhs").classList.remove("est_centre");
        }
    });

/*
    let jourActuel = new Date();
    let collecte = new Date();
    if(jourActuel.getDay()>=collecte.getDay() && jourActuel.getHours()>=17){
        collecte.setDate(collecte.getDate() + (7-collecte.getDay())%7+1);
    }else{
        collecte.setDate(collecte.getDate() + ((7-collecte.getDay())%7+1) % 7);
    }
    let mois=getMonthName(collecte.getMonth());
    document.getElementById("collecte").innerHTML+=" Lundi "+collecte.getDate()+" "+mois+" de 15h à 17h.";
*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    let header = document.getElementsByTagName("header");
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
                e.target.parentNode.previousElementSibling?.children[0].classList.add("siblingHovered");
                
                e.target.addEventListener('mouseleave', function(event){
                    if(e.target === event.target){
                        e.target.parentNode.previousElementSibling?.children[0].classList.remove("siblingHovered");
                    }
                });
            }
        }
    });
});