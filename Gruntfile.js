// Generated on 2016-09-02 using generator-holmes 0.1.3
'use strict';

// Directory reference:
//   css: css
//   javascript: js
//   images: img
//   fonts: fonts

module.exports = function (grunt) {

  // Proxy using http-proxy to use local Apache/PHP/MySql for browserSync preview.
  //     var httpProxy = require('http-proxy');
  //     var proxy = httpProxy.createProxyServer({
  //      target: 'http://127.0.0.1:80'
  //     });
  //     var proxyMiddleware = function(req, res, next) {
  //        if (req.url.indexOf('blog') != -1) {
  //          proxy.web(req, res);
  //        } else {
  //          next();
  //        }
  //     };


  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);
  // Read package version
   var pkg = require('./package.json');


  grunt.initConfig({
    browserSync: {
      server: {
        bsFiles: {
          src: [
          ]
        },
        options: {
          server: {
            baseDir: [
              '.'
            ]
          }
        }
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'browserSync:server'
    ]);
  });
};
