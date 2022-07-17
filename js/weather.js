
window.addEventListener('DOMContentLoaded', (event) => {
    weather2();
});

const lat=39.52;const lon=-119.81;
var {headline,description,instruction}="";
const loc='https://api.weather.gov/alerts/active?point=' + lat + ',' + lon ;

var alertIncr=0; var colorOfAlert;
async function weather2()
{
const resp=await fetch (loc);
const data = await resp.json();
 data.features.forEach(product => {
    colorOfAlert="";
  headline=product.properties.headline;
  description=product.properties.description;
  instruction=product.properties.instruction;
  //    document.getElementById("weathertxt").innerHTML=headline + 
 // " " + description + 
//  " " + instruction + " ";
whatAlert(product.properties);
  let div = document.createElement('div');
  div.className = 'marquee';
//div.classList.add('marquee');
var para = document.createElement("p");
     para.innerHTML=headline + 
        " " + description + 
        " " + instruction + " ";
div.appendChild(para);
document.body.appendChild(div);
document.getElementsByClassName("marquee")[alertIncr].style.backgroundColor=colorOfAlert;
alertIncr++;
  //document.getElementsByClassName("marquee")[0].style.backgroundColor="red";
 });

    
}

//document.getElementById("weathertxt").innerHTML="No active alerts for your location";



