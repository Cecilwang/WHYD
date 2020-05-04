var t = TrelloPowerUp.iframe();

window.setup.addEventListener('submit', e => {
  // Stop the browser trying to submit the form itself.
  e.preventDefault();

  console.info('WHYD List Name:', window.setup.listName.value);

  return t.closePopup();
});

t.render(() => {
  t.sizeTo('#setup').done();
});
