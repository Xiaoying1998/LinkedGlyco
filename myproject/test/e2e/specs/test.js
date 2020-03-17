// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#discover')
      .assert.containsText('p', 'Discover')
      .assert.elementPresent('#relation')
      .assert.containsText('p', 'the amazing relationship')
      .assert.elementPresent('find')
      .assert.containsText('p', 'Select entities to find their potential relations.')
      .end()
  }
}
