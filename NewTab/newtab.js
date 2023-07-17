//gets the date and time and time of day greeting
function setCurrentDateTime() {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var dayPeriod = "";
    var greeting = "";

    hour = update(hour);
    minutes = update(minutes);
    seconds = update(seconds);

    if (hour >= 12) {
        dayPeriod = "PM";
    } else {
        dayPeriod = "AM";
    }

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    document.getElementById('current_time').innerText = hour + ":" + minutes + ":" + seconds + " " + dayPeriod;
    document.getElementById('current_greeting').innerText = greeting;

    setTimeout(function () { setCurrentDateTime() }, 1000);
}

function update(val) {
    if (val < 10) {
        return "0" + val;
    } else {
        return val;
    }
}

//gets the day, date, month and year
function setCurrentDay() {
    var date2 = new Date();
    var daytmp = date2.getDay();
    var dateOfMonth = date2.getDate();
    var monthtmp = date2.getMonth();
    var year = date2.getFullYear();

    var dayOfWeek = setDayName(daytmp);
    var month = setMonthName(monthtmp);

    document.getElementById('current_date').innerText = dayOfWeek + ", " + dateOfMonth + " " + month + " " + year;

}

function setDayName(d) {
    switch (d) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        default:
            break;
    }
}

function setMonthName(m) {
    switch (m) {
        case 0:
            return "January";
            break;
        case 1:
            return "February";
            break;
        case 2:
            return "March";
            break;
        case 3:
            return "April";
            break;
        case 4:
            return "May";
            break;
        case 5:
            return "June";
            break;
        case 6:
            return "July";
            break;
        case 7:
            return "August";
            break;
        case 8:
            return "September";
            break;
        case 9:
            return "October";
            break;
        case 10:
            return "November";
            break;
        case 11:
            return "December";
            break;
        default:
            break;
    }
}

setCurrentDay();
setCurrentDateTime();