window.particles = (function() {
	let list = [];
	let runningLast = +new Date();

	return {
		reset: () => {
			list = [];
		},
		addRunning: (position) => {
			if (+new Date() - runningLast < 200) {
				return false;
			}
			const amount = 5;
			for (let i = 0; i < amount; i++) {
				list.push(
					new Particle(
						rFloat(.1, .15),
						1,
						position.get(),
						new V(rFloat(-1, 1), rFloat(1.5, 1.8)),
						500,
						color.walking
					)
				);
			}
			runningLast = +new Date();
		},
		addJump: (position, velocityX) => {
			const amount = 50;
			for (let i = 0; i < amount; i++) {
				list.push(
					new Particle(
						rFloat(.1, .15),
						2,
						position.get(),
						new V(rFloat(velocityX - 1 , velocityX + 1), rFloat(1, 1.8)),
						500,
						color.walking
					)
				);
			}
		},
		dying: (position, colors) => {
			const amount = 30;
			for (let i = 0; i < amount; i++) {
				list.push(
					new Particle(
						rFloat(.1, .3),
						rInt(3, 10),
						position.get(),
						new V(rFloat(.5, 2) * Math.sin(rFloat(0, Math.PI * 2)), rFloat(3, 4) * Math.cos(rFloat(0, Math.PI * 2))),
						500,
						colors[rInt(0, colors.length)]
					)
				);
			}
		},
		n: () => {
			list = list.filter(function(particle) {
				particle.n();
				return particle.isActive;
			});
		},
		r: () => {
			list.forEach(function(particle) {
				particle.r();
			});
		}
	};
})();
