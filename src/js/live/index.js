'use strict';

(() => {

  const elements = {
    parking: document.querySelector('#live-filter-parking'),
    periods: document.querySelectorAll('input[name=live-filter-period]'),
    mainChart: document.querySelector('#live-chart-main'),
    availabilityChart: document.querySelector('#live-chart-availability'),
    totalEntrance: document.querySelector('#live-total-entrance'),
    totalExit: document.querySelector('#live-total-exit')
  };

  const defaults = {
    parkingId: 0, // Campus
    period: 'Dia',
    refreshTimeout: 30000
  };

  const charts = {
    main: Chart( elements.mainChart ),
    availability: Chart( elements.availabilityChart )
  };

  const request = new Request();
  
  let parkingsList = [];
  let intervalId;

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

    intervalId = setInterval(() => {
      requestData(
        defaults.period,
        defaults.parkingId,
        new Date().getTime()
      );
    }, defaults.refreshTimeout );

    elements.parking.addEventListener( 'change', configureAndRequestData );
    elements.periods.forEach( p =>
      p.parentNode.addEventListener( 'click', configureAndRequestData )
    );

    // Make charts responsive
    window.onresize = () => {
      charts.main.redrawChart();
      charts.availability.redrawChart();
    };
  }

  const requestData = ( period, parkingId, timestamp ) => {
    let status = true;

    switch ( period.toUpperCase() ) {
      case 'HORA':
        request.getParkings(
          charts.availability.drawAvailabilityChart( parkingId )
        );
        request.getDataByHour(
          parkingId,
          timestamp,
          charts.main.drawHourChart
        );
        request.getDataByHour( parkingId, timestamp, showTotalCars );
        break;

      case 'DIA':
        request.getParkings(
          charts.availability.drawAvailabilityChart( parkingId )
        );
        request.getDataByDay(
          parkingId,
          timestamp,
          charts.main.drawDayChart
        );
        request.getDataByDay(
          parkingId,
          timestamp,
          showTotalCars
        );
        break;

      default:
        status = false;
        break;
    }

    return status;
  }

  const configureAndRequestData = ( event ) => {
    let period;
    let parkingId = getParkingId( elements.parking.value );
    let requestStatus;

    // Since its a general purposes function to handle requests from
    // different sources in the page, when changing the period selector
    // it doesn't update its innerText value as fast as the event is
    // triggered. It leads to a misbehavior where the selector gets the
    // previous innerText value in it, making the request in the wrong route
    if ( event.target.tagName === 'LABEL' ) {
      period = event.target.innerText;
    } else {
      elements.periods.forEach( p => {
        if ( p.checked ) {
          period = p.parentNode.innerText;
          return;
        }
      });
    }

    if ( parkingId === -1 ) {
      return alert('Estacionamento inválido!');
    }

    requestStatus = requestData( period, parkingId, new Date().getTime() );

    if ( !requestStatus ) {
      return alert('Período inválido!');
    }

    // It's necessary to clean previous interval to avoid multiple requests
    clearInterval( intervalId );

    intervalId = setInterval(() => {
      requestData( period, parkingId, new Date().getTime() );
    }, defaults.refreshTimeout );
  }

  const getParkingId = ( parkingName ) => {
    const parking = parkingsList.find( p => p.name === parkingName );

    if ( parking === undefined ) {
      return -1;
    }

    return parking.id;
  }

  const showTotalCars = ({ actions }) => {
    const totalEntrance =
      actions.entrance.reduce(( acc, cur ) => acc + cur.value, 0 );
    const totalExit =
      actions.exit.reduce(( acc, cur ) => acc + cur.value, 0 );

    elements.totalEntrance.innerText = totalEntrance;
    elements.totalExit.innerText = totalExit;
  }

})();
