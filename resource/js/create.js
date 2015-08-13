'use strict';

var $ = require( 'jquery' );

var common = require( './common' );
    common.addEvent();

module.exports = {
  init: function(){

    var editor, sId = common.params.id;

    editor = ace.edit( 'editor' );
    editor.setTheme( 'ace/theme/monokai' );
    editor.getSession().setMode( 'ace/mode/javascript' );

    $( '#btnSave' ).on( 'click', function( evt ){
      evt.preventDefault();

      var name = $( '#name' ).val(),
          product = $(' #product' ).val(),
          code = editor.getValue(),
          url =  common.apiUrl + '/insert';

      if( !name ) return;
      if( !product ) return;
      if( !code ) return;

      var sid = $( '#sid' ).val();

      if( sid ) url = common.apiUrl + '/update';

      $.ajax({
        method: 'post',
        url: url,
        data: {
          sid: sid,
          name: name,
          product: product,
          code: code
        },success( data ){
          if( data.result === 'success' )
            location.href = 'view.html?id=' + data.data._id + '&product=' + data.data.product;
        },error( data ){

        }
      });
    });

    $.ajax({
      method: 'get',
      url: common.apiUrl + '/select/' + sId,
      success( data ){
        var item = '';
        if( data.result === 'success' ){
          item = data.data[ 0 ];
          $( '#name' ).val( item.name );
          $( '#sid' ).val( item._id );
          $( '#product' ).val( item.product );
          editor.setValue( item.code, -1 ); //move cursor to the start
        }
      },
      error( data ){}
    });

    var selectCategory = common.selectCategory();
    selectCategory.then( function( data ){
      var _tmp = [], template = '<option value="{{name}}">{{name}}</option>';
      if( data.result === 'success'){
        var items = data.data;
        for( var i = 0; items[ i ]; i++ ){
          var item = items[ i ];
          _tmp.push( template.replace( /{{name}}/g, item.name ) );
        }

        $( '#product' ).append( _tmp.join( '' ) );
      }
    }, function(){

    });
  }
};
