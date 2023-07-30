
window.addEventListener('DOMContentLoaded', (event) => {
  //  weather2();
});

// Set up variables for your location and the marquee
const lat=35.61;const lon=-105.22;
var {headline,description,instruction}="";
const loc='https://api.weather.gov/alerts/active?point=' + lat + ',' + lon ;

var alertIncr=0; var colorOfAlert;
/*async function weather2()
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

    
}*/

//document.getElementById("weathertxt").innerHTML="No active alerts for your location";



const marquee = document.getElementById("marquee");

// Set up the URL for the API call

// Set up a function to fetch the data and display the alerts
const getAlerts = async () => {
  try {
    const response = await fetch(loc);
    const data = await response.json();
    const alerts = data.features;

    // Check if there are any alerts for the location
    if (alerts.length > 0) {
      // Build the HTML for the alerts marquee
      let alertText = "";
      alerts.forEach(alert => {
        alertText += `Alert: ${alert.properties.headline}  |  `;
      });
      marquee.innerHTML = alertText;
      marquee.style.width = `${alertText.length * 10}px`; // Set the width based on the length of the text
      marquee.setAttribute("scrollamount", "3"); // Set the scroll speed to 3 pixels per second
    } else {
      // Clear the marquee if there are no alerts
      marquee.innerHTML = "";
      marquee.style.width = "0"; // Set the width back to 0 to hide the marquee
    }
  } catch (error) {
   // console.error(error);
  }
};

// Call the function to display the alerts initially
getAlerts();

// Set up an interval to update the alerts every 5 minutes
setInterval(getAlerts, 5 * 60 * 1000);