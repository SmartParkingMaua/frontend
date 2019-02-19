'use strict';

const Chart = ( chartElement ) => {

    let chart;
    let chartDataTable = {};
    let chartOptions = {};
    let chartColumns = [];
    let chartSeries = {};

    const setComboChartLegendSelection = () => {

        google.visualization.events.addListener( chart, 'select', () => {
            let sel = chart.getSelection();

            if ( sel.length > 0 ) {
                if ( sel[0].row === null ) {
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
                    }
                    else {
                        chartColumns[ col ] = col;
                        chartSeries[ col - 1 ].color = null;
                    }

                    let view = new google.visualization.DataView( chartDataTable );
                    view.setColumns( chartColumns );
                    chart.draw( view, chartOptions );
                }
            }
        });

    }

    return {

        drawHourChart: ( hourData ) => {

            // 1. Add axes legend
            let chartDataArray = [ [ 'Minuto', 'Entrada', 'Saída', 'Fluxo' ] ];

            // 2. Add chart data
            for ( let i = 0; i < hourData.entrance.length; i++ ) {
                chartDataArray.push( [ hourData.entrance[i].period, hourData.entrance[i].value,
                        hourData.exit[i].value,
                        hourData.entrance[i].value - hourData.exit[i].value ] );
            }

            chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

            // 3. Set chart options
            chartSeries = { 0: {}, 1: {}, 2: { type: 'line' } };

            chartColumns = [];

            for ( let i = 0; i < chartDataTable.getNumberOfColumns(); i++ ) {
                chartColumns.push(i);
            }

            let titleTime = new Date( hourData.timestampFrom ).toLocaleTimeString( 'pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            chartOptions = {
                title: 'Hora - ' + titleTime.replace( /:/, 'h' ),
                titleTextStyle: { fontSize: 18, color: '#002536' },
                seriesType: 'bars',
                tooltip: { trigger: 'selection' },
                aggregationTarget: 'category',
                series: chartSeries,
                colors: ['#54798d', '#ffd54b', '#002536'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#002536' } },
                vAxis: { format: '#', gridline: { count: -1 },
                        textStyle: { fontSize: 14, color: '#002536' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.ComboChart( chartElement );
            chart.draw( chartDataTable, chartOptions );

            setComboChartLegendSelection();

        },

        drawDayChart: ( dayData ) => {

            // 1. Add axes legend
            let chartDataArray = [ [ 'Horário do dia', 'Entrada', 'Saída', 'Fluxo' ] ];

            // 2. Add chart data
            for ( let i = 0; i < dayData.entrance.length; i++ ) {
                chartDataArray.push( [ dayData.entrance[i].period, dayData.entrance[i].value,
                        dayData.exit[i].value,
                        dayData.entrance[i].value - dayData.exit[i].value ] );
            }

            chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

            // 3. Set chart options
            chartSeries = { 0: {}, 1: {}, 2: { type: 'line' } };

            chartColumns = [];

            for ( let i = 0; i < chartDataTable.getNumberOfColumns(); i++ ) {
                chartColumns.push(i);
            }

            let titleDate = new Date( dayData.timestampFrom ).toLocaleDateString( 'pt-BR' );

            chartOptions = {
                title: 'Dia - ' + titleDate,
                titleTextStyle: { fontSize: 18, color: '#002536' },
                seriesType: 'bars',
                tooltip: { trigger: 'selection' },
                aggregationTarget: 'category',
                series: chartSeries,
                colors: ['#54798d', '#ffd54b', '#002536'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#002536' } },
                vAxis: { format: '#', gridline: { count: -1 },
                        textStyle: { fontSize: 14, color: '#002536' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.ComboChart( chartElement );
            chart.draw( chartDataTable, chartOptions );

            setComboChartLegendSelection();

        },

        drawWeekChart: ( weekData ) => {

            // 1. Add axes legend
            let chartDataArray = [ [ 'Dias da semana', 'Entrada' ] ];

            // 2. Add chart data
            weekData.entrance.forEach( d => chartDataArray.push( [ d.period, d.value ] ) );

            chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

            // 3. Set chart options
            let titleDateFrom = new Date( weekData.timestampFrom ).toLocaleDateString( 'pt-BR' );
            let titleDateTo = new Date( weekData.timestampTo ).toLocaleDateString( 'pt-BR' );

            chartOptions = {
                title: 'Semana - ' + titleDateFrom + ' à ' + titleDateTo,
                titleTextStyle: { fontSize: 18, color: '#002536' },
                colors: ['#274d60'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#002536' } },
                vAxis: { minValue: 0, format: '#', gridline: { count: -1 },
                        textStyle: { fontSize: 14, color: '#002536' } },
                chartArea: { width: '75%', height: '80%' }
            };

            // 4. Draw chart
            chart = new google.visualization.ColumnChart( chartElement );
            chart.draw( chartDataTable, chartOptions );

        },

        drawMonthChart: ( monthData ) => {

            // 1. Add axes legend
            let chartDataArray = [ [ 'Dias do mês', 'Entrada' ] ];

            // 2. Add chart data
            monthData.entrance.forEach( d => chartDataArray.push( [ d.period, d.value ] ) );

            chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

            let titleDateFrom = new Date( monthData.timestampFrom ).toLocaleDateString( 'pt-BR' );
            let titleDateTo = new Date( monthData.timestampTo ).toLocaleDateString( 'pt-BR' );

            // 3. Set chart options
            chartOptions = {
                title: 'Mês - ' + titleDateFrom + ' à ' + titleDateTo,
                titleTextStyle: { fontSize: 18, color: '#002536' },
                colors: ['#274d60'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#002536' } },
                vAxis: { minValue: 0, format: '#', gridline: { count: -1 },
                        textStyle: { fontSize: 14, color: '#002536' } },
                chartArea: { width: '75%', height: '80%' }
            };

            // 4. Draw chart
            chart = new google.visualization.ColumnChart( chartElement );
            chart.draw( chartDataTable, chartOptions );

        },

        drawYearChart: ( yearData ) => {

            // 1. Add axes legend
            let chartDataArray = [ [ 'Meses do ano', 'Entrada' ] ];

            // 2. Add chart data
            yearData.entrance.forEach( m => chartDataArray.push( [ m.period, m.value ] ) );

            chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

            // 3. Set chart options
            let titleDateFrom = new Date( yearData.timestampFrom ).toLocaleDateString( 'pt-BR', {
                month: '2-digit',
                year: 'numeric'
            });
            let titleDateTo = new Date( yearData.timestampTo ).toLocaleDateString( 'pt-BR', {
                month: '2-digit',
                year: 'numeric'
            });

            chartOptions = {
                title: 'Ano - ' + titleDateFrom + ' à ' + titleDateTo,
                titleTextStyle: { fontSize: 18, color: '#002536' },
                colors: ['#274d60'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#002536' } },
                vAxis: { format: '#', gridline: { count: -1 },
                        textStyle: { fontSize: 14, color: '#002536' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.LineChart( chartElement );
            chart.draw( chartDataTable, chartOptions );

        },

        redrawChart: () => {

            chart.draw( chartDataTable, chartOptions );

        }

    }

};
