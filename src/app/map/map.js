window.map = (() => {
  const scale = 40;
  let currentLevel = 4;
  const levels = [
    {
      start: new V(40, 40),
      data: [{"type":0,"x":0,"y":0,"w":14,"h":1},{"type":1,"x":15,"y":1,"w":5,"h":1},{"type":2,"x":21,"y":1,"w":5,"h":1},{"type":3,"x":27,"y":0,"w":5,"h":1},{"type":4,"x":33,"y":0,"w":5,"h":1}]
    },
    {
      start: new V(40, 40),
      data: [{"type":0,"x":0,"y":0,"w":14,"h":1},{"type":2,"x":21,"y":0,"w":5,"h":1},{"type":3,"x":27,"y":0,"w":5,"h":1},{"type":4,"x":33,"y":0,"w":5,"h":1},{"type":0,"x":11,"y":4,"w":2,"h":1},{"type":1,"x":13,"y":4,"w":2,"h":1},{"type":0,"x":15,"y":4,"w":2,"h":1},{"type":1,"x":17,"y":4,"w":2,"h":1},{"type":0,"x":19,"y":4,"w":2,"h":1},{"type":1,"x":21,"y":4,"w":2,"h":1},{"type":0,"x":6,"y":4,"w":3,"h":1,"d":{"x":0,"y":6}}]
    },
    {
      start: new V(40, 40),
      data: [{"type":0,"x":0,"y":0,"w":40,"h":1},{"type":4,"x":7,"y":3,"w":3,"h":1},{"type":4,"x":11,"y":5,"w":3,"h":1},{"type":4,"x":15,"y":7,"w":3,"h":1},{"type":4,"x":18,"y":9,"w":3,"h":1},{"type":4,"x":21,"y":11,"w":3,"h":1},{"type":4,"x":24,"y":13,"w":3,"h":1}]
    },
    {
      start: new V(40, 40),
      data: [{"type":0,"x":0,"y":0,"w":30,"h":1},{"type":4,"x":30,"y":0,"w":1,"h":1},{"type":4,"x":31,"y":0,"w":1,"h":1},{"type":4,"x":32,"y":0,"w":1,"h":1},{"type":4,"x":34,"y":0,"w":1,"h":1},{"type":4,"x":33,"y":0,"w":1,"h":1},{"type":4,"x":35,"y":0,"w":1,"h":1},{"type":4,"x":36,"y":0,"w":1,"h":1},{"type":4,"x":37,"y":0,"w":1,"h":1},{"type":4,"x":38,"y":0,"w":1,"h":1},{"type":4,"x":39,"y":0,"w":1,"h":1},{"type":4,"x":40,"y":0,"w":1,"h":1},{"type":4,"x":41,"y":0,"w":1,"h":1},{"type":4,"x":42,"y":0,"w":1,"h":1},{"type":4,"x":43,"y":0,"w":1,"h":1},{"type":4,"x":44,"y":0,"w":1,"h":1},{"type":4,"x":45,"y":0,"w":1,"h":1},{"type":4,"x":46,"y":0,"w":1,"h":1},{"type":0,"x":47,"y":0,"w":13,"h":1}]
    },
    {
      start: new V(40, 40),
      data: [{"type":0,"x":0,"y":0,"w":19,"h":1},{"type":0,"x":19,"y":3,"w":5,"h":1,"d":{"x":1,"y":6}},{"type":3,"x":10,"y":4,"w":5,"h":1}]
    }
  ];

  let mapData = [];

  function initLevel() {
    mapData = [];
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
