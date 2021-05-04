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

    const latitudeBouloie=47.248934334330976;
    const longitudeBouloie=5.987255037247366;

    const latitudeSlhs=47.233721458651196;
    const longitudeSlhs=6.025049819255769;
    let mymap = L.map('map', { 
        center: [latitudeSlhs, longitudeSlhs], 
        zoom: 15,
        scrollWheelZoom: false
    });

    L.marker([latitudeSlhs, longitudeSlhs]).addTo(mymap).bindPopup("Université SLHS<br>32 Rue Megevand, 25000 Besançon");
    L.marker([latitudeBouloie, longitudeBouloie]).addTo(mymap).bindPopup("Restaurant RU Lumière<br>36 Avenue de l'Observatoire, 25000 Besançon");
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(mymap);

    document.getElementById('bouloie').addEventListener('click', function(e){
        mymap.panTo(new L.latLng(latitudeBouloie, longitudeBouloie));
    });
    document.getElementById('slhs').addEventListener('click', function(e){
        mymap.panTo(new L.latLng(latitudeSlhs, longitudeSlhs));
    });

    let jourActuel = new Date();

    let collecte = new Date();
    if(jourActuel.getDay()>=collecte.getDay() && jourActuel.getHours()>=17){
        collecte.setDate(collecte.getDate() + (7-collecte.getDay())%7+1);
    }else{
        collecte.setDate(collecte.getDate() + ((7-collecte.getDay())%7+1) % 7);
    }
    let mois=getMonthName(collecte.getMonth());
    document.getElementById("collecte").innerHTML+=collecte.getDate()+" "+mois+" de 15h à 17h.";

    let distribution = new Date();
    if(distribution.getHours()>17){
        distribution.setDate(distribution.getDate() + (7-distribution.getDay())%7+4);
    }else{
        distribution.setDate(distribution.getDate() + ((7-distribution.getDay())%7+4) % 7);
    }
    console.log(distribution);



    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});