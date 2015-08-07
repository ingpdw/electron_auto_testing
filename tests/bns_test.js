var waitTime = 5000;

module.exports = {

  'bns-main-login' : function (browser) {

    var data = browser.globals;

    browser
      .url('http://rc.bns.plaync.com')

      .waitForElementVisible('body', waitTime)

      .assert.title('plaync 블레이드 & 소울')

      .setValue('#id', 'bnswmc001')

      .setValue('#pwd', 'aaaa1111')

      .click('#login')

      .waitForElementVisible( 'span.gnbMyname', waitTime )

      .assert.containsText( 'span.gnbMyname', '알씨일이삼사오육칠팔구십일이삼사' )

  },

  'bns-go-world' : function( browser ){
    browser
      .waitForElementVisible('body', waitTime)

      .moveToElement( '.menu3 .deps1', 1, 1 )

      .waitForElementVisible('.menu3 .deps2', waitTime)

      .assert.visible( '.menu3 .deps2' )

      .click( '.menu3 .deps2 .list .s1 a' )

      .saveScreenshot( './screenshots/2depthMenu.png' )

      .waitForElementVisible('body', waitTime)

      .assert.containsText('h1.character a', '캐릭터')

  },

  'bns-search' : function( browser ){
    browser
      .waitForElementVisible( '#suggestInput', waitTime )

      .setValue('#suggestInput', '무림맹')

      .keys(browser.Keys.ENTER)

      .waitForElementVisible('body', waitTime)

      .assert.value('#query', '무림맹')

      .end();
  }
};
