module.exports = function() {
  return {
    sources: {
      index: 'src/index.html',
      scripts: 'src/app/**/*.js'
    },
    release: {
      index: 'release',
      scripts: 'release'
    }
  };
};
