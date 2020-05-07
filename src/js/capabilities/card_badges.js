var trelloAPI = require('../trello/trello_api.js');

const {Promise} = window.TrelloPowerUp;

const TIMES_ICON =
    'https://img.icons8.com/metro/26/000000/hourglass-sand-bottom.png';
const DURATION_ICON = 'https://img.icons8.com/metro/26/000000/watch.png';
const TIME_ICON = 'https://img.icons8.com/metro/26/000000/time.png';

const getSummaryBadges = t => {
  return t.get('card', 'shared', 'WHYD', {time: null, times: 0, duration: 0})
      .then(data => {
        ret = [
          {icon: TIMES_ICON, text: `${data.times}times`},
          {icon: DURATION_ICON, text: `${data.duration}s`}
        ];
        return ret;
      });
};

const getLabelBadges = t => {
  return t.card('all').then(card => card.labels.map(label => {
    return {text: label.name, color: label.color};
  }));
};

const cardBadges = t => {
  return Promise.all([getSummaryBadges(t), getLabelBadges(t)]).then(badges => {
    return badges[0].concat(badges[1]);
  });
};

module.exports = cardBadges;
