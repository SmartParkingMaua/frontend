jQuery.datetimepicker.setLocale('pt');

jQuery('#hist-filter-datetime').datetimepicker({
    value: new Date(),
    format: 'd/m/Y H:00',
    closeOnDateSelect: true,
    mask: true,
    id: 'hist-filter-calendar',
    /**
     * The purpose of the function below is to centralize the calendar to avoid alignment issues
     * when opening the calendar on mobiles in landscape mode
     */
    onGenerate: function() {
        if (window.innerWidth < 992) { // Medium devices (tablets, less than 992px)
            var calendar = document.querySelector('#hist-filter-calendar');
            calendar.style.left = (window.innerWidth / 2 - calendar.offsetWidth / 2) + 'px';
            calendar.style.top = (window.innerHeight / 2 - calendar.offsetHeight / 2) + 'px';
            calendar.style.bottom = ''; // For some reason, the library messes up the calendar
                                        // height if you leave the bottom property with the
                                        // value assigned to it
        }
    }
});

jQuery('#hist-filter-datetime-icon').click(function() {
    jQuery('#hist-filter-datetime').datetimepicker('show');
});