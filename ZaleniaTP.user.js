(function() {
    window.addEventListener("load", (event) => {
        setTimeout(function() {
            console.log("working0");
 //           document.getElementsByClassName("navbar-nav mr-auto")[1].children[4].children[1].onclick = function() {incomings()};
            document.getElementsByClassName("tab-content card special-color-dark white-text")[0].children[1].children[0].children[0].children[0].children[0].children[2].onclick = function() {incomings()};
            var dk = document.getElementsByClassName("nav nav-tabs md-tabs mdb-color p-0 m-0 white-text")[0];
            var nodez = document.createElement("li");
            var textnodez = document.createTextNode("TP Active");
            nodez.appendChild(textnodez);
            dk.appendChild(nodez);
        }, 10000);
    });
    function tableToCSV() {

        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var rows = document.getElementsByClassName("table white-text")[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

            // Get each column data
            var cols = rows[i].querySelectorAll('td,th');

            // Stores each csv row data
            var csvrow = [];
            if(i==0){
                csvrow.push("Attacker");
                csvrow.push("Alliance");
                csvrow.push("Defender");
                csvrow.push("Attacking City");
                csvrow.push("Attacking Cord");
                csvrow.push("Defending City");
                csvrow.push("Defending Cords");
                csvrow.push("Type");
                csvrow.push("Spotted");
                csvrow.push("Arrival");
                csvrow.push("Capture");
                csvrow.push("Troop Type");
            }
            else{
                for (var j = 0; j < cols.length; j++) {
                    if(j==0){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==1){csvrow.push(cols[j].children[0].textContent);}
                    if(j==2){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==3){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==4){csvrow.push(cols[j].children[0].textContent);}
                    if(j==5){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==6){csvrow.push(cols[j].children[0].textContent);}
                    if(j==7){csvrow.push(cols[j].textContent);}
                    if(j==8){csvrow.push(cols[j].textContent.split(",")[1]);}
                    if(j==9){csvrow.push(cols[j].textContent.split(",")[1]);}
                    if(j==10){csvrow.push(cols[j].textContent);}
                    if(j==11){csvrow.push(cols[j].textContent);}
                    // Get the text data of each cell
                    // of a row and push it to csvrow
                }
            }

            // Combine each column value with comma
            csv_data.push(csvrow.join(","));
        }

        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        // Call this function to download csv file
        downloadCSVFile(csv_data);

    }

    function downloadCSVFile(csv_data) {

        // Create CSV file object and feed
        // our csv_data into it
        var CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        // Create to temporary link to initiate
        // download process
        var temp_link = document.createElement('a');

        // Download csv file
        temp_link.download = "ZaleniaTP.csv";
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
    }
    function truncateto3Decimals(num, dec = 3) {
        const calcDec = Math.pow(10, dec);
        return Math.trunc(num * calcDec) / calcDec;
    }
    function truncateto2Decimals(num, dec = 2) {
        const calcDec = Math.pow(10, dec);
        return Math.trunc(num * calcDec) / calcDec;
    }
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    function roundToThree(num) {
        return +(Math.round(num + "e+3")  + "e-3");
    }
    function roundToFour(num) {
        return +(Math.round(num + "e+4")  + "e-4");
    }
    function incomings() {
        //       var exp1 = document.getElementsByClassName("d-flex align-items-center smallForm")[0].children[2];
        //       console.log(exp1);
        //       var exp1but='<div id="exp1but1" class="btn btn-sm primaryButton" >TP csv</div>';
        //        var y = document.getElementsByClassName("tab-content card special-color-dark white-text")[0].children[1].children[0].children[0].children[0].children[1].children[2].children[0].children[1].children[0].children;//[0] is thead, [1]is tbody
        var myEle = document.getElementsByClassName("table white-text")[0].children[1].children[0].children[11];
        console.log(myEle);
        if(myEle === undefined){
            var u = document.getElementsByClassName("table white-text")[0].children[0].children[0];
            var node = document.createElement("th");
            var textnode = document.createTextNode("Troop type");
            node.appendChild(textnode);
            u.appendChild(node);

            const exp1but = document.createElement("div");
            exp1but.classList.add('btn', 'btn-sm', 'primaryButton');
            exp1but.setAttribute("id", "TPcsv");
            const textNode = document.createTextNode("TP csv");
            exp1but.appendChild(textNode);
            var temp34=document.getElementsByClassName("d-flex align-items-center smallForm")[0].children[2];
            temp34.insertBefore(exp1but, temp34.children[0]);

            document.getElementById("TPcsv").onclick = function() {tableToCSV()};

            //  below will give u a variable called speeeed which contains all the possible speed bonuses that can be in game
            // +num.toFixed(3) rounding to 3 digit decimal points
            var speeeed=[];
            speeeed[0]=0;
            for (var i=1; i<201; i++){
                speeeed[i]=speeeed[i-1]+0.5;
            }
            //  separating all possible speeds for troop types
            var navyspeed = [];
            var scoutspeed = [];
            var cavspeed = [];
            var infspeed = [];
            var artspeed = [];
            var senspeed = [];
            var temp;
            for (i in speeeed) {
                temp=12*(1+speeeed[i]/100);
                navyspeed[i]= roundToTwo(temp);
                temp=8*(1+speeeed[i]/100);
                scoutspeed[i]= roundToTwo(temp);
                temp=6*(1+speeeed[i]/100);
                cavspeed[i]= roundToTwo(temp);
                temp=3*(1+speeeed[i]/100);
                infspeed[i]= roundToThree(temp);//need 3 decimal places
                temp=2*(1+speeeed[i]/100);
                artspeed[i]= roundToThree(temp);//art to 3 decimal places
                temp=1.5*(1+speeeed[i]/100);
                senspeed[i]= roundToThree(temp);//sen to 3 decimal places
            }
//            console.log(senspeed);
//            console.log(scoutspeed);
            var cv= document.getElementsByClassName("table white-text")[0].children[1];
            for (var i = 0, row; row = cv.rows[i]; i++) {
                if (row.children[0].children[0].textContent === "No attacks found") { break; }
                var vv = row.children[0].children[0].textContent;
                var ztid=row.children[6].children[0].textContent;//defender Z_sender
                var zsid=row.children[4].children[0].textContent;//attacker Z_target
                var tid=ztid.toString().split(" "); //C00 (82:55) 0 is continentC00, 1 is cords (82:55)
                var sid=zsid.toString().split(" ");
                var tidz=tid[1].split(":"); // 0 is (82, 1 is 55)
                var sidz=sid[1].split(":");
                var tx=Number(tidz[0].match(/\d+/));
                var ty=Number(tidz[1].match(/\d+/));
                var sx=Number(sidz[0].match(/\d+/));
                var sy=Number(sidz[1].match(/\d+/));
                var tcont=tid[0];
                var scont=sid[0];
                var dist=Math.sqrt((ty-sy)*(ty-sy)+(tx-sx)*(tx-sx));
                console.log("D:"+dist);


                var zatime=row.children[9].textContent;
                var zstime=row.children[8].textContent;
                var atimesplit=zatime.toString().split(" "); //"Sun, 04 Dec 2022 12:06:05" [2] is date, [3] is month, [4] is year, [5] is time
                var stimesplit=zstime.toString().split(" "); //
                var atime=atimesplit[5];
                var stime=stimesplit[5];
                var hdiff=Number(atime.substring(0,2))-Number(stime.substring(0,2)); //12:06:05
                var mdiff=Number(atime.substring(3,5))-Number(stime.substring(3,5));
                var sdiff=Number(atime.substring(6,8))-Number(stime.substring(6,8));
                var atimedate=Number(atimesplit[2]);
                var stimedate=Number(stimesplit[2]);
                var stimemonth=stimesplit[3];
//                console.log(atimedate);
//                console.log(stimedate);
                console.log("hdiff:"+hdiff);
                var time;
                if (hdiff>=0) {time=60*hdiff;}
                else {time=(24+hdiff)*60;}
                var diffdate=atimedate-stimedate;
                console.log("datediff:"+diffdate);
                if(diffdate<0){
                    console.log("monthdiff");
                    if(stimemonth=="Jan" || stimemonth=="Mar" || stimemonth=="May" || stimemonth=="Jul" || stimemonth=="Aug" || stimemonth=="Oct" || stimemonth=="Dec")
                    {
                        diffdate=diffdate+31;
                    }
                    if(stimemonth=="Feb")
                    {
                        diffdate=diffdate+28;
                    }
                    else
                    {
                        diffdate=diffdate+30;
                    }
                }
                if((diffdate==1) && hdiff>=0){
                    console.log("1daydiff");
                    time+=+1440;
                }
                if(diffdate==2){
                    console.log("2daydiff");
                    if (hdiff<0){time+=+1440;}
                    else{
                    time+=+2880;
                    }
                }
                if(diffdate==3){
                    console.log("3daydiff");
                    if (hdiff<0){time+=+2880;}
                    else{
                    time+=+4320;
                    }
                }
                if(diffdate==4){
                    console.log("4daydiff");
                    if(hdiff<0){time+=+4320;}
                    else{
                    time+=+5760;
                    }
                }
                time+=mdiff;
                time+=sdiff/60;
                time=time/60;
                console.log("T:"+time);

                var ispeed=roundToTwo(dist/time);
                console.log("S.2r:"+ispeed);

                var ispeedthree=roundToThree(dist/time);
                console.log("S.3r:"+ispeedthree);

//                var ispeedthreetrunc=truncateto3Decimals(dist/time);
 //               console.log("S.3t:"+ispeedthreetrunc);

                var nspeed=roundToTwo(dist/(time-1));
                console.log("NS:"+nspeed);

                var newtd = document.createElement("td");
                row.appendChild(newtd);

                // below will return -1 if calculated speed is not found inside the speed arrays and the correct index if it is found within the speed arrays
                var zns = navyspeed.indexOf(nspeed);
                var zss = scoutspeed.indexOf(ispeed);
                var zcs = cavspeed.indexOf(ispeed);
                var zis = infspeed.indexOf(ispeedthree);//infantry round to 3 decimals
                var zas = artspeed.indexOf(ispeedthree);//artillery upto 3 decimals
                var zsn = senspeed.indexOf(ispeedthree);// senator round to 3 decimals
                var zsnTranc = senspeed.indexOf(ispeedthreetrunc);//senator trancated to 3 decimals
                // below use ispeed and above return values to get the correct incoming troop type
                if (tcont==scont) {
                    if (ispeed<2) {
                        if(zsn == -1 && zsnTranc ==-1){ // indexof returns -1 if value is not found
                            row.children[11].textContent = "Tower?/Gov";
                        }
                        else{
                            if(zsn == -1){
                                row.children[11].textContent = "Governor "+speeeed[zsnTranc]+"%";
                            }
                            else{row.children[11].textContent = "Governor "+speeeed[zsn]+"%";}
                        }
                    }
                    if (ispeed<3 && ispeed>=2) {
                        if(zsn == -1 && zsnTranc ==-1 && zas == -1){
                            row.children[11].textContent = "Tower?/Art/Gov";
                        }
                        if(zsn == -1 && zsnTranc ==-1 && zas != -1){
                            row.children[11].textContent = "Artillery "+speeeed[zas]+"%";
                        }
                        if((zsn != -1 || zsnTranc !=-1) && zas == -1){
                            if(zsn == -1){
                                row.children[11].textContent = "Governor "+speeeed[zsnTranc]+"%";
                            }
                            else{row.children[11].textContent = "Governor "+speeeed[zsn]+"%";}
                        }
                        if((zsn != -1 || zsnTranc !=-1) && zas != -1){
                            if(zsn != -1){
                                row.children[11].textContent = "Art "+speeeed[zas]+"%"+"/"+"Gov "+speeeed[zsn]+"%";
                            }
                            else{
                                row.children[11].textContent = "Art "+speeeed[zas]+"%"+"/"+"Gov "+speeeed[zsnTranc]+"%";
                            }
                        }
                    }
                    if (ispeed==3){
                        row.children[11].textContent = "Inf 0%/Art 50%/Gov 100%";
                    }
                    if (ispeed<=4 && ispeed>3) {
                        if(zis == -1 && zas == -1){
                            row.children[11].textContent = "Tower?/Inf &above";
                        }
                        if(zis == -1 && zas != -1){
                            row.children[11].textContent = "Artillery "+speeeed[zas]+"%";
                        }
                        if(zis != -1 && zas == -1){
                            row.children[11].textContent = "Infantry "+speeeed[zis]+"%";
                        }
                        if(zis != -1 && zas != -1){
                            row.children[11].textContent = "Inf "+speeeed[zis]+"%"+"/"+"Art "+speeeed[zas]+"%";
                        }
                    }
                    if (ispeed>6 && ispeed<4) {
                        if(zis == -1){ // indexof returns -1 if value is not found
                            row.children[11].textContent = "Tower?/Inf";
                        }
                        else
                        {
                            row.children[11].textContent = "Inf "+speeeed[zis]+"%";
                        }
                    }
                    if (ispeed==6){
                        row.children[11].textContent = "Cav 0%/Inf 100%";
                    }
                    if (ispeed<8 && ispeed>6) {
                        if(zcs == -1){
                            row.children[11].textContent = "Tower?/Cav &above";
                        }
                        else{
                            row.children[11].textContent = "Cav "+speeeed[zcs]+"%";
                        }
                    }
                    if (ispeed<12 && ispeed>=8){
                        if(zss == -1 && zcs == -1){
                            row.children[11].textContent = "Tower?/Scout &above";
                        }
                        if(zss == -1 && zcs != -1){
                            row.children[11].textContent = "Cav "+speeeed[zcs]+"%";
                        }
                        if(zss != -1 && zcs == -1){
                            row.children[11].textContent = "Scout "+speeeed[zss]+"%";
                        }
                        if(zss != -1 && zcs != -1){
                            row.children[11].textContent = "Scout "+speeeed[zss]+"%"+"/"+"Cav "+speeeed[zcs]+"%";
                        }
                    }
                    if (ispeed==12){
                        row.children[11].textContent = "Navy 0%/Scout 60%/Cav 100%";
                    }
                    if (ispeed<=16 && ispeed>12) {
                        if(zss == -1 && zns == -1){
                            row.children[11].textContent = "Tower?/scout &above";
                        }
                        if(zss == -1 && zns != -1){
                            row.children[11].textContent = "Navy "+speeeed[zns]+"%";
                        }
                        if(zss != -1 && zns == -1){
                            row.children[11].textContent = "Scout "+speeeed[zss]+"%";
                        }
                        if(zss != -1 && zns != -1){
                            row.children[11].textContent = "Navy "+speeeed[zns]+"%"+"/"+"Scout "+speeeed[zss]+"%";
                        }
                    }
                    if (ispeed>16){
                        if(zns == -1){
                            row.children[11].textContent = "Tower?/Navy &above";
                        }
                        else
                        {
                            row.children[11].textContent = "Navy "+speeeed[zns]+"%";
                        }
                    }
                }
                else {
                    if(zns != -1){
                        row.children[11].textContent = "Navy "+speeeed[zns]+"%";
                    }
                    else{
                        row.children[11].textContent = "Tower?/Navy";
                    }
                }
            }
        }
    }
})();
