'use strict';

var gulp = require( 'gulp' );
var nightwatch = require( 'gulp-nightwatch' );

module.exports = {
  run: function(){
    gulp.src('')
      .pipe(nightwatch({
        configFile: './src/nightwatch.json'
      }))
      .on('end', function() {alert('end')});
  },

  run_ff: function(){
    gulp.src('')
      .pipe(nightwatch({
        configFile: './src/nightwatch_ff.json'
      }))
      .on('end', function() {alert('end')});
  }
};
