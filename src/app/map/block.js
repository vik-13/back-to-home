function Block(type, x, y, w, h, d) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;
  this.isMovable = d.mag() > 0;
  this.active = true;

  this.falling = {
    active: false,
    falling: false,
    dead: false,
    position: new V(),
    velocity: new V(),
    opacity: 1,
    start: 0
  };

  const colors = ['#000', 'gray', 'hsl(218, 92%, 10%)', 'hsl(13, 98%, 15%)', 'brown'];
  const nails = [[[0,8,40,8,35,0,34,6,23,1,21,5,15,7,11,1,8,6,3,1],"#000","#000",1]];
  const fallingBlock = [[[0,0,40,0,39,33,33,29,26,37,16,31,9,29,7,38,0,34],"#000","#000",1]];
  const speed = 2;

  let original = new V(x, y);
  let shift = 0;
  let step = this.isMovable ? 1 / Math.floor(d.mag() / speed) : 0;
  let direction = 1;

  this.n = () => {
    if (this.isMovable) {
      const current = original.get().add(this.d.get().mult(shift));
      this.x = current.x;
      this.y = current.y;
      if (shift > 1 || shift < 0) {
        direction *= -1;
      }
      shift += (step * direction);
    }

    if (this.falling.active && !this.falling.falling) {
      if (+new Date() - this.falling.start < 1000) return;
      this.falling.falling = true;
      this.active = false;
    } else if (this.falling.falling && !this.falling.dead) {
      const acc = this.falling.velocity.get().normalize().mult(-0.017);
      acc.add(gc.gravity.get().mult(.3));
      this.falling.velocity.add(acc);
      this.falling.position.add(this.falling.velocity);
      this.x = this.falling.position.x;
      this.y = this.falling.position.y;
      this.falling.opacity -= .04;
      if (this.falling.opacity < 0) {
        this.falling.dead = true;
        this.falling.opacity = 0;
        setTimeout(() => {
          this.falling.active = false;
          this.falling.falling = false;
          this.falling.dead = false;
          this.falling.opacity = 1;
          this.active = true;
          this.x = x;
          this.y = y;
        }, 2000)
      }
    }
  };

  this.getVelocity = () => {
    return d.get().normalize().mult(speed * direction);
  };

  this.startFalling = () => {
    if (this.falling.active) return;
    this.falling.active = true;
    this.falling.position = new V(this.x, this.y);
    this.falling.start = +new Date();
  };

  this.r = () => {
    c.save();
    c.translate(this.x, this.y);
    if (this.type === 1) {
      // TOP
      c.save();
      c.scale(1, -1);
      c.translate(-20, -this.h - 4);
      for (let i = 0; i < Math.floor(this.w / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8]);
      }
      c.restore();
      // BOTTOM
      c.save();
      c.translate(-20, -4);
      for (let i = 0; i < Math.floor(this.w / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8]);
      }
      c.restore();
      // RIGHT
      c.save();
      c.rotate(Math.PI / 2);
      c.translate(-20, -this.w - 4);
      for (let i = 0; i < Math.floor(this.h / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8]);
      }
      c.restore();
      // LEFT
      c.save();
      c.rotate(-Math.PI / 2);
      c.translate(-this.h - 20, -4);
      for (let i = 0; i < Math.floor(this.h / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8]);
      }
      c.restore();
      c.fillStyle = '#000';
      c.fillRect(0, 0, this.w, this.h);
    } else if (this.type === 4) {
      c.save();
      c.globalAlpha = this.falling.opacity;
      c.scale(1, -1);
      c.translate(20, -20);
      for (let i = 0; i < Math.floor(this.w / 40); i++) {
        c.save();
        if (this.falling.active) {
          c.translate(i * 40 + rInt(-2, 2), rInt(-2, 2));
        } else {
          c.translate(i * 40, 0);
        }
        draw.r(fallingBlock, [40, 38]);
        c.restore();
      }
      c.globalAlpha = 1;
      c.restore();
    } else {
      c.fillStyle = colors[this.type];
      c.fillRect(0, 0, this.w, this.h);
    }
    c.restore();
  }
}
