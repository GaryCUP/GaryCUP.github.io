window.onload = getTime()

function getTime()
{
    var date = new Date();
    var current_hour = date.getHours();
    window.alert(current_hour);
}