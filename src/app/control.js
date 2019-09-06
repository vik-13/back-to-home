window.control = (() => {
  const pressed = [0, 0, 0, 0];
  const keys = [37, 32, 39, 40];
  const keysAlt = [65, 87, 68, 83];

  return {
    i: () => {
      window.addEventListener('keydown', (event) => {
        if (keys.indexOf(event.keyCode) !== -1 || keysAlt.indexOf(event.keyCode) !== -1) {
          pressed[keys.indexOf(event.keyCode) !== -1 ? keys.indexOf(event.keyCode) : keysAlt.indexOf(event.keyCode)] = 1;
        }
      });
      window.addEventListener('keyup', (event) => {
        if (keys.indexOf(event.keyCode) !== -1 || keysAlt.indexOf(event.keyCode) !== -1) {
          pressed[keys.indexOf(event.keyCode) !== -1 ? keys.indexOf(event.keyCode) : keysAlt.indexOf(event.keyCode)] = 0;
        }
      });
    },
    pressed: pressed
  }
})();
