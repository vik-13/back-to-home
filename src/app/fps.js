window.fps = (() => {
  let sum;
  let count = 0;
  return {
    i: () => {

    },
    add: (time) => {
      sum = sum ? sum + time : time;
      count++;
    },
    get: () => {
      return Math.floor(1000 / (sum / count));
    }
  }
})();
