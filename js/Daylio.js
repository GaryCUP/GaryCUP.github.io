const elem = document.getElementById('range');
const dateRangePicker = new DateRangePicker(elem, {
format:'yyyy-mm-dd'    
});



var colorarray;
var myBarChart;
var DaylioFileData;
var numOfRandActivities; // =Math.floor(Math.random() * 11);
var stringofRandActivities = "";
var randHH;
var randmm;
var theOneSelected;
var AC;
//var sma;
function makeCSV() {
    DaylioFileData = [];
    var numToMake = 2000;
    var setOfRandWeekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    //get random activity list
   
    function getThoseActivities() {
        
          stringofRandActivities = '"';
    numOfRandActivities = Math.floor(Math.random() * 11);
        for (var RandActs = 0; RandActs < numOfRandActivities-1; RandActs++) {    
            stringofRandActivities +=setOfRandActivities[Math.floor(Math.random() * setOfRandActivities.length)] + "|";
      
        }
        stringofRandActivities +=setOfRandActivities[Math.floor(Math.random() * setOfRandActivities.length)] + '"';
         return stringofRandActivities;
    }

    for (var looping = 0; looping < numToMake; looping++) {
        randHH = Math.floor(Math.random() * 24);
        randmm = Math.floor(Math.random() * 60);
        DaylioFileData.push([
            "1900-01-01",
            "October 31",
            setOfRandWeekdays[Math.floor(Math.random() * setOfRandWeekdays.length)],
            (randHH + ":" + randmm),
            setOfRandMoods[Math.floor(Math.random() * setOfRandMoods.length)],
            getThoseActivities(),
            "hello " + looping,
            ""
        ]);
    }
    //console.log(DaylioFileData);
    alert("finished");
}

//create a user-defined function to download CSV file
function DownloadDaylioFile() {
    //define the heading for each row of the data
    var csv = "full_date,date,weekday,time,mood,activities,note_title, note";
    //merge the data with CSV
    DaylioFileData.forEach(function(row) {
        csv += row.join(",");
        csv += "\r\n";
    });
    csv = csv.trim();
    //display the created CSV data on the web browser
    //document.write(csv);

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = "DaylioTest.csv";
    hiddenElement.click();
}

function getRandomColor() {
    colorarray = [];
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var cF = 0; cF < Object.keys(this).length; cF++) {
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colorarray[cF] = color;
        color = "#";
        // return color;
    }
    return colorarray;
}

