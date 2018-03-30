/*
  We need include our theme assests in the application build
  and merge this default configuration with the apps.
*/

'use strict';

const defaults = {
  theme: {
    useCookie: false,
    defaultTheme: 'theme-1',
    themes: [
      'theme-1',
      'theme-2'
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
