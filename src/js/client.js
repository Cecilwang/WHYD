var SETUP_ICON = 'https://img.icons8.com/metro/26/000000/console.png';

var PLAY_ICON = 'https://img.icons8.com/metro/26/000000/play.png';
var PAUSE_ICON = 'https://img.icons8.com/metro/26/000000/pause.png';
var STOP_ICON = 'https://img.icons8.com/metro/26/000000/stop.png';

console.log('Let\'s start.');

window.TrelloPowerUp.initialize({
  'board-buttons': t => {
    return [{
      icon: SETUP_ICON,
      text: 'Setup WHYD',
      callback: t => {
        return t.popup({
          title: 'Setup WHYD',
          url: './setup.html',
        });
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
      {icon: PLAY_ICON, text: 'Do it!', callback: () => {}, condition: 'edit'},
      {icon: PAUSE_ICON, text: 'Pause', callback: () => {}, condition: 'edit'},
      {
        icon: STOP_ICON,
        text: 'Finished',
        callback: () => {},
        condition: 'edit'
      }
    ]
  }
});
