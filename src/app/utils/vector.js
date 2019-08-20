function V(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

V.prototype = {
	add: (v) => {
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	angle: (v) => v ? Math.atan2(this.y, this.x) : Math.atan2(v.y - this.y, v.x - this.x),
	apply: (v) => {
		this.x = v.x;
		this.y = v.y;
		return this;
	},
	distance: (v) => Math.hypot(this.x - v.x, this.y - v.y),
	div: (n) => {
		this.x /= n;
		this.y /= n;
		return this;
	},
	dot: (v) => (this.mag() * v.mag() * Math.cos(this.angle(v))),
	get: () => new V(this.x, this.y),
	mag: () => Math.hypot(this.x, this.y),
	mult: (n) => {
		this.x *= n;
		this.y *= n;
		return this;
	},
	normalize: () => {
		if (this.mag() > 0) {
			this.div(this.mag());
		}
		return this;
	},
	perpendicular: () => {
		let x = this.x;
		this.x = this.y;
		this.y = - x;
		return this;
	},
	round: () => {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},
	sub: (v) => {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	normal: (v) => new V(this.x - v.x, this.y - v.y).perpendicular().normalize(),
	center: (v) => new V(this.x + (v.x - this.x) / 2, this.y + (v.y - this.y) / 2),
};
