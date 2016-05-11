'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.resources('books')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// .post('/books', 'books#create')
// .get('/books', 'books#index')
// .get('/books/:id', 'books#show')
// .patch('/books/:id', 'books#update')
// .delete('/books/:id', 'books#destroy')

// all routes created
;
