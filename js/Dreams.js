const elem = document.getElementById('range');
const dateRangePicker = new DateRangePicker(elem, {
  format: 'mm-dd-yyyy'
});



//document.getElementById("btnGraph").disabled = true;
document.getElementById("btnDreamFreq").disabled = true;

var coloor;
var colorarray;
var myBarChart;
var numOfDreams;
var totalDaysInDreamRange;
var startDreamDate;
var endDreamDate;
var rateOfRememberence;
var numDreamsToMake;
var numTagsToMake = 7;
var selectedTags;
var shuffledTags;
//local dream vars
var indRateOfOcc;
var indNumOfDream;
var indStartDreamDate;
var indEndDreamDate;
var junkcount = Math.floor(Date.now() / 1000);//current time in seconds
var theOneSelected;
/////////////////////////////
var ctx = document.getElementById("myChart");
var holder = [];
var DreamFile = {};
DreamFileTags = [];
//DreamFile.timestamp="";
function DownloadJSON() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(holder));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "dreamit.json");
  dlAnchorElem.click();
}

function makeADreams() {
  for (var x = 0; x < 1000; x++) {
    junkcount -= Math.floor(Math.random() * (432000 - 86400 + 1)) + 86400; //60000;
    shuffledTags = listoffauxtags.sort(function () { return .5 - Math.random() });
    selectedTags = shuffledTags.slice(0, numTagsToMake - 1);
    const TnadT = Object.create(DreamFile);
    TnadT.timestamp = junkcount,
      TnadT.tags = selectedTags.slice(0);
    holder.push(TnadT);

  }
  alert("Done making file");
}
//var shuffledTags = listoffauxtags.sort(function(){return .5 - Math.random()});

//var selectedTags=shuffledTags.slice(0,numTagsToMake);

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
    .5 +
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

//normal 
function createChart(dataSelection, datasetSelection, ranked) {
  document.getElementById("rankedgraph").disabled = true;
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataSelection,
      responsive: false,
      bezierCurve: true,
      animation: true,
      spanGaps: true,
      tension: 0.5,
      datasets: []
    },
    options: {
      spanGaps: true,
      maintainAspectRatio: false,
      responsive: false,
      bezierCurve: true,
      scales: {
        y: {
          reverse: ranked
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            usePointStyle: true
          },
          position: 'top'
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        zoom: {
          limits: {
            y: { min: 1 }
          }
        }
      },
      elements: {
        point: {
          radius: 1
        }
      },
      animation: false,
      spanGaps: true,
      tension: 0.5,
      scales: {
        y: {
          reverse: document.getElementById("rankedgraph").checked
        }
      }
    }
  });

  for (var en in datasetSelection) {
    var color = getRandomColor();
    var newDataset = {
      label: en,
      data: datasetSelection[en],
      borderColor: color,
      backgroundColor: color,
      hidden: true,
      tension: 0.5
    };
    myChart.data.datasets.push(newDataset);
  }

  myChart.update();
}


function getDataSelection() {
  return document.getElementById("useRangedDreamDates").checked ? AllTimesR : AllTimes;
}

function getDataset(datasetName, ranked) {
  var datasetMap = {
    "TotalTags": ranked ? holdR : hold,
    "TotalTagsSMA": ranked ? matharrayR : matharray,
    "TotalTagsPercentOfTotal": ranked ? percentHeldR : percentHeld
  };
  return datasetMap[datasetName];
}

function displayGraph(datasetName) {
  var dataSelection = getDataSelection();
  var ranked = document.getElementById("rankedgraph").checked;
  var datasetSelection = getDataset(datasetName, ranked);
  createChart(dataSelection, datasetSelection, ranked);
}
function TotalTags() {
  displayGraph("TotalTags");
}

function TotalTagsSMA() {
  displayGraph("TotalTagsSMA");
}

function TotalTagsPercentOfTotal() {
  displayGraph("TotalTagsPercentOfTotal");
}



var AllTimes = [];
var AllTags = [];
var AllTimesR = [];
var AllTagsR = [];
var alltagstimes = [,];
var u = 0;


