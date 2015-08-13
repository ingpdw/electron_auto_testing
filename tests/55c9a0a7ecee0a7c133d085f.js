var waitTime = 3000;

module.exports = {
    'bns-search' : function( browser ){
        browser
          .url('http://rc.bns.plaync.com')
          
          .waitForElementVisible( '#suggestInput', waitTime )
    
          .setValue('#suggestInput', '무림맹')
    
          .keys(browser.Keys.ENTER)
    
          .waitForElementVisible('body', waitTime)
    
          .assert.value('#query', '무림맹')
    
          .end();
        }
};
