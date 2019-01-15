"use strict";

let square;
let circle;
let myLine;

function preload() {

}



function setup() {
  createCanvas (windowWidth, windowHeight);

  square = new Square(width/2, height/2, 50);
  circle = new Circle(width/3, height/2, 100, '#f155f2');
  myLine = new Line(width/4, 3*height/4, 3*width/4, height/4);
}



function draw() {
  background(0,0,0);

  square.update();
  square.display();

  circle.update();
  circle.display();

  myLine.update();
  myLine.display();


}
