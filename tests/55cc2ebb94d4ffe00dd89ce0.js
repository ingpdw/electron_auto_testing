    var waitTime = 3000;

      module.exports = {
          'bns-search' : function( browser ){
              browser
                .url('http://bnsnshop.plaync.com/bns/')

                .waitForElementVisible( '#suggestInput', waitTime )

                .setValue('#suggestInput', '무림맹')

                .keys(browser.Keys.ENTER)

                .waitForElementVisible('body', waitTime)

                .assert.value('#query', '무림맹')

                .end();
              }
      };
      
      
      module.exports = {
          'test': function( browser ){
              browser.
                url( 'http://google.com' )
                .assert.title( 'google' )
                .end();
          }
      };