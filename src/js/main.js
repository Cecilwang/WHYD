var SETUP_ICON = 'https://img.icons8.com/metro/26/000000/console.png';

var PLAY_ICON = 'https://img.icons8.com/metro/26/000000/play.png';
var PAUSE_ICON = 'https://img.icons8.com/metro/26/000000/pause.png';
var STOP_ICON = 'https://img.icons8.com/metro/26/000000/stop.png';
var RECORD_ICON = 'https://img.icons8.com/metro/26/000000/ball-point-pen.png';

console.log('Welcome to WHYD!');

const authorizedPopUpURL = (t, title, url) => {
  return t.get('member', 'private', 'token').then(token => {
    if (!token) {
      return t.popup({
        title: 'Authorize WHYD to Access Trello',
        url: './authorize.html',
        height: 50,
      });
    } else {
      return t.popup({
        title: title,
        url: url,
      });
    }
  });
};

window.TrelloPowerUp.initialize(
    {
      'board-buttons': t => {
        return [{
          icon: SETUP_ICON,
          text: 'Setup WHYD',
          callback: t => {
            return authorizedPopUpURL(t, 'Setup WHYD', './setup.html');
          },
          condition: 'edit'
        }]
      },
      'card-badges': t => {
        return t.card('all').then(function(card) {
          // console.log(card);
          return [{text: card.idShort}];
        });
      },
      'card-detail-badges': () => {},
      'card-buttons': t => {
        return [
          {
            icon: PLAY_ICON,
            text: 'Do it!',
            callback: () => {},
            condition: 'edit'
          },
          {
            icon: PAUSE_ICON,
            text: 'Pause',
            callback: () => {},
            condition: 'edit'
          },
          {
            icon: STOP_ICON,
            text: 'Finished',
            callback: () => {},
            condition: 'edit'
          },
          {
            icon: RECORD_ICON,
            text: 'Record',
            callback: () => {},
            condition: 'edit'
          }
        ]
      }
    },
    {appKey: process.env.APP_KEY, appName: process.env.APP_NAME});
