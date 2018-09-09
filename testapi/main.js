var SmartParking = require('smart_parking');

var api = new SmartParking.FrontApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data:', data);
  }
};
api.estacionamentosGet(callback);
