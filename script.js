(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let suffiks;

            // 24 -> 12h + suffiksi väärtustamine
            if (h>12){
                h=h-12;
                suffiks = "PL";
            } else {
                suffiks = "EL";
            }

            let m = date.getMinutes();
            let s = date.getSeconds();



            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s+" "+suffiks;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function sisendiKontroll(){
        let firstname = document.getElementById("fname").value;
        let lastname = document.getElementById("lname").value;
        let pakiautomaat = document.getElementById("pakiautomaat").checked
        let ise = document.getElementById("ise").checked

        console.log(typeof firstname);

        if ((firstname==="" && lastname==="") || /\d/.test(firstname) || /\d/.test(lastname) || lastname==="" || firstname===""  || (pakiautomaat===false && ise===false)){
            alert("Sisendväljad ei vasta nõuetele");
        }
    }


    function estimateDelivery(event) {
        event.preventDefault();

        sisendiKontroll();

        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
            switch (linn.value){
                case "trt":
                    e.innerHTML = "2,50 &euro;";
                    break;
                case "tln":
                    e.innerHTML = "0 &euro;";
                    break;
                case "nrv":
                    e.innerHTML = "2,50 &euro;";
                    break;
                case "prn":
                    e.innerHTML = "3,00 &euro;";
                    break;
            }
            /*e.innerHTML = "x,xx &euro;";
            
            e.innerHTML = "Linna väärtus: "+linn.options;*/
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AvI8DMmG1VqWHgo9Ja65jy8CMM9OhKInB9uJbR2RMgMcYxUfia1TWBMCkKS3O03P";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.3628672,25.5903333
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true,
        showBreadcrumb:true,
        showDaschboard: true
    });
    

   let suunaviit1 = new Microsoft.Maps.Location(
       58.38104,
       26.71992
   );

   let suunaviit2= new Microsoft.Maps.Location(
       58.385068,
       24.4966739
   );


    let pushpin1 = new Microsoft.Maps.Pushpin(suunaviit1, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });



    let pushpin2 = new Microsoft.Maps.Pushpin(suunaviit2, {
        title: 'Endla teater',
    });

    let teatetahvel1 = new Microsoft.Maps.Infobox(suunaviit1,{title: "Tartu Ülikoolist lähemalt", description:"Siin on Tartu Ülikooli kirjeldus", visible: false});
    teatetahvel1.setMap(map);

    let teatetahvel2 = new Microsoft.Maps.Infobox(suunaviit2,{title: "Endla teatrist lähemalt", description:"Endla teatri kirjeldus", visible: false});
    teatetahvel2.setMap(map);


    Microsoft.Maps.Events.addHandler(pushpin1, 'click', function () {
        teatetahvel1.setOptions({ visible: true });
    });

    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
        teatetahvel2.setOptions({ visible: true });
    });

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);






}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

