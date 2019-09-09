window.map = (() => {
  const scale = 40;
  let currentLevel = 0;
  const levels = [
    {
      start: new V(40, 40),
      data: [{"type":0,"x":0,"y":0,"w":14,"h":1},{"type":1,"x":15,"y":1,"w":5,"h":1},{"type":2,"x":21,"y":1,"w":5,"h":1},{"type":3,"x":27,"y":0,"w":5,"h":1},{"type":4,"x":33,"y":0,"w":5,"h":1}]
    }
  ];

  const mapData = [];

  function initLevel() {
    levels[currentLevel].data.forEach((item) => {
      mapData.push(new Block(item.type, item.x * scale, item.y * scale, item.w * scale, item.h * scale, (item.d ? new V(item.d.x, item.d.y) : new V()).get().mult(scale)));
    });
  }

  return {
    i: () => {
      initLevel();
    },
    reset: () => {
      initLevel();
    },
    n: () => {
      mapData.forEach((item) => {
        item.n();
      });
    },
    r: () => {
      mapData.forEach((item) => {
        item.r();
      });
    },
    getMap: () => mapData,
    currentLevel: () => currentLevel,
    nextLevel: () => {
      currentLevel++;
    },
    getStart: () => levels[currentLevel].start
  };
})();
