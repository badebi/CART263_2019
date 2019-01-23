class Food extends Agent {
  constructor(x, y, minSize, maxSize) {
    super(x, y, random(minSize, maxSize), '#ff4152');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.xoff = random(0, width);;
    this.yoff = random(0, height);;
    this.history = [];
  }

  update() {
    this.x = constrain(noise(this.xoff) * width, 0, width);
    this.y = constrain(noise(this.yoff) * height, 0, height);
    this.xoff += random(0.01, 0.03);
    this.yoff += random(0.01, 0.03);

    for (let i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-2, 2);
      this.history[i].y += random(-2, 2);
    }
    let v = createVector(this.x, this.y);
    this.history.push(v);
    if (this.history.length > 25) {
      this.history.splice(0, 1)
    }
  }

  reset() {
    if (myFoods.length > 1) {
      this.active = false;
      // I almost died till I figuerd this out
      // THIS is the way to know what was the index of the food that has been eaten
      let index = myFoods.findIndex(x => x.active==false);
      // so then it can be removed from the array
      myFoods.splice(index, 1);

      return;
    }
    this.xoff = random(0, width);
    this.yoff = random(0, height);
    this.size = random(this.minSize, this.maxSize);
  }


  showTrail() {
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      ellipse(pos.x, pos.y, i, i);
    }
  }
}
