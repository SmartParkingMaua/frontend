'use strict';

(() => {

    $( '#hist-filter-datetime' ).fdatepicker({
        format: 'dd/mm/yyyy',
        language: 'pt-br',
        pickTime: false,
        initialDate: new Date(),
        startView: 'month',
        minView: 'month'
    });

    $( '#hist-filter-datetime-icon' ).click( function() {

        $( '#hist-filter-datetime' ).fdatepicker( 'show' );

    });

    $( '#hist-filter-period' ).change( function() {

        let selectedPeriodName = document.querySelector( '#hist-filter-period' ).value;
        $( '#hist-filter-datetime' ).fdatepicker( 'remove' );

        if ( selectedPeriodName === 'Hora' ) {
            $( '#hist-filter-datetime' ).fdatepicker({
                format: 'dd/mm/yyyy hh:ii',
                language: 'pt-br',
                pickTime: true,
                initialDate: new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ),
                startView: 'day',
                minView: 'day'
            });
        }
        else if ( selectedPeriodName === 'Ano' ) {
            $( '#hist-filter-datetime' ).fdatepicker({
                format: 'mm/yyyy',
                language: 'pt-br',
                pickTime: false,
                initialDate: new Date(),
                startView: 'year',
                minView: 'year'
            });
        }
        else {
            $( '#hist-filter-datetime' ).fdatepicker({
                format: 'dd/mm/yyyy',
                language: 'pt-br',
                pickTime: false,
                initialDate: new Date(),
                startView: 'month',
                minView: 'month'
            });
        }

    });

})();
