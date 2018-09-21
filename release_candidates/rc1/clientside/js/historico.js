(function(){
    const defaultParkingId = 0; /* 'Campus' */
    const defaultPeriod = 'Dia';

    var request = new SPMRequest();
    var charts = new Charts(document.getElementById('Dia_chart_div'));
    var parkings = [];
    
    function updateParkingSelect(objSelect) {
        let parkingNames = parkings.map(({name}) => name);
        parkingNames.forEach(name => {
            let option = document.createElement('option');
            option.text = name;
            objSelect.add(option);
        });
    }

    function getParkingId(parkingName) {
        let parking = parkings.find(p => p.name == parkingName);
    
        if (parking === undefined)
            return -1;
        
        return parking.id;
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

    function requestData(period, parkingId, timestamp) {
        let status = true;

        switch (period) {
            case 'Hora':
                request.getDataByHour(parkingId, timestamp, charts.updateHourChart);
                break;
            case 'Dia':
                request.getDataByDay(parkingId, timestamp, charts.updateDayChart);
                break;
            case 'Semana':
                request.getDataByWeek(parkingId, timestamp, charts.updateWeekChart);
                break;
            case 'Mês':
                request.getDataByMonth(parkingId, timestamp, charts.updateMonthChart);
                break;
            case 'Ano':
                request.getDataByYear(parkingId, timestamp, charts.updateYearChart);
                break;
            default:
                status = false;
                break;
        }

        return status;
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
    
    function initialSetup(data) {
        parkings = data.estacionamentos;
        updateParkingSelect(document.querySelector("#form-estacionamento"));

        let saveTrigger = document.querySelector('#historicoSaveTrigger');
        saveTrigger.addEventListener('click', configureRequest);
    }


    // -----Starting point----- //
    google.charts.load(
        'current',
        {
            'packages':['corechart'],
            'language': 'pt'
        }
    );

    google.charts.setOnLoadCallback(function() {
        requestData(defaultPeriod, defaultParkingId, new Date().getTime());
        request.getParkings(initialSetup);
    });
}());