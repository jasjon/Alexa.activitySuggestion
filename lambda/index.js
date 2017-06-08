var Alexa = require('alexa-sdk');
var constants = require('./constants/constants.js');
var drawingStateHandlers = require('./handlers/drawingStateHandlers');
var startingStateHandlers = require('./handlers/startingStateHandlers');
var genericHelpStateHandler = require('./handlers/genericHelpStateHandler');

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(drawingStateHandlers, startingStateHandlers, genericHelpStateHandler);
  alexa.appId = constants.appId;
  alexa.dynamoDBTableName = constants.dynamoDBTableName;
  alexa.execute();
};

