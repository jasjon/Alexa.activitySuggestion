var Alexa = require('alexa-sdk');
var converter = require('helpers/convert');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};


var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Converter!', 'Ask me to convert from Kilos to Pounds');
  },
  'ConvertWeightFromKg': function(){
    var conversionFormat = this.event.request.intent.slots.conversionFormat.value;
    var fromNumberSlot = this.event.request.intent.slots.fromNumber.value;
    var fromNumberDecimal = this.event.request.intent.slots.fromNumberDecimal.value;
    var fromNumberDecimalReal = !isNaN(parseFloat(fromNumberDecimal)) && isFinite(fromNumberDecimal) ? parseFloat(fromNumberDecimal) : 0;
    var convertDirection = '';
    var toNumber;
    var answerText = 'That is ';

    if (isNaN(parseFloat(fromNumberSlot))) {
      this.emit(':tell', "I'm sorry, I didn't get that");
      return;
    }

    switch (conversionFormat){
      case 'pounds':
        convertDirection = 'kg2lbs';
        toNumber = converter(convertDirection, fromNumberSlot, fromNumberDecimalReal);
        answerText += `${toNumber.intPart} point <say-as interpret-as="digits">${toNumber.decPart}</say-as> pounds`
        break;
      case 'stones and pounds':
        convertDirection = 'kg2stlbs';
        toNumber = converter(convertDirection, fromNumberSlot, fromNumberDecimalReal);
        answerText += `${toNumber.intPart} stone and ${toNumber.decPart} pounds`
        break;
      case 'stones':
        convertDirection = 'kg2st';
        toNumber = converter(convertDirection, fromNumberSlot, fromNumberDecimalReal);
        answerText += `${toNumber.intPart} point <say-as interpret-as="digits">${toNumber.decPart}</say-as> stone`
        break;
      default:
        answerText = "I'm sorry, I cant convert into that format.";
        break;
    }

    
    this.emit(':tell', answerText);
  }

};
