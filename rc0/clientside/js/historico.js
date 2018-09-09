const defaultParkingId = 0; /* 'Campus' */
const defaultPeriod = 'Dia';

function initialSetup(data) {
    parkings = data.estacionamentos;
    updateFiltroEstacionamentos();

    let saveTrigger = document.querySelector('#historicoSaveTrigger');
    saveTrigger.addEventListener('click', configureRequest);
}

function configureRequest(event) {
    let parkingId = getParkingId(document.querySelector('#form-estacionamento').value);

    if (parkingId === -1)
        return alert("Estacionamento inválido!");

    let dateString = formatDateToISO(document.querySelector('#calendario').value);
    
    if (!isValidISODate(dateString))
        return alert("Data inválida!");

    let period = document.querySelector('#form-periodo').value;
    let status = requestData(period, parkingId, new Date(dateString).getTime());

    if (!status)
        return alert("Período inválido!");

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
        case 'Semana':
            getEstacionamentosByWeek(parkingId, timestamp, updateEstacionamentosByWeek);
            break;
        case 'Mês':
            getEstacionamentosByMonth(parkingId, timestamp, updateEstacionamentosByMonth);
            break;
        case 'Ano':
            getEstacionamentosByYear(parkingId, timestamp, updateEstacionamentosByYear);
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