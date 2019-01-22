class Food extends Agent {
  constructor(x,y,minSize,maxSize) {
    super(x,y,random(minSize,maxSize),'#ff4152');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.xoff = 0.0;
    this.yoff = 1000;
    this.history = [];
  }

  reset() {
    this.xoff = random(0, width);
    this.yoff = random(0, height);
    this.size = random(this.minSize, this.maxSize);
  }

  update() {
    this.x = constrain(noise(this.xoff) * width, 0, width);
    this.y = constrain(noise(this.yoff) * height, 0, height);
    this.xoff += random(0.01,0.03);
    this.yoff += random(0.01,0.03);

    let v = createVector (this.x, this.y);
    this.history.push(v);
  }

  showTrail() {
    for (let i = 0; i < this.history.length; i++){
      let pos = this.history[i];
      ellipse(pos.x, pos.y, 8,8);
    }
  }
}
