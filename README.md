
# Using `ember-theme-changer` in an addon

This example project demonstrates a way to leverage [ember-theme-changer](https://github.com/leadiato/ember-theme-changer) in an addon to suport the themeing of both a host app and its engines.

## Overview

Styles for your application's themes will live in your addon along with a `themeChanger` service which is responsible for swapping out the current theme. This service is shared with the host app and can handed off to engines that depend on it so that the current theme can be changed from anywhere.

With style and theming concerns living in a single addon, it becomes easy to hand off ownership of the addon repo to others who's responsibility it might be to develop and maintain it, as often happens in larger organizations.

## Installation

```
cd demo-addon
npm install
npm link

cd demo-engine
npm link demo-addon
npm install
npm link

cd demo-app
npm link demo-addon
npm link demo-engine
npm install

ember s
```

### Related Links

  - [Ember Engines](http://ember-engines.com)
  - [Ember Theme Changer](https://www.npmjs.com/package/ember-theme-changer)

### Demo-addon

 This addon leverages the `ember-theme-changer` addon to serve up different theme files with your host app. It shares a `themeChanger` service with the app, which can then be injected into engines that depend on it. `ember-theme-changer` is configured with a `defaultTheme` which can then be changed at any time through its `themeChanger` service. Optionally, a cookie can be set when the active theme changes so that the `defaultTheme` can be overridden if the app is refreshed.

### Demo-engine

This engine depends on the host app's `themeChanger` service. When its application route `activates` it sets a custom theme via that service. When its application route `deactivates` it triggers a `themeChanged` event which will eventually bubble up to the host app's aplication route, where the `defaultTheme` can be restored. In this way the engine is able to have a theme that is independant of the the host app's theme.

### Demo-app

This app consumes both `demo-engine` & `demo-addon` to demonstrate our ability to serve up styles themes from both the host app and its engine.
