$(document).ready(function(){

var config = {
    apiKey: "AIzaSyB2hLnPNmohKEZtBiNsl6SjDx3dq2RAx38",
    authDomain: "trainslate-fc09b.firebaseapp.com",
    databaseURL: "https://trainslate-fc09b.firebaseio.com",
    projectId: "trainslate-fc09b",
    storageBucket: "trainslate-fc09b.appspot.com",
    messagingSenderId: "890734363714"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

    //////////////////////////////////////////////////////////
$("#currentTime").append(moment().format('HH:mm A'));

$("#addTrain").on("click", function() {
    event.preventDefault();
    var trainName = $("#trainNameIn").val().trim();
    var destination = $("#destIn").val().trim();
    var firstTrain = moment($("#first-TrainIn").val(), "HH:mm A").subtract(10, "years").format("X");
    var frequency = $("#freqIn").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }
    trainData.ref().push(newTrain);
// Clears the text inputs.
$("#trainNameIn").val("");
$("#destIn").val("");
$("#first-TrainIn").val("");
$("#freqIn").val("");

return false;
  });  

  trainData.ref().on("child_added", function(childSnapshot) {
    
    let trainName = childSnapshot.val().name;
    let trainDest = childSnapshot.val().destination;
    let Freq = childSnapshot.val().frequency;
    let theFirstTrain = childSnapshot.val().firstTrain;    

    console.log(childSnapshot.val().name);
   
    // C=16, T0=0, F=3
    //C=21, T0=0, F=7
    //let minutesSince = (C-T0) % F;
    //minutesAway= F - minutesSince;
    //console.log("mins away2 (Joes)", minutesAway)
    var diffTime = moment().diff(moment.unix(theFirstTrain), "minutes");
    console.log(diffTime);
    
    let tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % Freq;
    console.log(tRemainder)
    
    let minutesAway = Freq - tRemainder;
    console.log("minutes away: " + minutesAway);
 
    let nexTrain = moment().add(minutesAway, "m").format("HH:mm a");
 
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td class='min'>" + Freq + "</td><td class='min'>" + nexTrain + "</td><td class='min'>" + minutesAway + "</td></tr>");

});
// $("#trainName1").html(trainNames);
// $('#dest1').html(trainDestin);
// $('#Freq1').html(trainFrequency);
// $('#nexAriv1').html(tArrival);
// $('#minsAway1').html(tMinutes);
});

   

