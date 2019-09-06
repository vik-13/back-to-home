function Block(x, y, w, h, d) {
  this.speed = 2;

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
    if (this.original.distance(this.current) >= this.d.mag() || this.original.distance(this.current) <= 0) {
      this.direction *= -1;
      this.velocity = this.d.get().normalize().mult(this.speed * this.direction);
    }
  };

  this.r = () => {
    c.save();
    c.translate(this.x, this.y);
    c.fillStyle = '#000';
    c.fillRect(0, 0, this.w, this.h);
    c.restore();
  }
}
