'use strict';

const Charts = function(chartElement) {
    let _chart;
    let _chartData = {};
    let _chartOptions = {};
    let _chartColumns = [];
    let _chartSeries = {};

    let setChartSelectionEvent = function() {
        // Make the chart columns/lines selectable
        google.visualization.events.addListener(_chart, 'select', function () {
            let sel = _chart.getSelection();

            if (sel.length > 0) {
                if (sel[0].row === null) {
                    let col = sel[0].column;

                    if (_chartColumns[col] == col) {
                        _chartColumns[col] = {
                            label: _chartData.getColumnLabel(col),
                            type: _chartData.getColumnType(col),
                            calc: function () {
                                return null;
                            }
                        };
                        _chartSeries[col - 1].color = '#cccccc';
                    }
                    else {
                        _chartColumns[col] = col;
                        _chartSeries[col - 1].color = null;
                    }

                    let view = new google.visualization.DataView(_chartData);
                    view.setColumns(_chartColumns);
                    _chart.draw(view, _chartOptions);
                }
            }
        });
    }

    this.updateHourChart = function(data) {
        // Add chart legend
        let dataArray = [['Minuto', 'Entrada', 'Saída', 'Fluxo']];

        // Add chart data
        for (let i = 0; i < data.entrada.length; i++) {
            dataArray.push([(5*(i+1))+'m', data.entrada[i], data.saida[i], Math.floor(Math.random() * data.entrada[i]) - Math.floor(Math.random() * data.saida[i])]);
        }

        _chartData = google.visualization.arrayToDataTable(dataArray);

        _chartColumns = [];
        _chartSeries = {0: {}, 1: {}, 2: {type: 'line'}};

        for (let i = 0; i < _chartData.getNumberOfColumns(); i++) {
            _chartColumns.push(i);
            if (i > 0 && i < 3) {
                _chartSeries[i - 1] = {};
            }
        }

        // Add chart options
        _chartOptions = {
            seriesType: 'bars',
            tooltip: { trigger: 'selection' },
            aggregationTarget: 'category',
            series: _chartSeries,
            colors: ['#77cfff', '#eda477','#004684'],
            hAxis: { textStyle: { fontSize: 12, color: '#053061' } },
            vAxis: { textStyle: { fontSize: 14, color: '#053061' } },
            curveType: 'function',
            pointSize: 7
        };

        // Draw chart
        _chart = new google.visualization.ComboChart(chartElement);
        _chart.draw(_chartData, _chartOptions);

        setChartSelectionEvent();
    }

    this.updateDayChart = function(data) {
        // Add chart legend
        let dataArray = [['Horário do dia', 'Entrada', 'Saída', 'Fluxo']];

        // Add chart data
        for (let i = 0; i < data.entrada.length; i++) {
            dataArray.push([i+'h', data.entrada[i], data.saida[i], Math.floor(Math.random() * data.entrada[i]) - Math.floor(Math.random() * data.saida[i])]);
        }

        _chartData = google.visualization.arrayToDataTable(dataArray);

        _chartColumns = [];
        
        _chartSeries = {0: {}, 1: {}, 2: {type: 'line'}};

        for (let i = 0; i < _chartData.getNumberOfColumns(); i++) {
            _chartColumns.push(i);
        }

        // Add chart options
        _chartOptions = {
            seriesType: 'bars',
            tooltip: { trigger: 'selection' },
            aggregationTarget: 'category',
            series: _chartSeries,
            colors: ['#77cfff', '#eda477','#004684'],
            hAxis: { textStyle: { fontSize: 12, color: '#053061' } },
            vAxis: { textStyle: { fontSize: 14, color: '#053061' } },
            curveType: 'function',
            pointSize: 7
        };

        // Draw chart
        _chart = new google.visualization.ComboChart(chartElement);
        _chart.draw(_chartData, _chartOptions);

        setChartSelectionEvent();
    }

    this.updateWeekChart = function(data) {
        // Add chart legend
        let dataArray = [['Dias da semana', 'Entrada']];

        // Add chart data
        for (let d in data) {
            dataArray.push([d.slice(0,3).toUpperCase(), data[d].entrada.reduce((acc, val) => acc + val)])
        }

        _chartData = google.visualization.arrayToDataTable(dataArray);
        _chartSeries = {0: {}};

        _chartOptions = {
            series: _chartSeries,
            colors: ['#004684'],
            hAxis: { textStyle: { fontSize: 12, color: '#053061' } },
            vAxis: { textStyle: { fontSize: 14, color: '#053061' } }
        };
        
        _chart = new google.visualization.ColumnChart(chartElement);
        _chart.draw(_chartData, _chartOptions);
    }

    this.updateMonthChart = function(data) {
        // Add chart legend
        let dataArray = [['Dias do mês', 'Entrada']];

        // Add chart data
        for (let w in data) {
            for (let d in data[w]) {
                dataArray.push([d.slice(0,1).toUpperCase(), data[w][d].entrada.reduce((acc, val) => acc + val)])
            }    
        }

        _chartData = google.visualization.arrayToDataTable(dataArray);

        _chartSeries = {0: {}};

        _chartOptions = {
            series: _chartSeries,
            colors: ['#004684'],
            hAxis: { textStyle: { fontSize: 12, color: '#053061' } },
            vAxis: { textStyle: { fontSize: 14, color: '#053061' } }
        };
        
        _chart = new google.visualization.ColumnChart(chartElement);
        _chart.draw(_chartData, _chartOptions);
    }

    this.updateYearChart = function(data) {
        // // Add chart legend
        // let dataArray = [['Meses do ano', 'Entrada']];

        // // Add chart data
        // for (let m in data) {
        //     dataArray.push([m, data[m].entrada.reduce((acc, val) => acc + val)])
        // }

        // _chartData = google.visualization.arrayToDataTable(dataArray);
        
        _chartData = new google.visualization.arrayToDataTable([
            ['Meses do ano', 'Entrada'],
            ['Jan',  3000],
            ['Fev',  3200],
            ['Mar',  2900],
            ['Abr',  3100],
            ['Mai',  2800],
            ['Jun',  1500],
            ['Jul',  500],
            ['Ago',  1500],
            ['Set',  1500],  
            ['Out',  1500],
            ['Nov',  1500],
            ['Dez',  1500]
        ]);

        _chartSeries = {0: {type: 'line'}};

        _chartOptions = {
            series: _chartSeries,
            colors: ['#004684'],
            hAxis: { textStyle: { fontSize: 12, color: '#053061' } },
            vAxis: { textStyle: { fontSize: 14, color: '#053061' } },
            curveType: 'function',
            pointSize: 7
        };

        _chart = new google.visualization.LineChart(chartElement);
        _chart.draw(_chartData, _chartOptions);
    }
    
    this.redrawChart = function() {
        _chart.draw(_chartData, _chartOptions);
    }

    return this;
};