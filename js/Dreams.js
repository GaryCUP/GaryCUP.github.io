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
function TotalTags() {
  document.getElementById("rankedgraph").disabled = true;
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {

      labels: document.getElementById("useRangedDreamDates").checked ? AllTimesR : AllTimes,


      //labels: "",

      // backgroundColor:,
      responsive: false,
      bezierCurve: true,
      animation: true,
      spanGaps: true, // enable for all datasets

      tension: 0.5,

      datasets: []
    },
    options: {
      spanGaps: true,
      maintainAspectRatio: false,
      responsive: false,
      bezierCurve: true,

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
          radius: 1
        }
      },
      //fill: true,
      animation: false,
      spanGaps: true, // enable for all datasets

      tension: 0.5,
      scales: {
        y:
        {


          reverse: document.getElementById("rankedgraph").checked ? true : false

        }

      }
    }
  });

  var model = {
    2015: [20, 12, 32, 8, 25, 14, 20, 12, 32, 8, 25, 14],
    2016: [17, 26, 21, 41, 8, 23, 17, 26, 21, 41, 8, 23],
    2017: [23, 15, 8, 24, 38, 20, 23, 15, 8, 24, 38, 20]
  };

  for (en in document.getElementById("rankedgraph").checked ? holdR : hold) {
    coloor = getRandomColor();
    var newDataset = {
      label: en,
      data: [],
      borderColor: coloor,
      backgroundColor: coloor,
      //backgroundColor:
      hidden: true,
      tension: 0.5

    };
    // var c = 0;
    for (var c = 0; c < (document.getElementById("rankedgraph").checked ? holdR : hold)[en].length; c++) {
      ////console.log(c);
      newDataset.data.splice(c, 0, (document.getElementById("rankedgraph").checked ? holdR : hold)[en][c]);
      
    }
    for (value in document.getElementById("rankedgraph").checked ? holdR : hold[en]) {
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




//SMAVG

function TotalTagsSMA() {
  document.getElementById("rankedgraph").disabled = true;
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {

      labels: document.getElementById("useRangedDreamDates").checked ? AllTimesR : AllTimes,


      //labels: "",

      // backgroundColor:,
      responsive: false,
      bezierCurve: true,
      animation: true,
      spanGaps: true, // enable for all datasets

      tension: 0.5,

      datasets: []
    },
    options: {
      spanGaps: true,
      maintainAspectRatio: false,
      responsive: false,
      bezierCurve: true,

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
          radius: 1
        }
      },
      //fill: true,
      animation: false,
      spanGaps: true, // enable for all datasets

      tension: 0.5,
      scales: {
        y:
        {


          reverse: document.getElementById("rankedgraph").checked ? true : false

        }

      }
    }
  });

  var model = {
    2015: [20, 12, 32, 8, 25, 14, 20, 12, 32, 8, 25, 14],
    2016: [17, 26, 21, 41, 8, 23, 17, 26, 21, 41, 8, 23],
    2017: [23, 15, 8, 24, 38, 20, 23, 15, 8, 24, 38, 20]
  };

  for (en in document.getElementById("rankedgraph").checked ? matharrayR : matharray) {
    coloor = getRandomColor();
    var newDataset = {
      label: en,
      data: [],
      borderColor: coloor,
      backgroundColor: coloor,
      //backgroundColor:
      hidden: true,
      tension: 0.5

    };
    // var c = 0;
    for (var c = 0; c < (document.getElementById("rankedgraph").checked ? matharrayR : matharray)[en].length; c++) {
      ////console.log(c);
      newDataset.data.splice(c, 0, (document.getElementById("rankedgraph").checked ? matharrayR : matharray)[en][c]);
      
    }
    for (value in document.getElementById("rankedgraph").checked ? matharrayR : matharray[en]) {
      //newDataset.data[c] = 0;
      //  newDataset.data[c].push(matharray[en][value]);
      //////  newDataset.data.splice(value, 0, matharray[en][value]);
      // c++;
    }
    // newDataset.data.shift();
    myChart.data.datasets.push(newDataset);
    //myChart.getDatasetMeta(matharray[c]).hidden = true;
    //  myChart.update();
  }
  //myChart.getDatasetMeta(matharray[c]).hidden = true;

  myChart.update();
}

