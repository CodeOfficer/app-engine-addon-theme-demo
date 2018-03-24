
# Example App

## Overview

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
