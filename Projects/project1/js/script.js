"use strict";

/*****************

Project1 | Sisyphusesque
Ebrahim (Ebby) Badawi

******************/

let $bin;

$(document).ready(function () {
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
function earDropped(event,ui){
   //  remove the ear (throw it in to the garbage)
   ui.draggable.remove();
   //  make the bin look full => replace it with another picture
   $(this).attr('src','assets/images/trash_full.png');
   //  add another ear into the space
   addEar();
}

//  called whenever an ear is needed in the room
function addEar(){
  //  Awesomely create an imgage of ear and store it in a variable.
  let $ear = $('<img class="ear" src="assets/images/ear.png" >');
  // $ear.attr('title','ear');

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
