'use strict';

const Chart = ( chartElement ) => {

  let chart;
  let chartDataTable = {};
  let chartOptions = {};

  const setComboChartLegendSelection = ( chartColumns, chartSeries ) => {
    google.visualization.events.addListener( chart, 'select', () => {
      let sel = chart.getSelection();

      if ( sel.length ) {
        if ( !sel[0].row ) {
          let view;
          let col = sel[0].column;

          if ( chartColumns[ col ] == col ) {
            chartColumns[ col ] = {
              label: chartDataTable.getColumnLabel( col ),
              type: chartDataTable.getColumnType( col ),
              calc: function () {
                return null;
              }
            };
            chartSeries[ col - 1 ].color = '#cccccc';
          } else {
            chartColumns[ col ] = col;
            chartSeries[ col - 1 ].color = null;
          }

          view = new google.visualization.DataView( chartDataTable );
          view.setColumns( chartColumns );
          chart.draw( view, chartOptions );
        }
      }
    });
  }

  return {
    drawHourChart: ({ actions, timestamp }) => {
      const titleTime = new Date( timestamp.from ).toLocaleTimeString(
        'pt-BR',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      );

      const chartColumns = [];
      const chartSeries = { 0: {}, 1: {}, 2: { type: 'line' } };
      const chartDataArray = [[ 'Minuto', 'Entrada', 'Saída', 'Fluxo' ]];
      
      for ( let i = 0; i < actions.entrance.length; i++ ) {
        chartDataArray.push([
          actions.entrance[i].period,
          actions.entrance[i].value,
          actions.exit[i].value,
          actions.entrance[i].value - actions.exit[i].value
        ]);
      }

      chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

      for ( let i = 0; i < chartDataTable.getNumberOfColumns(); i++ ) {
        chartColumns.push(i);
      }

      chartOptions = {
        title: `Hora - ${titleTime.replace( /:/, 'h' )}`,
        titleTextStyle: { fontSize: 18, color: '#002536' },
        seriesType: 'bars',
        tooltip: { trigger: 'selection' },
        aggregationTarget: 'category',
        series: chartSeries,
        colors: [ '#54798d', '#ffd54b', '#002536' ],
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

      chart = new google.visualization.ComboChart( chartElement );
      chart.draw( chartDataTable, chartOptions );

      setComboChartLegendSelection( chartColumns, chartSeries );
    },

    drawDayChart: ({ actions, timestamp }) => {
      const titleDate = new Date( timestamp.from ).toLocaleDateString('pt-BR');

      const chartColumns = [];
      const chartSeries = { 0: {}, 1: {}, 2: { type: 'line' } };
      const chartDataArray = [[ 'Hora', 'Entrada', 'Saída', 'Fluxo' ]];
      
      for ( let i = 0; i < actions.entrance.length; i++ ) {
        chartDataArray.push([
          actions.entrance[i].period,
          actions.entrance[i].value,
          actions.exit[i].value,
          actions.entrance[i].value - actions.exit[i].value
        ]);
      }

      chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

      for ( let i = 0; i < chartDataTable.getNumberOfColumns(); i++ ) {
        chartColumns.push(i);
      }

      chartOptions = {
        title: `Dia - ${titleDate}`,
        titleTextStyle: { fontSize: 18, color: '#002536' },
        seriesType: 'bars',
        tooltip: { trigger: 'selection' },
        aggregationTarget: 'category',
        series: chartSeries,
        colors: [ '#54798d', '#ffd54b', '#002536' ],
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

      chart = new google.visualization.ComboChart( chartElement );
      chart.draw( chartDataTable, chartOptions );

      setComboChartLegendSelection( chartColumns, chartSeries );
    },

    drawWeekChart: ({ actions, timestamp }) => {
      const titleDateFrom =
        new Date( timestamp.from ).toLocaleDateString('pt-BR');
      const titleDateTo =
        new Date( timestamp.to ).toLocaleDateString('pt-BR');
      
      const chartDataArray = [[ 'Dias da semana', 'Entrada' ]];

      actions.entrance.forEach( d =>
        chartDataArray.push([ d.period, d.value ])
      );

      chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

      chartOptions = {
        title: `Semana - ${titleDateFrom} à ${titleDateTo}`,
        titleTextStyle: { fontSize: 18, color: '#002536' },
        colors: ['#274d60'],
        hAxis: {
          maxAlternation: 1,
          textStyle: { fontSize: 12, color: '#002536' }
        },
        vAxis: {
          minValue: 0,
          format: '#',
          gridline: { count: -1 },
          textStyle: { fontSize: 14, color: '#002536' }
        },
        chartArea: { width: '75%', height: '80%' }
      };

      chart = new google.visualization.ColumnChart( chartElement );
      chart.draw( chartDataTable, chartOptions );
    },

    drawMonthChart: ({ actions, timestamp }) => {
      const titleDateFrom =
        new Date( timestamp.from ).toLocaleDateString('pt-BR');
      const titleDateTo =
        new Date( timestamp.to ).toLocaleDateString('pt-BR');
      
      const chartDataArray = [[ 'Dias do mês', 'Entrada' ]];

      actions.entrance.forEach( d =>
        chartDataArray.push([ d.period, d.value ])
      );

      chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

      chartOptions = {
        title: `Mês - ${titleDateFrom} à ${titleDateTo}`,
        titleTextStyle: { fontSize: 18, color: '#002536' },
        colors: ['#274d60'],
        hAxis: {
          maxAlternation: 1,
          textStyle: { fontSize: 12, color: '#002536' }
        },
        vAxis: {
          minValue: 0,
          format: '#',
          gridline: { count: -1 },
          textStyle: { fontSize: 14, color: '#002536' }
        },
        chartArea: { width: '75%', height: '80%' }
      };

      chart = new google.visualization.ColumnChart( chartElement );
      chart.draw( chartDataTable, chartOptions );
    },

    drawYearChart: ({ actions, timestamp }) => {
      const titleDateFrom = new Date( timestamp.from ).toLocaleDateString(
        'pt-BR',
        {
          month: '2-digit',
          year: 'numeric'
        }
      );
      const titleDateTo = new Date( timestamp.to ).toLocaleDateString(
        'pt-BR',
        {
          month: '2-digit',
          year: 'numeric'
        }
      );
              
      const chartDataArray = [[ 'Meses do ano', 'Entrada' ]];

      actions.entrance.forEach( m =>
        chartDataArray.push([ m.period, m.value ])
      );

      chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

      chartOptions = {
        title: `Ano - ${titleDateFrom} à ${titleDateTo}`,
        titleTextStyle: { fontSize: 18, color: '#002536' },
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

    redrawChart: () => {
      chart.draw( chartDataTable, chartOptions );
    }
  };

};
