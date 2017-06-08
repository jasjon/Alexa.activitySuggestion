function doStuff() {

  var AWS = require('aws-sdk');
  var uuid = require('node-uuid');


  //set the region
  //AWS.config.update({ region: 'eu-west-1' });
  // Create an S3 client
  var s3 = new AWS.S3(); //{region: 'us-west-1'});

  // Create a bucket and upload something into it
  var bucketName = 'node-sdk-sample-rigur-1';// + uuid.v4();
  var keyName = 'hello_world3.txt';

  s3.createBucket({
    Bucket: bucketName,
    CreateBucketConfiguration: {
      LocationConstraint: "eu-west-1"
    }
  }, function () {
    var params = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
    s3.putObject(params, function (err, data) {
      if (err)
        console.log(err)
      else
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });
  });
}
function getBucketData(callback) {
  var AWS = require('aws-sdk');
  var s3 = new AWS.S3();
  var params = {
  Bucket: "node-sdk-sample-rigur-1", 
  Key: "drawingActivities-001.json"
 };
var output = {};
 s3.getObject(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     
   {
     //console.log(data); 
     var fileContents = data.Body.toString();
     var json = JSON.parse(fileContents);
      //console.log(json.items[1]);
      callback(json.items);
     
    }

    
    
              
 });
return output;
}

getBucketData(function(drawingIdeas2){

  var rndIndex = Math.floor(Math.random() * drawingIdeas2.length);
            console.log( drawingIdeas2[rndIndex].speechOutput);
});