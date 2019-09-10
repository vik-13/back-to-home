window.scene = (() => {
  return {
    i: () => {
      map.i();
      character.i();
    },
    reset: () => {
      map.reset();
    },
    n: () => {
      map.n();
      character.n();
      camera.n();
    },
    r: () => {
      c.save();
      let bg = c.createLinearGradient(0, 0, 0, gc.res.y);
      bg.addColorStop(0, 'hsl(37, 30%, 45%)');
      bg.addColorStop(1, 'hsl(37, 30%, 25%)');
      c.fillStyle = bg;
      c.fillRect(0, 0, gc.res.x, gc.res.y);
      c.restore();

      c.save();
      camera.r();
      map.r();
      character.r();
      c.restore();
    }
  };
})();
