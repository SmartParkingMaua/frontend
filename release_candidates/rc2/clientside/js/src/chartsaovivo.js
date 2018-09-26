'use strict';

const Charts = function(chartElement) {
    let _chart;
    let _chartData = {};
    let _chartOptions = {};
    let _chartColumns = [];
    let _chartSeries = {};

    this.updateHourChart = function(data) {
        // Add chart legend
        let dataArray = [['Minuto', 'Fluxo']];

        // Add chart data
        for (let i = 0; i < data.entrada.length; i++) {
            dataArray.push([(5*(i+1))+'m', Math.floor(Math.random() * data.entrada[i]) - Math.floor(Math.random() * data.saida[i])]);
        }

        _chartData = google.visualization.arrayToDataTable(dataArray);

        _chartSeries = {0: {type: 'line'}};

        // Add chart options
        _chartOptions = {
            series: _chartSeries,
            colors: ['#004684'],
            hAxis: { textStyle: { fontSize: 12, color: '#053061' } },
            vAxis: { textStyle: { fontSize: 14, color: '#053061' } },
            curveType: 'function',
            pointSize: 7
        };

        // Draw chart
        _chart = new google.visualization.LineChart(chartElement);
        _chart.draw(_chartData, _chartOptions);
    }

    this.updateDayChart = function(data) {
        // Add chart legend
        let dataArray = [['Horário do dia', 'Fluxo']];

        // Add chart data
        for (let i = 5; i < data.entrada.length; i++) {
            dataArray.push([i+'h', Math.floor(Math.random() * data.entrada[i]) - Math.floor(Math.random() * data.saida[i])]);
        }

        dataArray.push(['0h', Math.floor(Math.random() * data.entrada[0]) - Math.floor(Math.random() * data.saida[0])]);

        _chartData = google.visualization.arrayToDataTable(dataArray);

        _chartSeries = {0: {type: 'line'}};

        // Add chart options
        _chartOptions = {
            series: _chartSeries,
            colors: ['#004684'],
            hAxis: { textStyle: { fontSize: 12, color: '#053061' } },
            vAxis: { textStyle: { fontSize: 14, color: '#053061' } },
            curveType: 'function',
            pointSize: 7
        };

        // Draw chart
        _chart = new google.visualization.LineChart(chartElement);
        _chart.draw(_chartData, _chartOptions);
    }

    this.updateAvailabilityChart = function(data) {
        let vagasDispo = 300 - (89 + 68);
        let vagasOcu = 89 + 68;
        
        _chartData = new google.visualization.arrayToDataTable([
            ['Estado', 'Número de Carros'],
            ['Disponíveis', vagasDispo], 
            ['Ocupadas', vagasOcu]
        ]);

        _chartSeries = {0: {}, 1: {}};

        _chartOptions = {
            series: _chartSeries,
            colors: ['#004684', '#eda407'],
            pieHole: 0.25,
            legend: { position: 'bottom' }
        };

        _chart = new google.visualization.PieChart(chartElement);
        _chart.draw(_chartData, _chartOptions);
    }

    this.redrawChart = function() {
        _chart.draw(_chartData, _chartOptions);
    }

    return this;
};