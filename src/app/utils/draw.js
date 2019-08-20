window.draw = (() => {
	return {
		r: (g, size, width) => {
			c.save();
			if (size) {
				c.translate(-size[0] / 2, -size[1] / 2);
			}
			g.forEach((p) => {
				bp();
				c.fillStyle = color.get(p[2]) || p[2] || 'transparent';
				c.strokeStyle = color.get(p[1]) || p[1] || 'transparent';
				c.lineWidth = !p[3] ? width : 1;
				c.lineJoin = 'round';
				m(p[0][0], p[0][1]);
				for(let i = 2; i < p[0].length; i = i + 2) {
					l(p[0][i], p[0][i + 1]);
				}
				p[3] && cp();
				c.stroke();
				p[3] && c.fill();
			});
			c.restore();
		}
	};
})();