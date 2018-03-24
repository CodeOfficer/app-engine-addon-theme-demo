import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  themeChanger: service(),

  theme: alias('themeChanger.theme'),

  actions: {
    setEmberTheme() {
      this.get('themeChanger').set('theme', 'ember');
    },

    setFastbootTheme() {
      this.get('themeChanger').set('theme', 'fastboot');
    }
  }
});