function loadFile() {
  const dreamStartRanged = new Date(document.getElementById("startDream").value);
  const dreamEndRanged = new Date(document.getElementById("endDream").value);
  document.getElementById("startDream").disabled = true;
  document.getElementById("endDream").disabled = true;
  document.getElementById("useRangedDreamDates").disabled = true;
  document.getElementById("useFulldDreamDates").disabled = true;



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
  var newArrR = [];
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




    for (var i = 0; i < newArr.length; i++) {
      AllTags[i] = newArr[i].tags;
      AllTimes[i] = convertTime(newArr[i].timestamp);
      alltagstimes[(i, i)] = [newArr[i].tags, newArr[i].timestamp];
      if (Date.parse(AllTimes[i]) >= dreamStartRanged && Date.parse(AllTimes[i]) <= dreamEndRanged) {
        AllTagsR[u] = newArr[i].tags;
        AllTimesR[u] = convertTime(newArr[i].timestamp);
        u++;

      }


    }
    //return alltagstimes;
    ////////////////////////////////////countTags(alltagstimes);


    //// rateOfRememberence=(Math.round(((numOfDreams/totalDaysInDreamRange)+Number.EPSILON)*100)/1000)*100;
    //rateOfRememberence*=100;



    function calculateDreamData(AllTimes, AllTags) {
  const startDreamDate = AllTimes[AllTimes.length - 1];
  const endDreamDate = AllTimes[0] || new Date();
  const numOfDreams = AllTimes.length;
  const realStartDreamTime = new Date(startDreamDate);
  const realEndDreamTime = new Date(endDreamDate);
  const aDayIs = 1000 * 60 * 60 * 24;
  const diffTimes = realEndDreamTime - realStartDreamTime;
  let totalDaysInDreamRange = Math.round(diffTimes / aDayIs);
  console.log("There are " + totalDaysInDreamRange + " days between the beginning and end of logs");
  let rateOfRememberence = (numOfDreams / totalDaysInDreamRange) * 100;
  document.getElementById("DreamRemRate").innerHTML = ("Dream Rememberance Rate is ≈ " + rateOfRememberence + "%");

  countTags(AllTags, AllTimes);
}

if (document.getElementById("useRangedDreamDates").checked) {
  calculateDreamData(AllTimesR, AllTagsR);
} else {
  calculateDreamData(AllTimes, AllTags);
}



  }


}
var barDream = {}; var indBarDream = [];
var BrTagCounter;
var TagCounter;
var LoTag;
var tagNtime;
var currtag = "";
var test = [,];
var hold = {};
var counter = 0;
var holdings = [];
var holdR = {};
var matharrayR = {};
var percentHeldR = {};
var bloop = {};
var bloopMain = {};
var bloopArray = [];
var matharray = {};
var percentHeld = {};
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
    times.reverse();

    //tagsNtime[""] = {};
    var BTagCount = 0;
    // var time = "";
    //loop  breaks tags
    //tagNtime.length = tagsNtimes.length;
    for (var v = 0; v < tags.length; v++) {
      var aa = tags[v]; var tt = times[v];
      aa.forEach(function (w) {
        if (!bloopMain[w]) {
          bloopMain[w] = 0;


        }
        bloopMain[w] += 1;
        var newBloop = jQuery.extend(true, {}, bloopMain);
        bloopArray.push(newBloop);
        // bloop[tt] = bloopMain;

        bloop[tt] = newBloop;
      });
    }
    for (var hope in bloop) {
      console.log(bloop[hope])
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
          //document.getElementById("RDRID").innerHTML+=("You have had " +   hold[arr[i]][z] + "  dreams about " + hold[arr][i] )  ;
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

      

      }
    
    }
    for (var key in hold) {
      ///holdings.push(hold[key]);
      if (hold[key]) {
        holdings.push((hold[key]));
      }


    }

    holdings.sort(function (a, b) {
      return b[0] - a[0];
    });

    //console.log(hold["CLSV"]);
    //console.log(AllTimes);
    //TotalTags();
    var localDreamStart;
    var n = 0;
    ////var myWindow = window.open("", "MsgWindow", "width=300,height=300");
   
    //res=result of dreams
    //resR=ranked result of dreams
    var res; var ranks; var resR = [];
    //avg rank 
    var ranksAvg; var reaRAvg = [];
    var q = holdings[0].length;

for (let n = 0; n < holdings[0].length; n++) {
  let res = holdings.map(r => r[n]);
  res = res.filter(element => element !== undefined);
  const ranks = rankDuplicate(res);
  console.log(ranks);
  resR[n] = ranks;
}

    // console.log(res);
    var p = 0;
    for (const oo in hold) {
  holdR[oo] = resR.map(r => r[p]);
  p++;

  const arr = hold[oo];
  const initIndex = arr.findIndex(element => element !== undefined);
  const result = arr.map((value, i) => {
    if (value === undefined) return undefined;
    const o = new Date(times[initIndex]).getTime();
    const nw = new Date(times[i]).getTime();
    return timebetweendates(o, nw) / value;
  });

  matharray[oo] = result;
  console.log(matharray);

  const percent = arr.map((value, i) => {
    if (value === undefined) return undefined;
    return (value / (i + 1)) * 100;
  });

  percentHeld[oo] = percent;
  
}


    alert("Done! " + numOfDreams + " Dreams logged across " + totalDaysInDreamRange + " days.");
    console.log("RANK? ");
    console.log(holdR);
    console.log(matharrayR);
    //alert(document.getElementById("startDream").value);
  }

  document.getElementById("btnGraphNormal").disabled = false;
  document.getElementById("btnGraphPercentOfTotal").disabled = false;
  document.getElementById("btnGraphSMA").disabled = false;
}

function TotalTagsDreamList() {
  
}

function TotalTagsSMADreamList() {
  
}

function TotalTagsPercentOfTotalDreamList() {
  
}


function rankDuplicate(arr) {
  const sorted = [...new Set(arr)].slice().sort((a, b) => b - a);
  const rank = new Map(sorted.map((x, i) => [x, i + 1]));
  return arr.map((x) => rank.get(x));
}



function convertTime(epoch) {
  //getting milliseconds from epoch
  var time = new Date(epoch * 1000);
  return time.toLocaleString();
}
function convertToEpoch(dT) {
  const theDT = new Date(dT);
  const toEpoch = theDT.getTime();
}
function timebetweendates(oldT, newT) {
  //var oldTime=new Date(oldT*1000);
  //var newTime=new Date(newT*1000);
  var timeElapsed = newT - oldT;
  console.log(timeElapsed / (1000 * 60 * 60 * 24));
  return (timeElapsed / (1000 * 60 * 60 * 24));
}
/*
var arrayDates = [];

arrayDates.push(new Date(2013, 7, 26));
arrayDates.push(new Date(2013, 7, 27));
*/


function TurnToCSV() {
  //const fs = require('fs');
  var sendToCSV = document.getElementById("useRangedDreamDates").checked ? hold : hold;
  console.log(sendToCSV);
  //fs.writeFile('dreamcsv.csv', sendToCSV);
  const makecsv = sendToCSV.map(row => row.join(",")).join("\n");

  var csvelem = document.getElementById('downloadAnchorElem');
  csvelem.setAttribute("href", makecsv);
  csvelem.setAttribute("download", "dreamcsv.csv");
  csvelem.click();
}