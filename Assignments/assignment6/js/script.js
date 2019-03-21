"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

$(document).ready(function() {
  console.log("ready");
  $.getJSON('/data/data.json', dataLoaded);
});

function dataLoaded(data) {
  console.log(data);
  giveMeADescription(data)
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function giveMeADescription(data) {
  let condiment = getRandomElement(data.condiments);
  console.log("condiment => " + condiment);

  let verb = "is";
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = "are";
  }
  console.log("verb => " + verb);

  let cat = getRandomElement(data.cats);
  console.log("cat => " + cat);

  let room = getRandomElement(data.rooms);
  console.log("room => " + room);

  let description = `${condiment} ${verb} like a ${cat} in a ${room}.`
  $('body').append(`<div id= "des">${description}</div>`);
}
