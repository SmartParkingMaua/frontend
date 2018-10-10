'use strict';

const chart = (chartElement) => {
    let chart;
    let chartDataTable = {};
    let chartOptions = {};

    return {
        drawHourChart: (carsData) => {
            // 1. Add axes legend
            let chartDataArray = [['Minuto', 'Fluxo']];

            // 2. Add chart data
            for (let i = 0; i < carsData.entrada.length; i++) {
                chartDataArray.push([(5*(i+1))+'m',
                    Math.floor(Math.random() * carsData.entrada[i])
                    - Math.floor(Math.random() * carsData.saida[i])]);
            }

            chartDataTable = google.visualization.arrayToDataTable(chartDataArray);

            // 3. Set chart options
            chartOptions = {
                colors: ['#004684'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#053061' } },
                vAxis: { format: 'decimal', textStyle: { fontSize: 14, color: '#053061' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.LineChart(chartElement);
            chart.draw(chartDataTable, chartOptions);
        },

        drawDayChart: (carsData) => {
            // 1. Add axes legend
            let chartDataArray = [['Horário do dia', 'Fluxo']];
            
            // 2. Add chart data
            for (let i = 5; i < carsData.entrada.length; i++) {
                chartDataArray.push([(i+1)+'h',
                    Math.floor(Math.random() * carsData.entrada[i])
                    - Math.floor(Math.random() * carsData.saida[i])]);
            }

            chartDataTable = google.visualization.arrayToDataTable(chartDataArray);

            // 3. Set chart options
            chartOptions = {
                colors: ['#004684'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#053061' } },
                vAxis: { format: 'decimal', textStyle: { fontSize: 14, color: '#053061' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.LineChart(chartElement);
            chart.draw(chartDataTable, chartOptions);
        },

        drawAvailabilityChart: (lotsData) => {
            // 1. Add axes legend and lots data
            let lotsAvailable = 300 - (89 + 68);
            let lotsOccupied = 89 + 68;

            chartDataTable = new google.visualization.arrayToDataTable([
                ['Estado', 'Número de Carros'],
                ['Disponíveis', lotsAvailable], 
                ['Ocupadas', lotsOccupied]
            ]);

            // 2. Set chart options
            chartOptions = {
                colors: ['#004684', '#eda407'],
                chartArea: {top: '3%', width: '80%', height: '80%' },
                pieHole: 0.25,
                legend: { position: 'bottom', textStyle: { fontSize: 12, color: '#053061' } }
            };

            // 3. Draw chart
            chart = new google.visualization.PieChart(chartElement);
            chart.draw(chartDataTable, chartOptions);
        },

        redrawChart: () => {
            chart.draw(chartDataTable, chartOptions);
        }
    }
};