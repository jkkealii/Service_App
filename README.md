# Service App
[![LMU Crimson Circle][crimson-img]][crimson-url]
[![Build Status][travis-img]][travis-url]
[![Codecov][codecov-img]][codecov-url]
[![Dependency Status][dependency-img]][dependency-url]
[![Dev Dependency Status][dev-dependency-img]][dev-dependency-url]
[![Known Vulnerabilities][snyk-img]][snyk-url]

The Crimson Circle website dedicated to tracking and viewing service hours.

### Installation

Download repo; install packages
```
git clone https://github.com/jkkealii/Service_App.git
cd Service_App
npm install
```

Install Mongo locally if you don't already have it installed
```
brew install mongodb
```

Configure server with config file to go into `config/default.json`
```
{
    "Node-Server": {
        "host": <desired host>,
        "port": <desired port>,
        "logToConsole": <desired logging boolean>
    },
    "Mongo-Server": {
        "host": <mongodb server>,
        "port": <mongodb server port>,
        "db": <db to interact with>
    }
}
```
Alternately, get the most recent config folder from Team member/Slack

### Running & Development

Start your local db and optionally seed the db
```
npm run db-start
npm run db-seed -- --file <filepath>
```

Start the server
```
npm start
```

[crimson-img]: resources/large-crimson-logo.png
[crimson-url]: https://github.com/jkealii/Service_App

[travis-img]: https://travis-ci.org/jkkealii/Service_App.svg?branch=master
[travis-url]: https://travis-ci.org/jkkealii/Service_App

[codecov-img]: https://codecov.io/gh/jkkealii/Service_App/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/jkkealii/Service_App

[dependency-img]: https://david-dm.org/jkkealii/Service_App.svg
[dependency-url]: https://david-dm.org/jkkealii/Service_App

[dev-dependency-img]: https://david-dm.org/jkkealii/Service_App/dev-status.svg
[dev-dependency-url]: https://david-dm.org/jkkealii/Service_App?type=dev

[snyk-img]: https://snyk.io/test/github/jkkealii/Service_App.git/badge.svg
[snyk-url]: https://snyk.io/test/github/jkkealii/Service_App.git
