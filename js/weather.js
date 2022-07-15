
window.addEventListener('DOMContentLoaded', (event) => {
    weather2();
});

const lat=37.6;const lon=-114.5;
var {headline,description,instruction}="";
const loc='https://api.weather.gov/alerts/active?point=' + lat + ',' + lon ;

async function weather2()
{
const resp=await fetch (loc);
const data = await resp.json();
 data.features.forEach(product => {
  headline=product.properties.headline;
  description=product.properties.description;
  instruction=product.properties.instruction;
      document.getElementById("weathertxt").innerHTML=headline + 
  " " + description + 
  " " + instruction + " ";
  whatAlert(product.properties);
 });

    
}

//document.getElementById("weathertxt").innerHTML="No active alerts for your location";



