/**
 * Day/Night Gradient Cycle
 */

//const SunCalc = require("../js/suncalc");

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
var timeBlocks = [
  { // Night starts at 9pm/21:00 and ends at 11pm/24:00
    start: 21,
    //start:SunCalc.getTimes(new Date(),0,0) ,
    end:   23,
    class: "night",
  },
  { // Night starts again at 12am/00:00 and ends at 5am/5:00
    start: 0,
    end:   5,
    class: "night",
  },
  { // Dawn starts at 6am/6:00 and ends at 10am/10:00
    start: 6,
    end:   10,
    class: "dawn",
  },
  { // Day starts at 11am/11:00 and ends at 4pm/16:00
    start: 11,
    end:   16,
    class: "day",
  },
  { // Dusk starts at 5pm/17:00 and ends at 8pm/20:00
    start: 17,
    end:   20,
    class: "dusk",
  }
]


/**
 * 1. Start by looping through the objects in the timeBlocks array
 * 2. Select the current timeBlock
 * 3. Check if the current hour is within each timeBlock
 * 4. If it is, add the relevant class to #sky
 */
 
for ( var i = 0; i < timeBlocks.length; i++ ) { /* 1 */
  var timeOfDay = timeBlocks[i]; /* 2 */
  
  if ( timeOfDay.start <= hour && hour <= timeOfDay.end ) { /* 3 */
    sky.addClass(timeOfDay.class); /* 4 */
    //sky.classList.add("timeOfDay.class");
  }
}
