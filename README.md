
# Using `ember-theme-changerr` in an addon

This example project demonstrates a way to leverage [ember-theme-changerr](https://github.com/codeofficer/ember-theme-changerr) in an addon to suport the themeing of both a host app and its engines. `ember-theme-changerr` is a fork of [ember-theme-changer](https://github.com/leadiato/ember-theme-changer) that cleans up the code and allows cookies to be turned off.

## Overview

Styles for your application's themes will live in your addon along with a `themeChanger` service which is responsible for swapping out the current theme. This service is shared with the host app and can handed off to engines that depend on it so that the current theme can be changed from anywhere.

With style and theming concerns living in a single addon, it becomes easy to hand off ownership of the addon repo to others who's responsibility it might be to develop and maintain it, as often happens in larger organizations.

## Installation

```
cd demo-ui-addon
npm install

cd demo-engine
npm install

cd demo-app
npm install

ember s
```

## Usage


In `demo-ui-addon/app/styles` create your theme files as usual.

```
demo-ui-addon/app/styles/demo-ui-addon.scss
demo-ui-addon/app/styles/theme-1.scss
demo-ui-addon/app/styles/theme-2.scss
demo-ui-addon/app/styles/main.scss
```

In `demo-ui-addon/index.js` specify default settings for `ember-theme-changerr`.

```
const defaults = {
  theme: {
    defaultTheme: 'theme-1',
    themes: [
      'theme-1',
      'theme-2'
    ]
  }
};
```

In `demo-app/config/environment.js` specify a `defaultTheme` only if it's different than your addons defaults.

```
theme: {
  defaultTheme: 'theme-1'
}
```

In `demo-app/app/app.js` share your addon's `themeChanger` service with your engine.

```
init() {
  this._super(...arguments);
  this.set('engines', {
    demoEngine: {
      dependencies: {
        services: [
          'head-data',
          'theme-changer'
        ]
      }
    }
  });
}
```

In `demo-engine/addon/engine.js` specify the `themeChanger` service as a dependency of your engine.

```
init() {
  this._super(...arguments);
  this.set('dependencies', {
    services: [
      'head-data',
      'theme-changer'
    ]
  });
}
```

In `demo-app/app/styles/app.scss` import your addons styles.

```
@import 'demo-ui-addon';
```

In `demo-engine/addon/routes/application.js`, if your engine needs to change the current theme do so by setting that theme in the `activate` hook of its parent route, then in `deactivate` bubble a `themeChanged` event to your host app.

```
setTheme: on('activate', function(){
  this.get('themeChanger').set('theme', 'theme-2');
}),

themeChanged: on('deactivate', function(){
  this.send('themeChanged'); // bubbles up to host application route
})
```

In `demo-app/app/routes/application.js` switch back to your applications theme by listening to the `themeChanged` event that your engine has triggered on deactivation.

```
themeChanger: service(),

actions: {
  themeChanged() {
    const themeChanger = this.get('themeChanger');
    themeChanger.set('theme', ENV.theme.defaultTheme);
  }
}
```

Then anywhere in your app or its engines you can utilize the `themeChanger` service to change the current theme.

```
themeChanger: service(),

actions: {
  setThemeOne() {
    this.get('themeChanger').set('theme', 'theme-1');
  },

  setThemeTwo() {
    this.get('themeChanger').set('theme', 'theme-2');
  }
}
```

### Related Links

  - [Ember Engines](http://ember-engines.com)
  - [Ember Theme Changer](https://www.npmjs.com/package/ember-theme-changerr)

### demo-ui-addon

This addon leverages the `ember-theme-changerr` addon to serve up different theme files with your host app. It shares a `themeChanger` service with the app, which can then be injected into engines that depend on it. `ember-theme-changerr` is configured with a `defaultTheme` which can then be changed at any time through its `themeChanger` service. Optionally, a cookie can be set when the active theme changes so that the `defaultTheme` can be overridden if the app is refreshed. This addon also demonstrates centrally storing shared components that will later be styled by themes. Of note: Other addons or engines that consume this addon need to specify this addon as a dependency and not a dev dependency.

### Demo-engine

This engine depends on the host app's `themeChanger` service. When its application route `activates` it sets a custom theme via that service. When its application route `deactivates` it triggers a `themeChanged` event which will eventually bubble up to the host app's aplication route, where the `defaultTheme` can be restored. In this way the engine is able to have a theme that is independant of the the host app's theme.

### Demo-app

This app consumes both `demo-engine` & `demo-ui-addon` to demonstrate our ability to serve up styles themes from both the host app and its engine.
