'use strict';

const defaults = {
  theme: {
    useAssetMap: true,
    defaultTheme: 'ember',
    themes: [
      'ember',
      'fastboot'
    ]
  }
};

module.exports = {
  name: 'demo-addon',

  included: function(app) {
    this._super.included(app);

    defaults.theme.themes.forEach(function(theme) {
      app
        .options
        .outputPaths
        .app
        .css[theme] = `/assets/${theme}.css`;
    });
  },

  config: function() {
    return defaults;
  }
};
