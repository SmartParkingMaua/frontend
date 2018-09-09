import * as request from './requests.js'

const defaultParkingId = 0; /* 'Campus' */
const defaultPeriod = 'Dia';
var parkings = [];
var intervalId;

function initialSetup(data) {
    // console.log("Update Estacionamentos");
    // console.log(data.estacionamentos);
    parkings = data.estacionamentos;
    updateFiltroEstacionamentos();

    // var filterSave = document.querySelector('#filterSave');
    // filterSave.addEventListener('click', updateChart);

    intervalId = setInterval(function() {
        requestData(defaultPeriod, defaultParkingId, new Date().getTime());
    }, 30000);
}

function updateFiltroEstacionamentos() {
    let parkingNames = parkings.map(({name}) => name);
    let select = document.querySelector("#form-estacionamento");
    parkingNames.forEach(name => {
        let option = document.createElement('option');
        option.text = name;
        select.add(option);
    });
}

function updateEstacionamentosByHour(data) {
    console.log("Update Estacionamentos By Hour");
    console.log(data);
}

function updateEstacionamentosByDay(data) {
    console.log("Update Estacionamentos By Day");
    console.log(data);
}

function updateEstacionamentosByWeek(data) {
    console.log("Update Estacionamentos By Week");
    console.log(data);
}

function updateEstacionamentosByMonth(data) {
    console.log("Update Estacionamentos By Month");
    console.log(data);
}

function updateEstacionamentosByYear(data) {
    console.log("Update Estacionamentos By Year");
    console.log(data);
}

function updateChart(e) {
    let period = document.querySelector('#form-tempo').value;
    let parkingId = getParkingId(document.querySelector('#form-estacionamento').value);
    let dateString = formatDateToISO(document.querySelector('#calendario').value);

    if (!isValidISODate(dateString))
        return alert("Data inválida!");

    let timestamp = new Date(dateString).getTime();

    if (requestData(period, parkingId, timestamp)) {
        clearInterval(intervalId);

        intervalId = setInterval(function() {
            let parkingId = getParkingId(document.querySelector('#form-estacionamento').value);

            requestData(period, parkingId, new Date().getTime());
        }, 30000);
    }
}

function requestData(period, parkingId, timestamp) {
    let status = true;

    switch (period) {
        // case 'Hora':
        //     request.getEstacionamentosByHour(parkingId, timestamp, updateEstacionamentosByHour);
        //     break;
        case 'Dia':
            request.getEstacionamentosByDay(parkingId, timestamp, updateEstacionamentosByDay);
            break;
        case 'Semana':
            request.getEstacionamentosByWeek(parkingId, timestamp, updateEstacionamentosByWeek);
            break;
        case 'Mês':
            request.getEstacionamentosByMonth(parkingId, timestamp, updateEstacionamentosByMonth);
            break;
        // case 'Ano':
        //     request.getEstacionamentosByYear(parkingId, timestamp, updateEstacionamentosByYear);
        //     break;
        default:
            status = false;
            break;
    }

    return status;
}

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

function getParkingId(parkingName) {
    var parking = parkings.find(p => p.name == parkingName);

    if (parking === undefined)
        return defaultParkingId;
    
    return parking.id;
}


// -----Starting point----- //
request.getEstacionamentos(initialSetup);
requestData(defaultPeriod, defaultParkingId, new Date().getTime());