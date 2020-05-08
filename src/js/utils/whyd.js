var trelloAPI = require('./trello/trello_api.js');

const getWHYD = t => {
  return t.get('card', 'shared', 'WHYD', {start: null, times: 0, duration: 0});
};

const setWHYD = (t, data) => {
  return t.set('card', 'shared', 'WHYD', data);
};

const beginWHYD = (t, data) => {
  data.start = Date.now();
  return setWHYD(t, data);
};

const recordWHYD = (t, n, begin, end) => {

};

const endWHYD = (t, data) => {
  now = Date.now();
  data.times += 1;
  data.duration += now - data.start;
  data.start = null;
  return setWHYD(t, data);
};

const createWHYDList = (t, name) => {
  return trelloAPI.createList(t, name).then(list => {
    console.info(list);
  });
};

const WHYD = {
  getWHYD,
  setWHYD,
  beginWHYD,
  recordWHYD,
  endWHYD,
  createWHYDList,
};

module.exports = WHYD;
