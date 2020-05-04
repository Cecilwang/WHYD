var t = TrelloPowerUp.iframe(
    {appKey: process.env.APP_KEY, appName: process.env.APP_NAME});

window.setup.addEventListener('submit', e => {
  // Stop the browser trying to submit the form itself.
  e.preventDefault();

  console.info('WHYD List Name:', window.setup.listName.value);

  return t.get('member', 'private', 'token')
      .then(
          token => {
              // Create a WHYD list.
          })
      .then(() => {
        t.closePopup();
      });
});

t.render(() => {
  t.sizeTo('#setup').done();
});
