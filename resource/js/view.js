'use strict';

var $ = require( 'jquery' );

var common = require( './common' );
common.addEvent();

module.exports = {
  init: function(){

    $( '#btnUpdate' ).on( 'click', function( evt ){
      evt.preventDefault();
      location.href = 'create.html?id=' + common.params.id;
    });

    $( '#btnList' ).on( 'click', function( evt ){
      evt.preventDefault();
      location.href = 'list.html?product=' + common.params.product;
    });

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
        }
      },
      error( data ){}
    });

    btnUpdate

  }
};
