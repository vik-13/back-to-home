window.background = (() => {
  const g1 = [[[0,2,494,0,497,163,469,51,471,144,451,96,447,162,423,65,425,139,385,52,373,146,352,157,350,37,330,130,310,159,290,151,281,38,273,163,262,88,255,141,232,39,215,141,203,162,180,94,174,163,152,157,143,89,117,124,113,172,77,149,74,85,57,164,54,82,32,173,19,60,2,160],'','black',1],[[138,107,124,167,156,194],'','black',1],[[183,116,189,156,182,195,179,154],'','black',1],[[233,63,214,158,232,159],'','black',1],[[236,75,251,151,237,195],'','black',1],[[281,94,279,158,288,162],'','black',1],[[346,76,347,149,353,182,321,199,322,167],'','black',1],[[387,75,374,149,386,149,401,181,401,147,426,150,393,106],'','black',1],[[455,117,455,154,475,158],'','black',1],[[18,88,2,204,23,162],'','black',1],[[50,115,41,163,55,193],'','black',1]];
  
  return {
    i: () => {

    },
    reset: () => {

    },
    n: () => {

    },
    r: () => {
      c.save();
      c.translate(2400 - (camera.getPosition().x / 2), 1000 - (camera.getPosition().y / 2));
      c.globalAlpha = .1;
      c.scale(10, -10);
      draw.r(g1, [497, 204]);
      c.globalAlpha = 1;
      c.restore();
    }
  };
})();
