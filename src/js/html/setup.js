var WHYD = require('../utils/whyd.js');

var t = TrelloPowerUp.iframe({
  appKey: process.env.APP_KEY,
  appName: process.env.APP_NAME,
});

document.getElementById('setup').addEventListener('click', e => {
  // TODO: Check listName is valid.
  return WHYD.createWHYDList(t, window.content.listName.value)
      .then(() => t.closePopup());
});

t.render(() => {
  t.sizeTo('#content').done();
});
