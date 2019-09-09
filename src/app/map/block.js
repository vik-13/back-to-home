function Block(type, x, y, w, h, d) {
  const colors = ['#000', 'gray', 'hsl(218, 92%, 10%)', 'hsl(13, 98%, 15%)', 'brown'];
  const nails = [[[0,8,40,8,35,1,30,5,25,1,20,5,15,0,10,6,5,0],"#000000","#000000",1]];
  this.speed = 2;

  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;

  this.original = new V(x, y);
  this.current = new V(x, y);

  this.velocity = this.d.get().normalize().mult(this.speed);
  this.direction = 1;

  this.n = () => {
    this.current.add(this.velocity.get());
    this.x = this.current.x;
    this.y = this.current.y;
    if (this.original.distance(this.current) >= this.d.mag() || this.original.distance(this.current) <= this.speed) {
      this.direction *= -1;
      this.velocity = this.d.get().normalize().mult(this.speed * this.direction);
    }
  };

  this.r = () => {
    c.save();
    c.translate(this.x, this.y);
    if (this.type === 1) {
      c.save();
      c.scale(1, -1);
      c.translate(-20, -44);
      for (let i = 0; i < Math.floor(this.w / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8]);
      }
      c.restore();
      c.save();
      c.translate(-20, -4);
      for (let i = 0; i < Math.floor(this.w / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8]);
      }
      c.restore();
      c.save();
      c.rotate(Math.PI / 2);
      c.translate(-20, -this.w - 4);
      for (let i = 0; i < Math.floor(this.h / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8]);
      }
      c.restore();
      c.save();
      c.rotate(-Math.PI / 2);
      c.translate(-60, -4);
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
