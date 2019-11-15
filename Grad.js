function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function getTime()
{
    var date = new Date();
    var current_hour = date.getHours() ;
    var current_min = date.getMinutes();
    var current_sec=date.getSeconds();
     // add a zero in front of numbers<10
  current_hour = checkTime(current_hour);
  current_min = checkTime(current_min);
  current_sec = checkTime(current_sec);
  document.getElementById('time').innerHTML = current_hour + ":" + current_min + ":" + current_sec;
  t = setTimeout(function() {
    startTime()
  }, 500)
}
getTime();