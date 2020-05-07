const showAuthorization = t => {
  return t.popup({
    title: 'Authorize WHYD to Access Trello',
    url: './authorize.html',
    height: 40,
  });
};

module.exports = showAuthorization;
