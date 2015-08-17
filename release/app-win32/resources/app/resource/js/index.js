var $ = require( 'jquery' );

var common = require( './common' );
    common.addEvent();

module.exports = {
  init: function(){
    var _tmp = [], selectCategory = common.selectCategory();
    selectCategory.then( function( data ){
      var template = '<a href="list.html?product={{name}}" class="list-group-item">{{name}}</a>';
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
