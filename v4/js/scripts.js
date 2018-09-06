// calendario filtro
$(function() {
    $( "#calendario" ).datepicker({
    	showOn: "both",
        buttonImage: "calendario.png",
        buttonImageOnly: true,
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
    	changeYear: true,
    	showOtherMonths: true,
    	selectOtherMonths: true,
    	dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        minDate: new Date(2018, 1 - 1, 1),
        gotoCurrent: true
    });
});

function getTime() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 
	today = dd + '/' + mm + '/' + yyyy;
	return today;
}

$("#calendario").val(""+getTime());