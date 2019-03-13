"use strict";

/*****************

The Interrogation
Ebby Badawi

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let magicNumber;
let intro = [
  "When ever you're ready, just tell me I'm ready",
  "don't you want to know why should you be ready?",
  "you're not the one who is asking the questions here! I-ask questions. now tell me your name",
  "just answer the question, what is your name, just the name!",
  "why did you click on the page? we start from the top then! what is your name?"
]
let introLineIndex = 0;

let clickedOnce = false;

let voiceParameters = {
  pitch: 1,
  rate: 0.75,
  volume: 0.5,
}
let command, command2;

let listOfNames;

$(document).ready(function() {
  $.getJSON('/data/firstNames.json', dataLoaded);
});

function dataLoaded(data) {
  listOfNames = data.firstNames;
  magicNumber = -1.35 * ($(".handAndCard").innerHeight());
  // $(".handAndCard").innerHeight(magicNumber);
  $(".handAndCard").animate({
    "top": magicNumber
  });

  $("body").on("click", function() {
    if (!clickedOnce) {
      responsiveVoice.speak(intro[0], 'UK English Male', voiceParameters);
      introLineIndex++;
      clickedOnce = !clickedOnce;
    } else {
      responsiveVoice.speak(intro[intro.length - 1], 'UK English Male', voiceParameters);
    }
  });

  if (annyang) {
    command = {
      "I'm ready": startInterrogation,
      "I am ready": startInterrogation,
      "why": startInterrogation,
      "*tag": noAnswer
    }

    command2 = {
      "*tag": dontUnderstandTheName
    }

    annyang.addCommands(command);
    annyang.start();
  }
}

function startInterrogation() {
  if (introLineIndex === intro.length - 2) {
    // Remove intro commands
    responsiveVoice.speak(intro[introLineIndex], 'UK English Male', voiceParameters);
    annyang.removeCommands();
    annyang.addCommands(command2);
    return;
  }
  responsiveVoice.speak(intro[introLineIndex], 'UK English Male', voiceParameters);
  introLineIndex++;
  if (introLineIndex === intro.length - 2 && annyang.isListening()) {
    startInterrogation();
    console.log("tell me your name");
  }
}

function noAnswer(tag) {
  responsiveVoice.speak("I have no answer for what you've said, ask me why!", 'UK English Male', voiceParameters);
}

function dontUnderstandTheName(name) {
  console.log(name);

  getSimilarName(name);

  let firstChar = name.charAt(0);
  let secondChar = name.charAt(1);
  let minIndex = 4950;
  let maxIndex = 0;

  $.each(listOfNames, function(index, value) {
    if (value.charAt(0) === firstChar) {
      if (value.charAt(1) === secondChar) {
        if (minIndex > index) {
          minIndex = index;
        }
        if (maxIndex < index) {
          maxIndex = index;
        }
      } else {
        if (minIndex > index) {
          minIndex = index;
        }
        if (maxIndex < index) {
          maxIndex = index;
        }
      }
    }
    console.log(`min: ${minIndex}, max: ${maxIndex}`);
  });

  let similarName = getRandomElement(listOfNames, minIndex, maxIndex);
  responsiveVoice.speak(`${similarName}???`, 'UK English Male', voiceParameters);
}

function bringInTheCard() {
  $(".handAndCard").toggle().animate({
    "top": 0
  }, 2000, "swing");
  $("#hand").animate({
    "top": magicNumber
  }, 2000, "swing");
}

function takeOutTheCard() {

}

function getRandomElement(array, min, max) {
  return array[Math.floor(Math.random() * (max - min + 1) + min)];
}

/*
 * Shuffles array in place. In case we need it
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
