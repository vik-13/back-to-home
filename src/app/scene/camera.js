window.camera = (() => {
  let position = new V();

  return {
    n: () => {
      const characterPosition = character.position();

      if (characterPosition.x - position.x <= 400) {
        position.x = characterPosition.x - 400;
      } else if ((position.x + gc.res.x) - characterPosition.x <= 400) {
        position.x = characterPosition.x - (gc.res.x - 400);
      }
      if (position.x < 0) {
        position.x = 0;
      }

      if (characterPosition.y - position.y <= 200) {
        position.y = characterPosition.y - 200;
      } else if ((position.y + gc.res.y) - characterPosition.y <= 200) {
        position.y = characterPosition.y - (gc.res.y - 200);
      }
      if (position.y < 0) {
        position.y = 0;
      }
    },
    r: () => {
      c.translate(-position.x, -position.y);
    }
  };
})();
