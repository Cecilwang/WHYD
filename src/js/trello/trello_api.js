var rp = require('request-promise');

var trelloClient = require('./trello_client.js');

const request = (method, uri, qs) => {
  return rp({method, uri, qs, json: true, timeout: 120000})
      .then(response => response)
      .catch(err => console.error('Failed to request:', err));
};

const requestTrello = (t, method, uri, qs) => {
  return trelloClient.getToken(t).then(token => {
    qs.key = process.env.APP_KEY;
    qs.token = token;
    return request(method, uri, qs);
  });
};

const postTrello = (t, uri, qs) => {
  return requestTrello(t, 'POST', uri, qs);
};

const createList = (t, name) => {
  return t.board('id').then(idBoard => idBoard.id).then(idBoard => {
    return postTrello(t, `https://api.trello.com/1/lists`, {name, idBoard});
  });
};

const trelloAPI = {
  requestTrello,
  postTrello,
  createList,
};

module.exports = trelloAPI;
