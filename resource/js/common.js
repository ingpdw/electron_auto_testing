'use strict';

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
  addEvent: function(){

    $( '#btnBack' ).on( 'click', function( evt ){
      evt.preventDefault();
      history.go( -1 );
    });

  }
};
