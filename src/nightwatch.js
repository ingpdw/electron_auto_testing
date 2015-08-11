'use strict';

var gulp = require( 'gulp' );
var nightwatch = require( 'gulp-nightwatch' );
var configSrc = './src/nightwatch.json';

module.exports = {
  run: function(){
    gulp.src('')
      .pipe(nightwatch({
        configFile: configSrc,
        cliArgs: {
          env: 'chrome'
        }
      }))
      .on('error', function(){
        alert('error')
      })
      .on('end', function(){
        alert('end')
      });
  },

  run_ff: function(){
    gulp.src('')
      .pipe(nightwatch({
        configFile: configSrc
      }))
      .on('error', function(){
        alert('error')
      })
      .on('end', function(){
        alert('end')
      });
  },

  run_ie: function(){
    gulp.src('')
      .pipe(nightwatch({
        configFile: configSrc,
        cliArgs: {
          env: 'ie'
        }
      }))
      .on('error', function(){
        alert('error')
      })
      .on('end', function(){
        alert('end')
      });
  }
};
