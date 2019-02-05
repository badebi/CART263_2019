"use strict";

/*****************

Project1 | Sisyphusesque
Ebrahim (Ebby) Badawi

******************/

let $bin;
let $trash;

$(document).ready(function () {
  //  Get the bin element from the page
  $bin = $('#bin');
  //  make it droppable
  $bin.droppable({
    //  when drop is compeleted, call trashDropped function
    drop: trashDropped
  });

});
