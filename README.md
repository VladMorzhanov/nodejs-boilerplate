# NodeJS ExpressJS Boilerplate

<img src="https://i.imgur.com/KbO2Soz.jpg"/>

Node.js Boilerplate is an project that allows you to start new node.js project from scratch.

## Installation

Use these steps to install project
1. npm i
2. Create MongoDB databse
3. Add MONGODB_URL and MONGODB_TEST_URL to environment variable (optional)
4. npm start

Alternatively you can run: "npm run http" on step 4 to run HTTP server. 

## Usage

This boilerplate contains such folders:

* <b>/src </b> - main sources folder.
* <b>/src/constants </b> - app constants.
* <b>/src/controllers </b> - contain controllers that receives requests from routes, executes business logic via services and returns responses to client. 
* <b>/src/db </b> - contain scripts to setup and manage database
* <b>/src/error </b> - custom errors
* <b>/src/middleware </b> - app middlewares
* <b>/src/models </b> - database models (schemas)
* <b>/src/routes </b> - configure here youre app's routes
* <b>/src/services </b> - services contains logic to manage database, execute requests to other servers, change application behabior, and etc.
* <b>/src/index.ts </b> - contain main scripts that configures and run server

* <b>/test </b> - contains tests for controllers, services and other parts of application.

## NPM Scripts

* start - run node.js server
* test - test server with Mocha
* lint - run eslint check

## Main Technologies and libraries

- <a href="https://nodejs.org/en/">NodeJS</a>
- <a href="https://expressjs.com/">ExpressJS</a>
- <a href="https://www.typescriptlang.org/">Typescript</a>
- <a href="https://jwt.io/">JWT</a>
- <a href="https://github.com/helmetjs/helmet">Helmet</a>
- <a href="https://github.com/request/request">Request</a>
- <a href="https://github.com/felixge/node-formidable">Formidable</a>
- <a href="https://mongoosejs.com/">Mongoose</a>
- <a href="https://github.com/expressjs/morgan">Morgan</a>
- <a href="https://mochajs.org/">Mocha</a>
- <a href="https://github.com/visionmedia/supertest">Supertest</a>

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

Vlad Morzhanov

## License

#### (The MIT License)

Copyright (c) 2018 Vlad Morzhanov.
You can review license in the LICENSE file.
