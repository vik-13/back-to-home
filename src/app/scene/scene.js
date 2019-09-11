window.scene = (() => {
  return {
    i: () => {
      background.i();
      map.i();
      character.i();
    },
    reset: () => {
      background.reset();
      map.reset();
      character.reset();
      particles.reset();
      camera.reset();
    },
    n: () => {
      background.n();
      map.n();
      if (map.isLast()) {
        character.nFinal();
        finalScene.n();
      } else {
        character.n();
      }
      particles.n();
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

      if (map.isLast()) {
        finalScene.rBackground();
      } else {
        background.r();
      }

      c.save();
      camera.r();
      map.r();
      if (map.isLast()) {
        finalScene.r();
        character.rFinal();
      } else {
        character.r();
      }
      particles.r();
      c.restore();
    }
  };
})();
