var WHYD = require('../utils/whyd.js');

const PLAY_ICON = 'https://img.icons8.com/metro/26/000000/play.png';
const STOP_ICON = 'https://img.icons8.com/metro/26/000000/stop.png';
const PEN_ICON = 'https://img.icons8.com/metro/26/000000/ball-point-pen.png';

const beginCallback = t => {
  return WHYD.getWHYD(t).then(data => {
    if (data.begin) {
      // Have began.
      return;
    } else {
      return WHYD.beginWHYD(t, data);
    }
  });
};

const endCallback = t => {
  return WHYD.getWHYD(t).then(data => {
    if (data.begin) {
      return WHYD.endWHYD(t, data);
    } else {
      // Haven't began.
      return;
    }
  });
};

const recordCallback = t => {
  return WHYD.getWHYD(t).then(data => {
    return WHYD.recordWHYD(t, data, 0, 100000);
  });
};

const cardButtons = t => {
  return [
    {
      icon: PLAY_ICON,
      text: 'Begin',
      callback: beginCallback,
      condition: 'edit',
    },
    {
      icon: STOP_ICON,
      text: 'End',
      callback: endCallback,
      condition: 'edit',
    },
    {
      icon: PEN_ICON,
      text: 'Record',
      callback: recordCallback,
      condition: 'edit',
    }
  ];
};

module.exports = cardButtons;
