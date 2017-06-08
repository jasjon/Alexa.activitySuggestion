var Alexa = require('alexa-sdk');

// Constants
var constants = require('../constants/constants');

// Drawing Handlers
var drawingStateHandlers = Alexa.CreateStateHandler(constants.states.DRAWINGACTIVITY, {
  'NewSession': function () {
    //if we are starting a new session in this state then we'd expect to have an activity already set
    this.emit(':ask' ,"It looks like you have a current activity, you can say 'repeat' to hear it again or 'new' to hear a new one")
  },
  
  'RequestActivityDrawing': function () {
    var activityIdeas = require('../helpers/activityIdeas');
    var currentCounter = this.attributes['currentCounter'];
    activityIdeas.getDrawingIdea((activityIdea, newCounter) => {
      this.attributes['activityIdea'] = activityIdea;
      this.attributes['currentCounter'] = newCounter;
      this.emit(':saveState', true);
      startDrawingActivity(activityIdea, this);
    }, currentCounter);
  },

  'RepeatIntent': function() {
    if (this.attributes['activityIdea'] !== undefined){
    startDrawingActivity(this.attributes['activityIdea'], this);
  } else {
    console.log('error: user has reached a repeat without an activityIdea');
      emitWithState('RequestActivityDrawing');
    }
  },



  'RequestNotFound': function () {
    this.handler.state = constants.states.STARTING;
    this.emitWithState('RequestNotFound');
  },

  'AMAZON.NoIntent': function () {
    switch (this.attributes['DrawingDialog']) {
      case 'DrawingHelp':
        this.attributes['DrawingDialog'] = 'AnotherDrawing';
        this.emit(':ask', 'Would you like another drawing?');
        break;
      case 'AnotherDrawing':
        // State Automatically Saved with :tell
        this.handler.state = constants.states.STARTING;
        this.emit(':tell', 'OK, see you soon!');
        break;
      case 'StartDrawing':
        // State Automatically Saved with :tell
        this.handler.state = constants.states.STARTING;
        this.emit(':tell', 'OK, good luck!');
        break;
      default:
        this.emitWithState('AMAZON.HelpIntent');
    }
  },

  'AMAZON.YesIntent': function () {
    switch (this.attributes['DrawingDialog']) {
      case 'DrawingHelp':
        //user has asked to hear the task again
        this.emitWithState('HearDrawingAgain');
        break;
      case 'StartDrawing':
        //user has been asked if they would like a tip
        var activity = this.attributes['activityIdea']
        this.emit(':tell', activity.speechTip);
        break;
      case 'AnotherDrawing':
        this.emitWithState('RequestActivityDrawing');
        break;

    }
  },

  'HearDrawingAgain': function () {
    startDrawingActivity(this.attributes['activityIdea'], this);
  },

  'Unhandled': function () {
    this.attributes['DrawingDialog'] = 'FromUnhandled';
    this.emit(':ask', 'I\'m sorry, I didn\'t get that, you can say help to hear the drawing again.');
  },

  'AMAZON.HelpIntent': function () {
    if (this.attributes['DrawingDialog'] === 'FromUnhandled') {
      this.emitWithState('RequestActivityDrawing');
    } else {
      this.emit(':ask', "You can ask for a new drawing idea by saying 'new' or say 'repeat' to hear the current one.", "As you already have a drawing idea, would you like to hear it again?");
    }
  },

  'AMAZON.StopIntent': function () {
    this.handler.state = constants.states.STARTING;
    this.emit('AMAZON.StopIntent');
  },

  'AMAZON.CancelIntent': function () {
    this.handler.state = constants.states.STARTING;
    this.emit('AMAZON.CancelIntent');
  },

  'SessionEndedRequest': function () {
    this.handler.state = constants.states.STARTING;
    this.emit('SessionEndedRequest');
  },

});

module.exports = drawingStateHandlers;


function startDrawingActivity(activityIdea, selfScope) {
  var speechFull = "Could you please " + activityIdea.speechOutput + "? " + constants.speakClause.SOMETIPS;
  selfScope.attributes['DrawingDialog'] = 'StartDrawing';
  selfScope.emit(':askWithCard',
    speechFull,
    constants.speakClause.SOMETIPS,
    activityIdea.cardTitle,
    activityIdea.cardContent);
}