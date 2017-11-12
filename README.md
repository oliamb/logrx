# logrx, a javascript logger built with rxjs

![build status](https://travis-ci.org/oliamb/logrx.svg?branch=master)

Features:

- [x] mimic a subset of the Console API
- [ ] support log level configuration
- [ ] support having multiple logger  implementation running in parallel
- [ ] support multiple configurations
- [ ] support multiple logging backend
- [ ] provide an extensible API
- [ ] leverage rxjs whenever possible
- [ ] is lightweight

When in doubt, I default to Log4J architecture for the implementation. Of course, the library should be much smaller so I will always ask, do I really need that indirection.

## Excerpt from the log4J documentation

https://logging.apache.org/log4j/2.0/manual/architecture.html

> Applications using the Log4j 2 API will request a Logger with a specific name from the LogManager. The LogManager will locate the appropriate LoggerContext and then obtain the Logger from it. If the Logger must be created it will be associated with the LoggerConfig that contains either a) the same name as the Logger, b) the name of a parent package, or c) the root LoggerConfig. LoggerConfig objects are created from Logger declarations in the configuration. The LoggerConfig is associated with the Appenders that actually deliver the LogEvents.

> ### Named Hierarchy
>
> A LoggerConfig is said to be an ancestor of another LoggerConfig if its name followed by a dot is a prefix of the descendant logger name. A LoggerConfig is said to be a parent of a child LoggerConfig if there are no ancestors between itself and the descendant LoggerConfig.

## Contributing

This project is at a very early stage and will be open to contributions as soon as it proved to be an interesting library.
