function whatAlert(alert)
{
     //change bar on top depending on weather alert
    switch(alert.event) {
       
                //convective
    case "Tornado Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="red";
      break;
      case "Severe Thunderstorm Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="orange";
      break;
      case "Severe Weather Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="aqua";
      break;
      case "Tornado Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="yellow";
      break;
      case "Severe Thunderstorm Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="palevioletred";
      break;
      case "Special Weather Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="moccasin";
      break;
                //Hydrolic
      case "Flash Flood Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkred";
      break;
      case "Flash Flood Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Seagreen";
      break;
      case "Flash Flood Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkred";
      break;
      case "Flood Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lime";
      break;
      case "Flood Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Seagreen";
      break;
      case "Flood Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lime";
      break;
      case "Flood Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Springgreen";
      break;

            //Non Convective
      case "High Wind Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Goldenrod";
      break;
      case "High Wind Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkgoldenrod";
      break;
      case "Wind Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Tan";
      break;
      case "Excessive Heat warning":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Mediumvioletred";
    break;
    case "Excessive Heat Watch":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Maroon";
    break;
    case "Heat Advisory":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Coral";
    break;
    case "Hard Freeze Warning":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkviolet";
    break;
    case "Hard Freeze Watch":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Royalblue";
    break;
    case "Freeze Warning":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkslateblue";
    break;
    case "Freeze Watch":
    document.getElementsByClassName("marquee")[0].style.backgroundColor="Cyan";
  break;
  case "Dense Fog Advisory":
    document.getElementsByClassName("marquee")[0].style.backgroundColor="Slategray";
  break;
  case "Dense Smoke Advisory":
    document.getElementsByClassName("marquee")[0].style.backgroundColor="Khaki";
  break;
  case "Dust Storm Warning":
    document.getElementsByClassName("marquee")[0].style.backgroundColor="Bisque";
  break;
  case "Blowing Dust Advisory":
    document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkkhaki";
  break;
  case "Dust Advisory":
    document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkkhaki";
  break;
  case "Air Stagnation Advisory":
    document.getElementsByClassName("marquee")[0].style.backgroundColor="Gray";
  break;
  
                //Marine
  case "Special Marine Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Orange";
      break;
      case "Marine Weather Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Peachpuff";
      break;
      case "Hurricane Force Wind Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Westernred";
      break;
      case "Hurricane Force Wind Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkorchid";
      break;
      case "Storm Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkviolet";
      break;
      case "Storm Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Moccasin";
      break;
      case "Gale Warning":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Plum";
    break;
    case "Gale Watch":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Pink";
    break;

                //Tropical
    case "Hurricane Warning":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Crimson";
    break;
    case "Hurricane Watch":
      document.getElementsByClassName("marquee")[0].style.backgroundColor="Magenta";
    break;
    case "Tropical Storm Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Firebrick";
      break;
      case "Tropical Storm Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lightcoral";
      break;
      case "Extreme Wind Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkorange";
      break;

                //Coastal Hazards
      case "Coastal Flood Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Forestgreen";
      break;
      case "Coastal Flood Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Mediumaquamarine";
      break;
      case "Coastal Flood Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Olivedrab";
      break;
      case "High Surf Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Forestgreen";
      break;
      case "High Surf Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Mediumorchid";
      break;
      case "Rip Current Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Turquoise";
      break;

                //Fire Weather
      case "Red Flag Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Deeppink";
      break;
      case "Fire Weather Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Navajowhite";
      break;
      case "Extreme Fire Danger":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darksalmon";
      break;
      case "Tsunami Warning ":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Tomato";
      break;
      case "Shelter In Place Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Salmon";
      break;

      case "Evacuation Immediate":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Chartreuse";
      break;
      
      case "Civil Danger Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lightpink";
      break;
      
      case "Nuclear Power Plant Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Indigo";
      break;
      
      case "Radiological Hazard Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Indigo";
      break;
      
      case "Hazardous Materials Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Indigo";
      break;
      
      case "Fire Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Sienna";
      break;
      
      case "Civil Emergency Message":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lightpink";
      break;
      
      case "Law Enforcement Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Silver";
      break;
      
      case "Storm Surge Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkpurple";
      break;
      
      case "Typhoon Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Crimson";
      break;
      
      case "Blizzard Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Orangered";
      break;
      
      case "Snow Squall Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Mediumvioletred";
      break;

      case "Ice Storm Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkmagenta";
      break;
      case "Winter Storm Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Hotpink";
      break;
      case "Tsunami Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Chocolate";
      break;
      case "Tsunami Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Fushsia";
      break;
      case "Avalanche Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Dodgerblue";
      break;
      case "Earthquake Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Saddlebrown";
      break;
      case "Volcano Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="darkslategray";
      break;
      case "Ashfall Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkgray";
      break;
      case "Lakeshore Flood Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Forestgreen";
      break;
      case "Blowing Dust Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Bisque";
      break;
      case "Lake Effect Snow Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Darkcyan";
      break;
      case "Lake Effect Snow Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lightskyblue";
      break;
      case "Wind Chill Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lightsteelblue";
      break;
      
      case "Extreme Cold Warning":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Blue";
      break;
      case "Storm Surge Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lightpurple";
      break;
      case "Typhoon Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Magenta";
      break;
      case "Hurricane Local Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Moccasin";
      break;
      case "Typhoon Local Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Moccasin";
      break;
      case "Tropical Storm Local Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Moccasin";
      break;
      case "Tropical Depression Local Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Moccasin";
      break;
      case "Avalanche Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Peru";
      break;
      case "Winter Weather Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Mediumslateblue";
      break;
      case "Urban and Small Stream Flood Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Springgreen";
      break;
      case "Small Stream Flood Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Springgreen";
      break;
      case "Arroyo and Small Stream Flood Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Springgreen";
      break;
      case "Hydrolic Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Springgreen";
      break;
      case "Lakeshore Flood Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lawngreen";
      break;
      case "Coastal Flood Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Lawngreen";
      break;
      case "Freezing Spray Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Deepskyblue";
      break;
      case "Heavy Freezing Spray Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Rosybrown";
      break;
      case "Heavy Freezing Spray Warniing":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Deepskyblue";
      break;
      case "Lakeshore Flood Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Mediumaquamarine";
      break;
      case "Lakeshore Flood Statement":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Olivedrab";
      break;
      case "Small Craft Advisory":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Thristle";
      break;
      case "Small Craft Advisory For Hazardous Seas ":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Thristle";
      break;
      case "Small Craft Advisory for Rough Bar":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Thristle";
      break;
      case "Small Craft Advisory for Wind":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Thristle";
      break;
      case "Child Abduction Emergency":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Transparent";
      break;
      case "Air Quality Alert":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Gray";
      break;
      case "Avalanche Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Sandybrown";
      break;
      case "Blizzard Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Greenyellow";
      break;
      case "Winter Storm Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Steelblue";
      break;
      case "Wind Chill Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Cadetblue";
      break;
      case "Extreme Cold Watch":
        document.getElementsByClassName("marquee")[0].style.backgroundColor="Blue";
      break;
    default:
      // code block
  }
}

/*
Brisk Wind Advisory	82	 	Thistle	216 191 216	D8BFD8
Hazardous Seas Warning	83	 	Thistle	216 191 216	D8BFD8
Lake Wind Advisory	86	 	Tan	210 180 140	D2B48C
Frost Advisory	88	 	Cornflowerblue	100 149 237	6495ED
Ashfall Advisory	89	 	Dimgray	105 105 105	696969
Freezing Fog Advisory	90	 	Teal	0 128 128	008080
Low Water Advisory	92	 	Brown	165 42 42	A52A2A
Local Area Emergency	93	 	Silver	192 192 192	C0C0C0
Beach Hazards Statement	97	 	Turquoise	64 224 208	40E0D0
Hazardous Seas Watch	100	 	Darkslateblue	72 61 139	483D8B
911 Telephone Outage	114	 	Silver	192 192 192	C0C0C0
*/ 
  