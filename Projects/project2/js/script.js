"use strict";

/*****************

The Interrogation
Ebrahim (Ebby) Badawi

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

/*-------------------------->>>> CONSTANTS <<<<--------------------------*/

const MAX_WRONG_NAMES = 3;

/*-------------------------->>>> VARIABLES <<<<--------------------------*/
// Array of list if card Rorschach locations
let rorschachCards = [
  'assets/images/rorschach1.jpg',
  'assets/images/rorschach2.jpg',
  'assets/images/rorschach3.jpg',
  'assets/images/rorschach4.jpg',
  'assets/images/rorschach5.jpg',
  'assets/images/rorschach6.jpg',
  'assets/images/rorschach7.jpg',
  'assets/images/rorschach8.jpg',
  'assets/images/rorschach9.jpg',
  'assets/images/rorschach10.jpg'
]
// Array of the interrogator's dialogs for the introduction
let intro = [
  "When ever you're ready, just say I'm ready",
  "don't you want to know why should you be ready?",
  "you're not the one who's asking questions here! I-ask the questions. now tell me your name",
  "just answer the question, what is your name, just the name!",
  "why did you click on the page? we start from the top then! what is your name?"
]
// Array of excuses to understand what is the name of the player
let excuses = [
  "Sorry, what?",
  "pardon me, I didn't quite get that",
  "hit me again",
  "what a wonderful name, but say it again because I couldn't hear what you've said",
  "scream your name louder, if you may",
  "what?",
  "sorry, I wasn't listening. could you please repeat?"
]
// Voice parameters for our super cool interrogator
let voiceParameters = {
  pitch: 1,
  rate: 0.75,
  volume: 0.5,
}
// Variable to hold our card element
let $rorschachCard;
// Variable to hold the perfect awesome position for our elements when they are off-frame
let magicNumber;
// Variable to handle the order of lies being spoken by the interrogator
let introLineIndex = 0;
// Boolean to know whether the player has once clicked on the screen
let clickedOnce = false;
//
let gameStarted = false;
// Variables to hold annyang's commands for different phases
let phase1Commands, phase2Commands, phase3Commands;
// Variable to keep track of phases & help us change from one to another
let phaseState = 2;
// Variable to hold the list of names which comes from the JSON file
let listOfNames, listOfMoods, listOfOccupations;
// Variable to hold the name, by which the player will be called
let fixedName;
// Variable to keep track of how many times the interrogator calles the pplayer by a wrong name
let wrongNameCounter = 0;
// Boolean to know whether or not the interrogator has found a similar name to player's name
let nameFound = false;

// Check if the document is ready to run
$(document).ready(function() {
  // If document is ready and data (List of Names) has loaded, call
  // dataLoaded(data) function.
  $.getJSON('data/dataFile.json', dataLoaded);
});

/*----------------------->>>> dataLoaded(data) <<<<-----------------------
 * It is called when the JSON data is loaded, and it basically starts our
 * super awesome interrogation.
 *-------------------------------->>>><<<<--------------------------------*/
function dataLoaded(data) {
  // Store the list of names, moods, and occupations into separate variables
  listOfNames = data.firstNames;
  listOfMoods = data.moods;
  listOfOccupations = data.occupations;
  // magicNumber is the the ABSOLUTELY PERFECT position for hand and card,
  // when they are out of frame, which I had a painfully hard time figuring out.
  magicNumber = -1.42 * ($(".handAndCard").innerHeight());
  // Get the Rorschach Card element from the page
  $rorschachCard = $("#rorschachCard");
  // Move the hand and the card in their initial position, which is outside of frame
  $(".handAndCard").animate({
    "top": magicNumber
  });

  // Make sure annyang is available
  if (annyang) {
    // Add the commands to annyang. Each phase has its own set of commands.
    phase1Commands = {
      "I'm ready": startInterrogation,
      "I am ready": startInterrogation,
      "why": startInterrogation,
      "*tag": noAnswer
    }

    phase2Commands = {
      "*tag": dontUnderstandTheName
    }

    phase3Commands = {
      "change the card": changeTheCard,
      "I see *tag": handleAnswer
    }

    // Give the defined commands for phase1 to annyang by using its
    // .addCommands() function.
    annyang.addCommands(phase1Commands);
    // Annyand, start listening to me
    annyang.start();
  }


  let $pressStart = $('.start');
  $pressStart.button().hide();
  $pressStart.fadeIn().click(function() {
    $(this).fadeOut("1000", function() {
      $(this).remove();
    });
    //
    responsiveVoice.speak(intro[0], 'UK English Male', voiceParameters);
    introLineIndex++;
    clickedOnce = !clickedOnce;
  });

  $pressStart.offset({
    top: $(window).height() / 2,
    left: $(window).width() / 2
  });

  $("body").on("click", function() {
    if (clickedOnce && gameStarted) {
      responsiveVoice.speak(intro[intro.length - 1], 'UK English Male', voiceParameters);
    }
  });
}

