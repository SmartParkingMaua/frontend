'use strict';

var utils = require('../utils/writer.js');
var Front = require('../service/FrontService');

module.exports.estacionamentosGET = function estacionamentosGET (req, res, next) {
  Front.estacionamentosGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.estacionamentosIdFindByDayGET = function estacionamentosIdFindByDayGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var timestamp = req.swagger.params['timestamp'].value;
  Front.estacionamentosIdFindByDayGET(id,timestamp)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.estacionamentosIdFindByHourGET = function estacionamentosIdFindByHourGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var timestamp = req.swagger.params['timestamp'].value;
  Front.estacionamentosIdFindByHourGET(id,timestamp)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.estacionamentosIdFindByMonthGET = function estacionamentosIdFindByMonthGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var timestamp = req.swagger.params['timestamp'].value;
  Front.estacionamentosIdFindByMonthGET(id,timestamp)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.estacionamentosIdFindByWeekGET = function estacionamentosIdFindByWeekGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  var timestamp = req.swagger.params['timestamp'].value;
  Front.estacionamentosIdFindByWeekGET(id,timestamp)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
