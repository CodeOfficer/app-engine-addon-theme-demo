import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';

export default Route.extend({
  themeChanger: service(),

  setTheme: on('activate', function(){
    this.get('themeChanger').set('theme', 'fastboot');
  }),

  themeChanged: on('deactivate', function(){
    this.send('themeChanged'); // bubbles up to host application route
  })
});
