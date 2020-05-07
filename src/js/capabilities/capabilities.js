var boardButtons = require('./board_buttons.js');
var cardBadges = require('./card_badges.js');
var cardButtons = require('./card_buttons.js');
var cardDetailBadges = require('./card_detail_badges.js');
var showSettings = require('./show_settings.js');

const getCapabilities = () => {
  return {
    'board-buttons': boardButtons,
    'card-badges': cardBadges,
    'card-buttons': cardButtons,
    'card-detail-badges': cardDetailBadges,
    'show-settings': showSettings,
  };
};

module.exports = getCapabilities;
