function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;

	this.add = (vector) => {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	};

	this.angle = (vector) => {
		return (typeof vector === 'undefined') ? Math.atan2(this.y, this.x) :
			Math.atan2(vector.y - this.y, vector.x - this.x);
	};

	this.apply = (vector) => {
		this.x = vector.x;
		this.y = vector.y;
		return this;
	};

	this.distance = (vector) => {
		return Math.hypot(this.x - vector.x, this.y - vector.y);
	};

	this.div = (num) => {
		this.x /= num;
		this.y /= num;
		return this;
	};

	this.dot = (vector) => {
		return this.mag() * vector.mag() * Math.cos(this.angle(vector));
	};

	this.get = () => {
		return new Vector(this.x, this.y);
	};

	this.mag = () => {
		return Math.hypot(this.x, this.y);
	};

	this.mult = (num) => {
		this.x *= num;
		this.y *= num;
		return this;
	};

	this.normalize = () => {
		let length = this.mag();
		if (length > 0) {
			this.div(length);
		}
		return this;
	};

	this.perpendicular = () => {
		let x = this.x;
		this.x = this.y;
		this.y = - x;
		return this;
	};

	this.round = () => {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	};

	this.sub =(vector) => {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	};

	this.normal = (vector) => {
		return new Vector(this.x - vector.x, this.y - vector.y).perpendicular().normalize();
	};

	this.center = (vector) => {
		return new Vector(this.x + (vector.x - this.x) / 2, this.y + (vector.y - this.y) / 2);
	}
}
