'use strict';

var Q = require( 'q' );
var $ = require( 'jquery' );
var nightwatch = require( '../../src/nightwatch.js' );
var common = require( './common' );
    common.addEvent();

module.exports = {

  addEvent: function(){

    var This = this;

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

  writeFile: function(){
    var deferred = Q.defer();
    var _ids = [];

    $( 'input[name=scenario]:checked' ).each(function( idx ){
      var $this = $( this );
      _ids.push( $this.val() );
    });
    _ids = _ids.join( ',' );

    var scenarios = common.writeFile( _ids );
    scenarios.then(function(){
      deferred.resolve();
    }, function( err ){
      deferred.reject();
    });

    return deferred.promise;

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
            $( '#testList' ).append( '<div class="null-wrap"><a href="index.html"><i class="fa fa-exclamation-triangle"></i> 데이터 없음</a></div>' );
            return;
          }

          for( var i = 0; item[ i ]; i++ ){
            var _item = item[ i ];
            var _template = '<div class="list-group-item"><input type="checkbox" name="scenario" value="'+_item._id+'"/>'+
              '<a href="view.html?product='+ _item.product +'&id='+_item._id+'" >'+
              _item.name +'</a></div>'
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
