'use strict';

( function() {

    const defaultParkingId = 0; // Campus
    const defaultPeriod = 'Dia';
    const request = new SPMRequest();
    const mainChart = chart( document.querySelector( '#hist-chart-main' ) );
    const parkingSelector = document.querySelector( '#hist-filter-parking' );
    const periodSelector = document.querySelector( '#hist-filter-period' );
    const datetimeSelector = document.querySelector( '#hist-filter-datetime' );

    let parkingsList = [];

    // -----Starting point----- //
    google.charts.load( 'current', { 'packages': ['corechart'], 'language': 'pt' } );

    google.charts.setOnLoadCallback( () => request.getParkings( initialSetup ) );

    function initialSetup( parkingsData ) {

        // 1. Fill parkings list and select field
        parkingsList = parkingsData.parkings;

        let parkingsNamesList = parkingsList.map( ( { name } ) => name );

        parkingsNamesList.forEach( name => {
            let optionElement = document.createElement( 'option' );
            optionElement.text = name;
            parkingSelector.add( optionElement );
        });

        // 2. Request data
        let timestamp = new Date().getTime();
        let requestStatus = requestData( defaultPeriod, defaultParkingId, timestamp );

        if ( !requestStatus ) {
            return alert( 'Período inválido!' );
        }

        // 3. Add events
        let filterTrigger = document.querySelector( '#hist-filter-trigger' );
        filterTrigger.addEventListener( 'click', configureRequest );

        // 4. Make the chart responsive
        window.onresize = () => {
            mainChart.redrawChart();
        };

    }

    function requestData( period, parkingId, timestamp ) {

        let status = true;

        switch ( period.toUpperCase() ) {
            case 'HORA':
                request.getDataByHour( parkingId, timestamp, mainChart.drawHourChart );
                break;
            case 'DIA':
                request.getDataByDay( parkingId, timestamp, mainChart.drawDayChart );
                break;
            case 'SEMANA':
                request.getDataByWeek( parkingId, timestamp, mainChart.drawWeekChart );
                break;
            case 'MÊS':
                request.getDataByMonth( parkingId, timestamp, mainChart.drawMonthChart );
                break;
            case 'ANO':
                request.getDataByYear( parkingId, timestamp, mainChart.drawYearChart );
                break;
            default:
                status = false;
                break;
        }

        return status;

    }

    function configureRequest( event ) {

        // 1. Get parking filter
        let parkingId = getParkingId( parkingSelector.value );

        if ( parkingId === -1 ) {
            return alert( 'Estacionamento inválido!' );
        }

        // 2. Get datetime filter
        let datetimeString = convertDateToISOFormat( datetimeSelector.value );

        if ( !isDateValidISOFormat( datetimeString ) ) {
            return alert( 'Data inválida!' );
        }

        // 3. Request data
        let timestamp = new Date( datetimeString ).getTime();
        let requestStatus = requestData( periodSelector.value, parkingId, timestamp );

        if ( !requestStatus ) {
            return alert( 'Período inválido!' );
        }

        // 4. Hide modal screen
        $( '#hist-filter-modal' ).modal( 'hide' );

    }

    function getParkingId( parkingName ) {

        let parking = parkingsList.find( p => p.name === parkingName );

        if ( parking === undefined ) {
            return -1;
        }

        return parking.id;

    }

    function convertDateToISOFormat( dateString ) {

        let datetime = dateString.split( /\ / );
        let date = datetime[0].split( /\// );
        let time = ( datetime[1] !== undefined ) ? ( datetime[1] ) : '';

        return date[2] + '-' + date[1] + '-' + date[0] + ' ' + time; // YYYY-MM-DD HH:mm

    }

    function isDateValidISOFormat( dateString ) {

        let regEx = /^\d{4}-\d{2}-\d{2}\ (\d{2}:\d{2})?$/;

        if ( !dateString.match( regEx ) ) {
            return false; // Invalid format
        }

        let date = new Date( dateString );

        if ( Number.isNaN( date.getTime() ) ) {
            return false; // Invalid date
        }

        return true;
        // return date.toISOString().slice(0,10) === dateString;

    }

}());