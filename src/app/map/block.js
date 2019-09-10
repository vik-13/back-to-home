function SawBlock(type, x, y, w, h, d) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;
  this.active = true;
  this.collisionRadius = 35;


  const func = [
    () => {
      velocity += acc;
      angle += velocity;

      if (velocity <= -.5) nextFunc();
    },
    () => {
      velocity *= .97;
      angle += velocity;
      const current = original.get().add(this.d.get().mult(shift));
      this.x = current.x;
      this.y = current.y;
      if (shift > 1 || shift < 0) {
        direction *= -1;
        nextFunc();
      }
      shift += (step * direction);
    }
  ];
  const g = [[[19,0,28,11,27,21,13,17,0,28,12,26,20,34,10,39,7,56,16,45,24,46,22,56,36,68,32,56,39,48,48,58,65,56,53,50,49,40,63,43,76,30,62,33,52,27,64,16,54,0,54,12,41,19,33,4],"#000","#000",1]];
  const gHolder = [[[6,6,0,22,7,37,23,41,36,35,40,22,36,7,21,0],"#000000","black",1],[[20,17,17,21,20,24,24,23,26,18],"#000000",color.mechanics,1]];
  const speed = 6;
  let angle = 0;
  let acc = -.01;
  let velocity = 0;
  let currentFunc = -1;

  let original = new V(x, y);
  let shift = 0;
  let step = 1 / Math.floor(d.mag() / speed);
  let direction = 1;

  function nextFunc() {
    currentFunc++;
    if (currentFunc === func.length) {
      currentFunc = 0;
    }
  }

  nextFunc();

  this.n = () => {
    func[currentFunc]();
  };

  this.center = () => new V(this.x + 15, this.y + 15);

  this.r = () => {
    c.save();
    c.translate(this.x + 18, this.y + 18);
    c.scale(1, -1);
    c.rotate(angle);
    draw.r(g, [76, 68]);
    c.restore();

    // Holder 1
    c.save();
    c.translate(original.x + 18, original.y + 18);
    draw.r(gHolder, [40, 40]);
    c.restore();

    // Holder 2
    c.save();
    c.translate(original.x + d.x + 18, original.y + d.y + 18);
    draw.r(gHolder, [40, 40]);
    c.restore();
  };
}

function BrokenBlock(type, x, y, w, h, d) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;

  this.active = true;
  this.isMovable = d.mag() > 0;

  this.falling = {
    active: false,
    falling: false,
    dead: false,
    position: new V(),
    velocity: new V(),
    opacity: 1,
    start: 0
  };

  const g = [[[0,0,40,0,39,33,33,29,26,37,16,31,9,29,7,38,0,34],"#000","#000",1]];
  const gHolder = [[[12,0,0,22,11,40,40,36,40,4],"#000000","black",1],[[19,16,16,20,19,24,24,23,26,17],"#000000","color.mechanics",1]];
  const speed = 2;

  let original = new V(x, y);
  let shift = 0;
  let step = this.isMovable ? 1 / Math.floor(d.mag() / speed) : 0;
  let direction = 1;

  this.startFalling = () => {
    if (this.falling.active) return;
    this.falling.active = true;
    this.falling.start = +new Date();
  };

  this.getVelocity = () => new V();

  this.n = () => {
    if (this.isMovable && !this.falling.falling) {
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
      this.falling.position = new V(this.x, this.y);
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
          this.active = true;
          this.x = x;
          this.y = y;
        }, 2000)
      }
    }

    if (!this.falling.active) {
      this.falling.opacity += .05;
      if (this.falling.opacity > 1) this.falling.opacity = 1;
    }
  };

  this.r = () => {
    if (this.isMovable) {
      // Holder 1
      c.save();
      c.translate(original.x + (w / 2), original.y + (h / 2));
      draw.r(gHolder, [40, 40]);
      c.restore();

      // Holder 2
      c.save();
      c.translate(original.x + d.x + (w / 2), original.y + d.y + (h / 2));
      draw.r(gHolder, [40, 40]);
      c.restore();

      // Line
      c.save();
      c.strokeStyle = color.mechanics;
      c.moveTo(original.x + (w / 2), original.y + (h / 2));
      c.lineTo(original.x + d.x + (w / 2), original.y + d.y + (h / 2));
      c.stroke();
      c.restore();
    }

    c.save();
    c.translate(this.x + 20, this.y + 20);
    c.globalAlpha = this.falling.opacity;
    c.scale(1, -1);
    for (let i = 0; i < Math.floor(this.w / 40); i++) {
      c.save();
      if (this.falling.active) {
        c.translate(i * 40 + rInt(-1, 1), rInt(-1, 1));
      } else {
        c.translate(i * 40, 0);
      }
      draw.r(g, [40, 38]);
      c.restore();
    }
    c.globalAlpha = 1;
    c.restore();
  };
}

function Block(type, x, y, w, h, d) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;
  this.isMovable = d.mag() > 0;
  this.active = true;

  const colors = ['#000', 'gray', 'hsl(218, 92%, 10%)', 'hsl(13, 98%, 15%)', 'brown'];
  const nails = [[[0,8,40,8,35,0,34,6,23,1,21,5,15,7,11,1,8,6,3,1],"#000","#000",1]];
  const gHolder = [[[12,0,0,22,11,40,40,36,40,4],"#000000","black",1],[[19,16,16,20,19,24,24,23,26,17],"#000000",color.mechanics,1]];
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
  };

  this.getVelocity = () => d.get().normalize().mult(speed * direction);

  this.r = () => {
    if (this.isMovable) {
      // Holder 1
      c.save();
      c.translate(original.x + (w / 2), original.y + (h / 2));
      draw.r(gHolder, [40, 40]);
      c.restore();

      // Holder 2
      c.save();
      c.translate(original.x + d.x + (w / 2), original.y + d.y + (h / 2));
      draw.r(gHolder, [40, 40]);
      c.restore();

      // Line
      c.save();
      c.strokeStyle = color.mechanics;
      c.moveTo(original.x + (w / 2), original.y + (h / 2));
      c.lineTo(original.x + d.x + (w / 2), original.y + d.y + (h / 2));
      c.stroke();
      c.restore();
    }

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
    } else {
      c.fillStyle = colors[this.type];
      c.fillRect(0, 0, this.w, this.h);
    }
    c.restore();
  }
}
