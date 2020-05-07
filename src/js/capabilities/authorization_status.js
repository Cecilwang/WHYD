const authorizationStatus = t => {
  return t.get('member', 'private', process.env.TOKEN_NAME).then(token => {
    if (token) {
      return {authorized: true};
    } else {
      return {authorized: false};
    }
  });
};

module.exports = authorizationStatus;
