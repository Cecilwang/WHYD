var t = TrelloPowerUp.iframe({
  appKey: process.env.APP_KEY,
  appName: process.env.APP_NAME,
});

document.getElementById('deauthorize').addEventListener('click', e => {
  return t.getRestApi()
      .clearToken()
      .then(() => {
        return t.remove('member', 'private', process.env.TOKEN_NAME);
      })
      .then(() => t.closePopup());
});

t.render(() => {
  t.sizeTo('#content').done();
});
