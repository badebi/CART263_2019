"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
const NUM_OPTIONS = 5;
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
let complments = [
  'bravo',
  "You're genius",
  "You're smarter than Google and Mary Poppins combined",
  "The person who raised you deserves a medal for a job well done.",
  "awesome",
  "Oooo LaaLa",
  "clap clap clap",
  "you Da best"
];
let answers = [];
let correctAnimal;
let score = 0;

$(document).ready(setup);


function setup() {
  $('#beginTheShit').on('click', startGame);

  if (annyang) {
    var command = {
      "I give up": shakeTheShit,
      "Say it again": repeatTheShit,
      "I think it is *shit": checkTheShit,
      "I think it's *shit": checkTheShit
    }
    annyang.addCommands(command);
    annyang.start();
  }
}

function startGame() {
  $('#beginTheShit').remove();
  console.log("The Shit Has Begun!!!");
  let $score = $('<div class="score"></div>');
  $score.text("Your Score: " + score);
  $('body').append($score);
  $('body').append('<div class="options"></div>')
  newRound();
}

function addButton(label) {
  let $button = $('<div class="guess"></div>');
  $button.text(label);
  $button.button();
  $button.on('click', buttonClicked);
  $('.options').append($button);
}

function buttonClicked() {
  checkTheShit($(this).text());
}

function shakeTheShit() {
  // ????? Why 5 times ???
  console.log("gave up");

  $('.guess').each(function() {
    if ($(this).text() === correctAnimal) {
      $(this).effect('shake');
      $('.guess').fadeOut(1300, function() {
        //$('.guess').remove();
      });
    };
  });

  setTimeout(function() {
    $('.guess').remove();
    score = 0;
    $('.score').text("Your Score:   " + score);
    newRound();
  }, 1350);
}

function repeatTheShit() {
  speakAnimal(correctAnimal);
}

function checkTheShit(shitToCheck) {
  if (shitToCheck === correctAnimal) {
    console.log("removed");
    $('.guess').remove();
    score++;
    $('.score').text("Your Score: " + score);
    responsiveVoice.speak(complments[Math.floor(Math.random() * complments.length)], 'UK English Male', {
      rate: Math.random(),
      pitch: Math.random(),
      onend: newRound
    });
    //setTimeout(newRound,1000);

    console.log("correct");
  } else {
    console.log("Wrong");
    $('.guess').each(function() {
      if ($(this).text() === shitToCheck) {
        $(this).effect('shake');
      };
    });
    speakAnimal(correctAnimal);
  }
}

function newRound() {
  answers = [];
  for (var i = 0; i < NUM_OPTIONS; i++) {
    let answer = animals[Math.floor(Math.random() * animals.length)];
    addButton(answer);
    answers.push(answer);
  }
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  speakAnimal(correctAnimal);
}

function speakAnimal(name) {
  let reverseName = name.split('').reverse().join('');
  console.log(reverseName);
  let options = {
    rate: Math.random(),
    pitch: Math.random(),
  };
  responsiveVoice.speak(reverseName, 'UK English Male', options);
}

/*
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
