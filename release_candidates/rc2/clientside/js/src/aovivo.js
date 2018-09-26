'use strict';

(function(){
    const defaultParkingId = 0; /* 'Campus' */
    const defaultPeriod = 'Dia';

    let request = new SPMRequest();
    let mainChart = new Charts(document.querySelector('#Dia_chart_div'));
    let availabilityChart = new Charts(document.querySelector('#availability_chart'));
    let parkings = [];
    let intervalId;
    let refreshTimeout = 30000;
    
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

    function updateTotalCars(data) {
        let totalEntrada = 0;
        let totalSaida = 0;

        for (let i = 0; i < data.entrada.length; i++) {
            totalEntrada += data.entrada[i];
            totalSaida += data.saida[i];
        }

        document.querySelector("#entrada").innerText = totalEntrada;
        document.querySelector("#saida").innerText = totalSaida;
    }

    function requestData(period, parkingId, timestamp) {
        let status = true;

        switch (period) {
            case 'Hora':
                request.getDataByHour(parkingId, timestamp, mainChart.updateHourChart);
                request.getDataByDay(parkingId, timestamp, availabilityChart.updateAvailabilityChart);
                request.getDataByHour(parkingId, timestamp, updateTotalCars);
                break;
            case 'Dia':
                request.getDataByDay(parkingId, timestamp, mainChart.updateDayChart);
                request.getDataByDay(parkingId, timestamp, availabilityChart.updateAvailabilityChart);
                request.getDataByDay(parkingId, timestamp, updateTotalCars);
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

        let parkingFilter = document.querySelector('#form-estacionamento');

        updateParkingSelect(parkingFilter);

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

        // Make the chart responsive
        window.onresize = function() {
            mainChart.redrawChart();
            availabilityChart.redrawChart();
        };
    });
}());