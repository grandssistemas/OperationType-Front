require('../services/module');

module.exports = angular.module('app.businessrule.controllers', ['app.businessrule.services', 'ui.router', 'paymenttype.core'])
    .controller('BusinessRuleListController', require('./BusinessRuleListController'))
    .controller('BusinessRuleStepOneController', require('./BusinessRuleStepOneController'))
    .controller('BusinessRuleStepTwoController', require('./BusinessRuleStepTwoController'));
