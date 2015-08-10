var waitTime = 5000;

module.exports = {

  'bns-main-login' : function (browser) {

    var data = browser.globals;

    browser
      .url('http://rc.bns.plaync.com')

      .waitForElementVisible('body', waitTime)

      .assert.title('plaync 블레이드 & 소울')

      .setValue('#id', _data.id)

      .setValue('#pwd', _data.pwd)

      .click('#login')

      .waitForElementVisible( 'span.gnbMyname', waitTime )

      .assert.containsText( 'span.gnbMyname', '알씨일이삼사오육칠팔구십일이삼사' );

  }
};
