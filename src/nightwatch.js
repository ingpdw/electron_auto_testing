'use strict';

var gulp = require( 'gulp' );
var nightwatch = require( 'gulp-nightwatch' );
var configSrc = './src/nightwatch.json';

module.exports = {
  result: function(){
    location.href = 'result.html';
  },
  error: function( err ){
    location.href = 'result.html?err=' + err;
  },
  run: function(){
    var This = this;

    gulp.src('')
      .pipe(nightwatch({
        configFile: configSrc,
        cliArgs: {
          env: 'chrome'
        }
      }))
      .on('error', function( err ){
        This.error( err );
      })
      .on('end', function(){
        This.result();
      });
  },

  run_ff: function(){
    var This = this;

    gulp.src('')
      .pipe(nightwatch({
        configFile: configSrc
      }))
      .on('error', function( err ){
        This.error( err );
      })
      .on('end', function(){
        This.result();
      });
  },

  run_ie: function(){
    var This = this;
    
    gulp.src('')
      .pipe(nightwatch({
        configFile: configSrc,
        cliArgs: {
          env: 'ie'
        }
      }))
      .on('error', function( err ){
        This.error( err );
      })
      .on('end', function(){
        This.result();
      });
  }
};
