'use strict';

(() => {

  const elements = {
    parking: document.querySelector('#hist-filter-parking'),
    period: document.querySelector('#hist-filter-period'),
    datetime: document.querySelector('#hist-filter-datetime'),
    mainChart: document.querySelector('#hist-chart-main'),
    filterTrigger: document.querySelector('#hist-filter-trigger')
  };

  const defaults = {
    parkingId: 0, // Campus
    period: 'Dia'
  };

  const charts = {
    main: Chart( elements.mainChart )
  };

  const request = new Request();
  
  let parkingsList = [];

  // -----Starting point----- //
  google.charts.load(
    'current',
    {
      'packages': ['corechart'],
      'language': 'pt'
    }
  );

  google.charts.setOnLoadCallback(() => request.getParkings( initialSetup ));

  const initialSetup = ({ parkings }) => {
    let requestStatus;

    parkingsList = parkings;

    parkingsList.map(({ name }) => {
      let optionElement = document.createElement('option');

      optionElement.text = name;
      elements.parking.add( optionElement );
    });

    requestStatus = requestData(
        defaults.period,
        defaults.parkingId,
        new Date().getTime()
      );

    if ( !requestStatus ) {
      return alert('Período inválido!');
    }

    elements.filterTrigger.addEventListener(
      'click',
      configureAndRequestData
    );

    // Make chart responsive
    window.onresize = () => {
      charts.main.redrawChart();
    };

  }

  const requestData = ( period, parkingId, timestamp ) => {
    let status = true;

    switch ( period.toUpperCase() ) {
      case 'HORA':
        request.getDataByHour(
          parkingId,
          timestamp,
          charts.main.drawHourChart
        );
        break;

      case 'DIA':
        request.getDataByDay(
          parkingId,
          timestamp,
          charts.main.drawDayChart
        );
        break;

      case 'SEMANA':
        request.getDataByWeek(
          parkingId,
          timestamp,
          charts.main.drawWeekChart
        );
        break;

      case 'MÊS':
        request.getDataByMonth(
          parkingId,
          timestamp,
          charts.main.drawMonthChart
        );
        break;

      case 'ANO':
        request.getDataByYear(
          parkingId,
          timestamp,
          charts.main.drawYearChart
        );
        break;

      default:
        status = false;
        break;
    }

    return status;
  }

  const configureAndRequestData = ( event ) => {
    const parkingId = getParkingId( elements.parking.value );
    const datetimeString = adjustDateFormat( elements.datetime.value );
    let requestStatus;

    if ( parkingId === -1 ) {
      return alert('Estacionamento inválido!');
    }

    if ( !isValidDateFormat( datetimeString ) ) {
      return alert('Data inválida!');
    }

    requestStatus = requestData(
        elements.period.value,
        parkingId,
        new Date( datetimeString ).getTime()
      );

    if ( !requestStatus ) {
      return alert('Período inválido!');
    }

    // Close chart filter window if request went well
    $('#hist-filter-modal').modal('hide');
  }

  const getParkingId = ( parkingName ) => {
    const parking = parkingsList.find( p => p.name === parkingName );

    if ( parking === undefined ) {
      return -1;
    }

    return parking.id;
  }

  const adjustDateFormat = ( strDate ) => {
    const datetime = strDate.split( /\ / );
    const date = datetime[0].split( /\// );
    const time = datetime[1] ? datetime[1] : '00:00';

    // When month picker is selected it's necessary to add the day in the
    // beginning of the array in order to get the date in the right format
    ( date.length === 2 ) ? date.unshift('01') : null;

    // YYYY-MM-DD HH:mm
    return date[2] + '-' + date[1] + '-' + date[0] + ' ' + time;
  }

  const isValidDateFormat = ( strDate ) => {
    const regEx = /^\d{4}-\d{2}-\d{2}\ \d{2}:\d{2}$/;
    const date = new Date( strDate );

    // Validate format
    if ( !strDate.match( regEx ) ) {
      return false;
    }

    // Validate timestamp
    if ( Number.isNaN( date.getTime() ) ) {
      return false;
    }

    return true;
  }

})();
