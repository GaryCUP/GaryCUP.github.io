window.onload = getTime()

function getTime()
{
    var date = new Date();
    var current_hour = date.getHours();
    var current_min = date.getMinutes();
    var current_sec=date.getSeconds();
    window.alert(current_hour + ':' + current_min+ '.' +current_sec );
}

