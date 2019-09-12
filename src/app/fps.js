window.fps = (() => {
  let sum;
  let count = 0;
  let start = +new Date();

  return {
    i: () => {
      start = +new Date();
    },
    add: (time) => {
      sum = sum ? sum + time : time;
      count++;
    },
    get: () => {
      return Math.floor(1000 / (sum / count));
    },
    getQuality: () => {
      let quality = gc.graphicsQuality;
      if (+new Date() - start >= 5000 && fps.get() < 50) {
        quality = gc.graphicsQuality === 1 ? .75 : .5;
        start = +new Date();
      }
      return quality;
    }
  }
})();
