"use strict";

/*****************

Project1 | Van Gogh's Sisyphusesque Experience
Ebrahim (Ebby) Badawi

******************/
const MAX_EARS = 15;
//  the super duper song
let music = new Audio('assets/music/Sisyphus - Calm It Down.mp3');
//  an array to keep the sfx source files
let sfxSounds = [
  "assets/sounds/sfx(1).wav",
  "assets/sounds/sfx(2).wav",
  "assets/sounds/sfx(3).wav",
  "assets/sounds/sfx(4).wav",
  "assets/sounds/sfx(5).wav"
]
let dropSFX = new Audio("assets/sounds/dropSFX.wav");

let alertSFX = new Audio("assets/sounds/alertSFX.wav");

let emptyAlertSFX = new Audio("assets/sounds/emptyAlertSFX.wav");

let $bin;
//  a variable to keep record of how many ears have been thrown into the trash
let earCounter = 0;
//  a variable to to keep track of what phase we're at
let phaseNumber = 1;
//  an array of some randome stupid sentences
let thinking = [
  "What the fuck?",
  "You wanna THINK about it ?!",
  "DUDE COME ON !!!",
  "as if there is another option",
  "Aweseme, you're a genius! knock on wood",
  "relax dude, you can think, you have alllll day to think about this MINDBLOWING question",
  "are you done ?!",
  "come on, he has a bunch more"
]

$(document).ready(function() {
  // don't play the music at the beginning
  music.pause();
  //  Get the bin element from the page
  $bin = $('#bin');
  //  make it droppable
  $bin.droppable({
    //  when drop is compeleted, call trashDropped function
    drop: earDropped
  });
  //  add an ear inside the room
  addEar();

});

//+++++++++++++++++++++>>>>> earDropped() <<<<<+++++++++++++++++++++++++++

//  Called when a draggable element (an ear) is dragged over the droppable element
function earDropped(event, ui) {
  //  remove the ear (throw it in to the garbage) & add 1 to earCounter
  ui.draggable.remove();
  earCounter++;
  //  make the bin look full => replace it with another picture
  $(this).attr('src', 'assets/images/trash_full.png');
  //  Check if the bin is full, if no add another ear into the space
  //  else, tell player that the bin is full and it should be emptied
  if (earCounter < MAX_EARS) {
    //  add another ear
    if (phaseNumber === 1) {
      addEar();
    }
  } else {
    theBinIsFull();
  }
}

//+++++++++++++++++++++>>>>> addEar() <<<<<+++++++++++++++++++++++++++

//  called whenever an ear is needed in the room
function addEar() {
  //  Awesomely create an imgage of ear and store it in a variable.
  let $ear = $('<img class="ear" src="assets/images/ear.png" >');

  //  Drop the ear "somewhere" in the room
  $('#room').append($ear);

  //  and here we calculate where should be the "somewhere" that I mentioned earlier
  //  by using .offset() in order to give it a random position on the screen.
  $ear.offset({
    top: Math.random() * ($(window).height() - $ear.height()),
    left: Math.random() * ($(window).width() - $ear.width())
  });
  $('.ear').draggable({
    start: function() {
      //  start the music when player grabs the first ear
      if (music.paused) {
        //  make it loop, cus it makes you calm
        music.loop = true;
        //  turn the valume up
        music.volume = 1;
        //  now let's chill
        music.play();
      }
      //  play random sound effect
      let randomSFX = sfxSounds[Math.floor(Math.random() * sfxSounds.length)];
      let soundFX= new Audio(randomSFX);
      soundFX.play();
    },
    stop: function() {
      dropSFX.currentTime = 0;
      dropSFX.play();
    }
  });
}

//+++++++++++++++++++++>>>>> theBinIsFull() <<<<<+++++++++++++++++++++++++++

//  called whenever all ears have been thrown to the garbage
function theBinIsFull() {
  //  play alert sfx
  alertSFX.currentTime = 0;
  alertSFX.play();
  //  create a div which will turn to the dialog box
  let $alert = $('<div></div>');
  //  give it an awesome title
  $alert.attr('title', 'Alert');
  //  add a super meaningful message into it
  $alert.append("<p>The room is clean now and the bin is all ears, wainting for you to empty it</p>");
  //  and add it to the page (make it appear)
  $('body').append($alert);

  //  now we make it look more dialog boxish
  $alert.dialog({
    //  add an okay button to it so we make sure that player agrees with us about
    //  the fact that the bin should be emptied
    buttons: {
      "Okay?": function() {
        //  close the alert box when player understood what to do
        $(this).dialog('close');
      }
    },
    //  when the alert box closes, do this stuff
    close: function() {
      //  if the bin is clicked, call the emptyBin() function
      $bin.on('click', emptyBin);

    },
    //  it will be
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });
}

//+++++++++++++++++++++>>>>> emptyBin() <<<<<+++++++++++++++++++++++++++

//  called when player clicks on the full bin (when all ears all in it)
function emptyBin() {
  //  play empty alert sfx
  emptyAlertSFX.currentTime = 0;
  emptyAlertSFX.play();
  //  again, this div will turn to a dialog box
  let $emptyAlert = $('<div></div>');
  //  name the dialog box awesomely
  $emptyAlert.attr('title', 'Are You SURE ??!');
  //  add a super meaningful question into it
  $emptyAlert.append("<p>Are you sure you want to get rid of Van Gogh's ears ?!</p>");
  //  then, add it to the page
  $('body').append($emptyAlert);

  //  make it look good
  $emptyAlert.dialog({
    //  add an okay button to it so we make sure that player agrees with us about

    buttons: {
      "Yup!": function() {
        //  close the alert box
        $(this).dialog('close');
      },
      "let me think again!": function() {
        //  play alert sfx
        alertSFX.currentTime = 0;
        alertSFX.play();
        //  convince player that there is no other way, and the bin have to be emptied
        let thinkingResponse = thinking[Math.floor(Math.random() * thinking.length)];
        $emptyAlert.append("<p>" + thinkingResponse + "</p>");
      }
    },
    //  when the alert box closes, empty the bin, and call changePhase() function
    close: function() {
      //  I had to turn off the event handler here, otherwise everytime player clicks
      //  on the bin, it adds up and makes a mess
      $bin.off('click');
      $bin.attr('src', 'assets/images/trash_empty.png');
      changePhase();
    },
    //  it will be
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });
}

//+++++++++++++++++++++>>>>> changePhase() <<<<<+++++++++++++++++++++++++++

//  called after each time the bin gets emptied.
//  it resets the earCounter, adds to the phaseNumber (so we go to the next phase),
//  and literally empties the bin inside the room (ears all over the place).
function changePhase() {
  earCounter = 0;
  phaseNumber++;
  for (var i = 0; i < MAX_EARS; i++) {
    addEar();
  }
}
