var WHYD = require('../utils/whyd.js');
var utils = require('../utils/utils.js');

const {Promise} = window.TrelloPowerUp;

const PEN_ICON = 'https://img.icons8.com/metro/26/000000/ball-point-pen.png';
const HOURGLASS_SAND_ICON =
    'https://img.icons8.com/metro/26/000000/hourglass-sand-bottom.png';
const WATCH_ICON = 'https://img.icons8.com/metro/26/000000/watch.png';
// const TIME_ICON = 'https://img.icons8.com/metro/26/000000/time.png';
const CALENDER_ICON = 'https://img.icons8.com/metro/26/000000/today.png';

const getSummaryBadges = t => {
  return WHYD.getWHYD(t).then(data => {
    let ret = [];
    if (data.begin) {
      ret.push({
        dynamic: () => {
          return {
            icon: HOURGLASS_SAND_ICON,
            text: `${utils.formatTime(Date.now() - data.begin)} <- ${
                utils.formatFullTime(data.begin)}`,
            refresh: 10,
          };
        }
      });
    }
    if (data.times) {
      ret.push(
          {
            icon: PEN_ICON,
            text: `${data.times} times`,
          },
          {
            icon: WATCH_ICON,
            text: utils.formatTime(data.duration),
          });
    }
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

const getURLBadges = t => {
  return t.card('all').then(card => card.attachments.map(attachment => {
    console.info(attachment);
    return {
      text: `<a href="https://www.w3schools.com/html/">A</a>`,
    };
  }));
  // document.querySelectorAll('span[class=badge-text]').forEach(badgeText => {
  //  console.info(badgeText);
  //  if (badgeText.innerHTML.startsWith('<a ')) {
  //    console.info(badgeText);
  //  }
  //});
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
