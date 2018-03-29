import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'demo-app/config/environment';

/*
  When an engine `deactivates` it will bubble an event to
  our application route, where we can revert the changed
  theme back to its default.
*/

export default Route.extend({
  themeChanger: service(),

  actions: {
    themeChanged() {
      const themeChanger = this.get('themeChanger');
      themeChanger.set('theme', ENV.theme.defaultTheme);
    }
  }
});
