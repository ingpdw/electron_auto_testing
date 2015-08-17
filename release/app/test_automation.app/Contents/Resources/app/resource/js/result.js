'use strict';

var fs = require( 'fs' );
var Q = require( 'q' );
var $ = require( 'jquery' );
var common = require( './common' );
common.addEvent();

module.exports = {

  init: function(){

    var editor = ace.edit( 'editor' );
    editor.setTheme( 'ace/theme/monokai' );
    editor.getSession().setMode( 'ace/mode/javascript' );

    //editor.setValue( common.params.err, 1 ); //move cursor to the end
    editor.setReadOnly( true );

    common.reports(function( filename ){
      var data = fs.readFileSync( filename, 'utf8' );
      editor.setValue( data, 1 );
    });
  }
};
