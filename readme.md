# Radar

> A window history no config router.

![npm](https://img.shields.io/npm/v/@devinle/radar.svg)
![NPM](https://img.shields.io/npm/l/@devinle/radar.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/devinle/radar.svg)

## Install

```bash
npm install @devinle/radar

// In your script
import { radar } from '@devinle/radar';

// Make a callback function
const callback = (data) => { console.log(data); };

// Data Signature within callback is as follows
data = {
  from: 'from/page/url,
  to: 'to/page/url'
};

// Register a callback with the radar-change event
// This event will receive data
radar.on('radar-change', callback);

// Remove a specific callback from the radar-change
radar.off('radar-change', callback);

```

## Usage
All links delegate to the body and will make a request to the window pushState.

```
<a href="/url/here">A Link</a>
```

## Prevent History Request
To avoid calling the window pushState function, apply the radar-ignore class to a link.

```
<a href="/url/here" class="radar-ignore">A Link</a>
```

## Method radar.go(evt)
The body is bound to the radar.go method and all <a> links clicked within the body will call this API method unless it contains the ignore class.

## Tests

```
yarn run test
```

## License

[MIT](http://vjpr.mit-license.org)
