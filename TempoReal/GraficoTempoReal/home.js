var currentdate = new Date();
var curHour = currentdate.getHours();
var buffer = [];
var j = 0;
for (var i = curHour - 12; i <= curHour; i++) {
    if (i <= 0) {
        i += 24;
        buffer[j]=i;
        i -= 24;
        j++;
    } else {
        buffer[j]=i;
        j++;
    }
}
