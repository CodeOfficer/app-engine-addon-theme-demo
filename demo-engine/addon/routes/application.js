import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';

/*
  When an engine `activates` it can set the current theme

  When an engine `deactivates` it triggers a `themeChanged` event
  which will eventually bubble up to the host app's aplication
  route where it can be handled.
*/

export default Route.extend({
  themeChanger: service(),

  setTheme: on('activate', function(){
    this.get('themeChanger').set('theme', 'theme-2');
  }),

  themeChanged: on('deactivate', function(){
    this.send('themeChanged'); // bubbles up to host app's application route
  })
});
