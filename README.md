# Node.js Boilerplate

Node.js Boilerplate is an project that allows you to start new node.js project from scratch.

## Installation

Use these steps to install project
1. npm i
2. Create MongoDB databse (optional)
3. Add MONGODB_URL and MONGODB_TEST_URL to environment variable (optional)
4. npm start

Alternatively you can run: "npm run http" on step 4 to run HTTP server. 

## Usage

This boilerplate contains such folders:

<b>/src </b> - main sources folder.
<b>/src/bin </b> - contain main scripts that configures and run servers.
<b>/src/constants </b> - app constants.
<b>/src/controllers </b> - contain controllers that receives requests from routes and returns responses to client. 
<b>/src/db </b> - contain scripts to setup and manage data base
<b>/src/error </b> - custom errors
<b>/src/middleware </b> - app middlewares
<b>/src/models </b> - database models (schemas)
<b>/src/routes </b> - configure here youre app's routes
<b>/src/services </b> - services contains logic to manage database, execute requests to other servers, change application behabior, and etc.

<b>/test </b> - contains tests for controllers, services and other parts of application.

# NPM Scripts

* start - run node.js server (HTTPS)
* http - run node.js server (HTTP)
* test - test server with Mocha
* lint - run eslint check
* forever - add /src/bin/www.js script to forever scripts and run

# Main Technologies and libraries

* Node.js
* Express.js
* Mocha
* Supertest
* Should.js
* Helmet
* Request
* Formidable
* lodash
* mongoose
* morgan
* debug

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
