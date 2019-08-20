window.color = (() => {
	const DIFF = 70;
	const colors = {
		st: ['hsl(214, 100%, c%)', 75], // Sky top;
		sb: ['hsl(214, 100%, c%)', 90], // Sky bottom
		g1: ['hsl(87, 39%, c%)', 66], // green
		g2: ['hsl(87, 39%, c%)', 75], // light green
		g3: ['hsl(206, 3%, c%)', 58], // grey
		g4: ['hsl(181, 5%, c%)', 100], // white
		g5: ['hsl(181, 79%, c%)', 85], // light blue
		gf1: ['hsl(31, 24%, c%)', 39], // green
		gf2: ['hsl(31, 24%, c%)', 45], // light green
		gf3: ['hsl(206, 3%, c%)', 48], // grey
		gf4: ['hsl(181, 5%, c%)', 90], // white
		gf5: ['hsl(181, 79%, c%)', 75], // light blue
		chTopL: ['hsl(37, 56%, c%)', 40],
		chTopC: ['hsl(37, 56%, c%)', 45],
		chTopR: ['hsl(37, 56%, c%)', 54],
		chBottomL: ['hsl(94, 5%, c%)', 40],
		chBottomR: ['hsl(94, 5%, c%)', 52],
		skin: ['hsl(33, 80%, c%)', 75],
		hair: ['hsl(33, 22%, c%)', 35],
		back: ['hsl(96, 30%, c%)', 60],
		benchTop: ['hsl(42, 41%, c%)', 41],
		benchBottom: ['hsl(42, 41%, c%)', 31],
		smoke: ['hsl(224, 4%, c%)', 84],
		tree1Bottom: ['hsl(17, 81%, c%)', 30],
		tree1_1: ['hsl(154, 43%, c%)', 31],
		tree1_2: ['hsl(170, 36%, c%)', 35],
		tree1_3: ['hsl(169, 21%, c%)', 48],
		tree2Bottom: ['hsl(30, 84%, c%)', 30],
		tree2_1: ['hsl(154, 43%, c%)', 31],
		tree2_2: ['hsl(127, 34%, c%)', 30],
		tree2_3: ['hsl(109, 29%, c%)', 36],
		walking: ['hsl(224, 4%, c%)', 75],
		rock1: ['hsl(260, 2%, c%)', 75],
		rock2: ['hsl(260, 2%, c%)', 65],
		rock3: ['hsl(260, 2%, c%)', 55],
		rock4: ['hsl(260, 2%, c%)', 45],
		snow: ['hsl(181, 5%, c%)', 90],
		brown1: ['hsl(42, 41%, c%)', 41],
		brown2: ['hsl(33, 33%, c%)', 55],
		brown3: ['hsl(39, 58%, c%)', 33],
		brown4: ['hsl(17, 81%, c%)', 23],
		brown5: ['hsl(52, 36%, c%)', 52],
		cup: ['hsl(15, 69%, c%)', 49],
		camp1: ['hsl(11, 77%, c%)', 37],
		camp2: ['hsl(112, 49%, c%)', 9],
		owl1: ['hsl(28, 8%, c%)', 37],
		owl2: ['hsl(28, 8%, c%)', 11]
	};

	return {
		i: () => {

		},
		n: () => {

		},
		get: (ident) => {
			if (!colors[ident]) {
				return false;
			}
			let c = colors[ident][1] - (DIFF * gc.night);
			c = c >= 0 ? c : 0;
			return colors[ident][0].replace('c', c);
		}
	};
})();