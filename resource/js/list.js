'use strict';

var $ = require( 'jquery' );

var common = require( './common' );
    common.addEvent();

module.exports = {
  init: function(){
    var pId = common.params.product;

    $( 'h1' ).append( pId );

    $.ajax({
      method: 'get',
      url: common.apiUrl + '/product?id=' + pId,
      success( data ){
        var item = '';
        if( data.result === 'success' ){
          item = data.data;

          var tmp = [];

          if( !item.length ){
            $( '#testList' ).append( '<a href="index.html">데이터 없음</a>' );
            return;
          }

          for( var i = 0; item[ i ]; i++ ){
            var _item = item[ i ];
            tmp.push( '<a href="view.html?product='+ _item.product +'&id='+_item._id+'" class="list-group-item">'+ _item.name +'</a>');
          }

          $( '#testList' ).append( tmp.join( '' ) );
        }
      },
      error( data ){}
    });

  }
};
