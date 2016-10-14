# Service App
[![LMU Crimson Circle][crimson-img]][crimson-url]
[![Build Status][travis-img]][travis-url]
[![Codecov][codecov-img]][codecov-url]
[![Dependency Status][dependency-img]][dependency-url]
[![Dev Dependency Status][dev-dependency-img]][dev-dependency-url]
[![Known Vulnerabilities][snyk-img]][snyk-url]

The Crimson Circle website dedicated to tracking and viewing service hours.

### Requirements
Install `npm` and `mongodb` if you don't already have them installed
```
brew install node
brew install mongodb
```

### Installation
Download and install packages
```
git clone https://github.com/jkkealii/Service_App.git
cd Service_App
npm install
```

Configure server with config file to go into `config/set_db.sh`
```
echo 'mongodb://localhost:27017/db'
```
Alternately, get the most recent config folder from Slack

### Using Database

Initialize MongoDB for Service App
```
npm run db-init
```

Start Database
```
npm run db-start
```

Stop Database
```
npm run db-stop
```
Reset Database (stop, initialize, start)
```
npm run db-reset
```

### Running & Development

Start the server
```
npm start
```

Run Tests
```
npm test
npm run lint
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
