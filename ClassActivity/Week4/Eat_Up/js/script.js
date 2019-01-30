/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let $mouth;
let $fly;

let buzz = new Audio('assets/sounds/buzz.mp3');
let crunch = new Audio('assets/sounds/crunch.wav');

// A $( document ).ready() block.
$(document).ready(function() {
  console.log("ready!");
  $mouth = $('#mouth');
  $fly = $('#fly');

  $fly.draggable();
  $fly.on('mousedown', function() {
    buzz.play();
    $mouth.attr('src', 'assets/images/mouth-open.png');
    $fly.on('mouseup', function() {
      buzz.pause();
      $mouth.attr('src', 'assets/images/mouth-closed.png');
    })
  });

  $mouth.on('hover', function() {
    $mouth.attr('src', 'assets/images/mouth-open.png');
  });
  $mouth.on('mouseleave', function() {
    $mouth.attr('src', 'assets/images/mouth-closed.png');
  });

  $mouth.droppable({
    drop: flyDropped
  });

});

  console.log('in here');

function flyDropped(event, ui) {
  console.log("Dropped!");

  // $('#fly').remove();
  // $fly.remove();
  ui.draggable.remove();
  crunch.play();
   let chewInterval = setInterval(chew, 300);
   setTimeout(function () {
     clearInterval(chewInterval);
     flyEaten();
   },2000);
}

function flyEaten() {
  console.log('fly has been eaten');

  $mouth.on('mouseleave', function() {
    $mouth.attr('src', 'assets/images/mouth-closed.png');
  });
  // flyEaten();
}

function chew() {
  // $mouth.on('click', function() {
  //   clearInterval(setInterval(chew, 300));
  //   crunch.pause();
  //   $mouth.attr('src', 'assets/images/mouth-closed.png');
  // });
  if ($mouth.attr('src') === "assets/images/mouth-open.png") {
    $mouth.attr('src', 'assets/images/mouth-closed.png');
    crunch.play();
  } else {
    $mouth.attr('src', 'assets/images/mouth-open.png');
  }

}
