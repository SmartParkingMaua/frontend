jQuery.datetimepicker.setLocale('pt');

jQuery('#hist-filter-datetime').datetimepicker({
    value: new Date(),
    format: 'd/m/Y H:00',
    closeOnDateSelect: true,
    mask: true
});

jQuery('#hist-filter-datetime-icon').click(function() {
    jQuery('#hist-filter-datetime').datetimepicker('show');
});