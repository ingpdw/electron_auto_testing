'use strict';

var fs = require( 'fs' );
var $ = require( 'jquery' );
var Q = require( 'q' );
var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );


module.exports = {
  apiUrl: 'http://ui-static.korea.ncsoft.corp:5000',
  params: function(){
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
      function(str,key,value){
        params[key] = value;
      });

    return params;
  }(),
  selectMulti: function( _ids ){
    var deferred = Q.defer();

    $.ajax({
      method: 'get',
      url: this.apiUrl + '/selectMulti',
      data: {id: _ids},
      success( data ){
        deferred.resolve( data );
      },
      error( data ){
        deferred.reject(new Error( data ) );
      }
    });

    return deferred.promise;
  },

  removeAllFiles: function( dir ){
    fs.readdirSync( dir ).forEach(function( fileName ) {
       var currPath = dir + '/' + fileName;
      fs.unlinkSync( currPath );
    });
  },

  reports: function( callback ){
    var dir = './reports'
    var file = 'reports.js';

    gulp.src( dir + '/*.xml')
      .pipe( concat( file ) )
      .pipe( gulp.dest( dir ) )
      .on( 'end', function(){
        typeof callback === 'function' && callback( dir + '/' + file );
      })
  },

  writeFile: function( _ids ){
    var deferred = Q.defer();
    var This = this;

    var selectMulti = This.selectMulti( _ids );
    selectMulti.then( function( data ){

      if( data.result === 'success' ){
        if( !data.data ) return;

        var item = data.data;
        var len = item.length;

        This.removeAllFiles( './tests' );
        This.removeAllFiles( './reports' );

        for( var i = 0; item[ i ]; i++ ){

          var _item = item[ i ];
          This.scenarioSave( './tests/' + _item._id + '.js', _item.code, function(){
            if( !--len ){
                deferred.resolve();
            }
          });
        }
      }else{
          deferred.reject( 'err' );
      }
    }, function(){
      deferred.reject( 'err' );
    });

    return deferred.promise;

  },

  scenarioSave: function( filename, data, callback ){
    fs.writeFile( filename, data, function(err) {
      if(err) throw err;
      typeof callback === 'function' && callback();
    });
  },
  addExecuteEvent: function(){


  },
  addEvent: function(){
    $( '#btnBack' ).on( 'click', function( evt ){
      evt.preventDefault();
      history.go( -1 );
    });



  }
};
