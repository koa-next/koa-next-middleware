# koa-next-middleware

[![npm](https://img.shields.io/npm/v/koa-next-middleware.svg)](https://www.npmjs.com/package/koa-next-middleware)
[![npm](https://img.shields.io/npm/l/koa-next-middleware.svg)](https://www.npmjs.com/package/koa-next-middleware)

## Overview

> Koa Next Middleware

## Install

```sh
npm install koa-next-middleware
```

or

```sh
yarn add koa-next-middleware
```

## Usage

```js
const Koa = require('koa');
const Next = require('Next');
const LRUCache = require('lru-cache);
const NextMiddleware = require('koa-next-middleware');

const app = new Koa();
const isDev = process.env.NODE_ENV !== 'production';
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});
const appnext = Next({
  dev: isDev
});

app.use(NextMiddleware(appnext, {
  cache: isDev ? null : ssrCache
}));

app.listen(3000);
```

## LICENSE

MIT@[PLDaily](https://github.com/PLDaily)
