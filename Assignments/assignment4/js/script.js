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
let swallow = new Audio('assets/sounds/swallow.wav');
let burp = new Audio('assets/sounds/burp.wav');
let choke = new Audio('assets/sounds/choke.wav');
let scream = new Audio('assets/sounds/scream.wav');


// A $( document ).ready() block.
$(document).ready(function() {

  $mouth = $('#mouth');
  $mouth.droppable({
    //   out: function(event, ui){
    //     if (ui.draggable.attr('id') === 'food')){
    //       ui.draggable("option", "revert", false);
    //     };
    //   },
    //   over: function(event, ui){
    //     if (ui.draggable.attr('id') === 'food'){
    //       ui.draggable("option", "revert", true);
    //   };
    // },
    drop: flyDropped
  });

  $fly = $('#fly');
  $fly.draggable();

  buzz.loop = true;

  $food = $('#food');
  $food.draggable({
    revert: "valid",
    // start: function(event,ui){
    //   scream.loop = true;
    //   scream.play();
    // },
    // stop: function(event,ui) {
    //   scream.pause();
    // }
  });

  $fly.on('mousedown', function() {

    buzz.play();
    $mouth.attr('src', 'assets/images/cartoonMouthChewOpen1.png');
    // $mouth.on('mouseout', function(){
    //   $mouth.attr('src', 'assets/images/cartoonMouthChewHungry.png');
    // });
  });

  $fly.on('mouseup', function() {
    buzz.pause();
    $mouth.attr('src', 'assets/images/cartoonMouthSmile.png');
  });

  $food.on('mousedown', function() {
    $mouth.attr('src', 'assets/images/cartoonMouthChewYuck.png');
    scream.loop = true;
    scream.play();
  });

  $food.on('mouseup', function() {
    scream.pause();
    $mouth.attr('src', 'assets/images/cartoonMouthSmile.png');
  });


  //     $mouth.on('hover', function() {
  //       console.log("hovered");
  //       $mouth.attr('src', 'assets/images/cartoonMouthChewOpen1.png');
  //     });
  //     $mouth.on('mouseleave', function() {
  //       $mouth.attr('src', 'assets/images/cartoonMouthChewHungry.png');
  //     });
  // });
  //
  //     $fly.on('mouseup', function() {
  //       buzz.pause();
  //       $mouth.attr('src', 'assets/images/cartoonMouthSmile.png');
  //
  //   });


});

function flyDropped(event, ui) {
  console.log("Dropped!");
  // $('#fly').remove();
  // $fly.remove();
  if (ui.draggable.attr('id') === "fly") {
    ui.draggable.remove();
    crunch.play();
    $mouth.attr('src', 'assets/images/cartoonMouthChewClosed.png');
    let chewInterval = setInterval(chew, 300);
    setTimeout(function() {
      clearInterval(chewInterval);
      $mouth.attr('src', 'assets/images/cartoonMouthSmile.png');
      flyEaten();
    }, 5000);
  } else {
    choke.play();
  };
}

function flyEaten() {
  console.log('fly has been eaten');
  swallow.play();
  swallow.addEventListener("ended", function() {
    burp.play();
    //resetFly();
  });
  $mouth.on('mouseleave', function() {
    $mouth.attr('src', 'assets/images/cartoonMouthSmile.png');
  });
  // flyEaten();
}

function chew() {
  // $mouth.on('click', function() {
  //   clearInterval(setInterval(chew, 300));
  //   crunch.pause();
  //   $mouth.attr('src', 'assets/images/mouth-closed.png');
  // });
  if ($mouth.attr('src') === "assets/images/cartoonMouthChewOpen2.png") {
    $mouth.attr('src', 'assets/images/cartoonMouthChewClosed.png');
    crunch.play();
  } else {
    $mouth.attr('src', 'assets/images/cartoonMouthChewOpen2.png');
  }
}

// function resetFly() {
//   let $newFly = '<img id="fly" src="assets/images/fly2.png" alt="it suppose to be a fly">';
//   $('body').append($newFly);
//   $fly = $('#fly');
//   $fly.draggable();
//   $newFly.offset({
//     top: Math.random() * ($(window).height() - $ear.height()),
//     left: Math.random() * ($(window).width() - $ear.width())
//   });
//
// }
