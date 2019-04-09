'use strict';

(() => {

  // Initialize datepicker element
  $('#hist-filter-datetime').fdatepicker({
    format: 'dd/mm/yyyy',
    language: 'pt-br',
    pickTime: false,
    initialDate: new Date(),
    startView: 'month',
    minView: 'month',
    startDate: new Date('2018-01-01 00:00:00.000'),
    endDate: new Date()
  });

  // Add event to show datepicker element when calendar icon is clicked
  $('#hist-filter-datetime-icon').click(function() {
    $('#hist-filter-datetime').fdatepicker('show');
  });

  // Handle the different calendar formats shown
  $('#hist-filter-period').change(function() {
    let selectedPeriodName = $('#hist-filter-period')[0].value;

    $('#hist-filter-datetime').fdatepicker('remove');

    if ( selectedPeriodName === 'Hora' ) {
      $('#hist-filter-datetime').fdatepicker({
        format: 'dd/mm/yyyy hh:ii',
        language: 'pt-br',
        pickTime: true,
        // Here's necessary to specify the date like that so we can get
        // an hour with no minutes, like this 18:00. Otherwise, we would
        // get something like 18:33, which would mess up our hour picker
        initialDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            new Date().getHours()
          ),
        startView: 'day',
        minView: 'day',
        startDate: new Date('2018-01-01 00:00:00.000'),
        endDate: new Date()
      });
    } else if ( selectedPeriodName === 'Ano' ) {
      $('#hist-filter-datetime').fdatepicker({
        format: 'mm/yyyy',
        language: 'pt-br',
        pickTime: false,
        initialDate: new Date(),
        startView: 'year',
        minView: 'year',
        startDate: new Date('2018-01-01 00:00:00.000'),
        endDate: new Date()
      });
    } else {
      $('#hist-filter-datetime').fdatepicker({
        format: 'dd/mm/yyyy',
        language: 'pt-br',
        pickTime: false,
        initialDate: new Date(),
        startView: 'month',
        minView: 'month',
        startDate: new Date('2018-01-01 00:00:00.000'),
        endDate: new Date()
      });
    }
  });

})();