/*------------------------>>>> changePhase() <<<<------------------------
 * It is called whenever the game state needs to be changed.
 * It removes the current annyang commands, and adds the next phases commands
 *-------------------------------->>>><<<<--------------------------------*/
function changePhase() {
  annyang.removeCommands();
  switch (phaseState) {
    case 1:
      annyang.addCommands(phase2Commands);
      phaseState++;
      break;
    case 2:
      annyang.addCommands(phase3Commands);
      phaseState++;
      setTimeout(bringInTheCard, 3000);
      break;
    default:

  }
}

/*--------------------->>>> startInterrogation() <<<<---------------------
 *
 *
 *
 *-------------------------------->>>><<<<--------------------------------*/
function startInterrogation() {
  gameStarted = true;
  if (introLineIndex === intro.length - 2) {
    // Remove intro commands
    responsiveVoice.speak(intro[introLineIndex], 'UK English Male', voiceParameters);
    changePhase();
    // annyang.removeCommands();
    // annyang.addCommands(phase2Commands);
    return;
  }
  responsiveVoice.speak(intro[introLineIndex], 'UK English Male', voiceParameters);
  introLineIndex++;
  if (introLineIndex === intro.length - 2 && annyang.isListening()) {
    startInterrogation();
    console.log("tell me your name");
  }
}

/*------------------------>>>> noAnswer(tag) <<<<------------------------
 * When it hears something that is off the track, it redirects the conversation
 * in a very intelligent way. :D
 *-------------------------------->>>><<<<--------------------------------*/
function noAnswer(tag) {
  // responsiveVoice, please say this line
  responsiveVoice.speak("I have no answer for what you've said, ask me why!", 'UK English Male', voiceParameters);
}

/*----------------->>>> dontUnderstandTheName(name) <<<<-----------------
 *
 *
 *
 *-------------------------------->>>><<<<--------------------------------*/
function dontUnderstandTheName(name) {
  console.log(name);
  let tempName = getSimilarName(name);

  if (wrongNameCounter < MAX_WRONG_NAMES) {
    if (nameFound) {
      responsiveVoice.speak(`${tempName}?!`, 'UK English Male', voiceParameters);
      wrongNameCounter++;
    } else {
      shuffle(excuses);
      responsiveVoice.speak(`${excuses[0]}?!`, 'UK English Male', voiceParameters);
    };
  } else {
    fixedName = tempName;
    changePhase();
    // annyang.removeCommands();
    // annyang.addCommands(phase3Commands);
    responsiveVoice.speak(`enough-fooling-around! from now on, your name is ${fixedName}!`, 'UK English Male', voiceParameters);
  }
}

/*--------------------->>>> getSimilarName(name) <<<<---------------------
 * Gets whatever player has said as his/her name, takes its first two characters
 * and searches through the names which start with those two characters, and by
 * calling getRandomElement function, it picks one of those names and returns it.
 *-------------------------------->>>><<<<--------------------------------*/
function getSimilarName(name) {

  // Declare variables to get the first two characters of what player just
  // said and store them.
  let firstChar = name.charAt(0);
  let secondChar = name.charAt(1);
  console.log(firstChar + secondChar);

  // Declare nameMinIndex and nameMaxIndex to find the range whithin which we want to
  // find our random similar name
  let nameMinIndex = 10000;
  let nameMaxIndex = 0;

  // TODO: I can put these into a if statement so it will just calculate once
  // Go through the array of names and find the names starting with specified
  // characters and then find and keep the record of their range in the array
  $.each(listOfNames, function(index, value) {
    if (value.charAt(0) === firstChar && value.charAt(1) === secondChar) {
      if (nameMinIndex > index) {
        nameMinIndex = index;
      };
      if (nameMaxIndex < index) {
        nameMaxIndex = index;
      };
    };
  });
  console.log(`min: ${nameMinIndex}, max: ${nameMaxIndex}`);

  // Some times it couldn't find the range, so let us know if it happen
  // if not, pass the range and array to getRandomElement() function and
  // return the name it returns
  if (nameMinIndex > nameMaxIndex) {
    nameFound = false;
  } else {
    nameFound = true;
    return getRandomElement(listOfNames, nameMinIndex, nameMaxIndex);
  };
}

/*----------------------->>>> bringInTheCard() <<<<-----------------------
 * It shuffles and picks one of the Rorschach Cards, then a hand brings
 * it into the frame.
 *-------------------------------->>>><<<<--------------------------------*/
