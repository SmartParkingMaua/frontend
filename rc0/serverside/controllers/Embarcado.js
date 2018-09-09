'use strict';

var utils = require('../utils/writer.js');
var Embarcado = require('../service/EmbarcadoService');

module.exports.carrosPOST = function carrosPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Embarcado.carrosPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
