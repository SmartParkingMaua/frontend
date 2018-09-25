jQuery.datetimepicker.setLocale('pt');

jQuery('#calendario').datetimepicker({
    value: new Date(),
    format: 'd/m/Y H:00',
    closeOnDateSelect: true,
    mask: true
});

jQuery('#calendar_icon').click(function(){
    jQuery('#calendario').datetimepicker('show');
});