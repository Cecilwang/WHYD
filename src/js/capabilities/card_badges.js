var trelloAPI = require('../trello/trello_api.js');

const {Promise} = window.TrelloPowerUp;

const cardBadges = t => {
  return t.card('all').then(card => {
    console.info(card.labels);
    console.info(card.idLabels);
    console.info(card.idList);

    labels = []
    idLabels.forEach(id => {
      labels.push(Promise(trelloAPI.getLabel(t, id)));
    });
    Promise.all(labels)
        .then(labels => {
          console.log(card.name);
          labels.forEach(label => {
            console.log(labels);
          });
          console.log('====');
        })
        .then(() => {
          return [];
        });
  });
};

module.exports = cardBadges;
