$(function() {
    $("#calendario").datepicker({
            showOn: "both",
            buttonImage: "css/calendario.png",
            buttonImageOnly: true,
            buttonText: "Selecione uma data",
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
            minDate: new Date(2018, 0, 1),
            gotoCurrent: true,
    });

    $('#filterModal').on('show.bs.modal', function (e) {
        $("#calendario").datepicker("setDate", new Date());
    })
});