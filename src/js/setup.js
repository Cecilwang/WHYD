var rp = require('request-promise');

const {Promise} = window.TrelloPowerUp;

var t = TrelloPowerUp.iframe(
    {appKey: process.env.APP_KEY, appName: process.env.APP_NAME});

const request = (method, uri, qs) => {
  return rp({method, uri, qs, json: true, timeout: 120000})
      .then(response => response)
      .catch(err => console.error('Failed to request.'));
};

const requestTrello = (method, uri, qs) => {
  return t.get('member', 'private', 'token').then(token => {
    qs.key = process.env.APP_KEY;
    qs.token = token;
    return request(method, uri, qs);
  });
};

const postTrello = (uri, qs) => {
  return requestTrello('POST', uri, qs);
};

const createList = name => {
  return t.board('id').then(idBoard => idBoard.id).then(idBoard => {
    return postTrello(`https://api.trello.com/1/lists`, {name, idBoard});
  });
};

const createWHYDList = name => {
  return Promise
      .all([createList(name), t.get('board', 'shared', 'WHYDList', [])])
      .then(([list, lists]) => {
        lists.push(list.id);
        return t.set('board', 'shared', 'WHYDList', lists);
      });
};

window.setup.addEventListener('submit', e => {
  // Stop the browser trying to submit the form itself.
  e.preventDefault();
  // TODO: Check listName is valid.
  return createWHYDList(window.setup.listName.value).then(() => t.closePopup());
});

t.render(() => {
  t.sizeTo('#setup').done();
});
