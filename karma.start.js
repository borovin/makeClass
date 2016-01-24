var testFiles = Object.keys(window.__karma__.files).filter(function(file) {
    return (file.indexOf('/tests/') > 0 && file.indexOf('/node_modules/') < 0);
});

var testImports = testFiles.map(function(testFile) {

    var testModule = testFile
        .replace(/\/base\//g, '')
        .replace(/.js/g, '');

    return System.import(testModule)
});

Promise.all(testImports).then(function() {
    window.__karma__.start();
});

