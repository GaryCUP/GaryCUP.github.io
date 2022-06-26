const elem = document.getElementById('range');
const dateRangePicker = new DateRangePicker(elem, {
format:'mm-dd-yyyy'    
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
var numTagsToMake=7;
var selectedTags;
var shuffledTags;
//local dream vars
var indRateOfOcc;
var indNumOfDream;
var indStartDreamDate;
var indEndDreamDate;
var junkcount=Math.floor(Date.now() / 1000);//current time in seconds
var theOneSelected;
/////////////////////////////
var ctx = document.getElementById("myChart");
var holder=[];
var DreamFile={};
DreamFileTags=[];
//DreamFile.timestamp="";
function DownloadJSON(){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(holder));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "dreamit.json");
  dlAnchorElem.click();}
  
function makeADreams(){
  for(var x=0;x<1000;x++)
  {
    junkcount-=Math.floor(Math.random() * (432000 - 86400 + 1) ) + 86400; //60000;
      shuffledTags = listoffauxtags.sort(function(){return .5 - Math.random()});
     selectedTags=shuffledTags.slice(0,numTagsToMake-1);
     const TnadT = Object.create(DreamFile);
    TnadT.timestamp=junkcount,
    TnadT.tags=selectedTags.slice(0);
    holder.push(TnadT);
    
  }
  alert("Done making file");
}
var listoffauxtags=["Role-playing",
"Shortwave",
"Speed-cubing",
"Stand-up",
"Sudoku",
"Table",
"Tesla",
"Tetris",
"Tutoring",
"TV",
"Video",
"War-hammer",
"Watching",
"Watching",
"Woodcarving",
"Woodworking",
"World-building",
"Janggi",
"Xiangqi",
"Card",
"Apples",
"Asshole",
"B/RTR",
"Bang!",
"Bid",
"Blackjack",
"Bluff",
"Bridge",
"Bohnanza",
"Boss",
"Canasta",
"Cardfight!!Vanguard",
"Cards",
"Cassino",
"Citadels",
"Contract",
"Coup",
"Crazy",
"Cribbage",
"Dominion",
"Double",
"Dutch",
"Egyptian",
"Euchre",
"Exploding",
"Family",
"Famous",
"Fight",
"Fluxx",
"Gin",
"Gods’",
"GoFish",
"Golf",
"Guillotine",
"Hanabi",
"Hearts",
"Hearthstone",
"Jaipur",
"Kings",
"Legendary:",
"Legendary",
"Ligretto",
"LoveLetter",
"LuckandLogic",
"MageRage",
"Magic:",
"Memory",
"Mille",
"Monopoly",
"MONSTER",
"Munchkin",
"Nerts",
"Old",
"Phase",
"Pinochle",
"Pokémon",
"Poker",
"President",
"Presidential",
"Race",
"Ratuki",
"ROOK",
"Rummy",
"Scrabble",
"Screw",
"SentinelsoftheMultiverse",
"Skat",
"Skip",
"Solitaire",
"Speed",
"Spit",
"Splendor",
"Spoons",
"Star",
"Sushi",
"The",
"Twenty-two",
"UNO",
"Up",
"War",
"Werewolf",
"Whist",
"Wonders",
"You’re",
"Yu-Gi-Oh!",
"Acro",
"Ballet",
"Ballroom",
"Bassoon",
"Belly",
"Bernie",
"Bollywood",
"Break",
"Calypso",
"Cheer",
"Campos",
"Double",
"Fire",
"Flamenco",
"Flying",
"Foxtrot",
"Glockenspiel",
"Gongs",
"Greek",
"Hip",
"Kizomba",
"Line",
"Linya",
"Modern",
"Native",
"Quickstep",
"Soca",
"Tango",
"Viennese",
"Waltz",
"Zumba",
"Bagpipes",
"Banjo",
"Bass",
"Bassoon",
"Bell",
"Bongo",
"Castanets",
"Cello",
"Clarinet",
"Clavichord",
"Conga",
"Contrabassoon",
"Cornet",
"Cymbals",
"Drums",
"Dulcian",
"Dynamophone",
"Flute",
"Flutophone",
"Glockenspiel",
"Gongs",
"Guitar",
"Pokadits",
"Harmonica"];

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

