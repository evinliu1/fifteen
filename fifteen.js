
var background = "";
var timeString = "";
var puzzleTimer;
var stepCount = 0;

var x = document.getElementById("myAudio"); 


function pictureSelect(elt) {
    'use strict';
    var url,
        imgCheck = confirm("Are you sure you want to select this picture as the background?");
    if (imgCheck === true) {
        url = elt.value;
        background = "url('" + url + "')";
    }
}
function goTo(elt) {
    'use strict';
    if (elt.id === "css") {
        window.open("http://jigsaw.w3.org/css-validator/");
    } else if (elt.id === "html") {
        window.open("https://validator.w3.org/");
    }
}
function shuffle(a) {
    var j;
    var x;
    var i;
    var k;
    var check = true;
    var invention;
    while(check){
        invention = 0;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        for (i = 0; i < a.length; i++) {
            root = a[i];
            for (k = 1; k < a.length; k++) { 
                if (a[k] < root) {
                    invention++;
                }
            }
        }
        if (invention % 2 === 0){
            check = false;
        }
    }
}

function generateArray(size){
    var i;
    var arr = [];
    if(size == 4){
        for(i = 1; i<(4*4);i++){
            arr.push(i);
        }
    }
    else if(size == 6){
        for(i = 1; i < (6*6); i++){
            arr.push(i);
        }
    }
    else if(size == 8){
        for(i = 1; i < (8*8); i++){
            arr.push(i)
        }
    }
    return arr;
}

