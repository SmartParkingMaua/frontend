'use strict';

(() => {

  const commonProps = {
    language: 'pt-br',
    startDate: new Date('2018-01-01 00:00:00.000'),
    endDate: new Date()
  }

  // Initialize datepicker element
  $('#hist-filter-datetime').fdatepicker({
    ...commonProps,
    format: 'dd/mm/yyyy',
    pickTime: false,
    initialDate: new Date(),
    startView: 'month',
    minView: 'month'
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
        ...commonProps,
        format: 'dd/mm/yyyy hh:ii',
        pickTime: true,
        initialDate: new Date(        // Here's necessary to specify the date
            new Date().getFullYear(), // like that so we can get an hour with
            new Date().getMonth(),    // no minutes, like this 18:00. Otherwise,
            new Date().getDate(),     // we would get something like 18:33,
            new Date().getHours()     // which would mess up our hour picker
          ),
        startView: 'day',
        minView: 'day',
      });
    } else if ( selectedPeriodName === 'Ano' ) {
      $('#hist-filter-datetime').fdatepicker({
        ...commonProps,
        format: 'mm/yyyy',
        pickTime: false,
        initialDate: new Date(),
        startView: 'year',
        minView: 'year'
      });
    } else {
      $('#hist-filter-datetime').fdatepicker({
        ...commonProps,
        format: 'dd/mm/yyyy',
        pickTime: false,
        initialDate: new Date(),
        startView: 'month',
        minView: 'month'
      });
    }
  });

})();
