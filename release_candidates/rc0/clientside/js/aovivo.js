const defaultParkingId = 0; /* 'Campus' */
const defaultPeriod = 'Dia';

var refreshTimeout = 30000;
var intervalId;

function initialSetup(data) {
    parkings = data.estacionamentos;
    updateFiltroEstacionamentos();

    let parkingFilter = document.querySelector('#form-estacionamento');
    parkingFilter.addEventListener('click', configureRequest);
    
    let optionsFilter = document.querySelectorAll('input[name=optionsAoVivo]');
    optionsFilter.forEach(o => o.parentNode.addEventListener('click', configureRequest));

    intervalId = setInterval(function() {
        requestData(defaultPeriod, defaultParkingId, new Date().getTime());
    }, refreshTimeout);
}

function configureRequest(event) {
    let parkingId = getParkingId(document.querySelector('#form-estacionamento').value);

    if (parkingId === -1)
        return alert("Estacionamento inválido!");

    let period;

    if (event.target.tagName === 'LABEL')
        period = event.target.innerText;
    else
        period = document.querySelector('input[name=optionsAoVivo]:checked').parentNode.innerText;

    let status = requestData(period, parkingId, new Date().getTime());

    if (!status)
        return alert("Período inválido!");

    clearInterval(intervalId);

    intervalId = setInterval(function() {
        let parkingId = getParkingId(document.querySelector('#form-estacionamento').value);

        requestData(period, parkingId, new Date().getTime());
    }, refreshTimeout);

    $('#filterModal').modal('hide');
}

function requestData(period, parkingId, timestamp) {
    let status = true;

    switch (period) {
        case 'Hora':
            getEstacionamentosByHour(parkingId, timestamp, updateEstacionamentosByHour);
            break;
        case 'Dia':
            getEstacionamentosByDay(parkingId, timestamp, updateEstacionamentosByDay);
            break;
        default:
            status = false;
            break;
    }

    return status;
}


// -----Starting point----- //
requestData(defaultPeriod, defaultParkingId, new Date().getTime());
getEstacionamentos(initialSetup);