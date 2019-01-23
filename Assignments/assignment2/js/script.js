"use strict";

const AVATAR_SIZE = 65;
const AVATAR_SIZE_LOSS = .4;
const FOOD_MIN_SIZE = 15;
const FOOD_MAX_SIZE = 81;


let myAvatar;
let myFoods = [];
let maxFood = 15;

function preload() {

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  myAvatar = new Avatar(mouseX, mouseY, AVATAR_SIZE, AVATAR_SIZE_LOSS);
  myFoods[0] = new Food(random(0, width), random(0, height), FOOD_MIN_SIZE, FOOD_MAX_SIZE);
  noCursor();

}


// draw()
//
// Description of draw()

function draw() {
  background('#ffffff');
  myAvatar.update();


  myFoods.forEach(function(food) {
    food.update();
    food.showTrail();
    if (myAvatar.isCollidingWith(food)) {
      myAvatar.eating(food);
    }
    food.display();
  });

  myAvatar.display();

  if (myAvatar.size < .3 * myAvatar.maxSize) {
    if (!myAvatar.active) {
      return;
    }
    myFoods.push(new Food(random(0, width), random(0, height), FOOD_MIN_SIZE, FOOD_MAX_SIZE));
  }

  if (myFoods.length > maxFood) {
    myFoods.splice(myFoods.length - 1, 1)
    maxFood ++;
  }

  console.log("maxFood =" + maxFood);
}

function mousePressed() {

}
