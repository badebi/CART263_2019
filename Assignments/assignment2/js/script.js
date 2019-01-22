"use strict";

const avatarSize = 65;
const avatarSizeLoss = .7;
const foodMinSize = 15;
const foodMaxSie = 60;

let myAvatar;
let myFood;


function preload() {

}



function setup() {
  createCanvas(windowWidth, windowHeight);
  myAvatar = new Avatar(mouseX, mouseY, avatarSize,avatarSizeLoss);
  myFood = new Food(random(0,width),random(0,height), foodMinSize, foodMaxSie);
}


// draw()
//
// Description of draw()

function draw() {
  background('#ffffff');
  myAvatar.update();
  myAvatar.display();

  myFood.update();
  if (myAvatar.isCollidingWith(myFood)){
    myAvatar.eating(myFood);
  }

  myFood.showTrail();
  myFood.display();



}
