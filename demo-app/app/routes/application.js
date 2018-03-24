import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'demo-app/config/environment';

export default Route.extend({
  themeChanger: service(),

  actions: {
    themeChanged() {
      const themeChanger = this.get('themeChanger');
      themeChanger.set('theme', ENV.theme.defaultTheme);
    }
  }
});