function getRandomColour() {
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

// Event handlers
$("#update-data-from-file").change(function(e) {
    changeDataFromUpload(e, function(data) {
        //console.log(data);
    });
});
$("#update-data-from-field").click(function() {
    changeDataFromField(function(data) {
      //  console.log(data);
    });
});

function TotalActs() {
    var obj = {
        and: 2,
        two: 1,
        too: 1,
        mother: 2
    };
    countActs(AllActs);
    var ctx = document.getElementById("myChart");
    alert("you are here.");
    var data = {
        labels: [],
        datasets: [{
            label: "My dataset",
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            data: []
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var key in ActivityCounter) {
                if (ActivityCounter.hasOwnProperty(key)) {
                    data.labels.push("Activity: " + key);
                    data.datasets[0].data.push(ActivityCounter[key]);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

function EPWD() {
    var obj = {
        and: 2,
        two: 1,
        too: 1,
        mother: 2
    };
    countDOW(AllDOW);
    var ctx = document.getElementById("myChart");
    alert("you are here.");
    var data = {
        labels: [],
        datasets: [{
            label: "My dataset",
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            data: []
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var key in weekCounter) {
                if (weekCounter.hasOwnProperty(key)) {
                    data.labels.push("Day of Week: " + key);
                    data.datasets[0].data.push(weekCounter[key]);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

function EPHOD() {
    var obj = {
        and: 2,
        two: 1,
        too: 1,
        mother: 2
    };
    countTime(AllHOD);
    var ctx = document.getElementById("myChart");
    alert("you are here.");
    var data = {
        labels: [],
        datasets: [{
            label: "My dataset",
            //backgroundColor: 
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            data: []
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var key in hourCounter) {
                if (hourCounter.hasOwnProperty(key)) {
                    data.labels.push("Hour of Day: " + key);
                    data.datasets[0].data.push(hourCounter[key]);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

function TotalMoods() {
    countMoods(AllMoods);
    var ctx = document.getElementById("myChart");
    alert("you are here.");
    var data = {
        labels: [],
        datasets: [{
            label: "My dataset",
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            data: []
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var key in moodCounter) {
                if (moodCounter.hasOwnProperty(key)) {
                    data.labels.push("Mood: " + key);
                    data.datasets[0].data.push(moodCounter[key]);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

function TotalMoodRatings() {
    var obj = {
        and: 2,
        two: 1,
        too: 1,
        mother: 2
    };
    var ctx = document.getElementById("myChart");
    alert("you are mooddrat.");
    var data = {
        labels: [],
        datasets: [{
            label: "My dataset",
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            data: []
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var key in moodRatCounter) {
                if (moodRatCounter.hasOwnProperty(key)) {
                    data.labels.push("Mood Level: " + key);
                    data.datasets[0].data.push(moodRatCounter[key]);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: "pie",
        data: data
    });
}

// Parse pasted CSV
function changeDataFromField(cb) {
    var arr = [];
    $("#enter-data-field")
        .val()
        .replace(/\n/g, "^^^xyz")
        .split("^^^xyz")
        .forEach(function(d) {
            arr.push(d.replace(/\t/g, "^^^xyz").split("^^^xyz"));
        });
    cb(csvToJson(arr));
}

// Use the HTML5 File API to read the CSV
function changeDataFromUpload(evt, cb) {
    if (!browserSupportFileUpload()) {
        console.error("The File APIs are not fully supported in this browser!");
    } else {
        var data = null;
        var file = evt.target.files[0];
        var fileName = file.name;
        $("#filename").html(fileName);

        if (file !== "") {
            var reader = new FileReader();

            reader.onload = function(event) {
                var csvData = event.target.result;
                var parsed = Papa.parse(csvData);
                cb(csvToJson(parsed.data));
            };
            reader.onerror = function() {
                console.error("Unable to read " + file.fileName);
            };
        }

        reader.readAsText(file);
        $("#update-data-from-file")[0].value = "";
    }
}

// Method that checks that the browser supports the HTML5 File API
function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
    }
    return isCompatible;
}
var cc = 0;
var AllDOW = [];
var AllHOD = [];
var AllMoods = [];
var AllActs = [];
var AllMoodRate = [];
var arr = [];
var AllRoodRateofInts = [];
var AllDays = []
var AllLineActs=[];

var RaDOW = [];
var RaHOD = [];
var RaMoods = [];
var RaActs = [];
var RaMoodRate = [];
var Rarr = [];
var RaRoodRateofInts = [];
var RaDays = []
var RaLineActs=[];

//var MoodLevel = "";
// Parse the CSV input into JSON
var data;
var out = [];
var u=0;

function csvToJson(data) {
    const daylioStartRanged=new Date(document.getElementById("startDaylio").value);
const daylioEndRanged=new Date(document.getElementById("endDaylio").value);
    var cols = data[1];
    out = [];
/*
    data.forEach(function(e) {
        //MoodLevel = prompt("Mood for " + data.Mood);
        e["MoodLabRate"] = "";
    });
*/
    for (var i = 1; i < data.length; i++) {
        var obj = {};
        var row = data[i];
       
        
        cols.forEach(function(col, index) {
            obj[col] = row[index];
            //  obj["new column"] = ""

            ////////////////////
           //add mod rate
         obj.forEach(function(e){
        if (typeof e === "object" ){
          e["MoodLabRate"] = ""
        }
      });
            
            ////////
            cc++;
        });
        //
        if(document.getElementById("useRangedLogDates").checked)
        {
        if(Date.parse(data[i][0])>=daylioStartRanged && Date.parse(data[i][0])<=daylioEndRanged)
        {
            var DOW = data[i][2];

            //var HOD = data[i][3];
            var HOD = formatHour(moment((data[i][3]), 'HH:mm').format('HH'));
            var Mood = data[i][4];
            var Activities = data[i][5];
           
     
            var days = data[i][0] + " " + data[i][3];
            var MoodRate = data[i].MoodLabRate;
            AllDOW[u] = DOW;
            AllMoods[u] = Mood;
            //AllActs[u] = Activities;
            AllActs[u] = Activities;
            AllLineActs[u]=Activities.split("|").map(item => item.trim());
            AllHOD[u] = HOD;
            AllMoodRate[u] = MoodRate;
            AllDays[u] = days;
            AllRoodRateofInts[u] = parseInt(MoodRate);
            //RaMoods[u] = Mood;
            /*
            RaActs[u] = Activities;
            RaLineActs[u]=Activities.split("|").map(item => item.trim());
            RaHOD[u] = HOD;
            RaMoodRate[u] = MoodRate;
            RaDays[u] = days;
            RaRoodRateofInts[u] = parseInt(MoodRate);
            */
            u++;
        }
        out.push(obj);

    }
        
           

        ////////////////////////////////////////////UNBLOCK SOON/////////////////////////////////
    var daMood = data[i][4];
        if (data[i].MoodLabRate == "") {
            data[i].MoodLabRate = prompt("Mood for " + daMood);
            var daMoodRate = data[i].MoodLabRate;
            data.forEach(function(mr, m) {
                if (data[m][4] == daMood) {data[m].MoodLabRate = daMoodRate;}
            });
        }
     ///////////////////////////////////////UNBLOCK SOON//////////////////////////////////
      else{
          var DOW = data[i][2];

        //var HOD = data[i][3];
        var HOD = formatHour(moment((data[i][3]), 'HH:mm').format('HH'));
        var Mood = data[i][4];
        var Activities = data[i][5];
       
 
        var days = data[i][0] + " " + data[i][3];
        var MoodRate = data[i].MoodLabRate;
        AllDOW[i] = DOW;
        // AllHOD=New Date
        AllMoods[i] = Mood;
        AllActs[i] = Activities;
        AllLineActs[i]=Activities.split("|").map(item => item.trim());
        AllHOD[i] = HOD;
        AllMoodRate[i] = MoodRate;
        AllDays[i] = days;
        AllRoodRateofInts[i] = parseInt(MoodRate);
        out.push(obj);

      }
        
     
        //   arr = data[i].map(x => Object.assign({}, data[i], { "new column": "" }))
       
    }
    
    
    //countDOW(AllDOW);
    //countMoods(AllMoods);
    //countActs(AllActs);
    //countTime(AllHOD);
   // countMoodRates(AllMoodRate);//re-enable later
    //countMoodsLineGr(AllMoods);
    //countActsLineGr(AllLineActs);
    return out;
}


function actsInMoodLevel()
{
countMoodVActs(AllMoodRate,  AllLineActs)
   

}

var chrtDOW;
var chrtCtDOW;
var wordArray;
var weekCounter;

//
function countDOW(days) {
    weekCounter = {};
    for (var i = 1; i < days.length; i++) {
        if (weekCounter[days[i]]) {
            weekCounter[days[i]] += 1;
        } else {
            weekCounter[days[i]] = 1;
        }
    }
    // console.log(weekCounter[1]);
}

//
var MoodLevel;
var w = 0;

function countMoods(mooods) {
    moodCounter = {};
    MoodLevel = [];
    for (var x = 1; x < mooods.length; x++) {
        if (moodCounter[mooods[x]]) {
            moodCounter[mooods[x]] += 1;
        } else {
            moodCounter[mooods[x]] = 1;
        }
    }
    for (var ppp in moodCounter) {
        //  MoodLevel[w] = prompt("Mood for " + ppp);
    }
    //console.log(moodCounter[1]);
}

//
var BrActivityCounter;
var ActivityCounter;
var LoAct;

function countActs(acts) {
    BrActivityCounter = {};
    ActivityCounter = {};
    LoAct = [];
    var BActCount = 0;
    //loop  breaks pipes
    for (var i = 1; i < acts.length; i++) {
        $.each(acts[i].split(" | "), function(i, al) {
            LoAct[BActCount] = al;
            BActCount++;
        });
    }
    //BrActivityCounter[BActCount] = acts[i].split(/\|/);
    // LoAct[]=

    for (var z = 0; z < LoAct.length; z++) {
        if (ActivityCounter[LoAct[z]]) {
            ActivityCounter[LoAct[z]] += 1;
        } else {
            ActivityCounter[LoAct[z]] = 1;
        }
    }
}
var moodRatCounter;

function countMoodRates(moodRatings) {
    moodRatCounter = {};

    //MoodLevel = [];
    for (var mrc = 1; mrc < moodRatings.length; mrc++) {
        if (moodRatCounter[moodRatings[mrc]]) {
            moodRatCounter[moodRatings[mrc]] += 1;
        } else {
            moodRatCounter[moodRatings[mrc]] = 1;
        }
    }
}

var moodhold = {};

function countMoodsLineGr(moods4line) {
    moods4line.reverse();
    AllDays.reverse();
    for (var liner = 0; liner < moods4line.length; liner++) {
        var indMoodHold = moods4line[liner];
        //if(moodhold[indMoodHold[liner]]){}
        if (moodhold[moods4line[liner]]) {
            moodhold[moods4line[liner]][liner] = 0;
            moodhold[moods4line[liner]][liner] = moodhold[moods4line[liner]][liner - 1] + 1;
        } else {
            moodhold[moods4line[liner]] = [];
            moodhold[moods4line[liner]][liner] = 1;
        }

        for (var nou in moodhold) {
            if (moodhold[nou][liner] === undefined) {
                moodhold[nou][liner] = moodhold[nou][liner - 1];
            }
        }
    }
    alert("DONE ! " + Object.keys(moodhold).length + " different moods logged");

}

var actshold={};
function countActsLineGr(acts4line)
{
    acts4line.reverse();
    AllDays.reverse();
    for (var z = 0; z < acts4line.length-1; z++) {
      
        var arr = acts4line[z];
        //hold.arr = [];
  
        if (arr.length == 0) {
          for (var emp in actshold) {
            actshold[emp][z] = actshold[emp][z - 1];
          }
        }
  
        for (var i = 0, j = arr.length; i < j; i++) {
          currtag = arr[i];
          // hold[arr[i]][z]=0;
          //  hold[arr[i]][z] = "" ;
  
          //      hold.arr[i] = [];
          if (actshold[arr[i]]) {
          //  TagCounter[arr[i]]++;
            //hold[z[arr[i]]]++;
            //  hold[arr[i]][z] = hold[arr[i]][z - 1];
            actshold[arr[i]][z] = 0;
            actshold[arr[i]][z] = actshold[arr[i]][z - 1] + 1;
            //document.getElementById("RDRID").innerHTML+=("You have had " +   hold[arr[i]][z] + "  dreams about " + hold[arr][i] )  ;
          }
          if (!actshold[arr[i]]) {
           // counter++;
           // TagCounter[arr[z]] = 1;
            //hold[z].currtag = 1;
            actshold[arr[i]] = [];
            actshold[arr[i]][z] = 1;
  
            // hold.z[arr[i]] = 1;
          }
  
          for (var nou in actshold) {
            if (actshold[nou][z] === undefined) {
                actshold[nou][z] = actshold[nou][z - 1];
            }
          }
  
           
          //      console.log(hold["Amarai"][z]);
          //Totalacts4line();
          /// BrTagCounter[times[z]]= TagCounter[LoTag[z]]
          //add function to graph all acts4line at ind ex z
          // console.log(hold["Emily"]);
          //Totalacts4line();
        }
      }
      alert("DONE ! " + Object.keys(actshold).length + " different activities logged");
}

var currTime;
//var date;
var hour;
var hourCounter;

function countTime(hourz) {
    //currTime = moment().format("HH:MM");
    hourCounter = {};
    for (var h = 1; h < hourz.length; h++) {
        // currTime =moment([hourz[h]]).format("HH");
        //currTime=moment((hourz[h]),'HH:mm').format('HH');
        if (hourCounter[hourz[h]]) {
            hourCounter[hourz[h]] += 1;
        } else {
            hourCounter[hourz[h]] = 1;
        }
    }
    console.log(hourCounter);
}

//  use for mood level avg
function MoodRateRollingAverage() {
    var obj = {
        and: 2,
        two: 1,
        too: 1,
        mother: 2
    };
    var ctx = document.getElementById("myChart");
    var data = {
        labels: [],
        datasets: [{
            label: "My dataset",
            backgroundColor: 'rgb(214, 113, 82)',
            borderColor: 'rgb(113, 211, 1)',
            data: []
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var key in mooRA) {
                if (mooRA.hasOwnProperty(key)) {
                    data.labels.push(key);
                    data.datasets[0].data.push(mooRA[key]);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            fill: false,
            bezierCurve: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            elements: {
                hidden: true,
                point: {
                    radius: 0
                }
            }
        }
    });
}

function MoodAvg() {
    var totalMoodLev = 0;
    for (var tml = 1; tml < AllMoodRate.length; tml++) {
        totalMoodLev += parseInt(AllMoodRate[tml]);
    }
    // var avg = (totalMoodLev / AllMoodRate.length);
    var avgMoodL =
        Math.round((totalMoodLev / AllMoodRate.length + Number.EPSILON) * 100) /
        100;
    console.log("Average Mood Level is " + avgMoodL);
}
/*
var AllMoodRolling;
var movingAverage;
//var moAv = movingAverage(AllMoodRate);
function MoodRollingAvg() {
  const arr = [1, 2, 3, 4, 5];
  movingAverage = (AllMoodRolling = []) => {
    const res = [];
    let sum = 0;
    let count = 0;
    for (let i = 1; i < AllMoodRate.length; i++) {
      const el = AllMoodRate[i];
      sum += parseInt(el);
      count++;
      const curr = sum / count;
      res[i] = curr;
    }
    return res;
  };

  console.log(movingAverage(AllMoodRate));
}
*/

/*
//array that will hold all rolling averages
var AllMoodRolling;
//the avg for the last 7 entries, put in AllMoodRolling
var movingAverage;
var thelast7counter;
var start = 8;
var end = AllMoodRate.length;
//var moAv = movingAverage(AllMoodRate);
function MoodRollingAvvg() {
  AllMoodRolling = {};
  for (var mra = 1; mra < AllMoodRate.length; mra++) {
    //for (var loo = 1; loo < 8; loo++) {}
    for (var filler = 0; filler < 7; filler++) {
      movingAverage += parseInt(AllMoodRate[mra]);
      movingAverage =
        Math.round((movingAverage / 7 + Number.EPSILON) * 100) / 100;
    }
  }

  console.log(movingAverage(AllMoodRate));
}
*/

var mooRA;

function GetMoodRollingAvg(arr, range, format) {
    if (!Array.isArray(arr)) {
        throw TypeError('expected first argument to be an array');
    }

    var fn = typeof format === 'function' ? format : toFixed;
    var num = range || arr.length;
    var res = [];
    var len = arr.length + 1;
    var idx = num - 1;
    while (++idx < len) {
        res.push(fn(avg(arr, idx, num)));
    }
    return res;
}

function MoodRollingAvg() {

    mooRA = (sma(AllRoodRateofInts, 5, 5));

}

function TotalMoodsLG() {
    countMoodsLineGr(AllMoods);
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: AllDays,
            //labels: "",

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
            maintainAspectRatio: false,
            //responsive: false,
            bezierCurve: true,

            plugins: {
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true
                    },
                    position: 'top'

                },
                zoom: {
                    limits: {
                        y: {
                            min: 0
                        }
                    },
                    zoom: {
                        wheel: {
                            // enabled: true
                        },
                        pinch: {
                            ////enabled: true
                        }
                    }
                }
            },
            elements: {

                point: {
                    radius: 0
                }
            },
            //fill: true,
            animation: false,
            spanGaps: true, // enable for all datasets

            tension: 0,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                        //reverse: true
                    }
                }]
            }
        }
    });

    var model = {
        2015: [20, 12, 32, 8, 25, 14, 20, 12, 32, 8, 25, 14],
        2016: [17, 26, 21, 41, 8, 23, 17, 26, 21, 41, 8, 23],
        2017: [23, 15, 8, 24, 38, 20, 23, 15, 8, 24, 38, 20]
    };

    for (en in moodhold) {
        //hold[c].reverse();
        coloor = getRandomColour();
        var newDataset = {
            label: en,
            data: [],
            borderColor: coloor,
            backgroundColor: coloor,
            //backgroundColor:
            hidden: true,
            fill:false
        };
        // var c = 0;
        for (var c = 0; c < moodhold[en].length; c++) {
            ////console.log(c);
            newDataset.data.splice(c, 0, moodhold[en][c]);
        }
        for (value in moodhold[en]) {
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

var ActVMood={};
function countMoodVActs(AllMoods2Rate, AllActs2Rate)
{
 //console.log(AllMoodRate);
 AllMoods2Rate.reverse();
 AllActs2Rate.reverse();
 AllDays.reverse();
 console.log("LOL " + AllMoods2Rate);
 console.log("LOL " + AllActs2Rate);
 console.log("LOL " + AllDays);
 for (var z = 0; z < AllActs2Rate.length-1; z++) {
   
    var arrOActs = AllActs2Rate[z];
    //hold.arrOActs = [];

    if (arrOActs.length == 0) {
      for (var emp in actshold) {
        actshold[emp][z] = actshold[emp][z - 1];
      }
    }

    for (var i = 0, j = arrOActs.length; i < j; i++) {
      currtag = arrOActs[i];
      // hold[arrOActs[i]][z]=0;
      //  hold[arrOActs[i]][z] = "" ;

      //      hold.arrOActs[i] = [];
      if (ActVMood[arrOActs[i]]) {
      //  TagCounter[arrOActs[i]]++;
        //hold[z[arrOActs[i]]]++;
        //  hold[arrOActs[i]][z] = hold[arrOActs[i]][z - 1];
        actshold[arrOActs[i]][z] = 0;
        actshold[arrOActs[i]][z] = actshold[arrOActs[i]][z - 1] + 1;
        //document.getElementById("RDRID").innerHTML+=("You have had " +   hold[arrOActs[i]][z] + "  dreams about " + hold[arrOActs][i] )  ;
      }
      if (!actshold[arrOActs[i]]) {
       // counter++;
       // TagCounter[arrOActs[z]] = 1;
        //hold[z].currtag = 1;
        actshold[arrOActs[i]] = [];
        actshold[arrOActs[i]][z] = 1;

        // hold.z[arrOActs[i]] = 1;
      }

      for (var nou in actshold) {
        if (actshold[nou][z] === undefined) {
            actshold[nou][z] = actshold[nou][z - 1];
        }
      }

       
      //      console.log(hold["Amarai"][z]);
      //Totalacts4line();
      /// BrTagCounter[times[z]]= TagCounter[LoTag[z]]
      //add function to graph all acts4line at ind ex z
      // console.log(hold["Emily"]);
      //Totalacts4line();
    }
  }
}
function TotalActsLG() {
    countActsLineGr(AllLineActs);
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: AllDays,
            //labels: "",

            // backgroundColor:,
            responsive: true,
            bezierCurve: false,
            animation: false,
            spanGaps: true, 

            tension: 0,

            datasets: []
        },
        options: {
            spanGaps: true,
            maintainAspectRatio: false,
            //responsive: false,
            bezierCurve: true,

            plugins: {
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true
                    },
                    position: 'top'

                },
                zoom: {
                    limits: {
                        y: {
                            min: 0
                        }
                    },
                    zoom: {
                        wheel: {
                            // enabled: true
                        },
                        pinch: {
                            ////enabled: true
                        }
                    }
                }
            },
            elements: {

                point: {
                    radius: 0
                }
            },
            //fill: false,
            animation: false,
            spanGaps: true, // enable for all datasets

            tension: 0,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                        //reverse: true
                    }
                }]
            }
        }
    });

    var model = {
        2015: [20, 12, 32, 8, 25, 14, 20, 12, 32, 8, 25, 14],
        2016: [17, 26, 21, 41, 8, 23, 17, 26, 21, 41, 8, 23],
        2017: [23, 15, 8, 24, 38, 20, 23, 15, 8, 24, 38, 20]
    };

    for (en in actshold) {
        //hold[c].reverse();
        coloor = getRandomColour();
        var newDataset = {
            label: en,
            data: [],
            borderColor: coloor,
            backgroundColor: coloor,
            //backgroundColor:
            hidden: true,
            fill:false

        };
        // var c = 0;
        for (var c = 0; c < actshold[en].length; c++) {
            ////console.log(c);
            newDataset.data.splice(c, 0, actshold[en][c]);
        }
        for (value in actshold[en]) {
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
function formatHour(h24toh12) {
    var h = h24toh12 % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':00' + (h24toh12 < 12 ? 'am' : 'pm');
}