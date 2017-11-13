# logrx, a javascript logger built with rxjs

![build status](https://travis-ci.org/oliamb/logrx.svg?branch=master)

Features:

- [x] mimic a subset of the Console API
- [x] support log level configuration
- [x] support having multiple logger  implementation running in parallel
- [x] support multiple configurations
- [x] support multiple logging backend
- [x] provide an extensible API
- [ ] leverage rxjs whenever possible
- [ ] is lightweight

## Getting Started

Using the global context, without customization.

```js
const logger = getLogger('db');
logger.log('Hello World');
```

Configure a logger using its name.

```js
import { configure, getLogger, Level } from 'logrx';
configure({
  name: 'api-call',
  appenders: ['console'],
  level: Level.ERROR
});
const logger = getLogger('api-call');
logger.error('Hello Error', new Error('some issue'));
```

Using a separate context:

```js
import { configure, getLogger, Level, ROOT_LOGGER_NAME } from 'logrx';

export const context = new LoggerContext();

context.configure({
  name: ROOT_LOGGER_NAME,
  appenders: [],
  level: Level.OFF
}, {
  name: 'api-call',
  appenders: ['console'],
  level: Level.INFO
});

// ---- //

const logger = getLogger('db');
logger.log('SELECT', 'ID=', 5);
```

## Contributing

This project is at a very early stage and will be open to contributions as soon as it proved to be an interesting library.
