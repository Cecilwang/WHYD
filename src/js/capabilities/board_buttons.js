var trelloClient = require('../trello/trello_client.js');

var SETUP_ICON = 'https://img.icons8.com/metro/26/000000/console.png';

const boardButtons = t => {
  return [{
    icon: SETUP_ICON,
    text: 'Setup WHYD',
    callback: trelloClient.authorizedCallback(t => {
      return t.popup({
        title: 'Setup WHYD',
        url: './setup.html',
      });
    }),
    condition: 'edit'
  }];
};

module.exports = boardButtons;
