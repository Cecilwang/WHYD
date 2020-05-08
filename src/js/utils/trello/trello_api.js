var trelloClient = require('./trello_client.js');

const appendParamToUrl = (url, param = {}) => {
  url += '?';
  for (let [k, v] of Object.entries(param)) {
    url += `${k}=${v}&`;
  }
  url = url.slice(0, -1);
  return url;
};

const request = (url, opts = {}) => {
  // console.info('fetch: ', url);
  return fetch(url, opts)
      .catch(err => console.error('Failed to request:', err))
      .then(response => response.json());
};

const requestTrello = (t, url, qs = {}, opts = {}) => {
  urlPrefix = `https://api.trello.com/1/`;
  return trelloClient.getToken(t).then(token => {
    qs.key = process.env.APP_KEY;
    qs.token = token;
    url = appendParamToUrl(urlPrefix + url, qs);
    return request(url, opts);
  });
};

const getTrello = (t, url, qs = {}, opts = {}) => {
  opts.method = 'GET';
  return requestTrello(t, url, qs, opts);
};

const postTrello = (t, url, qs = {}, opts = {}) => {
  opts.method = 'POST';
  return requestTrello(t, url, qs, opts);
};

const putTrello = (t, url, qs = {}, opts = {}) => {
  opts.method = 'PUT';
  return requestTrello(t, url, qs, opts);
};

const getList = (t, id) => {
  return getTrello(t, `lists/${id}`);
};

const createList = (t, name) => {
  return t.board('id').then(board => board.id).then(idBoard => {
    return postTrello(t, `lists`, {name, idBoard});
  });
};

const getLabel = (t, id) => {
  return getTrello(t, `labels/${id}`);
};

const createCustomField = (t) => {
  return t.board('id').then(idModel => {
    return postTrello(t, `customFields`, {}, {
      body: JSON.stringify({
        idModel: idModel,
        modelType: 'board',
        name: 'test',
      }),
      headers: {'Accept': 'application/json'}
    });
  });
};

const getCustomField = (t) => {
  return t.card('id').then(card => card.id).then(idCard => {
    url = `cards/{idCard}/customFieldItems`;
    return getTrello(t, url);
  });
};

const updateCustomField = (t, idCustomField, data) => {
  return t.card('id').then(card => card.id).then(idCard => {
    url = `cards/${idCard}/customField/${idCustomField}/item`;
    return putTrello(t, url, {}, {
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
  });
};

const trelloAPI = {
  request,
  requestTrello,
  getTrello,
  postTrello,
  putTrello,
  getList,
  createList,
  getLabel,
  createCustomField,
  updateCustomField,
};

module.exports = trelloAPI;
