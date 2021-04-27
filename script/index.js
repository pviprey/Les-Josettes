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
    function ajoutCarte(){
        const latitude=47.233721458651196;
        const longitude=6.025049819255769;
        
        var mymap = L.map('map', { 
            center: [latitude, longitude], 
            zoom: 16 
        });

        L.marker([latitude, longitude]).addTo(mymap).bindPopup("Université SLSH<br>32 Rue Megevand, 25000 Besançon");

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(mymap);
    }

    function ajoutDate(){
        var jourActuel = new Date();

        var collecte = new Date();
        if(jourActuel.getDay()==collecte.getDay() && jourActuel.getHours()>17){
            collecte.setDate(collecte.getDate() + (7-collecte.getDay())%7+1);
        }else{
            collecte.setDate(collecte.getDate() + ((7-collecte.getDay())%7+1) % 7);
        }
        var mois=getMonthName(collecte.getMonth());
        document.getElementById("collecte").innerHTML+=collecte.getDate()+" "+mois+" de 15h à 17h.";

        var distribution = new Date();
        if(distribution.getHours()>17){
            distribution.setDate(distribution.getDate() + (7-distribution.getDay())%7+4);
        }else{
            distribution.setDate(distribution.getDate() + ((7-distribution.getDay())%7+4) % 7);
        }
        console.log(distribution);
    }

    ajoutCarte();
    ajoutDate();

    var mail=document.getElementById("mailbox");
    mail.addEventListener('click', function(){
        mail.title="adresse copié!";
        mail.addEventListener('mouseout', function(){
            mail.title="cliquez pour copier l'adresse";
        });
    });
});