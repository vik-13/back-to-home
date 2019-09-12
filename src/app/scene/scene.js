window.scene = (() => {
  let bg;

  return {
    i: () => {
      bg = c.createLinearGradient(0, 0, 0, gc.res.y);
      bg.addColorStop(0, 'hsl(37, 30%, 45%)');
      bg.addColorStop(1, 'hsl(37, 30%, 10%)');

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
      if (gc.splashScreen) {
        splashScreen.n();
      } else {
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
      }
    },
    r: () => {
      c.save();
      c.fillStyle = bg;
      c.fillRect(0, 0, gc.res.x, gc.res.y);
      c.restore();

      if (gc.splashScreen) {
        splashScreen.r();
      } else {
        if (map.isLast()) {
          finalScene.rBackground();
        } else {
          background.r();
        }

        c.save();
        camera.r();
        map.r();
        if (map.isLast()) {
          character.rFinal();
          finalScene.r();
        } else {
          character.r();
        }
        particles.r();
        c.restore();
      }
    }
  };
})();
