# Event Booking System
A web application that simulates an event booking system for my university, using Node.js, Express and MongoDB. The system provides the following functions: 
- Event  creation  and  management:  Staff-level users  can  create  and  launch  a  new  event,  or  adjust  the  
price, dates/sessions, promotional codes, capacities, etc. on an existing event.  
- Event booking: System users can view the list of events, make a booking, and modify or cancel an existing booking.  
- User management: System users can view their profile and activity log (history). Users can also update their personal details such as email and password.

**Register for a staff account to access all features above.**

## Getting started
### Prerequisites
Download Node.js and npm here: https://nodejs.org/en/
### Installation
1. `npm install`
2. Create a .env file in root project folder
```
SESSION_SECRET=XXXXXX
DB_URI=XXXXXX
```  
- SESSION_SECRET can be a random string to secure the session.
- DB_URI is the connection string to MongoDB server (check out [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)). Here is an example connection string `mongodb+srv://<username>:<password>@cluster123-tnkmj.gcp.mongodb.net/test`, where `username` and `password` should be substituted with your own user credentials, `test` is the name of the database selected.
3. `npm start` 
4. Go to http://localhost:3000 to see your app.

### Build
`npm run build` and `npm run serve` to run the production version after build.

### Testing
The tests are implemented in `src/test` using [Mocha](https://github.com/mochajs/mocha). `npm run test` to run the test files.

## Built with
- [Express.js](https://github.com/expressjs/express) - Node.js web application framework
- [mongoose](https://github.com/expressjs/express) - MongoDB object modeling for Node.js
- [ejs](https://github.com/mde/ejs) - Template engine
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Hash user password
- [express-session](https://github.com/expressjs/session) - User session middleware
- [connect-mongo](https://github.com/jdesboeufs/connect-mongo) - Use MongoDB for persistent session store
- [moment](https://github.com/moment/moment) - Formatting and displaying dates and times
- [Mocha](https://github.com/mochajs/mocha) - API and database testing

## Authors and contributors
- Hieu Chu
- Long Hung Nguyen

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
