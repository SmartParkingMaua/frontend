(function(){
    const defaultParkingId = 0; /* 'Campus' */
    const defaultPeriod = 'Dia';

    var request = new SPMRequest();
    var charts = new Charts(document.getElementById('Dia_chart_div'));
    var parkings = [];
    var intervalId;
    var refreshTimeout = 30000;
    
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

    function requestData(period, parkingId, timestamp) {
        let status = true;

        switch (period) {
            case 'Hora':
                request.getDataByHour(parkingId, timestamp, charts.updateHourChart);
                break;
            case 'Dia':
                request.getDataByDay(parkingId, timestamp, charts.updateDayChart);
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

    function initialSetup(data) {
        parkings = data.estacionamentos;
        updateParkingSelect(document.querySelector("#form-estacionamento"));

        let parkingFilter = document.querySelector('#form-estacionamento');
        parkingFilter.addEventListener('click', configureRequest);
        
        let optionsFilter = document.querySelectorAll('input[name=optionsAoVivo]');
        optionsFilter.forEach(o => o.parentNode.addEventListener('click', configureRequest));

        intervalId = setInterval(function() {
            requestData(defaultPeriod, defaultParkingId, new Date().getTime());
        }, refreshTimeout);
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