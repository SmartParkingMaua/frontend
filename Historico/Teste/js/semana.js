google.charts.load('current', {'packages':['corechart'],'language': 'pt'});
google.charts.setOnLoadCallback(drawSemana);

function drawSemana() {
  var data = new google.visualization.arrayToDataTable([
    ['Dia da Semana', 'Entrada'],
    ['Seg',  3000],
    ['Ter',  3200],
    ['Qua',  2900],
    ['Qui',  3100],
    ['Sex',  2800],
    ['Sab',  1500],
    ['Dom',  500]  
  ]);

  var options = {
    title:'Semana',
    hAxis: {
      title: '',
      textStyle: {
        fontSize: 15,
        color: '#053061',
        bold: true,
        italic: false
      }
    },
    vAxis: {
      title: '',
      textStyle: {
        fontSize: 18,
        color: 'black',
        bold: false,
        italic: false
      }
    }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('Semana_chart_div'));
  chart.draw(data, options);
}