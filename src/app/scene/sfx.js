window.sfx = (() => {
  const dying = [[61.74, 3]];

  let lastRunFX = +new Date();
  let lastWallFX = +new Date();

  function playShort(frequency, time) {
    const o = gc.ac.createOscillator();
    const g = gc.ac.createGain();
    o.type = 'triangle';
    o.connect(g);
    g.connect(gc.ac.destination);
    o.frequency.value = frequency;
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, gc.ac.currentTime + (time || .5));
  }

  function play(list) {
    function recursive(index) {
      playShort(...list[index]);
      index++;
      if (index < list.length) {
        setTimeout(() => {
          recursive(index);
        }, list[index][1] * 1000);
      }
    }
    recursive(0);
  }

  return {
    fall: () => {
      playShort(43.65);
    },
    jump: () => {
      playShort(82.41, .2);
    },
    run: () => {
      if (+new Date() - lastRunFX < 200) return;
      playShort(146.83, .05);
      lastRunFX = +new Date();
    },
    wall: () => {
      if (+new Date() - lastWallFX < 100) return;
      playShort(41.20, .2);
      lastWallFX = +new Date();
    },
    die: () => {
      play(dying);
    },
    win: () => {
      play(dying);
    }
  };
})();
