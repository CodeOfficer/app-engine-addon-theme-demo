import Engine from 'ember-engines/engine';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const { modulePrefix } = config;
const Eng = Engine.extend({
  modulePrefix,
  Resolver,

  // The engine will depend on the app's shared `themeChanger` service.
  init() {
    this._super(...arguments);
    this.set('dependencies', {
      services: [
        'themeChanger'
      ]
    });
  }
});

loadInitializers(Eng, modulePrefix);

export default Eng;
