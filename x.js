//window.onload = Alpha;
var lives;
var points=0;
var yourNum;
var round=1;
function Alpha() {
    document.getElementById("btnSubmitE").disabled=true;
    document.getElementById("btnSubmitM").disabled=true;
    document.getElementById("btnSubmitH").disabled=true;
    document.getElementById("yourNumE").disabled=true;
    document.getElementById("yourNumM").disabled=true;
    document.getElementById("yourNumH").disabled=true;


}
function startE() {
    alert("easy");
    document.getElementById("roundE").innerHTML=("Round: " + round);
    document.getElementById("btnStartE").disabled = true;
    document.getElementById("btnStartM").disabled = true;
    document.getElementById("btnStartH").disabled = true;
    document.getElementById("btnSubmitE").disabled=false;
    document.getElementById("yourNumE").disabled=false;



}

function startM(){
    alert("med");
    document.getElementById("btnStartM").disabled = true;
    document.getElementById("btnStartH").disabled = true;
    document.getElementById("btnStartE").disabled = true;
    document.getElementById("btnSubmitM").disabled=false;
    document.getElementById("yourNumM").disabled=false;



}

function startH(){
    alert("hard");
    document.getElementById("btnStartH").disabled = true;
    document.getElementById("btnStartE").disabled = true;
    document.getElementById("btnStartM").disabled = true;
    document.getElementById("btnSubmitH").disabled=false;
    document.getElementById("yourNumH").disabled=false;

}
function guessNumEasy() {
    document.getElementById("roundE").innerHTML=("Round: " + round);
    var theNum = Math.floor(Math.random() * 10);
    yourNum = parseInt(document.getElementById("yourNumE").value);
    //alert(yourNum);
   if(round>10){alert("Game Over!!"); document.getElementById("btnSubmitE").disabled=true; }

   if(points>=5000){
        alert("You Win!!!")
   }

   else
   {
         if (yourNum == theNum) {
           alert("YOU WIN!!!");
           points += 2000;
       } else if (Math.abs(yourNum - theNum) >= 1 && Math.abs(yourNum - theNum) < 4) {
             alert("YOU did well!!!");
           points += 1000;
           round++;
       } else if (Math.abs(yourNum - theNum) >= 4 && Math.abs(yourNum - theNum) < 7) {
           alert("YOU did ok!!!");
           points += 10;
           round++;
       } else {
          alert("YOU did awful!!!");
           points += 1;
           round++;
       }
       document.getElementById("scoreNumE").innerText = "The actual number was: " + theNum + "\n" +
           "Score: " + points;
       //document.getElementById("roundE").innerHTML = ("Round: " + round);

   }

   

}

function guessNumMed()
{
    //alert("s");
    var theNum=Math.floor(Math.random() * 100);
    yourNum=parseInt(document.getElementById("yourNumM").value);
    //alert(yourNum);
    if (isNaN(yourNum))
    {
        alert("Not a number");
        points-=10;
    }
    else if(yourNum==theNum)
    {
        alert("YOU WIN!!!");
        points+=10000;
    }

    else if(Math.abs(yourNum-theNum)>=1 && Math.abs(yourNum-theNum)<10)
    {
        alert("So Close!!!");
        points+=5000;
    }

    else if(Math.abs(yourNum-theNum)>=10 && Math.abs(yourNum-theNum)<24)
    {
        alert("YOU did well!!!");
        points+=2000;
    }

    else if(Math.abs(yourNum-theNum)>=25 && Math.abs(yourNum-theNum)<49)
    {
        alert("YOU did ok!!!");
        points+=1000;
    }


    else
    {
        alert("YOU did awful!!!");
        points+=10;
    }
    document.getElementById("scoreNumM").innerText="The actual number was: " + theNum + "\n" +
        "Score: " + points;
}
