(() => {
  window.rInt = (from, to) => Math.floor(from + (Math.random() * (to - from)));
  window.rFloat = (from, to) => from + (Math.random() * (to - from));

  window.gc = {
    res: {x: 1280, y: 720},
    mousePosition: new V(),
    start: +new Date(),
    last: +new Date(),
    paused: true
  };

  function init() {
    gc.canvas = document.getElementById('app');

    window.c = gc.canvas.getContext('2d');
    window.l = c.lineTo.bind(c);
    window.m = c.moveTo.bind(c);
    window.bp = c.beginPath.bind(c);
    window.cp = c.closePath.bind(c);
    gc.gravity = new V(0, -.8);

    resize();

    control.i();

    scene.i();

    live();

    gc.canvas.addEventListener('mousemove', (e) => {
      gc.mousePosition = new V(e.offsetX, e.offsetY);
    });
  }

  function resize() {
    gc.size = {x: window.innerWidth, y: window.innerHeight};
    gc.originalRatio = Math.min(gc.size.x / gc.res.x, gc.size.y / gc.res.y);
    gc.canvas.style.width = Math.round(gc.res.x * gc.originalRatio) + 'px';
    gc.canvas.style.height = Math.round(gc.res.y * gc.originalRatio) + 'px';
    gc.ratio = gc.originalRatio * (window.devicePixelRatio || 1);
    // gc.ratio = gc.originalRatio;

    changeCanvasSize();
  }

  function changeCanvasSize() {
    gc.canvas.width = Math.round(gc.res.x * gc.ratio);
    gc.canvas.height = Math.round(gc.res.y * gc.ratio);
  }

  function live() {
    gc.last = +new Date();
    n();
    r();
    requestAnimationFrame(live);
  }

  function endGame() {
    character.reset();
    map.reset();
  }

  function endLevel() {

  }

  function n() {
    scene.n();

    if (character.isDead()) {
      endGame();
    }
    // console.log(control.pressed);
  }

  function r() {
    c.save();
    c.scale(gc.ratio, gc.ratio);
    scene.r();
    c.restore();
  }

  window.onload = init;
  window.onresize = resize;
})();
