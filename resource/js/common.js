;(function( $ ){
  'use strict';

  var page = $( 'body' ).attr( 'id' );
  var apiUrl = 'http://ui-static.korea.ncsoft.corp:5000';

  var editor = '';

  var $name = $( '#name' ),
      $product = $(' #product' ),
      code = ( editor )? editor.getValue(): '',
      params = {};

  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(str,key,value){params[key] = value;});

  var selectScenario = function( id, callback ){

    if( id ){
      $.ajax({
        method: 'get',
        url: apiUrl + '/select/' + id,
        success( data ){
          var item = '';
          if( data.result === 'success' ){
            item = data.data[ 0 ];

            typeof callback === 'function' && callback( item );
          }
        },
        error( data ){}
      });
    }
  };

  var selectedCategory = function( id, callback ){
    if( id ){
      $.ajax({
        method: 'get',
        url: apiUrl + '/product?id=' + id,
        success( data ){
          var item = '';
          if( data.result === 'success' ){
            item = data.data;

            typeof callback === 'function' && callback( item );
          }
        },
        error( data ){}
      });
    }
  };

  /*
   * 에디터 생성
   */
  var createEditor = function(){
    editor = ace.edit( 'editor' );
    editor.setTheme( 'ace/theme/monokai' );
    editor.getSession().setMode( 'ace/mode/javascript' );
  };

  /*
   * 네비게이션 버튼 이벤트
   */
  var addEvent = function(){

    $( '#btnIndex' ).on( 'click', function( evt ){
      evt.preventDefault();
      location.href = 'index.html';
    });

    $( '#btnExcute' ).on( 'click', function( evt ){
      evt.preventDefault();
    });

    $( '#btnList' ).on( 'click', function( evt ){
      evt.preventDefault();
      location.href = 'list.html?product=' + params.product;
    });

    $( '#btnBack' ).on( 'click', function( evt ){
      evt.preventDefault();
      history.go( -1 );
    });

    $( '#btnUpdate' ).on( 'click', function( evt ){
      evt.preventDefault();
      location.href = 'create.html?id=' + params.id;
    });

    $( '#btnSave' ).on( 'click', function( evt ){
      evt.preventDefault();

      var name = $( '#name' ).val(),
          product = $(' #product' ).val(),
          code = editor.getValue(),
          url =  apiUrl + '/insert';

      if( !name ) return;
      if( !product ) return;
      if( !code ) return;

      var sid = $( '#sid' ).val();

      if( sid ) url = apiUrl + '/update';

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

  }

  /*
   * 페이지별 기능 구현
   */
  switch( page ){
    case 'index':
    break;

    case 'list':
      selectedCategory( params.product, function( item ){

        $( 'h1' ).append( params.product );

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
      })
    break;

    case 'view':
      createEditor();
      selectScenario( params.id, function( item ){
        $name.append( item.name );
        $product.append( item.product );
        editor.setValue( item.code, 1 ); //move cursor to the end
        editor.setReadOnly( true );
      });
    break;

    case 'create':
      createEditor();
      if( params.id )
      selectScenario( params.id, function( item ){
        $name.val( item.name );
        $( '#sid' ).val( item._id );
        $product.val( item.product );
        //editor.setValue( item.code, -1 ); //move cursor to the start
        editor.setValue( item.code, 1 ); //move cursor to the end
      })
    break;
  }

  addEvent();

})( jQuery );
