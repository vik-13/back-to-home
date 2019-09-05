window.control = (() => {
  const pressed = [0, 0, 0, 0];
  const keys = [37, 38, 39, 40];

  return {
    i: () => {
      window.addEventListener('keydown', (event) => {
        if (keys.indexOf(event.keyCode) !== -1) {
          pressed[keys.indexOf(event.keyCode)] = 1;
        }
      });
      window.addEventListener('keyup', (event) => {
        if (keys.indexOf(event.keyCode) !== -1) {
          pressed[keys.indexOf(event.keyCode)] = 0;
        }
      });
    },
    pressed: pressed
  }
})();