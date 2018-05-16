import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

// An example of demo-engines test app being able to
// change the current theme.

export default Controller.extend({
  themeChanger: service(),

  actions: {
    setThemeOne() {
      this.get('themeChanger').set('theme', 'theme-1');
    },

    setThemeTwo() {
      this.get('themeChanger').set('theme', 'theme-2');
    }
  }
});
