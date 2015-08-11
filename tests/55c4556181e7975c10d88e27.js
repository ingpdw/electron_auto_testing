var waitTime = 8000;

module.exports = {

  'bns-main-login' : function (browser) {

    browser
      .url('http://rc.bns.plaync.com')

      .waitForElementVisible('body', waitTime)

      .assert.title('plaync 블레이드 & 소울')

      .setValue('#id', 'bnswmc001')

      .setValue('#pwd', 'aaaa1111')

      .click('#login')

      .waitForElementVisible('body', waitTime)

      .assert.containsText( 'span.gnbMyname', '알씨일이삼사오육칠팔구십일이삼사' )
      
      .end();

  }
};