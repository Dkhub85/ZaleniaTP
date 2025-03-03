(function() {
    setTimeout(function() {
        mainscript();        
    }, 40000);

    function mainscript() {
        console.log("running1");
        document.addEventListener("click", function (event) {
            let target = event.target.closest("body > div > div.container-fluid.p-0.m-0 > div > div > div:nth-child(2) > div > div > div > div > div.tab-pane.fade.show.active > div > div > div > div > div > div > div > div > ul > li:nth-child(1) > a");
            
            if (target) {
//              console.log("Delegated Click Detected!");
                incomings(); // Call your function
            }
        });
        
    }
    function tableToCSV() {

        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var rows = document.querySelector("body > div > div.container-fluid.p-0.m-0 > div > div > div:nth-child(2) > div > div > div > div > div.tab-pane.fade.show.active > div > div > div > div > div > div > div > div > div > div.tab-pane.fade.active.show > div > div > div > div > div.table-container > table").getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

            // Get each column data
            var cols = rows[i].querySelectorAll('td,th');

            // Stores each csv row data
            var csvrow = [];
            if(i==0){
                csvrow.push("Attacker");
                csvrow.push("Alliance");
                csvrow.push("Attacking Cord");
                csvrow.push("Attacking City");
                csvrow.push("Defender");
                csvrow.push("Defending Cords");                
                csvrow.push("Defending City");
                csvrow.push("Type");
                csvrow.push("Spotted");
                csvrow.push("Arrival");
                csvrow.push("Offense");
                csvrow.push("Defence");
                csvrow.push("Capture");
                csvrow.push("Troop Type");
            }
            else{
                for (var j = 0; j < cols.length; j++) {
                    if(j==0){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==1){csvrow.push(cols[j].children[0].textContent);}
                    if(j==2){csvrow.push(cols[j].children[0].textContent);}
                    if(j==3){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==4){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==5){csvrow.push(cols[j].children[0].textContent);}
                    if(j==6){csvrow.push(cols[j].children[0].children[0].children[0].textContent);}
                    if(j==7){csvrow.push(cols[j].textContent);}
                    if(j==8){csvrow.push(cols[j].textContent.split(",")[1]);}
                    if(j==9){csvrow.push(cols[j].textContent.split(",")[1]);}
                    if(j==10){
                        let numberText = cols[j].textContent.trim(); // Extract text
                        let cleanNumber = parseInt(numberText.replace(/,/g, ""), 10);
                        csvrow.push(cleanNumber);
                    }
                    if(j==11){
                        let numberText = cols[j].textContent.trim(); // Extract text
                        let cleanNumber = parseInt(numberText.replace(/,/g, ""), 10);
                        csvrow.push(cleanNumber);
                    }
                    if(j==12){csvrow.push(cols[j].textContent);}
                    if(j==13){csvrow.push(cols[j].textContent);}
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
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    function roundToThree(num) {
        return +(Math.round(num + "e+3")  + "e-3");
    }

    function findClosestMatch(arr, target) {
        // Calculate threshold (0.2% of target)
        let threshold = 0.002 * target;
        // Filter array to find values within the threshold
        let filtered = arr.filter(num => Math.abs(num - target) <= threshold);

        // If no match is found, return an empty string
        if (filtered.length === 0) {
            return "";
        }

        // Find the index of the first match
        let matchIndex = arr.indexOf(filtered[0]);

         // Format the result like "Label Index%"
        return matchIndex;
    }

    function incomings() {
        var myEle = document.querySelector("body > div > div.container-fluid.p-0.m-0 > div > div > div:nth-child(2) > div > div > div > div > div.tab-pane.fade.show.active > div > div > div > div > div > div > div > div > div > div.tab-pane.fade.active.show > div > div > div > div > div.table-container > table > thead > tr").children[13];        
        if(myEle === undefined){
            var u = document.querySelector("body > div > div.container-fluid.p-0.m-0 > div > div > div:nth-child(2) > div > div > div > div > div.tab-pane.fade.show.active > div > div > div > div > div > div > div > div > div > div.tab-pane.fade.active.show > div > div > div > div > div.table-container > table > thead > tr");
            var node = document.createElement("th");
            var textnode = document.createTextNode("Troop type");
            node.appendChild(textnode);
            u.appendChild(node);

            //download button click also exports csv file of script
            document.querySelector("body > div > div.container-fluid.p-0.m-0 > div > div > div:nth-child(2) > div > div > div > div > div.tab-pane.fade.show.active > div > div > div > div > div > div > div > div > div > div.tab-pane.fade.active.show > div > div > div > div > div.align-items-center.smallForm.d-flex > div.flex-grow-1.justify-content-end.align-items-center.d-flex.paging").onclick = function() {tableToCSV()};
            incomingsd();
        }
    }
    function incomingsd() {
        console.log("incomingsd");
            //  below will give u a variable called speeeed which contains all the possible speed bonuses that can be in game
            let speeeed = [];
            for (let i = 0; i <= 100; i++) {
                speeeed.push(i);
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
                infspeed[i]= roundToTwo(temp);
                temp=2*(1+speeeed[i]/100);
                artspeed[i]= roundToTwo(temp);
                temp=1.5*(1+speeeed[i]/100);
                senspeed[i]= roundToThree(temp);//sen to 3 decimal places
            }
            // Selecting the body of incoming attacks
            var cv= document.querySelector("body > div > div.container-fluid.p-0.m-0 > div > div > div:nth-child(2) > div > div > div > div > div.tab-pane.fade.show.active > div > div > div > div > div > div > div > div > div > div.tab-pane.fade.active.show > div > div > div > div > div.table-container > table > tbody");
		
                for (var i = 0, row; row = cv.rows[i]; i++) {
                if (row.children[0].children[0].textContent === "No attacks found") { break; }
                var ztid=row.children[5].children[0].textContent;//defender Z_sender
                var zsid=row.children[2].children[0].textContent;//attacker Z_target
                var tid=ztid.toString().split(" "); //C00 (82:55) 0 is continent C00, 1 is cords (82:55)
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
//              console.log("D:"+dist);

                var zatime=row.children[9].textContent;// arrival time
                var zstime=row.children[8].textContent;// spot time  2 Mar, 13:14:36 
                var atimesplit=zatime.toString().split(" "); //2 Mar, 13:14:36 [1] is date, [2] is month, [3] is time
                var stimesplit=zstime.toString().split(" "); //
                var atime=atimesplit[3];
                var stime=stimesplit[3];
                var hdiff=Number(atime.substring(0,2))-Number(stime.substring(0,2)); //12:06:05
                var mdiff=Number(atime.substring(3,5))-Number(stime.substring(3,5));
                var sdiff=Number(atime.substring(6,8))-Number(stime.substring(6,8));
                var atimedate=Number(atimesplit[1]);
                var stimedate=Number(stimesplit[1]);
                var stimemonth=stimesplit[2];
//              console.log(atimedate);
//              console.log(stimedate);
//              console.log("hdiff:"+hdiff);
                var time;
                if (hdiff>=0) {time=60*hdiff;}
                else {time=(24+hdiff)*60;}
                var diffdate=atimedate-stimedate;
 //                console.log("datediff:"+diffdate);
                if(diffdate<0){
 //                 console.log("monthdiff");
                    if(stimemonth=="Jan," || stimemonth=="Mar," || stimemonth=="May," || stimemonth=="Jul," || stimemonth=="Aug," || stimemonth=="Oct," || stimemonth=="Dec,")
                    {
                        diffdate=diffdate+31;
                    }
                    if(stimemonth=="Feb,")
                    {
                        diffdate=diffdate+28;
                    }
                    else
                    {
                        diffdate=diffdate+30;
                    }
                }
                if((diffdate==1) && hdiff>=0){
//                  console.log("1daydiff");
                    time+=+1440;
                }
                if(diffdate==2){
//                  console.log("2daydiff");
                    if (hdiff<0){time+=+1440;}
                    else{
                    time+=+2880;
                    }
                }
                if(diffdate==3){
 //                 console.log("3daydiff");
                    if (hdiff<0){time+=+2880;}
                    else{
                    time+=+4320;
                    }
                }
                if(diffdate==4){
 //                 console.log("4daydiff");
                    if(hdiff<0){time+=+4320;}
                    else{
                    time+=+5760;
                    }
                }
                time+=mdiff;
                time+=sdiff/60;
                time=time/60;
//              console.log("T:"+time);

                var ispeed=roundToTwo(dist/time);
//              console.log("S.2r:"+ispeed);

                var ispeedthree=roundToThree(dist/time);
//              console.log("S.3r:"+ispeedthree);

                var nspeed=roundToTwo(dist/(time-1));
//              console.log("NS:"+nspeed);

                var newtd = document.createElement("td");
                row.appendChild(newtd);

                // below will return -1 if calculated speed is not found inside the speed arrays and the correct index if it is found within the speed arrays
                var zns = findClosestMatch(navyspeed, nspeed);
                var zss = findClosestMatch(scoutspeed, ispeed);
                var zcs = findClosestMatch(cavspeed, ispeed);
                var zis = findClosestMatch(infspeed, ispeed);
                var zas = findClosestMatch(artspeed, ispeed);
                var zsn = findClosestMatch(senspeed, ispeedthree);//governor upto 3 decimals
                // below use ispeed and above return values to get the correct incoming troop type
                if (tcont==scont) {
                    if (ispeed<2) {
                        if(zsn == -1){ // indexof returns -1 if value is not found
                            row.children[13].textContent = "Tower?/Gov";
                        }
                        else{
                            row.children[13].textContent = "Governor "+speeeed[zsn]+"%";
                        }
                    }
                    if (ispeed<3 && ispeed>=2) {
                        if(zsn == -1 && zas == -1){
                            row.children[13].textContent = "Tower?/Art/Gov";
                        }
                        if(zsn == -1 && zas != -1){
                            row.children[13].textContent = "Artillery "+speeeed[zas]+"%";
                        }
                        if(zsn != -1 && zas == -1){
                            row.children[13].textContent = "Governor "+speeeed[zsn]+"%";
                        }
                        if(zsn != -1 && zas != -1){
                            row.children[13].textContent = "Art "+speeeed[zas]+"%"+"/"+"Gov "+speeeed[zsn]+"%";
                        }
                    }
                    if (ispeed==3){
                        row.children[13].textContent = "Inf 0%/Art 50%/Gov 100%";
                    }
                    if (ispeed<=4 && ispeed>3) {
                        if(zis == -1 && zas == -1){
                            row.children[13].textContent = "Tower?/Inf &above";
                        }
                        if(zis == -1 && zas != -1){
                            row.children[13].textContent = "Artillery "+speeeed[zas]+"%";
                        }
                        if(zis != -1 && zas == -1){
                            row.children[13].textContent = "Infantry "+speeeed[zis]+"%";
                        }
                        if(zis != -1 && zas != -1){
                            row.children[13].textContent = "Inf "+speeeed[zis]+"%"+"/"+"Art "+speeeed[zas]+"%";
                        }
                    }
                    if (ispeed>6 && ispeed<4) {
                        if(zis == -1){ // indexof returns -1 if value is not found
                            row.children[13].textContent = "Tower?/Inf";
                        }
                        else
                        {
                            row.children[13].textContent = "Inf "+speeeed[zis]+"%";
                        }
                    }
                    if (ispeed==6){
                        row.children[13].textContent = "Cav 0%/Inf 100%";
                    }
                    if (ispeed<8 && ispeed>6) {
                        if(zcs == -1){
                            row.children[13].textContent = "Tower?/Cav &above";
                        }
                        else{
                            row.children[13].textContent = "Cav "+speeeed[zcs]+"%";
                        }
                    }
                    if (ispeed<12 && ispeed>=8){
                        if(zss == -1 && zcs == -1){
                            row.children[13].textContent = "Tower?/Scout &above";
                        }
                        if(zss == -1 && zcs != -1){
                            row.children[13].textContent = "Cav "+speeeed[zcs]+"%";
                        }
                        if(zss != -1 && zcs == -1){
                            row.children[13].textContent = "Scout "+speeeed[zss]+"%";
                        }
                        if(zss != -1 && zcs != -1){
                            row.children[13].textContent = "Scout "+speeeed[zss]+"%"+"/"+"Cav "+speeeed[zcs]+"%";
                        }
                    }
                    if (ispeed==12){
                        row.children[13].textContent = "Navy 0%/Scout 60%/Cav 100%";
                    }
                    if (ispeed<=16 && ispeed>12) {
                        if(zss == -1 && zns == -1){
                            row.children[13].textContent = "Tower?/scout &above";
                        }
                        if(zss == -1 && zns != -1){
                            row.children[13].textContent = "Navy "+speeeed[zns]+"%";
                        }
                        if(zss != -1 && zns == -1){
                            row.children[13].textContent = "Scout "+speeeed[zss]+"%";
                        }
                        if(zss != -1 && zns != -1){
                            row.children[13].textContent = "Navy "+speeeed[zns]+"%"+"/"+"Scout "+speeeed[zss]+"%";
                        }
                    }
                    if (ispeed>16){
                        if(zns == -1){
                            row.children[13].textContent = "Tower?/Navy &above";
                        }
                        else
                        {
                            row.children[13].textContent = "Navy "+speeeed[zns]+"%";
                        }
                    }
                }
                else {
                    if(zns != -1){
                        row.children[13].textContent = "Navy "+speeeed[zns]+"%";
                    }
                    else{
                        row.children[13].textContent = "Tower?/Navy";
                    }
                }
            }
        }
    
})();
