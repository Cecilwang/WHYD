var trelloAPI = require('./trello/trello_api.js');

var db = new PouchDB('tmp');

const {Promise} = window.TrelloPowerUp;

const getWHYD = t => {
  return t.get('card', 'shared', 'WHYD', {begin: null, times: 0, duration: 0});
};

const setWHYD = (t, data) => {
  return t.set('card', 'shared', 'WHYD', data);
};

const beginWHYD = (t, data) => {
  data.begin = Date.now();
  return setWHYD(t, data);
};

const recordWHYD = (t, data, begin, end) => {
  return t.card('id')
      .then(card => card.id)
      .then(idCard => {
        data.times += 1;
        data.duration += end - begin;
        return db.put({
          _id: `${idCard}@${data.times}`,
          'idCard': idCard,
          'times': data.times,
          'begin': begin,
          'end': end
        });
      })
      .then(() => {
        return setWHYD(t, data);
      });
};

const endWHYD = (t, data) => {
  begin = data.begin;
  end = Date.now();
  data.begin = null;
  return recordWHYD(t, data, begin, end);
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
