
const addColonToTime = (time) => {
    let strtime = "" + time;
    return strtime.length == 3
      ? '0' + strtime.slice(0, 1) + ":" + strtime.slice(-2)
      : strtime.slice(0, 2) + ":" + strtime.slice(-2);
};

function calculateTimeSinceLastBoomBoom(a, b) {

    const timea = a.time;
    const timeb = b.time;

    const dateA = new Date(a.date.replaceAll('/', '-') + 'T' + addColonToTime(timea) + ":00");
    const dateB = new Date(b.date.replaceAll('/', '-') + 'T' + addColonToTime(timeb) + ":00");

    const timeDiff = Math.abs(dateA - dateB);

    return {
        hours: parseInt((timeDiff / 1000 / 60 / 60)) + ' hrs',
        days: parseInt((timeDiff / 1000 / 60 / 60 / 24)) + ' day(s)',
    };
}

function dateToUnixTime(dateString) {
    return Math.floor(new Date(dateString).getTime() / 1000);
}

export {
    calculateTimeSinceLastBoomBoom,
    dateToUnixTime
}