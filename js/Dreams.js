﻿document.getElementById("btnGraph").disabled = true;
//document.getElementById("btnLoad").disabled = true;
var coloor;
var colorarray;
var myBarChart;
var ctx = document.getElementById("myChart");

function getRandomColor() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );

  ////colorarray = [];
  ////var letters = "0123456789ABCDEF".split("");
  ////var color = "#";
  // for (var cF = 0; cF < Object.keys(this).length; cF++)
  //{

  ////for (var i = 0; i < 6; i++) {
  ////    color += letters[Math.floor(Math.random() * 16)];
  ////}
  // colorarray[cF] = color;
  //color = "#";
  // return color;
  // }
  //// return color;
}
var x = 0;

function TotalTags() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: AllTimes,
      //labels: "",
      hidden: true,
      // backgroundColor:,
      responsive: true,
      bezierCurve: false,
      animation: false,
      spanGaps: true, // enable for all datasets

      tension: 0,

      datasets: []
    },
    options: {
      spanGaps: true,
      responsive: true,
      bezierCurve: false,
      plugins: {
        zoom: {
          limits: {
            y: { min: 0 }
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              ////enabled: true
            }
          }
        }
      },
      elements: {
        hidden: true,
        point: {
          radius: 0
        }
      },
      fill: true,
      animation: false,
      spanGaps: true, // enable for all datasets

      tension: 0,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
              //reverse: true
            }
          }
        ]
      }
    }
  });

  var model = {
    2015: [20, 12, 32, 8, 25, 14, 20, 12, 32, 8, 25, 14],
    2016: [17, 26, 21, 41, 8, 23, 17, 26, 21, 41, 8, 23],
    2017: [23, 15, 8, 24, 38, 20, 23, 15, 8, 24, 38, 20]
  };

  for (en in hold) {
    //hold[c].reverse();
    coloor = getRandomColor();
    var newDataset = {
      label: en,
      data: [],
      borderColor: coloor,
      backgroundColor: coloor,
      //backgroundColor:
      hidden: true
    };
    // var c = 0;
    for (var c = 0; c < hold[en].length; c++) {
      ////console.log(c);
      newDataset.data.splice(c, 0, hold[en][c]);
    }
    for (value in hold[en]) {
      //newDataset.data[c] = 0;
      //  newDataset.data[c].push(hold[en][value]);
      //////  newDataset.data.splice(value, 0, hold[en][value]);
      // c++;
    }
    // newDataset.data.shift();
    myChart.data.datasets.push(newDataset);
    //myChart.getDatasetMeta(hold[c]).hidden = true;
    //  myChart.update();
  }
  //myChart.getDatasetMeta(hold[c]).hidden = true;

  myChart.update();
}
var AllTimes = [];
var AllTags = [];
var alltagstimes = [,];

function loadFile() {
  var input, file, fr;

  if (typeof window.FileReader !== "function") {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById("fileinput");
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  } else if (!input.files) {
    alert(
      "This browser doesn't seem to support the `files` property of file inputs."
    );
  } else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  } else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }
  document.getElementById("btnLoad").disabled = false;
  var newArr = [];
  // var AllTags = [];
  // var AllTimes = [];
  var strOtxt,
    numLoo = 0,
    maStr = "";

  function receivedText(e) {
    let lines = e.target.result;
    newArr = JSON.parse(lines);
    // var AllTags = [];
    //var AllTimes = [];
    //var alltagstimes = [,];

    /*
    var startDate = new Date("2013-07-10");
var endDate = new Date("2013-07-10");

for(i = 0; i < arrayDates.length; i++){
if(arrayDates[i] >= startDate &&   arrayDates[i] <= endDate) {
   alert('Yes');
 }
}
    */
    for (var i = 0; i < newArr.length; i++) {
      AllTags[i] = newArr[i].tags;
      AllTimes[i] = convertTime(newArr[i].timestamp);
      alltagstimes[(i, i)] = [newArr[i].tags, newArr[i].timestamp];
    }
    //return alltagstimes;
    ////////////////////////////////////countTags(alltagstimes);
    countTags(AllTags, AllTimes);
  }
}
var BrTagCounter;
var TagCounter;
var LoTag;
var tagNtime;
var currtag = "";
var test = [,];
var hold = {};
var counter = 0;

function countTags(tags, times) {
  for (var bug = 0; bug < 1; bug++) {
    BrTagCounter = {};
    TagCounter = {};
    LoTag = [];
    /*
  tagNtime = {
    time: "",
    tags4time: []
  };
  */
    tags.reverse();
    AllTimes.reverse();

    //tagsNtime[""] = {};
    var BTagCount = 0;
    // var time = "";
    //loop  breaks tags
    //tagNtime.length = tagsNtimes.length;
    for (var i = 0; i < tags.length; i++) {
      //tagNtime.push
      //tagNtime.push("k");
      //tagNtime.time[i] = tagsNtimes[i][1];
      //console.log(tagNtime.time);
      //tagNtime.time = tagsNtimes[i][1];
    }

    for (var z = 0; z < tags.length; z++) {
      //for (let ent in tagsNtimes[z]) //{
      //  }
      var arr = tags[z];
      //hold.arr = [];

      //sets all entries[z] with no tags to its previous value z
      if (arr.length == 0) {
        for (var emp in hold) {
          hold[emp][z] = hold[emp][z - 1];
        }
      }

      for (var i = 0, j = arr.length; i < j; i++) {
        currtag = arr[i];
        // hold[arr[i]][z]=0;
        //  hold[arr[i]][z] = "" ;

        //      hold.arr[i] = [];
        if (hold[arr[i]]) {
          TagCounter[arr[i]]++;
          //hold[z[arr[i]]]++;
          //  hold[arr[i]][z] = hold[arr[i]][z - 1];
          hold[arr[i]][z] = 0;
          hold[arr[i]][z] = hold[arr[i]][z - 1] + 1;
        }
        if (!hold[arr[i]]) {
          counter++;
          TagCounter[arr[z]] = 1;
          //hold[z].currtag = 1;
          hold[arr[i]] = [];
          hold[arr[i]][z] = 1;

          // hold.z[arr[i]] = 1;
        }

        for (var nou in hold) {
          if (hold[nou][z] === undefined) {
            hold[nou][z] = hold[nou][z - 1];
          }
        }

        //      console.log(hold["Amarai"][z]);
        //TotalTags();
        /// BrTagCounter[times[z]]= TagCounter[LoTag[z]]
        //add function to graph all tags at ind ex z
        // console.log(hold["Emily"]);
        //TotalTags();
      }
    }
    //console.log(hold["CLSV"]);
    //console.log(AllTimes);
    //TotalTags();

    //going through completed hold object to set all entry arrrays that have indecies that don't exist yet to empty(null.not empty. not undefined. null.it has to be null)
    for (var logs in hold) {
      //hold[logs].reverse();
      for (var entr in logs) {
        if (!hold[logs][entr]) {
          //hold[logs][entr] = 0;
        }
      }
    }

    //hold.reverse();
    console.log(hold["Casey"]);
    console.log(hold["Emily"]);
    console.log(hold["Charissa"]);

    alert("Done " + bug);
  }

  document.getElementById("btnGraph").disabled = false;
}

function convertTime(epoch) {
  //getting milliseconds from epoch
  var time = new Date(epoch * 1000);
  return time.toLocaleString();
}
/*
var arrayDates = [];

arrayDates.push(new Date(2013, 7, 26));
arrayDates.push(new Date(2013, 7, 27));
*/
