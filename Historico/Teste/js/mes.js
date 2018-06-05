 google.charts.load('current', {'packages':['corechart'],'language': 'pt'});

      google.charts.setOnLoadCallback(drawSemana1);
      google.charts.setOnLoadCallback(drawSemana2);
      google.charts.setOnLoadCallback(drawSemana3);
      google.charts.setOnLoadCallback(drawSemana4);
      google.charts.setOnLoadCallback(drawSemana5);


     function drawSemana1() {

        var data = new google.visualization.arrayToDataTable([
         ['Dia da Semana', 'Entrada de carros'],
         ['S',  3000],
         ['T',  3200],
         ['Q',  2900],
         ['Q',  3100],
         ['S',  2800],
         ['S',  1500],
         ['D',  500]  
      ]);

        var options = {title:'Semana 1',
                       width:400,
                       height:300,
                      hAxis: {
                      textStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: true,
                        italic: false
                    }},
                    vAxis: {
                      textStyle: {
                        fontSize: 16,
                        color: 'black',
                        bold: false,
                        italic: false
                     
                    }
                     }};

        var chart = new google.visualization.ColumnChart(document.getElementById('Semana1_chart_div'));
        chart.draw(data, options);
      }

     function drawSemana2() {

        var data = new google.visualization.arrayToDataTable([
         ['Dia da Semana', 'Entrada'],
         ['S',  3000],
         ['T',  3200],
         ['Q',  2900],
         ['Q',  3100],
         ['S',  2800],
         ['S',  1500],
         ['D',  500]  
      ]);

        var options = {title:'Semana 2',
                       width:400,
                       height:300,
                       hAxis: {
                      textStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: true,
                        italic: false
                    }},
                    vAxis: {
                      textStyle: {
                        fontSize: 16,
                        color: '#67001f',
                        bold: false,
                        italic: false
                     
                    }
                     }};

        var chart = new google.visualization.ColumnChart(document.getElementById('Semana2_chart_div'));
        chart.draw(data, options);
      }
      
      function drawSemana3() {

        var data = new google.visualization.arrayToDataTable([
         ['Dia da Semana', 'Entrada'],
         ['S',  3000],
         ['T',  3200],
         ['Q',  2900],
         ['Q',  3100],
         ['S',  2800],
         ['S',  1500],
         ['D',  500]  
      ]);

        var options = {title:'Semana 3',
                       width:400,
                       height:300,
                       hAxis: {
                      textStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: true,
                        italic: false
                    }},
                    vAxis: {
                      textStyle: {
                        fontSize: 16,
                        color: '#67001f',
                        bold: false,
                        italic: false
                     
                    }
                     }};

        var chart = new google.visualization.ColumnChart(document.getElementById('Semana3_chart_div'));
        chart.draw(data, options);
      }

      function drawSemana4() {

        var data = new google.visualization.arrayToDataTable([
         ['Dia da Semana', 'Entrada'],
         ['S',  3000],
         ['T',  3200],
         ['Q',  2900],
         ['Q',  3100],
         ['S',  2800],
         ['S',  1500],
         ['D',  500]  
      ]);

        var options = {title:'Semana 4',
                       width:400,
                       height:300,
                       hAxis: {
                      textStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: true,
                        italic: false
                    }},
                    vAxis: {
                      textStyle: {
                        fontSize: 16,
                        color: '#67001f',
                        bold: false,
                        italic: false
                     
                    }
                     }};
        var chart = new google.visualization.ColumnChart(document.getElementById('Semana4_chart_div'));
        chart.draw(data, options);
      } 
      function drawSemana5() {

        var data = new google.visualization.arrayToDataTable([
         ['Dia da Semana', 'Entrada'],
         ['S',  3000],
         ['T',  3200],
         ['Q',  2900],
         ['Q',  3100],
         ['S',  2800],
         ['S',  1500],
         ['D',  500]  
      ]);

        var options = {title:'Semana 5',
                       width:400,
                       height:300,
                       hAxis: {
                      textStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: true,
                        italic: false
                    }},
                    vAxis: {
                      textStyle: {
                        fontSize: 16,
                        color: '#67001f',
                        bold: false,
                        italic: false
                     
                    }
                     }};

        var chart = new google.visualization.ColumnChart(document.getElementById('Semana5_chart_div'));
        chart.draw(data, options);
      }