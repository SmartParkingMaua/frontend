'use strict';

const Chart = ( chartElement ) => {

  let chart;
  let chartDataTable = {};
  let chartOptions = {};

  return {
    drawHourChart: ({ actions }) => {
      const chartDataArray = [[ 'Minuto', 'Fluxo' ]];

      for ( let i = 0; i < actions.entrance.length; i++ ) {
        chartDataArray.push([
          actions.entrance[i].period,
          actions.entrance[i].value - actions.exit[i].value
        ]);
      }

      chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

      chartOptions = {
        colors: ['#004684'],
        hAxis: {
          maxAlternation: 1,
          textStyle: { fontSize: 12, color: '#053061' }
        },
        vAxis: {
          format: '#',
          gridline: { count: -1 },
          textStyle: { fontSize: 14, color: '#053061' }
        },
        chartArea: { width: '75%', height: '80%' },
        curveType: 'function',
        pointSize: 7
      };

      chart = new google.visualization.LineChart( chartElement );
      chart.draw( chartDataTable, chartOptions );
    },

    drawDayChart: ({ actions }) => {
      const chartDataArray = [[ 'Horário do dia', 'Fluxo' ]];

      for ( let i = 0; i < actions.entrance.length; i++ ) {
        chartDataArray.push([
          actions.entrance[i].period,
          actions.entrance[i].value - actions.exit[i].value
        ]);
      }

      chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

      chartOptions = {
        colors: ['#274d60'],
        hAxis: {
          maxAlternation: 1,
          textStyle: { fontSize: 12, color: '#002536' }
        },
        vAxis: {
          format: '#',
          gridline: { count: -1 },
          textStyle: { fontSize: 14, color: '#002536' }
        },
        chartArea: { width: '75%', height: '80%' },
        curveType: 'function',
        pointSize: 7
      };

      chart = new google.visualization.LineChart( chartElement );
      chart.draw( chartDataTable, chartOptions );
    },

    drawAvailabilityChart: ( parkingId ) => ({ parkings }) => {
      const parking = parkings.find( ({ id }) => id === parkingId );
      const vagasDisponivel = parking.maxLots - parking.occupiedLots;

      chartDataTable = new google.visualization.arrayToDataTable([
        [ 'Estado', 'Número de Carros' ],
        [ 'Disponíveis', vagasDisponivel < 0 ? 0 : vagasDisponivel ],
        [ 'Ocupadas', parking.occupiedLots ]
      ]);

      chartOptions = {
        colors: [ '#274d60', '#eda407' ],
        chartArea: { top: '3%', width: '75%', height: '80%' },
        pieHole: 0.25,
        legend: {
          position: 'bottom',
          textStyle: { fontSize: 14, color: '#002536' }
        }
      };

      chart = new google.visualization.PieChart( chartElement );
      chart.draw( chartDataTable, chartOptions );
    },

    redrawChart: () => {
      chart.draw( chartDataTable, chartOptions );
    }
  };

};
