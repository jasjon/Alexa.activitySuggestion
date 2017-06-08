module.exports = {

    getDrawingIdea: (callback, currentCounter) => {
        getDrawingIdeaFromS3(function (drawingIdeas) {
            var newCounter = -1;
            if (currentCounter !== undefined){
                newCounter = currentCounter;
            }
            if (++newCounter > drawingIdeas.length - 1){
                newCounter = 0;
            }
            //var rndIndex = Math.floor(Math.random() * drawingIdeas.length);
            callback(drawingIdeas[newCounter], newCounter);
        });

    },
    getGeneralIdea: () => {
        var rndIndex = Math.floor(Math.random() * generalIdeas.length);
        return generalIdeas[rndIndex];
    },
}

function getDrawingIdeaFromS3(callback) {
    var AWS = require('aws-sdk');
    var s3 = new AWS.S3();
    var params = {
        Bucket: "node-sdk-sample-rigur-1",
        Key: "drawingActivities-001.json"
    };

    s3.getObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            //console.log(data); 
            var fileContents = data.Body.toString();
            var json = JSON.parse(fileContents);
            console.log(json.items[1]);
            callback(json.items);
        }
    });
}



var generalIdeas = [

    {
        name: "Den",
        type: "General",
        speechOutput: "Create a secret den using the cushions from the sofa",
        speechTip: "Try to make it big enough for at least two people and don't forget that you will need a secret door",
        cardTitle: "A den!",
        cardContent: "Create a den",
        additionalText: "Make it defendable"
    },

    {
        name: "Copy",
        type: "General",
        speechOutput: "copy Create a secret den using the cushions from the sofa",
        speechTip: "copy Try to make it big enough for at least two people and don't forget that you will need a secret door",
        cardTitle: "copy A den!",
        cardContent: "copy Create a den",
        additionalText: "copy Make it defendable"
    }
];