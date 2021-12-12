var colorarray;
var myBarChart;
//var sma;
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

// Event handlers
$("#update-data-from-file").change(function (e) {
    changeDataFromUpload(e, function (data) {
        console.log(data);
    });
});
$("#update-data-from-field").click(function () {
    changeDataFromField(function (data) {
        console.log(data);
    });
});

function TotalActs() {
    var obj = {
        and: 2,
        two: 1,
        too: 1,
        mother: 2
    };
    var ctx = document.getElementById("myChart");
    alert("you are here.");
    var data = {
        labels: [],
        datasets: [
            {
                label: "My dataset",
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                data: []
            }
        ]
    };

    Chart.pluginService.register({
        beforeInit: function (chart) {
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
    var ctx = document.getElementById("myChart");
    alert("you are here.");
    var data = {
        labels: [],
        datasets: [
            {
                label: "My dataset",
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                data: []
            }
        ]
    };

    Chart.pluginService.register({
        beforeInit: function (chart) {
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

function TotalMoods() {
    var ctx = document.getElementById("myChart");
    alert("you are here.");
    var data = {
        labels: [],
        datasets: [
            {
                label: "My dataset",
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                data: []
            }
        ]
    };

    Chart.pluginService.register({
        beforeInit: function (chart) {
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
        datasets: [
            {
                label: "My dataset",
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                data: []
            }
        ]
    };

    Chart.pluginService.register({
        beforeInit: function (chart) {
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
        .forEach(function (d) {
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

            reader.onload = function (event) {
                var csvData = event.target.result;
                var parsed = Papa.parse(csvData);
                cb(csvToJson(parsed.data));
            };
            reader.onerror = function () {
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
var AllRoodRateofInts=[];

//var MoodLevel = "";
// Parse the CSV input into JSON
var data;
var out = [];

function csvToJson(data) {
    var cols = data[1];
    out = [];

    data.forEach(function (e) {
        //MoodLevel = prompt("Mood for " + data.Mood);
        e["MoodLabRate"] = "";
    });

    for (var i = 1; i < data.length; i++) {
        var obj = {};
        var row = data[i];
        // arr = data[i].map((x) =>
        //  Object.assign({}, data[i], { "Mood Level": MoodLevel })
        // );

        //  const arr = data.map(x => Object.assign({}, data, { "new column": "" }))
        // // arr[i] = data.map((x) => Object.assign({}, data, { "new column": "" }));

        //add mod ratse

        cols.forEach(function (col, index) {
            obj[col] = row[index];
            //  obj["new column"] = ""

            /* 
           //add mod ratse
         obj.forEach(function(e){
        if (typeof e === "object" ){
          e["new column"] = ""
        }
      });
            
            */
            cc++;
        });
        //
        var daMood = data[i][4];
        //

        if (data[i].MoodLabRate == "") {
            data[i].MoodLabRate = prompt("Mood for " + daMood);
            var daMoodRate = data[i].MoodLabRate;
            data.forEach(function (mr, m) {
                if (data[m][4] == daMood) data[m].MoodLabRate = daMoodRate;
            });
        }
        //data.forEach(function(item, i) { if (daMood == 3452) a[i] = 1010; });

        /*
        if (data[i].MoodLabRate != "") {
         var index = data.indexOf(data[i].MoodLabRate); data[i].MoodLabRate = prompt("Mood for " + data[i][4]).replace(
            data[i][4].value,
            data[i].MoodLabRate.value
          );
        }
    */
        var DOW = data[i][2];
        var HOD = data[i][3];
        var Mood = data[i][4];
        var Activities = data[i][5];
        var MoodRate = data[i].MoodLabRate;
        AllDOW[i] = DOW;
        // AllHOD=New Date
        AllMoods[i] = Mood;
        AllActs[i] = Activities;
        AllHOD[i] = HOD;
        AllMoodRate[i] = MoodRate;
        AllRoodRateofInts[i] = parseInt(MoodRate);
       // AllRoodRateofInts.filter(Number) 
        //  console.log(data[i][3]);
        //console.log(data[i]);
        //

        //   arr = data[i].map(x => Object.assign({}, data[i], { "new column": "" }))
        out.push(obj);
    }
    console.log(AllMoodRate);
    countDOW(AllDOW);
    countMoods(AllMoods);
    countActs(AllActs);
    countTime(AllHOD);
    countMoodRates(AllMoodRate);

    return out;
}

//

//

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
        $.each(acts[i].split(" | "), function (i, al) {
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
var currTime;
//var date;
var hour;
var hourCounter;
function countTime(hourz) {
    // currTime = new Date('March 13, 08 04:20');
    hourCounter = {};
    for (var h = 1; h < hourz.length; h++) {
        currTime = Date.parse(hourz[h]);
        if (hourCounter[hourz[h]]) {
            hourCounter[hourz[h]] += 1;
        } else {
            hourCounter[hourz[h]] = 1;
        }
    }
    //console.log(moodCounter[1]);
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
        datasets: [
            {
                label: "My dataset",
                backgroundColor: 'rgb(214, 113, 82)',
                borderColor: 'rgb(113, 211, 1)',
                data: []
            }
        ]
    };

    Chart.pluginService.register({
        beforeInit: function (chart) {
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
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false
                        }
                    }
                ]
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
    
    mooRA=(sma(AllRoodRateofInts , 7,2));
    
}
