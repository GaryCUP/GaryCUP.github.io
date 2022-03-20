/**
 * Day/Night Gradient Cycle
 */

//const SunCalc = require("../js/suncalc");

//const SunCalc = require("../js/suncalc");

var yourLat=0;
var yourLong=0;

// Get the current hour; JS runs on the 24-hour clock
var hour = new Date().getHours();

// Assign the element #sky to an easy-to-use variable
var sky  = document.querySelector("#body");

/**
 * Now we'll create objects for each block of time, and store
 * them in an array. Then define a CSS class for each timeBlock.
 * We have to define night twice because the clock doesn't know
 * how to wrap around from 21:00 to 5:00. This could be accounted
 * for with some math, but I don't feel like it.
 */

//note:eventually, make times of sun position based on user location
navigator.geolocation.getCurrentPosition(function(position) {
   yourLat = position.coords.latitude;
   yourLong = position.coords.longitude;
});

var yourLocalSunTimes=SunCalc.getTimes(new Date(),yourLat,yourLong);
var timeBlocks = [
  { // Night starts at 9pm/21:00 and ends at 11pm/24:00
    //start: SunCalc.getTimes(),
   // start: suncalc.getTimes(new Date(),41,-80) ,
    //start: SunCalc.getTimes(new Date(),41,-80).night,
    start: yourLocalSunTimes.night,
    
    //start: SunCalc.getTimes() ,
    end:   yourLocalSunTimes.nightEnd,
    
    class: "night",
  },
  { // Dawn starts at 6am/6:00 and ends at 10am/10:00
    start: yourLocalSunTimes.dawn,
    end:   yourLocalSunTimes.sunriseEnd,
    class: "dawn",
  },
  { // Day starts at 11am/11:00 and ends at 4pm/16:00
    start: yourLocalSunTimes.sunriseEnd,
    end:   yourLocalSunTimes.dusk,
    class: "day",
  },
  { // Dusk starts at 5pm/17:00 and ends at 8pm/20:00
    start: yourLocalSunTimes.dusk,
    end:   yourLocalSunTimes.nauticalDusk,
    class: "dusk",
  }
]

