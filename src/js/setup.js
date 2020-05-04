var t = TrelloPowerUp.iframe(
    {appKey: '918b1a6a97af102c4c86081fbb06a221', appName: 'WHYD'});

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
