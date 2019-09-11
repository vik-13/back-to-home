window.background = (() => {
  // const fakeLevel = [[0,0,0,14,1],[0,15,0,1,5],[0,11,5,1,3],[0,8,6,1,4],[0,4,7,1,7],[0,5,4,4,1],[0,14,7,1,5],[0,18,2,7,1],[0,20,4,1,5],[0,17,8,1,6],[1,11,11,1,1],[1,8,12,1,1],[1,6,9,1,1],[1,6,6,1,1],[1,14,14,1,1,3,5],[1,22,10,1,1],[1,20,13,1,1,0,-2],[1,25,5,1,1],[1,25,8,1,1],[1,25,12,1,1,3,2],[0,25,10,6,1],[2,28,5,2,3],[2,28,2,8,1],[4,32,8,4,1],[4,32,11,4,1],[4,16,6,2,1],[4,10,2,3,1],[5,39,7,1,1,0,7],[1,23,14,1,1,0,-2],[0,38,4,6,1],[0,42,7,1,10],[0,45,8,1,7],[0,48,8,1,6],[0,46,2,8,1,7,7]];
  const g1 = [[[0,2,494,0,497,163,469,51,471,144,451,96,447,162,423,65,425,139,385,52,373,146,352,157,350,37,330,130,310,159,290,151,281,38,273,163,262,88,255,141,232,39,215,141,203,162,180,94,174,163,152,157,143,89,117,124,113,172,77,149,74,85,57,164,54,82,32,173,19,60,2,160],"","black",1],[[138,107,124,167,156,194],"","black",1],[[183,116,189,156,182,195,179,154],"","black",1],[[233,63,214,158,232,159],"","black",1],[[236,75,251,151,237,195],"","black",1],[[281,94,279,158,288,162],"","black",1],[[346,76,347,149,353,182,321,199,322,167],"","black",1],[[387,75,374,149,386,149,401,181,401,147,426,150,393,106],"","black",1],[[455,117,455,154,475,158],"","black",1],[[18,88,2,204,23,162],"","black",1],[[50,115,41,163,55,193],"","black",1]];
  const g2 = [[[0,56,0,63,25,63,25,56],"","black",1],[[39,40,39,70,45,70,45,40],"","black",1],[[67,31,67,36,98,36,98,31],"","black",1],[[112,52,112,57,144,57,144,52],"","black",1],[[163,17,163,60,169,60,169,17],"","black",1],[[187,0,187,47,194,47,194,0],"","black",1],[[202,19,202,26,240,26,240,19],"","black",1],[[246,5,246,8,280,8,280,5],"","black",1],[[285,27,321,27,321,19,285,19],"","black",1],[[335,39,335,5,342,5,342,39],"","black",1],[[362,32,362,40,396,40,396,32],"","black",1]];

  return {
    i: () => {

    },
    reset: () => {

    },
    n: () => {

    },
    r: () => {
      c.save();
      c.translate(2400 - (camera.getPosition().x / 2), 1100 - (camera.getPosition().y / 2));
      c.globalAlpha = .1;
      c.scale(10, -10);
      draw.r(g1, [497, 204]);
      c.globalAlpha = 1;
      c.restore();

      c.save();
      c.translate(2400 - (camera.getPosition().x / 1.3), 400 - (camera.getPosition().y / 1.3));
      c.globalAlpha = .3;
      c.scale(10, -10);
      draw.r(g2, [396, 71]);
      c.globalAlpha = 1;
      c.restore();
    }
  };
})();
