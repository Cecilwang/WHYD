const getToken = t => {
  return t.get('member', 'private', process.env.TOKEN_NAME);
};

const authorizedCallback = callback => {
  return t => {
    return getToken(t).then(token => {
      if (!token) {
        return t.popup({
          title: 'Authorize WHYD to Access Trello',
          url: './authorize.html',
          height: 40,
        });
      } else {
        return callback(t);
      }
    });
  };
};

const trelloClient = {
  getToken,
  authorizedCallback,
};

module.exports = trelloClient;
