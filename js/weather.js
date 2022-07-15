
window.addEventListener('DOMContentLoaded', (event) => {
    weather2();
});

const lat=32.7920;const lon= -115.5631;
var {headline,description,instruction}="";
const loc='https://api.weather.gov/alerts/active?point=' + lat + ',' + lon ;

async function weather2()
{
const resp=await fetch (loc);
const data = await resp.json();
headline=data.features[0].properties.headline;
description=data.features[0].properties.description;
instruction=data.features[0].properties.instruction;
document.getElementById("weathertxt").innerHTML=headline + 
" " + description + 
" " + instruction + " ";
}
