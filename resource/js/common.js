'use strict';

var fs = require( 'fs' );
var $ = require( 'jquery' );

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
  removeAllFiles: function( dir ){
    fs.readdirSync( dir ).forEach(function( fileName ) {
       var currPath = dir + '/' + fileName;
      fs.unlinkSync( currPath );
    });
  },
  scenarioSave: function( filename, data, callback ){
    fs.writeFile( filename, data, function(err) {
      if(err) throw err;
      typeof callback === 'function' && callback();
    });
  },
  addEvent: function(){
    $( '#btnBack' ).on( 'click', function( evt ){
      evt.preventDefault();
      history.go( -1 );
    });

  }
};
