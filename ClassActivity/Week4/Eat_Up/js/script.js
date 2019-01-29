/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let $mouth;
let $fly;

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    $mouth = $('#mouth');
    $fly = $('#fly');

    $fly.draggable();
    $mouth.droppable({
      drop: flyDropped
    });
});


function flyDropped (event, ui){
  console.log("Dropped!");

  // $('#fly').remove();
  // $fly.remove();
  ui.draggable.remove();

  setInterval(chew,300);
}

function chew (){
  if ($mouth.attr('src') === "assets/images/mouth-open.png"){
    $mouth.attr('src', 'assets/images/mouth-closed.png');
  } else {
      $mouth.attr('src', 'assets/images/mouth-open.png');
  }
}
