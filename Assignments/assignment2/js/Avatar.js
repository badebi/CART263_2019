class Avatar extends Agent {
  constructor(x,y,size,sizeLoss) {
    super(x,y,size, '#ccf548');
    this.maxSize = size;
    this.sizeLoss = sizeLoss;
  }

  update(){
    if (!this.active) {
      return;
    }
    this.x = mouseX;
    this.y = mouseY;
    this.size = constrain(this.size - this.sizeLoss, 0, this.maxSize);

    if (this.size <.3 * this.maxSize){
      myFoods.push(new Food(random(0,width),random(0,height), foodMinSize, foodMaxSie));
    }

    if (this.size === 0){
      this.active = false;
    }
  }

  eating(theFood) {
    if (!this.active) {
      return;
    }
    this.size = constrain(this.size + theFood.size, 0, this.maxSize);
    
    theFood.reset();
  }
}
