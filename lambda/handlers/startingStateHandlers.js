var Alexa = require('alexa-sdk');
var activityIdeas = require('../helpers/activityIdeas');
// Constants
var constants = require('../constants/constants');

// Drawing Handlers
var startingStateHandlers = Alexa.CreateStateHandler(constants.states.STARTING, {


  'NewSession': function () {
    this.emitWithState('LaunchRequest');

  },

  'RequestActivityDrawing': function () {
    var activityIdea = this.attributes['activityIdea'];
    this.handler.state = constants.states.DRAWINGACTIVITY;

    if (activityIdea !== undefined) {
      var speech = 'You have a current drawing, would you like to hear it again?';
      this.attributes['DrawingDialog'] = 'DrawingHelp';
      this.emit(':ask', speech);
    } else {
      this.emitWithState('RequestActivityDrawing');
    }
  },
  'RequestNotFound': function () {
    this.emitWithState('AMAZON.HelpIntent');
  },

  'LaunchRequest': function () {
    this.emit(':ask', 'Hello, you can start by asking me for something to draw.', 'if you are stuck say help to get some instructions');
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye!');
  },

  'SessionEndedRequest': function () {
    // Force State to Save when the user times out
    this.emit(':saveState', true);
  },

  'AMAZON.HelpIntent': function () {
    this.emit(':ask', constants.speakClause.HELPGENERIC, 'Would you like some handy tips?');
  },

  'Unhandled': function () {
    this.emitWithState('AMAZON.HelpIntent');
  }


});

module.exports = startingStateHandlers;