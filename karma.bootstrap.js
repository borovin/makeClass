window.__karma__.loaded = function () {
    System.main = 'karma.start';
    window.steal.done();
};
