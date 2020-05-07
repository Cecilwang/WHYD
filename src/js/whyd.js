var trelloAPI = require('./trello/trello_api.js');

const getWHYD = t => {
  return t.get('card', 'shared', 'WHYD', {start: null, times: 0, duration: 0});
};

const setWHYD = (t, data) => {
  return t.set('card', 'shared', 'WHYD', data);
};

const createWHYDList = (t, name) => {
  return trelloAPI.createList(t, name).then(list => {
    console.info(list);
  });
};

const WHYD = {
  getWHYD,
  setWHYD,
  createWHYDList,
};

module.exports = WHYD;
