const showSettings = t => {
  return [{
    text: 'WHYD Settings',
    callback: t => {
      return t.popup({
        title: 'WHYD Settings',
        url: './settings.html',
      });
    },
    condition: 'edit'
  }];
};

module.exports = showSettings;