function bringInTheCard() {
  // Instructions of this phase
  responsiveVoice.speak(`okay ${fixedName}!
    Now I'm going to show you some cards and you're going to tell me what you see.
    simply say I see blah bla blah.
    If you want me to change a card for any reason,
    say change the card,
    and I will gently do so.
    let's begin now ${fixedName},
    tell me what do you see!`, 'UK English Male', voiceParameters);

  // Pick a card from our set of cards
  shuffle(rorschachCards);
  // Replace it with the hidden card that is in the HTML
  $rorschachCard.attr('src', rorschachCards[0]);
  // Toggle the display of the hand & the card & animate the into the frame
  $(".handAndCard").toggle().animate({
    "top": 0
  }, 2000, "swing");
  // Animate the hand back out the frame wher it was
  $("#hand").animate({
    "top": magicNumber
  }, 2000, "swing");
}

/*---------------------->>>> changeTheCard() <<<<----------------------
 * It is called whenever player says "change the card" during phase 3
 * Basically it animate the hand into the frame, then the hand and the
 * card out of the frame, changes the card, animates the hand and the
 + new card into the frame, and lastely, animates the hand back out of frame.
 *-------------------------------->>>><<<<--------------------------------*/
function changeTheCard() {
  // Animate the hand into frame
  $("#hand").animate({
    "top": 0
  }, 2000, "swing", function() {
    // Animate the hand and the card out of the frame
    $(".handAndCard").animate({
      "top": magicNumber
    }, 1000, "swing", function() {
      // Change the card by
      // Picking a card from our shuffled set of cards
      shuffle(rorschachCards);
      // Replace the card
      $rorschachCard.attr('src', rorschachCards[0]);
      // Bring in the new card (Animate the hand and the card into the frame)
      $(".handAndCard").animate({
        "top": 0
      }, 2000, "swing", function() {
        // Animate the hand out of the frame
        $("#hand").animate({
          "top": magicNumber
        }, 2000, "swing");
      });
    });
  });
}

/*------------------------>>>>handleAnswer(tag) <<<<-----------------------
 *
 *
 *-------------------------------->>>><<<<--------------------------------*/
function handleAnswer(answer) {
  // Declare variables to get the first two characters of what player just
  // said and store them.
  let firstChar = answer.charAt(0);
  console.log(firstChar);

  // Declare nameMinIndex and nameMaxIndex to find the range whithin which we want to
  // find our random similar name
  let moodMinIndex = 10000;
  let occupationMinIndex = 10000;
  let moodMaxIndex = 0;
  let occupationMaxIndex = 0;

  // Go through the array of moods and find the moods starting with specified
  // character and then find and keep the record of their range in the array
  $.each(listOfMoods, function(index, value) {
    if (value.charAt(0) === firstChar) {
      if (moodMinIndex > index) {
        moodMinIndex = index;
      };
      if (moodMaxIndex < index) {
        moodMaxIndex = index;
      };
    };
    // in case it could not find the range, assign min & max to 0 and array length
    if (moodMinIndex > moodMaxIndex) {
      moodMinIndex = 0;
      moodMaxIndex = listOfMoods.length;
    }
  });
  // Do the same thing for the array of occupations
  $.each(listOfOccupations, function(index, value) {
    if (value.charAt(0) === firstChar) {
      if (occupationMinIndex > index) {
        occupationMinIndex = index;
      };
      if (occupationMaxIndex < index) {
        occupationMaxIndex = index;
      };
    };
    // in case it could not find the range, assign min & max to 0 and array length
    if (occupationMinIndex > occupationMaxIndex) {
      occupationMinIndex = 0;
      occupationMaxIndex = listOfOccupations.length;
    }
  });

  // now say it
  let tempMood = getRandomElement(listOfMoods, moodMinIndex, moodMaxIndex);
  let tempOccupation = getRandomElement(listOfOccupations, occupationMinIndex, occupationMaxIndex);

  responsiveVoice(`${tempMood} ${tempOccupation}?`,'UK English Male', {
      rate: Math.random(),
      pitch: Math.random()
    });
}

/*-------------->>>> getRandomElement(array, min, max) <<<<--------------
 * Gets an array with a range, and returns the value of a random index
 * within the specified range.
 *-------------------------------->>>><<<<--------------------------------*/
function getRandomElement(array, min, max) {
  return array[Math.floor(Math.random() * (max - min + 1) + min)];
}

/*-------------------------->>>> shuffle(a) <<<<--------------------------
 * It shuffles the array which is given to it
 * So after shuffling, it returnes the array whose values are placed in
 * different random indexes.
 *-------------------------------->>>><<<<--------------------------------*/
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// TODO: what was your name again?!
