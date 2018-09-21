function formatDateToISO(dateString) {
    let dateTmp = dateString.split('/');
    return dateTmp[2] + '-' + dateTmp[1] + '-' + dateTmp[0];
}

function isValidISODate(dateString) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateString.match(regEx))
        return false; // Invalid format

    let date = new Date(dateString);

    if (Number.isNaN(date.getTime()))
        return false; // Invalid date

    return date.toISOString().slice(0,10) === dateString;
}