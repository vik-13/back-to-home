window.map = (() => {
  const scale = 40;
  const mapDataSource = [
    {
      x: 1,
      y: 2,
      w: 1,
      h: 8
    },
    {
      x: 1,
      y: 1,
      w: 10,
      h: 1
    },
    {
      x: 1,
      y: 15,
      w: 10,
      h: 1
    },
    {
      x: 10,
      y: 2,
      w: 1,
      h: 8
    },
    {
      x: 12,
      y: 1,
      w: 10,
      h: 1
    }
  ];
  const mapData = [];

  return {
    i: () => {
      mapDataSource.forEach((item) => {
        mapData.push({
          x: item.x * scale,
          y: item.y * scale,
          w: item.w * scale,
          h: item.h * scale
        });
      });
    },
    n: () => {

    },
    r: () => {
      mapData.forEach((item) => {
        c.save();
        c.translate(item.x, item.y);
        c.fillStyle = '#000';
        c.fillRect(0, 0, item.w, item.h);
        c.restore();
      });
    },
    getMap: () => mapData
  };
})();
