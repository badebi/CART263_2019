"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/


$(document).ready(setup);

function setup() {
  let magicNumber = -1.35 * ($(".handAndCard").innerHeight());
  // $(".handAndCard").innerHeight(magicNumber);
  $(".handAndCard").animate({"top":  magicNumber});
  $("body").click(function () {
    $(".handAndCard").toggle().animate({"top":  0},2000,"swing");
    $("#hand").animate({"top":  magicNumber},2000, "swing");
  });



  if (annyang) {
    var command = {

    }
    annyang.addCommands(command);
    annyang.start();
  }
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
