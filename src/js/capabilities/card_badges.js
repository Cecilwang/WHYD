var trelloAPI = require('../trello/trello_api.js');

const {Promise} = window.TrelloPowerUp;

const TIMES_ICON = 'https://img.icons8.com/metro/26/000000/ball-point-pen.png';
const START_ICON =
    'https://img.icons8.com/metro/26/000000/hourglass-sand-bottom.png';
const DURATION_ICON = 'https://img.icons8.com/metro/26/000000/watch.png';
// const TIME_ICON = 'https://img.icons8.com/metro/26/000000/time.png';

const formatTime = time => {
  const sUnit = 1000;
  const mUnit = sUnit * 60;
  const hUnit = mUnit * 60;
  const dUnit = hUnit * 24;

  ret = ''

  d = Math.floor(time / dUnit);
  time %= dUnit;
  if (d) {
    ret += `${d}D`;
  }

  h = Math.floor(time / hUnit);
  time %= hUnit;
  if (ret.length || h) {
    ret += `${h}H`;
  }

  m = Math.floor(time / mUnit);
  time %= mUnit;
  if (ret.length || m) {
    ret += `${m}M`;
  }

  s = Math.ceil(time / sUnit);
  time %= sUnit;
  ret += `${s}S`;
  return ret;
};

const formatFullTime = time => {
  date = new Date(time).toString().split(' ');
  return date[3] + '/' + date[1] + '/' + date[2] + ' ' + date[4];
};

const getSummaryBadges = t => {
  return t.get('card', 'shared', 'WHYD', {start: null, times: 0, duration: 0})
      .then(data => {
        let ret = [];
        if (data.start) {
          ret.push(
              {
                dynamic: () => {
                  return {
                    icon: START_ICON,
                    text: formatTime(Date.now() - data.start),
                    refresh: 10,
                  };
                }
              },
              {
                text: formatFullTime(data.start),
              });
        }
        ret.push(
            {
              icon: TIMES_ICON,
              text: `${data.times} times`,
            },
            {
              icon: DURATION_ICON,
              text: formatTime(data.duration),
            });
        return ret;
      });
};

const getLabelBadges = t => {
  return t.card('all').then(card => card.labels.map(label => {
    return {
      text: label.name,
      color: label.color,
    };
  }));
};

const cardBadges = t => {
  return Promise
      .all([
        getSummaryBadges(t),
        getLabelBadges(t),
      ])
      .then(badges => {
        return badges[0].concat(badges[1]);
      });
};

module.exports = cardBadges;
