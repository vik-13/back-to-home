window.color = (() => {
  const DIFF = 70,
    colors = {
      st: ['hsl(214, 100%, c%)', 75]
    };

  return {
    get: (ident) => {
      if (!colors[ident]) {
        return false;
      }
      let c = colors[ident][1] - (DIFF * gc.night);
      c = c >= 0 ? c : 0;
      return colors[ident][0].replace('c', c);
    }
  };
})();
