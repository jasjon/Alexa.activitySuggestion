var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');

// Drawing Handlers
var genericHelpStateHandler = Alexa.CreateStateHandler(constants.states.GENERICHELP, {

  'AMAZON.NoIntent': function () {
    // the user does not want any help tips
    this.handler.state = constants.states.STARTING;
    this.emit(':ask', 'no problem, let\'s get started: ' + constants.speakClause.HELPNEXTSTEPS);
    //options provided are tips, something to do or stop
  },
  'AMAZON.YesIntent': function () {
    // the user would like some tips
    this.emitWithState('DrawingTipsIntent');

  },

  'DrawingTipsIntent': function () {
    this.emit(':ask', constants.speakClause.HELPTIPSFORDRAWING, constants.speakClause.HELPNEXTSTEPS);
    //options provided are tips, something to do or stop
  },

  'Unhandled': function () {
    this.handler.state = constants.states.STARTING;
    this.emitWithState('RequestActivityDrawing');
  },

  'AMAZON.StopIntent': function () {
    this.handler.state = constants.states.STARTING;
    this.emitWithState('AMAZON.StopIntent');
  },


});

module.exports = genericHelpStateHandler;