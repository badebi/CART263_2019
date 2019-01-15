"use strict";

let square;
let circle;

function preload() {

}



function setup() {
  createCanvas (windowWidth, windowHeight);

  square = new Square(width/2, height/2, 50);
  circle = new Circle(width/3, height/2, 100, '#f155f2');
}



function draw() {
  background(0,0,0);

  square.update();
  square.display();

  circle.update();
  circle.display();


}
