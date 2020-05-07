var WHYD = require('../whyd.js');

const PLAY_ICON = 'https://img.icons8.com/metro/26/000000/play.png';
const STOP_ICON = 'https://img.icons8.com/metro/26/000000/stop.png';
const PEN_ICON = 'https://img.icons8.com/metro/26/000000/ball-point-pen.png';

const doCb = t => {
  return WHYD.getWHYD(t).then(data => {
    if (data.start) {
      // Have began.
      return;
    } else {
      data.start = Date.now();
      return WHYD.setWHYD(t, data);
    }
  });
};

const doneCb = t => {
  return WHYD.getWHYD(t).then(data => {
    if (data.start) {
      now = Date.now();
      data.times += 1;
      data.duration += now - data.start;
      data.start = null;
      return WHYD.setWHYD(t, data);
    } else {
      // Haven't began.
      return;
    }
  });
};

const recordCb = t => {};

const cardButtons = t => {
  return [
    {
      icon: PLAY_ICON,
      text: 'Do',
      callback: doCb,
      condition: 'edit',
    },
    {
      icon: STOP_ICON,
      text: 'Done',
      callback: doneCb,
      condition: 'edit',
    },
    {
      icon: PEN_ICON,
      text: 'Record',
      callback: recordCb,
      condition: 'edit',
    }
  ];
};

module.exports = cardButtons;
