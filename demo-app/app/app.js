import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  init() {
    this._super(...arguments);
    this.set('engines', {
      demoEngine: {
        dependencies: {
          services: [
            'themeChanger'
          ]
        }
      }
    });
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
