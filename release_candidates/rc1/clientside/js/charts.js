var Charts;

(function() {
    var _chartData = {};
    var _chartOptions = {};

    Charts = function Charts(chartElement) {
        this.updateHourChart = function(data) {
            console.log("Update Estacionamentos By Hour");
            console.log(data);
        }

        this.updateDayChart = function(data) {
            console.log("Update Estacionamentos By Day");
            console.log(data);

            // Add chart legend
            var dataArray = [['Horário do dia', 'Entrada', 'Saída', 'Fluxo']];

            // Add chart data
            for (let i = 0; i < data.entrada.length; i++) {
                dataArray.push([i+'h', data.entrada[i], data.saida[i], data.entrada[i] - data.saida[i]]);
            }

            _chartData = google.visualization.arrayToDataTable(dataArray);

            var columns = [];
            var series = {2: {type: 'line'}};

            for (var i = 0; i < _chartData.getNumberOfColumns(); i++) {
                columns.push(i);
                if (i > 0 && i<3) {
                    series[i - 1] = {};
                }
            }

            // Add chart options
            _chartOptions = {
                title: 'Dia',
                seriesType: 'bars',
                tooltip: {trigger: 'selection'},
                aggregationTarget: 'category',
                series: series,
                colors: ['Green', 'Red','#004684'],
                hAxis: {
                    title: '',
                    textStyle: {
                        fontSize: 12,
                        color: '#053061',
                        bold: true,
                        italic: false
                    }
                },
                vAxis: {
                    title: '',
                    textStyle: {
                        fontSize: 16,
                        color: 'black',
                        bold: false,
                        italic: false
                    }
                },
            };

            // Draw chart
            var chart = new google.visualization.ComboChart(chartElement);
            chart.draw(_chartData, _chartOptions);

            // Make the chart columns/lines selectable
            google.visualization.events.addListener(chart, 'select', function () {
                var sel = chart.getSelection();
                if (sel.length > 0) {
                    if (sel[0].row === null) {
                        var col = sel[0].column;
                        if (columns[col] == col) {
                            columns[col] = {
                                label: _chartData.getColumnLabel(col),
                                type: _chartData.getColumnType(col),
                                calc: function () {
                                    return null;
                                    }
                            };
                        series[col - 1].color = '#CCCCCC';
                        }
                        else {
                        columns[col] = col;
                        series[col - 1].color = null;
                        }
                        var view = new google.visualization.DataView(_chartData);
                        view.setColumns(columns);
                        chart.draw(view, _chartOptions);
                    }
                }
            });

            // Make the chart responsive
            window.onresize = function() {
                var chart = new google.visualization.ComboChart(chartElement);
                chart.draw(_chartData, _chartOptions);
            };
        }

        this.updateWeekChart = function(data) {
            console.log("Update Estacionamentos By Week");
            console.log(data);
        }

        this.updateMonthChart = function(data) {
            console.log("Update Estacionamentos By Month");
            console.log(data);
        }

        this.updateYearChart = function(data) {
            console.log("Update Estacionamentos By Year");
            console.log(data);
        }

        return this;
    }
}());