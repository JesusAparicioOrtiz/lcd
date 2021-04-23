'use strict'

var varapiv1numbersController = require('./apiv1numbersControllerService');

module.exports.convertToLCD = function convertToLCD(req, res, next) {
  varapiv1numbersController.convertToLCD(req.swagger.params, res, next);
};

module.exports.corsSupport = function corsSupport(req, res, next) {
  varapiv1numbersController.corsSupport(req.swagger.params, res, next);
};