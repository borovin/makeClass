/* =====================================================================================================================
 * Reltio Applications Development Framework
 *
 * =====================================================================================================================
 * Copyright 2015 Reltio, Inc.
 *
 * Licensed under the Reltio Applications Development Framework License, Version 1.0 (the "License"); you may not use
 * this file except in compliance with the License. Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions and limitations under the
 * License
 * =====================================================================================================================
 */

// Karma configuration

module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            'node_modules/steal/steal.js',
            'karma.bootstrap.js',
            { pattern: 'karma.start.js', included: false },
            { pattern: 'index.js', included: false },
            { pattern: 'tests/**/*.js', included: false },
            { pattern: 'node_modules/**/*.js', included: false },
            { pattern: 'node_modules/**/package.json', included: false },
            { pattern: 'package.json', included: false }
        ],
        exclude: [ ],
        preprocessors: { },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
};