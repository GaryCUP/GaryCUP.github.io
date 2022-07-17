function whatAlert(alert)
{
     //change bar on bottom depending on weather alert
    switch(alert.event) {
                //convective
    case "Tornado Warning":
       colorOfAlert="red";
      break;
      case "Severe Thunderstorm Warning":
       colorOfAlert="orange";
      break;
      case "Severe Weather Statement":
       colorOfAlert="aqua";
      break;
      case "Tornado Watch":
       colorOfAlert="yellow";
      break;
      case "Severe Thunderstorm Watch":
       colorOfAlert="palevioletred";
      break;
      case "Special Weather Statement":
       colorOfAlert="moccasin";
      break;
                //Hydrolic
      case "Flash Flood Warning":
       colorOfAlert="Darkred";
      break;
      case "Flash Flood Watch":
       colorOfAlert="Seagreen";
      break;
      case "Flash Flood Statement":
       colorOfAlert="Darkred";
      break;
      case "Flood Warning":
       colorOfAlert="Lime";
      break;
      case "Flood Watch":
       colorOfAlert="Seagreen";
      break;
      case "Flood Statement":
       colorOfAlert="Lime";
      break;
      case "Flood Advisory":
       colorOfAlert="Springgreen";
      break;

            //Non Convective
      case "High Wind Warning":
       colorOfAlert="Goldenrod";
      break;
      case "High Wind Watch":
       colorOfAlert="Darkgoldenrod";
      break;
      case "Wind Advisory":
       colorOfAlert="Tan";
      break;
      case "Excessive Heat Warning":
     colorOfAlert="Mediumvioletred";
    break;
    case "Excessive Heat Watch":
     colorOfAlert="Maroon";
    break;
    case "Heat Advisory":
     colorOfAlert="Coral";
    break;
    case "Hard Freeze Warning":
     colorOfAlert="Darkviolet";
    break;
    case "Hard Freeze Watch":
     colorOfAlert="Royalblue";
    break;
    case "Freeze Warning":
     colorOfAlert="Darkslateblue";
    break;
    case "Freeze Watch":
   colorOfAlert="Cyan";
  break;
  case "Dense Fog Advisory":
   colorOfAlert="Slategray";
  break;
  case "Dense Smoke Advisory":
   colorOfAlert="Khaki";
  break;
  case "Dust Storm Warning":
   colorOfAlert="Bisque";
  break;
  case "Blowing Dust Advisory":
   colorOfAlert="Darkkhaki";
  break;
  case "Dust Advisory":
   colorOfAlert="Darkkhaki";

  break;
  case "Air Stagnation Advisory":
   colorOfAlert="Gray";
  break;
  
                //Marine
  case "Special Marine Warning":
       colorOfAlert="Orange";
      break;
      case "Marine Weather Statement":
       colorOfAlert="Peachpuff";
      break;
      case "Hurricane Force Wind Warning":
       colorOfAlert="Westernred";
      break;
      case "Hurricane Force Wind Watch":
       colorOfAlert="Darkorchid";
      break;
      case "Storm Warning":
       colorOfAlert="Darkviolet";
      break;
      case "Storm Watch":
       colorOfAlert="Moccasin";
      break;
      case "Gale Warning":
     colorOfAlert="Plum";
    break;
    case "Gale Watch":
     colorOfAlert="Pink";
    break;

                //Tropical
    case "Hurricane Warning":
     colorOfAlert="Crimson";
    break;
    case "Hurricane Watch":
     colorOfAlert="Magenta";
    break;
    case "Tropical Storm Warning":
       colorOfAlert="Firebrick";
      break;
      case "Tropical Storm Watch":
       colorOfAlert="Lightcoral";
      break;
      case "Extreme Wind Warning":
       colorOfAlert="Darkorange";
      break;

                //Coastal Hazards
      case "Coastal Flood Warning":
       colorOfAlert="Forestgreen";
      break;
      case "Coastal Flood Watch":
       colorOfAlert="Mediumaquamarine";
      break;
      case "Coastal Flood Statement":
       colorOfAlert="Olivedrab";
      break;
      case "High Surf Warning":
       colorOfAlert="Forestgreen";
      break;
      case "High Surf Advisory":
       colorOfAlert="Mediumorchid";
      break;
      case "Rip Current Statement":
       colorOfAlert="Turquoise";
      break;

                //Fire Weather
      case "Red Flag Warning":
       colorOfAlert="Deeppink";
      break;
      case "Fire Weather Watch":
       colorOfAlert="Navajowhite";
      break;
      case "Extreme Fire Danger":
       colorOfAlert="Darksalmon";
      break;
      case "Tsunami Warning ":
       colorOfAlert="Tomato";
      break;
      case "Shelter In Place Warning":
       colorOfAlert="Salmon";
      break;

      case "Evacuation Immediate":
       colorOfAlert="Chartreuse";
      break;
      
      case "Civil Danger Warning":
       colorOfAlert="Lightpink";
      break;
      
      case "Nuclear Power Plant Warning":
       colorOfAlert="Indigo";
      break;
      
      case "Radiological Hazard Warning":
       colorOfAlert="Indigo";
      break;
      
      case "Hazardous Materials Warning":
       colorOfAlert="Indigo";
      break;
      
      case "Fire Warning":
       colorOfAlert="Sienna";
      break;
      
      case "Civil Emergency Message":
       colorOfAlert="Lightpink";
      break;
      
      case "Law Enforcement Warning":
       colorOfAlert="Silver";
      break;
      
      case "Storm Surge Warning":
       colorOfAlert="Darkpurple";
      break;
      
      case "Typhoon Warning":
       colorOfAlert="Crimson";
      break;
      
      case "Blizzard Warning":
       colorOfAlert="Orangered";
      break;
      
      case "Snow Squall Warning":
       colorOfAlert="Mediumvioletred";
      break;

      case "Ice Storm Warning":
       colorOfAlert="Darkmagenta";
      break;
      case "Winter Storm Warning":
       colorOfAlert="Hotpink";
      break;
      case "Tsunami Advisory":
       colorOfAlert="Chocolate";
      break;
      case "Tsunami Watch":
       colorOfAlert="Fushsia";
      break;
      case "Avalanche Warning":
       colorOfAlert="Dodgerblue";
      break;
      case "Earthquake Warning":
       colorOfAlert="Saddlebrown";
      break;
      case "Volcano Warning":
       colorOfAlert="darkslategray";
      break;
      case "Ashfall Warning":
       colorOfAlert="Darkgray";
      break;
      case "Lakeshore Flood Warning":
       colorOfAlert="Forestgreen";
      break;
      case "Blowing Dust Warning":
       colorOfAlert="Bisque";
      break;
      case "Lake Effect Snow Warning":
       colorOfAlert="Darkcyan";
      break;
      case "Lake Effect Snow Watch":
       colorOfAlert="Lightskyblue";
      break;
      case "Wind Chill Warning":
       colorOfAlert="Lightsteelblue";
      break;
      
      case "Extreme Cold Warning":
       colorOfAlert="Blue";
      break;
      case "Storm Surge Watch":
       colorOfAlert="Lightpurple";
      break;
      case "Typhoon Watch":
       colorOfAlert="Magenta";
      break;
      case "Hurricane Local Statement":
       colorOfAlert="Moccasin";
      break;
      case "Typhoon Local Statement":
       colorOfAlert="Moccasin";
      break;
      case "Tropical Storm Local Statement":
       colorOfAlert="Moccasin";
      break;
      case "Tropical Depression Local Statement":
       colorOfAlert="Moccasin";
      break;
      case "Avalanche Advisory":
       colorOfAlert="Peru";
      break;
      case "Winter Weather Advisory":
       colorOfAlert="Mediumslateblue";
      break;
      case "Urban and Small Stream Flood Advisory":
       colorOfAlert="Springgreen";
      break;
      case "Small Stream Flood Advisory":
       colorOfAlert="Springgreen";
      break;
      case "Arroyo and Small Stream Flood Advisory":
       colorOfAlert="Springgreen";
      break;
      case "Hydrolic Advisory":
       colorOfAlert="Springgreen";
      break;
      case "Lakeshore Flood Advisory":
       colorOfAlert="Lawngreen";
      break;
      case "Coastal Flood Advisory":
       colorOfAlert="Lawngreen";
      break;
      case "Freezing Spray Advisory":
       colorOfAlert="Deepskyblue";
      break;
      case "Heavy Freezing Spray Watch":
       colorOfAlert="Rosybrown";
      break;
      case "Heavy Freezing Spray Warniing":
       colorOfAlert="Deepskyblue";
      break;
      case "Lakeshore Flood Watch":
       colorOfAlert="Mediumaquamarine";
      break;
      case "Lakeshore Flood Statement":
       colorOfAlert="Olivedrab";
      break;
      case "Small Craft Advisory":
       colorOfAlert="Thristle";
      break;
      case "Small Craft Advisory For Hazardous Seas ":
       colorOfAlert="Thristle";
      break;
      case "Small Craft Advisory for Rough Bar":
       colorOfAlert="Thristle";
      break;
      case "Small Craft Advisory for Wind":
       colorOfAlert="Thristle";
      break;
      case "Child Abduction Emergency":
       colorOfAlert="Transparent";
      break;
      case "Air Quality Alert":
       colorOfAlert="Gray";
      break;
      case "Avalanche Watch":
       colorOfAlert="Sandybrown";
      break;
      case "Blizzard Watch":
       colorOfAlert="Greenyellow";
      break;
      case "Winter Storm Watch":
       colorOfAlert="Steelblue";
      break;
      case "Wind Chill Watch":
       colorOfAlert="Cadetblue";
      break;
      case "Extreme Cold Watch":
       colorOfAlert="Blue";
       case "Hazardous Weather Outlook":
       colorOfAlert="Tan";
      break;
      case "Lake Wind Advisory":
       colorOfAlert="Tan";
      break;
      case "Local Area Emergency":
        colorOfAlert="Silver";
       break;
    default:
      // code block
  }
}

/*
Brisk Wind Advisory	82	 	Thistle	216 191 216	D8BFD8
Hazardous Seas Warning	83	 	Thistle	216 191 216	D8BFD8

Frost Advisory	88	 	Cornflowerblue	100 149 237	6495ED
Ashfall Advisory	89	 	Dimgray	105 105 105	696969
Freezing Fog Advisory	90	 	Teal	0 128 128	008080
Low Water Advisory	92	 	Brown	165 42 42	A52A2A
Beach Hazards Statement	97	 	Turquoise	64 224 208	40E0D0
Hazardous Seas Watch	100	 	Darkslateblue	72 61 139	483D8B
911 Telephone Outage	114	 	Silver	192 192 192	C0C0C0
*/ 
  