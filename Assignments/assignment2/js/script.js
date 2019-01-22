"use strict";

const avatarSize = 65;
const avatarSizeLoss = .7;
const foodMinSize = 15;
const foodMaxSie = 60;

let myAvatar;
let myFoods = [];


function preload() {

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  myAvatar = new Avatar(mouseX, mouseY, avatarSize,avatarSizeLoss);
  myFoods[0] = new Food(random(0,width),random(0,height), foodMinSize, foodMaxSie);
}


// draw()
//
// Description of draw()

function draw() {
  background('#ffffff');
  myAvatar.update();


  myFoods.forEach(function(food){
    food.update();
    food.showTrail();
    if (myAvatar.isCollidingWith(food)){
      myAvatar.eating(food);
    }
    food.display();
  })

  myAvatar.display();
}
