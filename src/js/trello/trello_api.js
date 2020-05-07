var trelloClient = require('./trello_client.js');

const request = (method, url, qs) => {
  if (qs) {
    url += '?';
    for (let [k, v] of Object.entries(qs)) {
      url += `${k}=${v}&`;
    }
    url = url.slice(0, -1);
  }
  // console.info('fetch: ', url);
  return fetch(url, {method, url, qs})
      .catch(err => console.error('Failed to request:', err))
      .then(response => response.json());
};

const requestTrello = (t, method, url, qs) => {
  urlPrefix = `https://api.trello.com/1/`;
  return trelloClient.getToken(t).then(token => {
    qs.key = process.env.APP_KEY;
    qs.token = token;
    return request(method, urlPrefix + url, qs);
  });
};

const getTrello = (t, url, qs) => {
  return requestTrello(t, 'GET', url, qs);
};

const postTrello = (t, url, qs) => {
  return requestTrello(t, 'POST', url, qs);
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
