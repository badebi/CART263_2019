"use strict";

/*****************

Project1 | Sisyphusesque
Ebrahim (Ebby) Badawi



******************/
const MAX_EARS = 3;

let $bin;
//  a variable to keep record of hoe many ears have been thrown into the trash
let earCounter = 0;

$(document).ready(function() {
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
    addEar();
  } else {
    //  create a div which will turn to the dialog box
    let $emptyAlert = $('<div></div>');
    //  give it an awesome title
    $emptyAlert.attr('title', 'Alert');
    //  add a super meaningful message into it
    $emptyAlert.append("<p>The room is clean now and the bin is all ears, wainting for you to empty it</p>");
    //  and add it to the page (make it appear)
    $('body').append($emptyAlert);

    //  now we make it look more dialog boxish
    $emptyAlert.dialog({
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


      },
      //  it will be
      // contained within the body tag, and can't be dragged out of it.
      containment: 'body'
    });

  }

}

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
  $('.ear').draggable();
}
