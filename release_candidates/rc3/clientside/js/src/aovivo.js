'use strict';

(function(){
    const defaultParkingId = 0; // Campus
    const defaultPeriod = 'Dia';
    const refreshTimeout = 30000;
    const request = new SPMRequest();
    const mainChart = chart(document.querySelector('#aovivo-chart-main'));
    const availabilityChart = chart(document.querySelector('#aovivo-chart-availability'));
    const parkingSelector = document.querySelector('#aovivo-filter-parking');
    const periodSelector = document.querySelectorAll('input[name=aovivo-filter-period]');
    let parkingsList = [];
    let intervalId;

    // -----Starting point----- //
    google.charts.load(
        'current',
        {
            'packages':['corechart'],
            'language': 'pt'
        }
    );

    google.charts.setOnLoadCallback(_ => request.getParkings(initialSetup));

    function initialSetup(parkingsData) {
        // 1. Fill parkings list and select field
        parkingsList = parkingsData.estacionamentos;

        let parkingsNames = parkingsList.map(({name}) => name);
        
        parkingsNames.forEach(name => {
            let optionElement = document.createElement('option');
            optionElement.text = name;
            parkingSelector.add(optionElement);
        });
        
        // 2. Request data and set data request interval
        requestData(defaultPeriod, defaultParkingId, new Date().getTime());

        intervalId = setInterval(function() {
            requestData(defaultPeriod, defaultParkingId, new Date().getTime());
        }, refreshTimeout);

        // 3. Add events
        periodSelector.forEach(p => p.parentNode.addEventListener('click', configureRequest));

        parkingSelector.addEventListener('click', configureRequest);

        // 4. Make the chart responsive
        window.onresize = function() {
            mainChart.redrawChart();
            availabilityChart.redrawChart();
        };
    }

    function requestData(period, parkingId, timestamp) {
        let status = true;

        switch (period.toUpperCase()) {
            case 'HORA':
                request.getDataByHour(parkingId, timestamp, mainChart.drawHourChart);
                request.getDataByDay(parkingId, timestamp, availabilityChart.drawAvailabilityChart);
                request.getDataByHour(parkingId, timestamp, showTotalCars);
                break;
            case 'DIA':
                request.getDataByDay(parkingId, timestamp, mainChart.drawDayChart);
                request.getDataByDay(parkingId, timestamp, availabilityChart.drawAvailabilityChart);
                request.getDataByDay(parkingId, timestamp, showTotalCars);
                break;
            default:
                status = false;
                break;
        }

        return status;
    }

    function configureRequest(event) {
        // 1. Get period filter
        let period;

        if (event.target.tagName === 'LABEL')
            period = event.target.innerText;
        else {
            periodSelector.forEach(p => {
                if (p.checked) {
                    period = p.parentNode.innerText;
                    return;
                }
            });
        }

        // 2. Get parking filter
        let parkingId = getParkingId(parkingSelector.value);

        if (parkingId === -1)
            return alert("Estacionamento inválido!");
        
        // 3. Request data
        let requestStatus = requestData(period, parkingId, new Date().getTime());

        if (!requestStatus)
            return alert("Período inválido!");

        // 4. Clear previous interval and set data request interval
        clearInterval(intervalId);

        intervalId = setInterval(function() {
            requestData(period, parkingId, new Date().getTime());
        }, refreshTimeout);
    }

    function getParkingId(parkingName) {
        let parking = parkingsList.find(p => p.name === parkingName);
    
        if (parking === undefined)
            return -1;
        
        return parking.id;
    }

    function showTotalCars(dayData) {
        let totalEntranceElement = document.querySelector("#aovivo-total-entrance");
        let totalExitElement = document.querySelector("#aovivo-total-exit");
        let totalEntrance = 0;
        let totalExit = 0;

        for (let i = 0; i < dayData.entrada.length; i++) {
            totalEntrance += dayData.entrada[i];
            totalExit += dayData.saida[i];
        }

        totalEntranceElement.innerText = totalEntrance;
        totalExitElement.innerText = totalExit;
    }
}());