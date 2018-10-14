'use strict';

const chart = (chartElement) => {
    let chart;
    let chartDataTable = {};
    let chartOptions = {};
    let chartColumns = [];
    let chartSeries = {};

    let setComboChartLegendSelection = () => {
        google.visualization.events.addListener(chart, 'select', () => {
            let sel = chart.getSelection();

            if (sel.length > 0) {
                if (sel[0].row === null) {
                    let col = sel[0].column;

                    if (chartColumns[col] == col) {
                        chartColumns[col] = {
                            label: chartDataTable.getColumnLabel(col),
                            type: chartDataTable.getColumnType(col),
                            calc: function () {
                                return null;
                            }
                        };
                        chartSeries[col - 1].color = '#cccccc';
                    }
                    else {
                        chartColumns[col] = col;
                        chartSeries[col - 1].color = null;
                    }

                    let view = new google.visualization.DataView(chartDataTable);
                    view.setColumns(chartColumns);
                    chart.draw(view, chartOptions);
                }
            }
        });
    }

    return {
        drawHourChart: (hourData) => {
            // 1. Add axes legend
            let chartDataArray = [['Minuto', 'Entrada', 'Saída', 'Fluxo']];

            // 2. Add chart data
            for (let i = 0; i < hourData.entrada.length; i++) {
                chartDataArray.push([(5*(i+1))+'m', hourData.entrada[i], hourData.saida[i],
                    Math.floor(Math.random() * hourData.entrada[i])
                    - Math.floor(Math.random() * hourData.saida[i])]);
            }

            chartDataTable = google.visualization.arrayToDataTable(chartDataArray);
         
            // 3. Set chart options
            chartSeries = { 0: {}, 1: {}, 2: { type: 'line' } };

            chartColumns = [];

            for (let i = 0; i < chartDataTable.getNumberOfColumns(); i++) {
                chartColumns.push(i);
            }

            chartOptions = {
                seriesType: 'bars',
                tooltip: { trigger: 'selection' },
                aggregationTarget: 'category',
                series: chartSeries,
                colors: ['#97cfff', '#fcde9c','#004684'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#053061' } },
                vAxis: { format: 'decimal', textStyle: { fontSize: 14, color: '#053061' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.ComboChart(chartElement);
            chart.draw(chartDataTable, chartOptions);

            setComboChartLegendSelection();
        },

        drawDayChart: (dayData) => {
            // 1. Add axes legend
            let chartDataArray = [['Horário do dia', 'Entrada', 'Saída', 'Fluxo']];

            // 2. Add chart data
            for (let i = 0; i < dayData.entrada.length; i++) {
                chartDataArray.push([(i+1)+'h', dayData.entrada[i], dayData.saida[i],
                    Math.floor(Math.random() * dayData.entrada[i])
                    - Math.floor(Math.random() * dayData.saida[i])]);
            }

            chartDataTable = google.visualization.arrayToDataTable(chartDataArray);
            
            // 3. Set chart options
            chartSeries = { 0: {}, 1: {}, 2: { type: 'line' } };

            chartColumns = [];

            for (let i = 0; i < chartDataTable.getNumberOfColumns(); i++) {
                chartColumns.push(i);
            }

            chartOptions = {
                seriesType: 'bars',
                tooltip: { trigger: 'selection' },
                aggregationTarget: 'category',
                series: chartSeries,
                colors: ['#97cfff', '#fcde9c','#004684'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#053061' } },
                vAxis: { format: 'decimal', textStyle: { fontSize: 14, color: '#053061' } },
                chartArea: { width: '75%', height: '80%' },
                curveType: 'function',
                pointSize: 7
            };

            // 4. Draw chart
            chart = new google.visualization.ComboChart(chartElement);
            chart.draw(chartDataTable, chartOptions);

            setComboChartLegendSelection();
        },

        drawWeekChart: (timestamp) => (weekData) => {
            // 1. Add axes legend
            let chartDataArray = [['Dias da semana', 'Entrada']];

            // 2. Add chart data
            let date;

            for (let day in weekData) {
                date = new Date(timestamp).toISOString().slice(5,10).split('-');
                chartDataArray.push([date[1]+'/'+date[0],
                    weekData[day].entrada.reduce((acc, val) => acc + val)]);
                timestamp += 86400000; // Add one day to the current timestamp
            }

            chartDataTable = google.visualization.arrayToDataTable(chartDataArray);

            // 3. Set chart options
            chartOptions = {
                colors: ['#004684'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#053061' } },
                vAxis: { format: 'decimal', textStyle: { fontSize: 14, color: '#053061' } },
                chartArea: { width: '75%', height: '80%' }
            };
            
            // 4. Draw chart
            chart = new google.visualization.ColumnChart(chartElement);
            chart.draw(chartDataTable, chartOptions);
        },

        drawMonthChart: (timestamp) => (monthData) => {
            // 1. Add axes legend
            let chartDataArray = [['Dias do mês', 'Entrada']];

            // 2. Add chart data
            let i = 0;
            let date;

            for (let week in monthData) {
                for (let day in monthData[week]) {
                    if (i%7 === 0) {
                        date = new Date(timestamp).toISOString().slice(5,10).split('-');
                        chartDataArray.push([date[1]+'/'+date[0],
                            monthData[week][day].entrada.reduce((acc, val) => acc + val)]);
                        timestamp += 604800000; // Add one week to the current timestamp
                    }
                    else {
                        chartDataArray.push([day.slice(0,1).toUpperCase(),
                            monthData[week][day].entrada.reduce((acc, val) => acc + val)]);
                    }

                    i++;
                }
            }

            chartDataTable = google.visualization.arrayToDataTable(chartDataArray);

            // 3. Set chart options
            chartOptions = {
                colors: ['#004684'],
                hAxis: { maxAlternation: 1, textStyle: { fontSize: 12, color: '#053061' } },
                vAxis: { format: 'decimal', textStyle: { fontSize: 14, color: '#053061' } },
                chartArea: { width: '75%', height: '80%' }
            };
            
            // 4. Draw chart
            chart = new google.visualization.ColumnChart(chartElement);
            chart.draw(chartDataTable, chartOptions);
        },

        drawYearChart: (yearData) => {
            // 1. Add axes legend
            // let chartDataArray = [['Meses do ano', 'Entrada']];

            // 2. Add chart data
            // for (let month in yearData) {
            //     chartDataArray.push([month, yearData[month].entrada.reduce((acc, val) => acc + val)])
            // }

            // chartDataTable = google.visualization.arrayToDataTable(chartDataArray);
            
            chartDataTable = new google.visualization.arrayToDataTable([
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

        redrawChart: () => {
            chart.draw(chartDataTable, chartOptions);
        }
    }
};