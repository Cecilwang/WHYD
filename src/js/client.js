var PLAY_ICON = 'https://img.icons8.com/metro/26/000000/play.png';
var PAUSE_ICON = 'https://img.icons8.com/metro/26/000000/pause.png';
var STOP_ICON = 'https://img.icons8.com/metro/26/000000/stop.png';

console.log('Let\'s start.');

window.TrelloPowerUp.initialize({
  'card-badges': t => {
    return t.card('all').then(function(card) {
      console.log(card);
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
        condition: 'always'
      },
      {
        icon: PAUSE_ICON,
        text: 'Pause',
        callback: () => {},
        condition: 'always'
      },
      {
        icon: STOP_ICON,
        text: 'Finished',
        callback: () => {},
        condition: 'always'
      }
    ]
  }
});
