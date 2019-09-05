window.scene = (() => {
  return {
    i: () => {
      map.i();
      character.i();
    },
    n: () => {
      map.n();
      character.n();
    },
    r: () => {
      c.save();
      let bg = c.createLinearGradient(0, 0, 0, gc.res.y);
      bg.addColorStop(0, '#999999');
      bg.addColorStop(1, '#111111');
      c.fillStyle = bg;
      c.fillRect(0, 0, gc.res.x, gc.res.y);
      c.restore();

      map.r();
      character.r();
    }
  };
})();
