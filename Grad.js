window.onload = getTime()

function getTime()
{
    var date = new Date();
    var current_hour = date.getHours() ;
    var current_min = date.getMinutes();
    var current_sec=date.getSeconds();
    var theTime=new date(current_hour, current_min, current_sec);
     window.alert(current_hour, current_min , current_sec );
}