var instantCheck = false;
function onRestart(c){
    var count = 0;
    document.getElementById("tableDiv").style.color="black";
    var selected = document.getElementById("dem").selectedIndex;
    var size;
    if(selected == 0){
        size = 4;
    }
    else if(selected == 1){
        size = 6;
    }
    else if(selected == 2){
        size = 8;
    }
    var array = generateArray(size);
    if(c == -1){
        var randomNum = Math.floor((Math.random() * 4) + 0);
        if(randomNum == 0){
            background = "url('background.jpg')";
        }
        else{
            background = "url('background"+randomNum+".jpg')";
        }   
    }
    if(c == -3){
        shuffle(array);
    }
    document.getElementById("tableDiv").innerHTML="";                    
    var area = document.getElementById("tableDiv");
    var table = document.createElement('table');
    table.id ="table";
    var i;
    var j;
    for(i =0; i<size;i++){
        var tr = document.createElement('tr');
        for(j=0;j<size;j++){
            var num =""+array[count++];
            if(count != (size*size)){
                var text = document.createTextNode(num);
            }
            else{
                var text = document.createTextNode("");
            }
            var td = document.createElement('td');
            newR = i+1;
            newC = j+1;
            td.id = "r"+newR+"c"+newC;
            if(background == "url('background3.jpg')"){
                td.style.color = "white";
            }

            tr.appendChild(td);   
            td.appendChild(text);      
            td.setAttribute("onclick","test(this)");
            td.setAttribute("onmouseover","hoverIn(this)");
            td.setAttribute("onmouseout" , "hoverOut(this)");
        }
        table.appendChild(tr);
    } 
    area.appendChild(table);
    for(var i = 1;i<=size;i++){
        for(var j = 1;j<=size;j++){
            var id = "r"+i+"c"+j;
            var emptyOne = "r"+size+"c"+size;
            if(size == 4){
                if(id != emptyOne){
                    document.getElementById("tableDiv").style.width = "400px";
                    document.getElementById(id).style.backgroundImage = background;
                    var number = parseInt(document.getElementById(id).innerHTML);
                    if(number%size == 0 && number/size == 1){
                        var x = -300;
                        var y = 0;
                    }
                    else if(number%size == 0 && number/size == 2){
                        var x = -300;   
                        var y = -100;
                    }
                    else if(number%size == 0 && number/size == 3){
                        var x = -300;
                        var y = -200;
                    }
                    else{
                            var x = ((number%size)-1)*(-100);
                            var y = Math.floor(number/size)*(-100);    
                    }
                    document.getElementById(id).style.backgroundPosition = x+"px"+" "+y+"px";  
                }
                else{
                    document.getElementById(id).style.backgroundImage = "";
                }
            }
            else if(size == 6){
                if(id != emptyOne){
                    document.getElementById("tableDiv").style.width = "600px";
                    document.getElementById(id).style.backgroundImage = background;
                    document.getElementById(id).style.backgroundSize = "600px 600px"
                    var number = parseInt(document.getElementById(id).innerHTML);
                    if(number%size == 0 && number/size == 1){
                        var x = -500;
                        var y = 0;
                    }
                    else if(number%size == 0 && number/size == 2){
                        var x = -500;   
                        var y = -100;
                    }
                    else if(number%size == 0 && number/size == 3){
                        var x = -500;
                        var y = -200;
                    }
                    else if(number%size == 0 && number/size == 4){
                        var x = -500;
                        var y = -300;
                    }
                    else if(number%size == 0 && number/size == 5){
                        var x = -500;
                        var y = -400;
                    }
                    else{
                            var x = ((number%size)-1)*(-100);
                            var y = Math.floor(number/size)*(-100);    
                    }
                    document.getElementById(id).style.backgroundPosition = x+"px"+" "+y+"px";  
                }
                else{
                    document.getElementById(id).style.backgroundImage = "";
                }
            }
            else if(size == 8){
                if(id != emptyOne){
                    document.getElementById("tableDiv").style.width = "800px";
                    document.getElementById(id).style.backgroundImage = background;
                    document.getElementById(id).style.backgroundSize = "800px 800px"
                    var number = parseInt(document.getElementById(id).innerHTML);
                    if(number%size == 0 && number/size == 1){
                        var x = -700;
                        var y = 0;
                    }
                    else if(number%size == 0 && number/size == 2){
                        var x = -700;   
                        var y = -100;
                    }
                    else if(number%size == 0 && number/size == 3){
                        var x = -700;
                        var y = -200;
                    }
                    else if(number%size == 0 && number/size == 4){
                        var x = -700;
                        var y = -300;
                    }
                    else if(number%size == 0 && number/size == 5){
                        var x = -700;
                        var y = -400;
                    }
                    else if(number%size == 0 && number/size == 5){
                        var x = -700;
                        var y = -500;
                    }
                    else if(number%size == 0 && number/size == 5){
                        var x = -700;
                        var y = -600;
                    }
                    else{
                            var x = ((number%size)-1)*(-100);
                            var y = Math.floor(number/size)*(-100);    
                    }
                    document.getElementById(id).style.backgroundPosition = x+"px"+" "+y+"px";  
                }
                else{
                    document.getElementById(id).style.backgroundImage = "";
                }
            }
        }
    }
}
function test(elt){
    var table = document.getElementById("table");
    var size = document.getElementById("table").rows.length;
    var thisID = elt.id;
    var thisR = thisID.substring(1,2);
    var thisC = thisID.substring(3,4);
    var emptyID;
    for(i=0;i<size;i++){
            for(j=0;j<size;j++){
                if(table.rows[i].cells[j].innerHTML == ""){
                    var newR = i+1;
                    var newC = j+1;
                    emptyID = "r"+newR+"c"+newC;
                }
            }
    }
    var emptyCell = document.getElementById(emptyID);
    var down = parseInt(thisR)+1;
    var downID = "r"+down+"c"+thisC;
    var up = parseInt(thisR)-1;
    var upID = "r"+up+"c"+thisC;
    var left = parseInt(thisC)-1;
    var leftID = "r"+thisR+"c"+left;
    var right = parseInt(thisC)+1;
    var rightID = "r"+thisR+"c"+right;
    if(emptyID == downID || emptyID == upID || emptyID == leftID || emptyID == rightID){
        if(emptyID == downID){
            var temp = elt.innerHTML;
            emptyCell.innerHTML = temp;
            emptyCell.style.backgroundImage = background;
            emptyCell.style.backgroundPosition = elt.style.backgroundPosition
            elt.innerHTML ="";
            elt.style.backgroundImage = "";
            stepCount++;
        }
        if(emptyID == upID){
            var temp = elt.innerHTML;
            emptyCell.innerHTML = temp;
            emptyCell.style.backgroundImage = background;
            emptyCell.style.backgroundPosition = elt.style.backgroundPosition
            elt.innerHTML ="";
            elt.style.backgroundImage = "";
            stepCount++;
        }
        if(emptyID == leftID){
            var temp = elt.innerHTML;
            emptyCell.innerHTML = temp;
            emptyCell.style.backgroundImage = background;
            emptyCell.style.backgroundPosition = elt.style.backgroundPosition
            elt.innerHTML ="";
            elt.style.backgroundImage = "";
            stepCount;
        }
        if(emptyID == rightID){
            var temp = elt.innerHTML;
            emptyCell.innerHTML = temp;
            emptyCell.style.backgroundImage = background;
            emptyCell.style.backgroundPosition = elt.style.backgroundPosition
            elt.innerHTML ="";
            elt.style.backgroundImage = "";
            stepCount;
        }
    }
    check();
}
function check(){
    var table = document.getElementById("table");
    var size = table.rows.length;
    var arrInput = [];
    var arrCheck = [];
    var ck = true;
    for(var i = 0; i <size; i++)
    {   
           
        for(var j = 0; j <size; j++)
        {
                
            y = table.rows[i].cells[j].innerHTML;
            if(y != ""){
                arrInput.push(y);
            }
            else {
                arrInput.push(""+0);
            }
            
        }
    }
    for(var i = 1; i<(size*size); i++)
    {   
        arrCheck.push(""+i);
        
    }
    arrCheck.push(""+0);
    for(var i = 0; i< arrInput.length;i++){
        if(arrCheck[i]!=arrInput[i]){
            ck = false;
        }
    }
    if(ck == true){
        document.getElementById("tableDiv").innerHTML = "Congrats, you have solved the puzzle. You have used "+ timeString + " to complete this puzzle with "+ stepCount +" moves."; 
        document.getElementById("tableDiv").style.color="white";
        clearInterval(puzzleTimer);
    }
}
function hoverIn(elt){
    var table = document.getElementById("table");
    var size = document.getElementById("table").rows.length;
    var thisID = elt.id;
    var thisR = thisID.substring(1,2);
    var thisC = thisID.substring(3,4);
    var emptyID;
    for(i=0;i<size;i++){
            for(j=0;j<size;j++){
                if(table.rows[i].cells[j].innerHTML == ""){
                    var newR = i+1;
                    var newC = j+1;
                    emptyID = "r"+newR+"c"+newC;
                }
            }
    }
    var emptyCell = document.getElementById(emptyID);
    var down = parseInt(thisR)+1;
    var downID = "r"+down+"c"+thisC;
    var up = parseInt(thisR)-1;
    var upID = "r"+up+"c"+thisC;
    var left = parseInt(thisC)-1;
    var leftID = "r"+thisR+"c"+left;
    var right = parseInt(thisC)+1;
    var rightID = "r"+thisR+"c"+right;
    if(emptyID == downID || emptyID == upID || emptyID == leftID || emptyID == rightID){
    elt.style.borderColor = "red";
    elt.style.textDecoration = "underline";
    elt.style.color = "green";
    }
}
function hoverOut(elt){
    elt.style.borderColor = "black";
    elt.style.textDecoration = "none";
    if(background == "url('background3.jpg')"){
        elt.style.color = "white";
    }
    else{
        elt.style.color = "white";
    }
}
function timer(){
    var timer = document.getElementById("timer");
    var mins = Math.floor(time/60);
    var seconds = time%60;
    time++;
    timeString =mins+" minutes "+seconds +" seconds";
    timer.innerHTML = "Timer: "+mins+" minutes "+seconds +" seconds";
}
function timerStart(){
    time = 0;
    clearInterval(puzzleTimer);
    puzzleTimer = setInterval(timer,1000);
}
function finish1(){
        document.getElementById("tableDiv").style.color="white";
        document.getElementById("tableDiv").innerHTML = "Better luck next time!"; 
}