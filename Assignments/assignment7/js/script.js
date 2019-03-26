"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// kick= x ,snare= o ,hihat= *, dog = d

let pattern = ['x','*','x','xo*','*','*o','x','od'];
let patternIndex = 0;

let frequencies = [110.00, 123.47, 138.59, 146.83, 164.81, 185.00, 207.65];

let synth;
let kick;
let snare;
let hihat;
let dog;
let isStarted = false;

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: 440
    }
  });
  kick = new Pizzicato.Sound('assets/sounds/kick.wav');
  snare = new Pizzicato.Sound('assets/sounds/snare.wav');
  hihat = new Pizzicato.Sound('assets/sounds/hihat.wav');
  dog = new Pizzicato.Sound('assets/sounds/bark.wav');
}


// draw()
//
// Description of draw()

function draw() {

}

function mousePressed() {
  // NOTE: to fix the variable intervals
  if (!isStarted) {
      setInterval(playNote, 500);
      setInterval(playDrum, 250);
      isStarted = true;
  }

}

function playNote() {
  let frequency = getRandomFrom(frequencies);
  synth.frequency = frequency;
  synth.play();
}

function playDrum() {
  // if (patternIndex == pattern.length) {
  //   patternIndex = 0;
  // }
  let symbols = pattern[patternIndex];

  if(symbols.indexOf('x') != -1) {
    kick.play();
  }
  if(symbols.indexOf('o') != -1) {
    snare.play();
  }
  if(symbols.indexOf('*') != -1) {
    hihat.play();
  }
  if(symbols.indexOf('d') != -1) {
    dog.play();
  }
  // patternIndex ++;
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

function getRandomFrom(array) {
  return array[ /*Math.*/ floor( /*Math.*/ random() * array.length)];
}
