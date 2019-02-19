'use strict';

const Chart = ( chartElement ) => {

    let chart;
    let chartDataTable = {};
    let chartOptions = {};

    return {

        drawHourChart: ( hourData ) => {

            // 1. Add axes legend
            let chartDataArray = [ [ 'Minuto', 'Fluxo' ] ];

            // 2. Add chart data
            for ( let i = 0; i < hourData.entrance.length; i++ ) {
                chartDataArray.push( [ hourData.entrance[i].period,
                    hourData.entrance[i].value - hourData.exit[i].value ] );
            }

            chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

            // 3. Set chart options
            chartOptions = {
                colors: [ '#004684' ],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#053061' } },
                vAxis: { format: '#', gridline: { count: -1 },
                    textStyle: { fontSize: 14, color: '#053061' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.LineChart( chartElement );
            chart.draw( chartDataTable, chartOptions );

        },

        drawDayChart: ( dayData ) => {

            // 1. Add axes legend
            let chartDataArray = [ [ 'Horário do dia', 'Fluxo' ] ];

            // 2. Add chart data
            for ( let i = 0; i < dayData.entrance.length; i++ ) {
                chartDataArray.push( [ dayData.entrance[i].period,
                    dayData.entrance[i].value - dayData.exit[i].value ] );
            }

            chartDataTable = google.visualization.arrayToDataTable( chartDataArray );

            // 3. Set chart options
            chartOptions = {
                colors: [ '#274d60' ],
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

        drawAvailabilityChart: ( parkingId ) => ( parkingsData ) => {

            // 1. Add axes legend and lots data
            let parking = parkingsData.parkings.find( ( { id } ) => id === parkingId );
            let lotsOccupied = parking.lots.occupied;
            let lotsAvailable = parking.lots.max - lotsOccupied;

            chartDataTable = new google.visualization.arrayToDataTable([
                [ 'Estado', 'Número de Carros' ],
                [ 'Disponíveis', lotsAvailable ], 
                [ 'Ocupadas', lotsOccupied ]
            ]);

            // 2. Set chart options
            chartOptions = {
                colors: [ '#274d60', '#eda407' ],
                chartArea: { top: '3%', width: '75%', height: '80%' },
                pieHole: 0.25,
                legend: { position: 'bottom', textStyle: { fontSize: 14, color: '#002536' } }
            };

            // 3. Draw chart
            chart = new google.visualization.PieChart( chartElement );
            chart.draw( chartDataTable, chartOptions );

        },

        redrawChart: () => {

            chart.draw( chartDataTable, chartOptions );

        }

    }

};
