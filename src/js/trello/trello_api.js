var rp = require('request-promise');

var trelloClient = require('./trello_client.js');

const request = (method, uri, qs) => {
  return rp({method, uri, qs, json: true, timeout: 120000})
      .then(response => response)
      .catch(err => console.error('Failed to request:', err));
};

const requestTrello = (t, method, uri, qs) => {
  uriPrefix = `https://api.trello.com/1/`;
  return trelloClient.getToken(t).then(token => {
    qs.key = process.env.APP_KEY;
    qs.token = token;
    return request(method, uriPrefix + uri, qs);
  });
};

const getTrello = (t, uri, qs) => {
  return requestTrello(t, 'GET', uri, qs);
};

const postTrello = (t, uri, qs) => {
  return requestTrello(t, 'POST', uri, qs);
};

const getList = (t, id) => {
  return getTrello(t, `lists/${id}`);
};

const createList = (t, name) => {
  return t.board('id').then(idBoard => idBoard.id).then(idBoard => {
    return postTrello(t, `lists`, {name, idBoard});
  });
};

const getLabel = (t, id) => {
  return getTrello(t, `labels/${id}`);
};

const trelloAPI = {
  requestTrello,
  postTrello,
  getList,
  createList,
  getLabel,
};

module.exports = trelloAPI;
