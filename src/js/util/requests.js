'use strict';

var Request;

(() => {

    const baseUrl = 'http://localhost:8080/v1/parkings';

    let instance;

    Request = function Request() {

        if ( instance ) {
            return instance;
        }

        instance = this;

        /**
         * Http request using GET method for general purposes. If the request succeed,
         * the passed callback function is called
         */
        const getRequest = ( url, callback ) => {

            let xhr = new XMLHttpRequest();
            
            if ( window.XMLHttpRequest ) {
                // code for modern browsers
                let xhr = new XMLHttpRequest();
            } else {
                // code for old IE browsers
                let xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
            }

            xhr.open( 'GET', url, true );

            xhr.onreadystatechange = function() {
                if ( this.readyState == 4 ) {
                    if ( this.status >= 200 && this.status < 400 ) {
                        callback( this.responseText );
                    }
                    else {
                        throw new Error( this.error );
                    }
                }
            };

            xhr.onerror =  function() {
                throw new Error( this.error );
            };

            xhr.send();

        }

        this.getParkings = ( callback ) => {
    
            getRequest( baseUrl, data => callback( JSON.parse( data ) ) );

        }

        this.getDataByHour = ( id, timestamp, callback ) => {

            let url = baseUrl + '/' + id + '/findByHour?timestamp=' + timestamp;

            getRequest( url, data => callback( JSON.parse( data ) ) );

        }

        this.getDataByDay = ( id, timestamp, callback ) => {

            let url = baseUrl + '/' + id + '/findByDay?timestamp=' + timestamp;

            getRequest( url, data => callback( JSON.parse( data ) ) );

        }

        this.getDataByWeek = ( id, timestamp, callback ) => {

            let url = baseUrl + '/' + id + '/findByWeek?timestamp=' + timestamp;

            getRequest( url, data => callback( JSON.parse( data ) ) );

        }

        this.getDataByMonth = ( id, timestamp, callback ) => {

            let url = baseUrl + '/' + id + '/findByMonth?timestamp=' + timestamp;

            getRequest( url, data => callback( JSON.parse( data ) ) );

        }

        this.getDataByYear = ( id, timestamp, callback ) => {

            let url = baseUrl + '/' + id + '/findByYear?timestamp=' + timestamp;

            getRequest( url, data => callback( JSON.parse( data ) ) );

        }

        return instance;

    }

})();
