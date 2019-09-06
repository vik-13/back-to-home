window.map = (() => {
  const scale = 40;
  const mapDataSource = [
    {
      x: 3,
      y: 1,
      w: 4,
      h: 1,
      d: new V(4, 3)
    },
    {
      x: 15,
      y: 1,
      w: 4,
      h: 1,
      d: new V(-4, 0)
    }
  ];
  const mapData = [];

  return {
    i: () => {
      mapDataSource.forEach((item) => {
        mapData.push(new Block(item.x * scale, item.y * scale, item.w * scale, item.h * scale, item.d.get().mult(scale)));
      });
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
    getMap: () => mapData
  };
})();
