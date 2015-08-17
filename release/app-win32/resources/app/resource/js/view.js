'use strict';

var Q = require( 'q' );
var $ = require( 'jquery' );
var nightwatch = require( '../../src/nightwatch.js' );
var common = require( './common' );
common.addEvent();

module.exports = {
  writeFile: function( callback ){
    var deferred = Q.defer();
    var _ids = common.params.id;
    var scenarios = common.writeFile( _ids );
    scenarios.then(function(){
      deferred.resolve();
    }, function( err ){
      deferred.reject();
    });

    return deferred.promise;
  },
  addEvent: function( sid ){

    var This = this;

    $( '#btnUpdate' ).on( 'click', function( evt ){
      evt.preventDefault();
      location.href = 'create.html?id=' + common.params.id;
    });

    $( '#btnList' ).on( 'click', function( evt ){
      evt.preventDefault();
      location.href = 'list.html?product=' + common.params.product;
    });

    jQuery( '#btnSelectAll' ).on( 'click', function( evt ){
      evt.preventDefault();
      $( 'input[name=scenario]' ).prop( 'checked', true );
    });

    jQuery( '#btnExcute' ).on( 'click', function( evt ){
      evt.preventDefault();

      var writeFile = This.writeFile();
      writeFile.then(function(){
        nightwatch.run();
      }, function(){});
    });

    jQuery( '#btnExcute_ff' ).on( 'click', function( evt ){
      evt.preventDefault();

      var writeFile = This.writeFile();
      writeFile.then(function(){
        nightwatch.run_ff();
      }, function(){});
    });

    jQuery( '#btnExcute_ie' ).on( 'click', function( evt ){
      evt.preventDefault();

      var writeFile = This.writeFile();
      writeFile.then(function(){
        nightwatch.run_ie();
      }, function(){});
    });
  },
  init: function(){

    var This = this;
    var editor =  '';
    var $name = $( '#name' ),
        $product = $(' #product' ),
        code = ( editor )? editor.getValue(): '';

    editor = ace.edit( 'editor' );
    editor.setTheme( 'ace/theme/monokai' );
    editor.getSession().setMode( 'ace/mode/javascript' );

    $.ajax({
      method: 'get',
      url: common.apiUrl + '/select/' + common.params.id,
      success( data ){
        var item = '';
        if( data.result === 'success' ){
          item = data.data[ 0 ];
          $name.append( item.name );
          $product.append( item.product );

          editor.setValue( item.code, 1 ); //move cursor to the end
          editor.setReadOnly( true );

          This.addEvent( common.params.id );
        }
      },
      error( data ){}
    });
  }
};
