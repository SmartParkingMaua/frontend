google.charts.load('current', {'packages':['corechart'],'language': 'pt'});
      google.charts.setOnLoadCallback(drawVisualization);

      function drawVisualization() {
        var data = google.visualization.arrayToDataTable([
         ['Horário do dia', 'Entrada', 'Saída', 'Fluxo'],
         ['5:00',  20,      5,         15],
         ['6:00',  200,      12,        188],
         ['7:00',  1570,      20,        1550],
         ['8:00',  1390,      2,        1388],
         ['9:00',  500,      100,        400],
         ['10:00',  500,      12,        488],
         ['11:00',  500,      112,        388],
         ['12:00',  500,      300,        200],
         ['13:00',  2000,      1500,        500],
         ['14:00',  800,      200,        600],
         ['15:00',  20,      150,        130],
         ['16:00',  20,      16,        4],
         ['17:00',  20,      32,        12],
         ['18:00',  800,      200,        600],
         ['19:00',  2000,      1510,        490],
         ['20:00',  20,      40,        20],
         ['21:00',  20,      60,        40],
         ['22:00',  20,      1110,        1090],
         ['23:00',  0,      10,         10],
         ['24:00',  0,      0,         0]
      ]);


      var columns = [];
      var series = {2: {type: 'line'}};
      for (var i = 0; i < data.getNumberOfColumns(); i++) {
        columns.push(i);
        if (i > 0 && i<3) {
            series[i - 1] = {};
        }
    }
        
      var options = {
        title: 'Dia',
        seriesType: 'bars',
        tooltip: {trigger: 'selection'},
        aggregationTarget: 'category',
      	series: series,
        colors: ['Green', 'Red','#004684'],
        hAxis: {
          title: '',
          textStyle: {
            fontSize: 14,
            color: '#053061',
            bold: true,
            italic: false
        }},
        vAxis: {
          title: '',
          textStyle: {
            fontSize: 18,
            color: 'black',
            bold: false,
            italic: false
         
        }},
      };


      var chart = new google.visualization.ComboChart(document.getElementById('Dia_chart_div'));
      chart.draw(data, options);
      
      google.visualization.events.addListener(chart, 'select', function () {
        var sel = chart.getSelection();
        if (sel.length > 0) {
            if (sel[0].row === null) {
                var col = sel[0].column;
                  if (columns[col] == col) {
                    columns[col] = {
                        label: data.getColumnLabel(col),
                        type: data.getColumnType(col),
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
                var view = new google.visualization.DataView(data);
                view.setColumns(columns);
                chart.draw(view, options);
              }
          }
      });
    }