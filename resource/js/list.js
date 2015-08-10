'use strict';

var $ = require( 'jquery' );
var nightwatch = require( '../../src/nightwatch.js' );
var common = require( './common' );
    common.addEvent();

module.exports = {
  writeFile: function( callback ){

    var _ids = [];
    $( 'input[name=scenario]:checked' ).each(function( idx ){
      var $this = $( this );
      _ids.push( $this.val() );
    });

    _ids = _ids.join( ',' );

    $.ajax({
      method: 'get',
      url: common.apiUrl + '/selectMulti',
      data: {id: _ids},
      success( data ){
        var item = '', len = 0;
        if( data.result === 'success' ){
          if( !data.data ) return;

          item = data.data;
          len = item.length;

          common.removeAllFiles( './tests' );
          common.removeAllFiles( './reports' );

          for( var i = 0; item[ i ]; i++ ){
            var _item = item[ i ];
            common.scenarioSave( './tests/' + _item._id + '.js', _item.code, function(){
              if( !--len ){
                  typeof callback === 'function' && callback();
              }
            });
          }
        }
      },
      error( data ){}
    });


  },
  addEvent: function(){

    var This = this;

    jQuery( 'body' ).on( 'click', '#btnSelectAll', function( evt ){
      evt.preventDefault();
      $( 'input[name=scenario]' ).prop( 'checked', true );
    });

    jQuery( 'body' ).on( 'click', '#btnExcute', function( evt ){
      evt.preventDefault();
      This.writeFile(function(){
          nightwatch.run();
      });
    });

    jQuery( 'body' ).on( 'click', '#btnExcute_ff', function( evt ){
      evt.preventDefault();
      This.writeFile(function(){
        nightwatch.run_ff();
      });
    });

    jQuery( 'body' ).on( 'click', '#btnExcute_ie', function( evt ){
      evt.preventDefault();
      This.writeFile(function(){
        nightwatch.run_ie();
      });
    });
  },
  init: function(){
    var pId = common.params.product,
        This = this;

    $( 'h2' ).append( pId );

    $.ajax({
      method: 'get',
      url: common.apiUrl + '/product?id=' + pId,
      success( data ){
        var item = '';
        if( data.result === 'success' ){
          item = data.data;

          var tmp = [];

          if( !item.length ){
            $( '#testList' ).append( '<div class="null-wrap"><a href="index.html">데이터 없음</a></div>' );
            return;
          }

          for( var i = 0; item[ i ]; i++ ){
            var _item = item[ i ];
            var _template = '<input type="checkbox" name="scenario" value="'+_item._id+'"/>'+
              '<a href="view.html?product='+ _item.product +'&id='+_item._id+'" class="list-group-item">'+
              _item.name +'</a>'
            tmp.push( _template );
          }

          $( '#testList' ).append( tmp.join( '' ) );

          This.addEvent();
        }
      },
      error( data ){}
    });

  }
};
