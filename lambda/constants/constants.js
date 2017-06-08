var constants = Object.freeze({

  // App-ID. restrain to this invocation only
  appId : 'amzn1.ask.skill.8516d86c-ca44-4b2e-a7fc-70d62cbba82a',

  //  DynamoDB Table Name
  dynamoDBTableName : 'ActivitySuggestions',

  // Skill States
  states : {
    STARTING : '',
    DRAWINGACTIVITY : '_DRAWINGACTIVITY',
    GENERICHELP : '_GENERICHELP'
  },

  speakClause : {
      SOMETIPS: "would you like to hear the tip?",
      HELPGENERIC: "we start when you say things like 'give me something to do' or 'something to draw'.  I will then ask you to draw something and when you are finished you should display it and then ask me for another one.",
      HELPNEXTSTEPS: "You can ask me for an idea of something to draw, say 'tips' for a handy tip or say stop to quit."
  }

});

module.exports = constants;
