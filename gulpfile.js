var fs = require( 'fs' ),
    path = require( 'path' ),
    gulp = require( 'gulp' ),
    gp = require( 'gulp-load-plugins' )();

gulp.task( 'run', function(){
  gulp.start( gp.shell.task( ['electron ./' ] ) );
});