function TotalTags() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      
      labels: document.getElementById("useRangedDreamDates").checked ? AllTimesR : AllTimes,
      
      
      //labels: "",
      
      // backgroundColor:,
      responsive: true,
      bezierCurve: false,
      animation: true,
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
            y: { min: 0 }
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
        yAxes: [
          {
            ticks: {
              beginAtZero: true
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
    coloor = getRandomColor();
    var newDataset = {
      label: en,
      data: [],
      borderColor: coloor,
      backgroundColor: coloor,
      //backgroundColor:
      hidden:true
    
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
var AllTimesR = [];
var AllTagsR = [];
var alltagstimes = [,];
var u=0;


function loadFile() {
  const dreamStartRanged=new Date(document.getElementById("startDream").value);
const dreamEndRanged=new Date(document.getElementById("endDream").value);
document.getElementById("startDream").disabled=true;
document.getElementById("endDream").disabled=true;
document.getElementById("useRangedDreamDates").disabled=true;
document.getElementById("useFulldDreamDates").disabled=true;



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
  var newArrR=[];
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
      if(Date.parse(AllTimes[i])>=dreamStartRanged && Date.parse(AllTimes[i])<=dreamEndRanged)
      {
          AllTagsR[u]=newArr[i].tags;
          AllTimesR[u] = convertTime(newArr[i].timestamp);
          u++;

    }


  }
    //return alltagstimes;
    ////////////////////////////////////countTags(alltagstimes);
    
    
   //// rateOfRememberence=(Math.round(((numOfDreams/totalDaysInDreamRange)+Number.EPSILON)*100)/1000)*100;
  //rateOfRememberence*=100;
   

  
    if(document.getElementById("useRangedDreamDates").checked)
    {
      startDreamDate=AllTimesR[AllTimesR.length-1];
    //endDreamDate=AllTimesR[0];
    endDreamDate=dreamEndRanged;
    numOfDreams=AllTimesR.length;
    const realStartDreamTime=new Date(startDreamDate);
    const realEndDreamTime=new Date(endDreamDate);
    const aDayIs=1000*60*60*24;
    const diffTimes=realEndDreamTime-realStartDreamTime;
    totalDaysInDreamRange=Math.round(diffTimes/aDayIs);
    console.log("There are " + totalDaysInDreamRange + " days between the beginning and end of logs");
    rateOfRememberence=(numOfDreams/totalDaysInDreamRange)*100;
    document.getElementById("DreamRemRate").innerHTML=("Dream Rememberance Rate is ≈ " + (rateOfRememberence) + "%");

      countTags(AllTagsR, AllTimesR);
    }
    else
    {
      startDreamDate=AllTimes[AllTimes.length-1];
    //endDreamDate=AllTimes[0]; 
     endDreamDate=new Date();
    numOfDreams=AllTimes.length;
    const realStartDreamTime=new Date(startDreamDate);
    const realEndDreamTime=new Date(endDreamDate);
    const aDayIs=1000*60*60*24;
    const diffTimes=realEndDreamTime-realStartDreamTime;
    totalDaysInDreamRange=Math.round(diffTimes/aDayIs);
    console.log("There are " + totalDaysInDreamRange + " days between the beginning and end of logs");
    rateOfRememberence=(numOfDreams/totalDaysInDreamRange)*100;
    document.getElementById("DreamRemRate").innerHTML=("Dream Rememberance Rate is ≈ " + (rateOfRememberence) + "%");


      countTags(AllTags, AllTimes);
    }
    


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
    times.reverse();

    //tagsNtime[""] = {};
    var BTagCount = 0;
    // var time = "";
    //loop  breaks tags
    //tagNtime.length = tagsNtimes.length;
   

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
    }
    //console.log(hold["CLSV"]);
    //console.log(AllTimes);
    //TotalTags();
var localDreamStart;
  var myWindow = window.open("", "MsgWindow", "width=300,height=300");
    for (var logs in hold) {
      for(var barium in logs)
      {
          //relative dream occurence rate=#dreams/number of days betreen first dream and end of log
          //86400000 is number of miliseconds in a day
      }
      indNumOfDream=(hold[logs]).at(-1);
      localDreamStart= document.getElementById("useRangedDreamDates").checked ? AllTimesR[hold[logs].findIndex((element) => element > 0)] : AllTimes[hold[logs].findIndex((element) => element > 0)] ;
     // console.log(logs + " has " + indNumOfDream + " dream logs." + " starting at " + localDreamStart+  " and ending at " +  AllTimes[hold[logs].length-1]);
      var distanceBetweenTheDates=Math.round(((document.getElementById("useRangedDreamDates").checked ? new Date(AllTimesR[hold[logs].length-1]): new Date(AllTimes[hold[logs].length-1]))-new Date(localDreamStart))/86400000);      
    ///console.log( logs + " has a relative dream frequency of " + indNumOfDream/distanceBetweenTheDates + "\r\n") ;
      //document.getElementById("RDRID").innerHTML+=logs + " has a relative dream frequency of " + indNumOfDream/distanceBetweenTheDates + '<br>' ;
    
      myWindow.document.write(logs + " has a relative dream frequency of " + indNumOfDream/distanceBetweenTheDates + '<br>');
      

      for (var entr in logs) {
        //console.log(logs + " has " + indNumOfDream + " dream logs." + " starting at " + AllTimes[hold[logs][entr]]);
        if (!hold[logs][entr]) {
          //hold[logs][entr] = 0;
        }
      }
    }

   
    alert("Done! " + numOfDreams +" Dreams logged across " + totalDaysInDreamRange + " days." );
    //alert(document.getElementById("startDream").value);
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
