var trelloAPI = require('./trello/trello_api.js');

var t = TrelloPowerUp.iframe(
    {appKey: process.env.APP_KEY, appName: process.env.APP_NAME});

const createWHYDList = (t, name) => {
  return trelloAPI.createList(t, name).then(list => {
    console.info(list);
  });
};

window.setup.addEventListener('submit', e => {
  // Stop the browser trying to submit the form itself.
  e.preventDefault();
  // TODO: Check listName is valid.
  return createWHYDList(t, window.setup.listName.value)
      .then(() => t.closePopup());
});

t.render(() => {
  t.sizeTo('#setup').done();
});
