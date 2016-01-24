window.__karma__.loaded = function() {
    System.main = 'karma.start';
    steal.done()
};