//% of total Held
function TotalTagsPercentOfTotal() {
  document.getElementById("rankedgraph").disabled = true;
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {

      labels: document.getElementById("useRangedDreamDates").checked ? AllTimesR : AllTimes,


      //labels: "",

      // backgroundColor:,
      responsive: false,
      bezierCurve: true,
      animation: true,
      spanGaps: true, // enable for all datasets

      tension: 0.5,

      datasets: []
    },
    options: {
      spanGaps: true,
      maintainAspectRatio: false,
      responsive: false,
      bezierCurve: true,

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
          radius: 1
        }
      },
      //fill: true,
      animation: false,
      spanGaps: true, // enable for all datasets

      tension: 0.5,
      scales: {
        y:
        {


          reverse: document.getElementById("rankedgraph").checked ? true : false

        }

      }
    }
  });

  var model = {
    2015: [20, 12, 32, 8, 25, 14, 20, 12, 32, 8, 25, 14],
    2016: [17, 26, 21, 41, 8, 23, 17, 26, 21, 41, 8, 23],
    2017: [23, 15, 8, 24, 38, 20, 23, 15, 8, 24, 38, 20]
  };

  for (en in document.getElementById("rankedgraph").checked ? percentHeldR : percentHeld) {
    coloor = getRandomColor();
    var newDataset = {
      label: en,
      data: [],
      borderColor: coloor,
      backgroundColor: coloor,
      //backgroundColor:
      hidden: true,
      tension: 0.5

    };
    // var c = 0;
    for (var c = 0; c < (document.getElementById("rankedgraph").checked ? percentHeldR : percentHeld)[en].length; c++) {
      ////console.log(c);
      newDataset.data.splice(c, 0, (document.getElementById("rankedgraph").checked ? percentHeldR : percentHeld)[en][c]);
      
    }
    for (value in document.getElementById("rankedgraph").checked ? percentHeldR : percentHeld[en]) {
      //newDataset.data[c] = 0;
      //  newDataset.data[c].push(percentHeld[en][value]);
      //////  newDataset.data.splice(value, 0, percentHeld[en][value]);
      // c++;
    }
    // newDataset.data.shift();
    myChart.data.datasets.push(newDataset);
    //myChart.getDatasetMeta(percentHeld[c]).hidden = true;
    //  myChart.update();
  }
  //myChart.getDatasetMeta(percentHeld[c]).hidden = true;

  myChart.update();
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



    if (document.getElementById("useRangedDreamDates").checked) {
      startDreamDate = AllTimesR[AllTimesR.length - 1];
      endDreamDate=AllTimesR[0];
      numOfDreams = AllTimesR.length;
      const realStartDreamTime = new Date(startDreamDate);
      const realEndDreamTime = new Date(endDreamDate);
      const aDayIs = 1000 * 60 * 60 * 24;
      const diffTimes = realEndDreamTime - realStartDreamTime;
      totalDaysInDreamRange = Math.round(diffTimes / aDayIs);
      console.log("There are " + totalDaysInDreamRange + " days between the beginning and end of logs");
      rateOfRememberence = (numOfDreams / totalDaysInDreamRange) * 100;
      document.getElementById("DreamRemRate").innerHTML = ("Dream Rememberance Rate is ≈ " + (rateOfRememberence) + "%");

      countTags(AllTagsR, AllTimesR);
    }
    else {
      startDreamDate = AllTimes[AllTimes.length - 1];
      //endDreamDate=AllTimes[0]; 
      endDreamDate = new Date();
      numOfDreams = AllTimes.length;
      const realStartDreamTime = new Date(startDreamDate);
      const realEndDreamTime = new Date(endDreamDate);
      const aDayIs = 1000 * 60 * 60 * 24;
      const diffTimes = realEndDreamTime - realStartDreamTime;
      totalDaysInDreamRange = Math.round(diffTimes / aDayIs);
      console.log("There are " + totalDaysInDreamRange + " days between the beginning and end of logs");
      rateOfRememberence = (numOfDreams / totalDaysInDreamRange) * 100;
      document.getElementById("DreamRemRate").innerHTML = ("Dream Rememberance Rate is ≈ " + (rateOfRememberence) + "%");


      countTags(AllTags, AllTimes);
    }



  }


}
var barDream={}; var indBarDream=[];
function barRaceDreams()
{

}
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
var bloop={};
var bloopMain={};
var bloopArray=[];
var matharray={};
var percentHeld={};
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
      var aa = tags[v]; var tt=times[v];
       aa.forEach(function(w) {
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
        for (var hope in bloop)
        {
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

        //      console.log(hold["Amarai"][z]);
        //TotalTags();
        /// BrTagCounter[times[z]]= TagCounter[LoTag[z]]
        //add function to graph all tags at ind ex z
        // console.log(hold["Emily"]);
        //TotalTags();

      }
      // console.log(hold);


      /*
      for (var key in hold) {
       holdings.push(hold[key]);
       
     }
     
     holdings.sort(function(a, b){
         return b[0] - a[0];
     });
   */
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
    for (var logs in hold) {
      
        
      
      indNumOfDream = (hold[logs]).at(-1);
      localDreamStart = document.getElementById("useRangedDreamDates").checked ? AllTimesR[hold[logs].findIndex((element) => element > 0)] : AllTimes[hold[logs].findIndex((element) => element > 0)];
      // console.log(logs + " has " + indNumOfDream + " dream logs." + " starting at " + localDreamStart+  " and ending at " +  AllTimes[hold[logs].length-1]);
      var distanceBetweenTheDates = Math.round(((document.getElementById("useRangedDreamDates").checked ? new Date(AllTimesR[hold[logs].length - 1]) : new Date(AllTimes[hold[logs].length - 1])) - new Date(localDreamStart)) / 86400000);
      console.log(logs + " has a relative dream frequency of " + indNumOfDream / distanceBetweenTheDates + "\r\n");
      //document.getElementById("RDRID").innerHTML+=logs + " has a relative dream frequency of " + indNumOfDream/distanceBetweenTheDates + '<br>' ;

      //myWindow.document.write(logs + " has a relative dream frequency of " + indNumOfDream/distanceBetweenTheDates + '<br>');


      for (var entr in logs) {
        //console.log(logs + " has " + indNumOfDream + " dream logs." + " starting at " + AllTimes[hold[logs][entr]]);
        if (!hold[logs][entr]) {
          //hold[logs][entr] = 0;
        }
      }
      
    }
    var res; var ranks; var resR = []; 
    //avg rank 
    var ranksAvg;var reaRAvg=[];
    var q = holdings[0].length;
    
    for (var n = 0; n < holdings[0].length; n++) {

      res = holdings.map(r => r[n]);
      res = res.filter(function (element) {
        return element !== undefined;
      });
      //console.log(res);
      var ranks = rankDuplicate(res);
      ///  const sorted = res.slice().sort((a, b) => b - a)


      //rank = res.map(v => sorted.indexOf(v) + 1);
      // ranks = sorted.map(function (sorted) {
      //  return function (a, i, aa) {
      //       return a, aa[i - 1] === a ? sorted : ++sorted;
      //    };
      //   }(0));

      //const ranks = new Map(sorted.map((x, i) => [x, i + 1]));
      //var rank= arr.map((x) => rank.get(x));
      console.log(rankDuplicate(res));
      ///resR[n].push(ranks);
      resR[n] = ranks;
      //holdR[hold[n]]=res
    }

    // console.log(res);
    var p = 0;
    for (var oo in hold) {
      holdR[oo] = resR.map(r => r[p]);
      //matharrayR[oo] = resR.map(r => r[p]);
      //percentHeldR[oo] = resR.map(r => r[p]);
      p++;


      const arr = hold[oo];
    const result = [];
    
    let sum=0,count=0; currTime=0; nextTime=0; curVal=1;nxtVal=2; 
    var init=(hold[oo]).findIndex((element) => typeof element !== 'undefined');
    for(let i=0;i<arr.length;i++)
    {
      if(arr[i]===undefined)
      {
        result[i]=undefined
      }

      else
      {
         
               
          var o=new Date(times[init]);
          var nw=new Date(times[i]);
          //timebetweendates(convertToEpoch(times[i]),convertToEpoch(times[i-1]));
          result[i]=((timebetweendates(o.getTime(), nw.getTime())/arr[i]));
          //const timeElapsed = times[i] - times[i - 1]; 
          //nxtVal=curVal;
        
      

      // 
       // sum+=arr[i];
        //count++;
       // result[i]=timeElapsed;
      }
      
   matharray[oo]=result
    }
    
    
     
console.log(matharray); // [1, 1, 1.33, 1.75, 2, 2.17, 2.43, 2.86, 3.11]

///
    const percentArr=hold[oo];
    //const percentHeldR=holdR[oo];
    const percent=[];
    let persum=0,percount=0;
    for(let i=0;i<percentArr.length;i++)
    {
      

      if(percentArr[i]===undefined)
      {
        percent[i]=undefined
      }
     
      if(percentArr[i]!==undefined && i!==0) 
      {
      //  persum+=percentArr[i];
        //percount++;
       // percent[i]=persum/percount;
        percent.push((percentArr[i] / (i+1))*100);
      }

      else{
        percent.push(percentArr[(i)]*100); // Prevent division by zero      
      }

    }

    
  percentHeld[oo]=percent;
  console.log("////////////////////////////////////////////////////////////////////////////////////////////////////");
  console.log(percentHeld); // 
///
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
function convertToEpoch(dT)
{
  const theDT=new Date(dT);
  const toEpoch=theDT.getTime();
}
function timebetweendates(oldT,newT)
{
  //var oldTime=new Date(oldT*1000);
  //var newTime=new Date(newT*1000);
  var timeElapsed=newT-oldT;
  console.log(timeElapsed/(1000*60*60*24));
  return (timeElapsed/(1000*60*60*24));
}
/*
var arrayDates = [];

arrayDates.push(new Date(2013, 7, 26));
arrayDates.push(new Date(2013, 7, 27));
*/


function TurnToCSV()
{
  var sendToCSV=document.getElementById("useRangedDreamDates").checked ? hold : hold;
  console.log(sendToCSV);
}