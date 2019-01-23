class Agent {
  constructor(x, y, size, agentColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = agentColor;
    this.active = true;
  }

  display() {
    if (!this.active) {
      return;
    }
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  isCollidingWith(otherAgent) {
    if (!this.active) {
      return false;
    }

    let dis = dist(this.x, this.y, otherAgent.x, otherAgent.y);

    if (dis < this.size / 2 + otherAgent.size / 2) {
      return true;
    } else {
      return false;
    }
  }

}
