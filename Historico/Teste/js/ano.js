google.charts.load('current', {'packages':['corechart'],'language': 'pt'});
google.charts.setOnLoadCallback(drawAno);

function drawAno() {
  var data = new google.visualization.arrayToDataTable([
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

  var options = {
    title:'Ano',
    hAxis: {
      textStyle: {
        fontSize: 14,
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
    },
    curveType: 'function',
    pointSize: 10
  };

  var chart = new google.visualization.LineChart(document.getElementById('Ano_chart_div'));
  chart.draw(data, options);
}