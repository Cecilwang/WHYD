const PLAY_ICON = 'https://img.icons8.com/metro/26/000000/play.png';
const STOP_ICON = 'https://img.icons8.com/metro/26/000000/stop.png';
const RECORD_ICON = 'https://img.icons8.com/metro/26/000000/ball-point-pen.png';

const doCb = t => {
  return t.get('card', 'shared', 'WHYD', {start: null, times: 0, duration: 0})
      .then(data => {
        if (data.start) {
          // Have began.
          return;
        } else {
          data.start = Date.now();
          return t.set('card', 'shared', 'WHYD', data);
        }
      });
};

const doneCb = t => {
  return t.get('card', 'shared', 'WHYD', {start: null, times: 0, duration: 0})
      .then(data => {
        if (data.start) {
          now = Date.now();
          data.times += 1;
          data.duration += now - data.start;
          data.start = null;
          return t.set('card', 'shared', 'WHYD', data);
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
      icon: RECORD_ICON,
      text: 'Record',
      callback: recordCb,
      condition: 'edit',
    }
  ];
};

module.exports = cardButtons;
