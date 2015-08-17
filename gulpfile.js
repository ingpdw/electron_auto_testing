var fs = require( 'fs' ),
    path = require( 'path' ),
    gulp = require( 'gulp' ),
    manifest = require( './package.json' ),
    gp = require( 'gulp-load-plugins' )(),
    asar = require( 'asar' ),
    electron = require( 'gulp-atom-electron' );

var electronVersion = '0.30.1';
var OUTWD = './build';
var ROOT = './';
var MAIN = [
  path.join( ROOT, 'index.html' ),
  path.join( ROOT, 'list.html' ),
  path.join( ROOT, 'result.html' ),
  path.join( ROOT, 'create.html' ),
  path.join( ROOT, 'view.html' ),
  path.join( ROOT, 'package.json' ),
  path.join( ROOT, 'main.js' )
];

gulp.task( 'run', function(){
  gulp.start( gp.shell.task( ['electron ' + ROOT ] ) );
});

gulp.task( 'build-run', function(){
  gulp.start( gp.shell.task( ['electron ' + OUTWD ] ) );
});

gulp.task( 'module', function(){
  var src = [];
  for( var key in manifest.dependencies ){
    src.push( './node_modules/' + key + '/**/*.*' );
  };

  gulp.src( src, { base: './' } )
    .pipe( gp.size( {title: 'module' } ) )
    .pipe( gulp.dest( path.join( OUTWD ) ) )
    .on( 'error', gp.util.log )
});

gulp.task( 'main', function(){
  gulp.src( MAIN )
      .pipe( gp.size( {title: 'main' } ) )
      .pipe( gp.changed( OUTWD ) )
      .pipe( gulp.dest( OUTWD ) )
      .on( 'error', gp.util.log )

  gulp.src( './src/**' )
      .pipe( gp.size( {title: 'src' } ) )
      .pipe( gp.changed( OUTWD ) )
      .pipe( gulp.dest( path.join( OUTWD, 'src' ) ) )
      .on( 'error', gp.util.log )

  gulp.src( './resource/**' )
      .pipe( gp.size( {title: 'resource' } ) )
      .pipe( gp.changed( OUTWD ) )
      .pipe( gulp.dest( path.join( OUTWD, 'resource' ) ) )
      .on( 'error', gp.util.log )

  gulp.src( './drivers/**' )
      .pipe( gp.size( {title: 'drivers' } ) )
      .pipe( gp.changed( OUTWD ) )
      .pipe( gulp.dest( path.join( OUTWD, 'drivers' ) ) )
      .on( 'error', gp.util.log )

  gulp.src( './libs/**' )
      .pipe( gp.size( {title: 'libs' } ) )
      .pipe( gp.changed( OUTWD ) )
      .pipe( gulp.dest( path.join( OUTWD, 'libs' ) ) )
      .on( 'error', gp.util.log )

});

gulp.task( 'build', function(){
  gulp.start([ 'main', 'module' ]);
});

gulp.task( 'pack', function(){
  var dest = 'auto.asar';
  asar.createPackage(OUTWD, dest, function() {
    console.log( 'done.' );
  })
});

gulp.task('release', function(){
    return gulp.src( 'build/**' )
      .pipe(electron({
        version: electronVersion,
        platform: 'darwin',
        companyName: manifest.name
       }))
      .pipe( electron.zfsdest('release/app.zip') );
});

gulp.task('release-win32', function(){
    return gulp.src( 'build/**' )
      .pipe(electron({
        version: electronVersion,
        platform: 'win32',
        companyName: manifest.name
       }))
      .pipe( electron.zfsdest('release/app-win32.zip') );
});

gulp.task('release-win64', function(){
    return gulp.src( 'build/**' )
      .pipe(electron({
        version: electronVersion,
        platform: 'win32',
        arch: 'x64',
        companyName: manifest.name
       }))
      .pipe( electron.zfsdest('release/app-win64.zip') );
});
