var trelloAPI = require('./trello/trello_api.js');

var t = TrelloPowerUp.iframe({
  appKey: process.env.APP_KEY,
  appName: process.env.APP_NAME,
});

const createWHYDList = (t, name) => {
  return trelloAPI.createList(t, name).then(list => {
    console.info(list);
  });
};

document.getElementById('setup').addEventListener('click', e => {
  // TODO: Check listName is valid.
  return createWHYDList(t, window.content.listName.value)
      .then(() => t.closePopup());
});

t.render(() => {
  t.sizeTo('#content').done();
});
