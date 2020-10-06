window.onload=function(){
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
<<<<<<< HEAD:Grad.js
    document.getElementById('time').innerHTML ="THE TIME IS"+ h + ":" + m + ":" + s;
=======
    document.getElementById('timeis').innerHTML = h + ":" + m + ":" + s;
>>>>>>> 56dea9685d920a035ef3aa91389cf3bb898da693:test123.js
    t = setTimeout(function () {
        startTime()
    }, 500);
}
startTime();
}
