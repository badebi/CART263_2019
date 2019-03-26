"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// kick= x ,snare= o ,hihat= *, dog = d

const NOTE_LENGTH = 500;

let pattern = ['x', '*', 'x', 'xo*', '*', '*o', 'x', 'od'];
let patternIndex = 0;

let frequencies = [110.00, 123.47, 138.59, 146.83, 164.81, 185.00, 207.65];

let synth;
let kick;
let snare;
let hihat;
let dog;

let delay;
let dubDelay;
let tremolo;
let lowPassFilter;

let isStarted = false;

let multiplier;
let prvMultiplier;

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

  delay = new Pizzicato.Effects.Delay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5
  });

  dubDelay = new Pizzicato.Effects.DubDelay({
    feedback: 0.57,
    time: 0.42,
    mix: 0.5,
    cutoff: 700
  });

  tremolo = new Pizzicato.Effects.Tremolo({
    speed: 7,
    depth: 0.8,
    mix: 0.8
  });

  lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 400,
    peak: 10
  });

  kick = new Pizzicato.Sound('assets/sounds/kick.wav');
  snare = new Pizzicato.Sound('assets/sounds/snare.wav');
  hihat = new Pizzicato.Sound('assets/sounds/hihat.wav');
  dog = new Pizzicato.Sound('assets/sounds/bark.wav');

  kick.addEffect(dubDelay);
  synth.addEffect(lowPassFilter);
}


// draw()
//
// Description of draw()

function draw() {

}

function mousePressed() {
  // NOTE: to fix the variable intervals
  if (!isStarted) {
    //setInterval(playNote, NOTE_LENGTH);
    setTimeout(playNote, NOTE_LENGTH);
    setInterval(playDrum, 250);
    isStarted = true;
  }

}

function mouseMoved() {
  console.log(lowPassFilter.frequency);
  let newFreq = map(mouseX, 0, windowWidth, 70, 420);
  lowPassFilter.frequency = newFreq;
  // synth.removeEffect(lowPassFilter);
  // synth.addEffect(lowPassFilter);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {

  }
  if (keyCode === DOWN_ARROW) {

  }
}

function playNote() {
  multiplier = floor(random() * 7);

  let ran = random();
  if (ran > 0.42) {
    let frequency = getRandomFrom(frequencies);
    synth.frequency = frequency;
    synth.attack = prvMultiplier / 3.3;
    synth.release = prvMultiplier / 3.3;
    synth.play();
  } else {
    synth.stop();
    multiplier = 1;
  }
  prvMultiplier = multiplier;
  setTimeout(playNote, multiplier * NOTE_LENGTH);

}

function playDrum() {
  // if (patternIndex == pattern.length) {
  //   patternIndex = 0;
  // }
  let symbols = pattern[patternIndex];

  if (symbols.indexOf('x') != -1) {
    kick.play();
  }
  if (symbols.indexOf('o') != -1) {
    snare.play();
  }
  if (symbols.indexOf('*') != -1) {
    hihat.play();
  }
  if (symbols.indexOf('d') != -1) {
    dog.play();
  }
  // patternIndex ++;
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

function getRandomFrom(array) {
  return array[ /*Math.*/ floor( /*Math.*/ random() * array.length)];
}
